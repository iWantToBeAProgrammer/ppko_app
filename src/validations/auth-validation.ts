import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .email()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(255, "Password must be less than 255 characters"),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;
