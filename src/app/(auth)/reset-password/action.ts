"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";

// Validation schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .max(50, "Password maksimal 50 karakter"),
    confirmPassword: z.string().min(6, "Password minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type ActionState = {
  status: "idle" | "success" | "error";
  errors: Record<string, string[]>;
  message: string;
  redirectTo: string;
};

export async function resetPassword(
  prevState: ActionState,
  formData: FormData | null
): Promise<ActionState> {
  // Handle reset state
  if (!formData) {
    return {
      status: "idle",
      errors: {},
      message: "",
      redirectTo: "",
    };
  }

  try {
    // Validate form data
    const validatedData = resetPasswordSchema.parse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const supabase = await createClient();

    // Check if user is authenticated (they should be after clicking the reset link)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: "error",
        errors: {
          _form: [
            "Link reset tidak valid atau sudah kadaluarsa. Silakan minta yang baru.",
          ],
        },
        message: "",
        redirectTo: "",
      };
    }

    // Update user password
    const { error: updateError } = await supabase.auth.updateUser({
      password: validatedData.password,
    });

    if (updateError) {
      console.error("Password update error:", updateError);
      return {
        status: "error",
        errors: {
          _form: [updateError.message || "Gagal memperbarui password"],
        },
        message: "",
        redirectTo: "",
      };
    }

    // Sign out the user after password reset for security
    await supabase.auth.signOut();

    return {
      status: "success",
      errors: {},
      message: "Password berhasil diperbarui",
      redirectTo: "/login",
    };
  } catch (error) {
    console.error("Reset password action error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = [];
        }
        fieldErrors[path].push(issue.message);
      });

      return {
        status: "error",
        errors: fieldErrors,
        message: "",
        redirectTo: "",
      };
    }

    return {
      status: "error",
      errors: {
        _form: ["Terjadi kesalahan yang tidak terduga. Silakan coba lagi."],
      },
      message: "",
      redirectTo: "",
    };
  }
}
