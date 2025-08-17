"use server";

import { INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constants";
import { AuthFormState } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import { loginSchemaForm } from "@/validations/auth-validation";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

export async function login(
  prevState: AuthFormState,
  formData: FormData | null
) {
  if (!formData) {
    return INITIAL_STATE_LOGIN_FORM;
  }

  const validatedFields = loginSchemaForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...(z.treeifyError(validatedFields.error) as AuthFormState["errors"]),
        _form: [],
      },
    };
  }

  const supabase = await createClient();
  const prisma = new PrismaClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  const profile = await prisma.profiles.findUnique({
    where: { id: user?.id },
  });

  if (profile) {
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(profile), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  } else {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: ["Profile not found"],
      },
    };
  }

  // Revalidate paths but don't redirect
  if (profile.role === "admin" || profile.role === "cadre") {
    revalidatePath("/admin", "layout");
  }
  revalidatePath("/", "layout");

  // Return success with redirect information instead of redirecting
  return {
    status: "success",
    message: "Login successful",
    redirectTo: profile.role === "admin" || profile.role === "cadre" ? "/admin" : "/",
    user: profile,
  };
}