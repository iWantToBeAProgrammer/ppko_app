"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/form-card";
import { startTransition, useActionState, useEffect } from "react";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constants/auth-constants";
import { login } from "../action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginForm } from "@/validations/auth-validation";
import { loginSchemaForm } from "@/validations/auth-validation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM
  );
  // Handle form submission
  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      loginAction(formData);
    });
  });

  const router = useRouter();

  useEffect(() => {
    if (loginState.status === "error") {
      toast.error("Login failed", {
        description: loginState.errors?._form?.[0],
      });
      startTransition(() => {
        loginAction(null);
      });
    } else if (loginState.status === "success") {
      toast.success("Login successful!");

      // Then handle redirect based on server response
      if (loginState.redirectTo) {
        router.push(loginState.redirectTo);
      } else {
        router.refresh(); // Just refresh current page if no redirect specified
      }
    }
  }, [loginState, router]);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <FormInput
          form={form}
          name="email"
          label="Email"
          placeholder="Masukkan email anda"
          type="email"
        />
         <div className="space-y-2">
          <FormInput
            form={form}
            name="password"
            label="Password"
            placeholder="******"
            type="password"
          />
          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Lupa password?
            </Link>
          </div>
        </div>

        <Button type="submit">
          {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
