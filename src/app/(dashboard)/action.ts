"use server";

import { prisma } from "@/lib/prisma";
import { AuthFormState } from "@/types/auth";
import { createClient } from "@/utils/supabase/server";
import { createUserSchema } from "@/validations/auth-validation";
import { Gender, Role, SubVillage } from "@prisma/client";
import z from "zod";

export async function createUser(prevState: AuthFormState, formData: FormData) {
  // Extract user data
  const validatedFields = createUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    address: formData.get("address"),
    phone_number: formData.get("phone_number"),
    role: formData.get("role"),
    gender: formData.get("gender"),
    subVillage: formData.get("subVillage"),
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

  // Check if this is a parent with child data
  const hasChildData = formData.get("child_first_name") !== null;
  let childData = null;

  if (hasChildData) {
    // Validate child data
    const childValidationSchema = z.object({
      first_name: z.string().min(1, "Nama depan anak harus diisi"),
      last_name: z.string().min(1, "Nama belakang anak harus diisi"),
      dateOfBirth: z.string().min(1, "Tanggal lahir harus diisi"),
      gender: z.nativeEnum(Gender),
      birthHeight: z.string().min(1, "Tinggi badan lahir harus diisi"),
    });

    const childValidatedFields = childValidationSchema.safeParse({
      first_name: formData.get("child_first_name"),
      last_name: formData.get("child_last_name"),
      dateOfBirth: formData.get("child_dateOfBirth"),
      gender: formData.get("child_gender"),
      birthHeight: formData.get("child_birthHeight"),
    });

    if (!childValidatedFields.success) {
      return {
        status: "error",
        errors: {
          _form: [
            "Data anak tidak valid: " +
              childValidatedFields.error.issues
                .map((issue) => issue.message)
                .join(", "),
          ],
        },
      };
    }

    childData = childValidatedFields.data;
  }

  const supabase = await createClient();

  // Create user in Supabase Auth
  const { error, data } = await supabase.auth.signUp({
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

  try {
    // Use a transaction to ensure data consistency
    await prisma.$transaction(async (prisma) => {
      // Create the user
      const createdUser = await prisma.user.create({
        data: {
          id: data.user?.id,
          first_name: validatedFields.data.first_name,
          last_name: validatedFields.data.last_name,
          email: validatedFields.data.email,
          gender: validatedFields.data.gender as Gender,
          subVillage: validatedFields.data.subVillage as SubVillage,
          phoneNumber: validatedFields.data.phone_number,
          role: validatedFields.data.role as Role,
          address: validatedFields.data.address,
        },
      });

      // If this is a parent, create the child record
      if (hasChildData && childData) {
        await prisma.child.create({
          data: {
            first_name: childData.first_name,
            last_name: childData.last_name,
            gender: childData.gender as Gender,
            dateOfBirth: new Date(childData.dateOfBirth),
            birthHeight: parseFloat(childData.birthHeight),
            parentId: createdUser.id, // Link child to parent
            // isActive defaults to true
            // createdAt and updatedAt are handled automatically
          },
        });
      }
    });

    return {
      status: "success",
    };
  } catch (dbError) {
    // If database operation fails, we should clean up the Supabase user
    // Note: This is a simplified cleanup, you might want more sophisticated error handling
    console.error("Database operation failed:", dbError);

    // Attempt to delete the created Supabase user
    try {
      await supabase.auth.admin.deleteUser(data.user?.id as string);
    } catch (cleanupError) {
      console.error("Failed to cleanup Supabase user:", cleanupError);
    }

    return {
      status: "error",
      errors: {
        _form: ["Terjadi kesalahan saat menyimpan data. Silakan coba lagi."],
      },
    };
  }
}
