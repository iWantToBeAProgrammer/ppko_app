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
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { forgotPassword } from "./action";

// Validation schema for forgot password
const forgotPasswordSchema = z.object({
  email: z.email("Masukkan alamat email yang valid"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

// Constants
const INITIAL_FORGOT_PASSWORD_FORM: ForgotPasswordForm = {
  email: "",
};

const INITIAL_STATE_FORGOT_PASSWORD_FORM = {
  status: "idle" as "idle" | "success" | "error",
  errors: {} as Record<string, string[]>,
  message: "",
};

// You'll need to create this action

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: INITIAL_FORGOT_PASSWORD_FORM,
  });

  const [forgotPasswordState, forgotPasswordAction, isPendingForgotPassword] =
    useActionState(forgotPassword, INITIAL_STATE_FORGOT_PASSWORD_FORM);

  // Handle form submission
  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      forgotPasswordAction(formData);
    });
  });

  useEffect(() => {
    if (forgotPasswordState.status === "error") {
      toast.error("Reset password gagal", {
        description:
          forgotPasswordState.errors?._form?.[0] || "Terjadi kesalahan",
      });
      // Reset state
      startTransition(() => {
        forgotPasswordAction(null);
      });
    } else if (forgotPasswordState.status === "success") {
      toast.success("Link reset terkirim!", {
        description: "Periksa email Anda untuk link reset password",
      });
      // Reset form
      form.reset();
    }
  }, [forgotPasswordState, form]);

  return (
    <div className="container mx-auto max-w-6xl flex items-center justify-center h-screen ">
      <div className="space-y-6 shadow-lg rounded-lg p-8 border">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="text-muted-foreground text-center text-sm">
            Masukkan alamat email Anda dan kami akan mengirimkan link untuk
            mereset password
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={onSubmit}>
            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="Masukkan alamat email Anda"
              type="email"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isPendingForgotPassword}
            >
              {isPendingForgotPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Link Reset"
              )}
            </Button>
          </form>
        </Form>

        {/* Back to login link */}
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}
