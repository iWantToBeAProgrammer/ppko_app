"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/form-card";
import { startTransition, useActionState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { resetPassword } from "./action";

// Validation schema for reset password
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

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

// Constants
const INITIAL_RESET_PASSWORD_FORM: ResetPasswordForm = {
  password: "",
  confirmPassword: "",
};

const INITIAL_STATE_RESET_PASSWORD_FORM = {
  status: "idle" as "idle" | "success" | "error",
  errors: {} as Record<string, string[]>,
  message: "",
  redirectTo: "",
};

// You'll need to create this action

export default function ResetPasswordForm() {
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: INITIAL_RESET_PASSWORD_FORM,
  });

  const [resetPasswordState, resetPasswordAction, isPendingReset] =
    useActionState(resetPassword, INITIAL_STATE_RESET_PASSWORD_FORM);

  const router = useRouter();

  // Handle form submission
  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      resetPasswordAction(formData);
    });
  });

  useEffect(() => {
    if (resetPasswordState.status === "error") {
      toast.error("Reset password gagal", {
        description:
          resetPasswordState.errors?._form?.[0] || "Terjadi kesalahan",
      });
      // Reset state
      startTransition(() => {
        resetPasswordAction(null);
      });
    } else if (resetPasswordState.status === "success") {
      toast.success("Password berhasil diperbarui!", {
        description: "Anda akan diarahkan ke halaman login",
      });

      // Redirect to login page after success
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }, [resetPasswordState, router]);

  return (
    <div className="container mx-auto max-w-6xl flex items-center justify-center h-screen ">
      <div className="space-y-6 shadow-lg rounded-lg p-8 border">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">Buat Password Baru</h2>
          <p className="text-muted-foreground text-center text-sm">
            Masukkan password baru Anda di bawah ini
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormInput
              form={form}
              name="password"
              label="Password Baru"
              placeholder="Masukkan password baru Anda"
              type="password"
            />

            <FormInput
              form={form}
              name="confirmPassword"
              label="Konfirmasi Password"
              placeholder="Konfirmasi password baru Anda"
              type="password"
            />

            <Button type="submit" className="w-full" disabled={isPendingReset}>
              {isPendingReset ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memperbarui...
                </>
              ) : (
                "Perbarui Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
