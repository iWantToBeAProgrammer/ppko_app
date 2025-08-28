"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { redirect } from "next/navigation";

// Validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Masukkan alamat email yang valid"),
});

type ActionState = {
  status: "idle" | "success" | "error";
  errors: Record<string, string[]>;
  message: string;
};

export async function forgotPassword(
  prevState: ActionState,
  formData: FormData | null
): Promise<ActionState> {
  // Handle reset state
  if (!formData) {
    return {
      status: "idle",
      errors: {},
      message: "",
    };
  }

  try {
    // Validate form data
    const validatedData = forgotPasswordSchema.parse({
      email: formData.get("email"),
    });

    const supabase = await createClient();

    // Send password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(
      validatedData.email,
      {
        // This should be your password reset page URL
        // Make sure this URL is added to your Supabase Auth settings
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
      }
    );

    if (error) {
      console.error("Password reset error:", error);
      return {
        status: "error",
        errors: {
          _form: [error.message || "Gagal mengirim email reset"],
        },
        message: "",
      };
    }

    return {
      status: "success",
      errors: {},
      message: "Email reset password berhasil dikirim",
    };
  } catch (error) {
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
      };
    }

    return {
      status: "error",
      errors: {
        _form: ["Terjadi kesalahan yang tidak terduga. Silakan coba lagi."],
      },
      message: "",
    };
  }
}
