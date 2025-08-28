import { Gender, Role, SubVillage } from "@prisma/client";
import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .email()
    .min(1, "Email harus diisi")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .max(255, "Password must be less than 255 characters"),
});

const GenderValues = Object.values(Gender) as [string, ...string[]];
const RoleValues = Object.values(Role) as [string, ...string[]];
const SubVillageValues = Object.values(SubVillage) as [string, ...string[]];

export const createUserSchema = z.object({
  email: z.email("Email harus sesuai").min(1, "Email harus diisi"),
  password: z.string().min(1, "Password harus diisi"), // Keep required for regular users
  first_name: z.string().min(1, "Nama depan harus diisi"),
  last_name: z.string().min(1, "Nama belakang harus diisi"),
  role: z.enum(RoleValues, "role harus diisi"),
  gender: z.enum(GenderValues, "Jenis kelamin harus diisi"),
  subVillage: z.enum(SubVillageValues, "Dusun harus diisi"),
  address: z.string().min(1, "Alamat lengkap harus diisi"),
  phone_number: z.string().min(1, "Nomor Handphone harus diisi"),
});

export const createParentSchema = z.object({
  email: z.email("Email harus sesuai").min(1, "Email harus diisi"),
  password: z.string().optional(), // Make password optional for parents
  first_name: z.string().min(1, "Nama depan harus diisi"),
  last_name: z.string().min(1, "Nama belakang harus diisi"),
  role: z.enum(RoleValues, "role harus diisi"),
  gender: z.enum(GenderValues, "Jenis kelamin harus diisi"),
  subVillage: z.enum(SubVillageValues, "Dusun harus diisi"),
  address: z.string().min(1, "Alamat lengkap harus diisi"),
  phone_number: z.string().min(1, "Nomor Handphone harus diisi"),
});

// Child data validation schema
export const childDataSchema = z.object({
  first_name: z.string().min(1, "Nama depan anak harus diisi"),
  last_name: z.string().min(1, "Nama belakang anak harus diisi"),
  dateOfBirth: z.string().min(1, "Tanggal lahir harus diisi"),
  gender: z.enum(GenderValues, "Jenis kelamin harus diisi"),
});

// Extended schema for parent with child data
export const createParentWithChildSchema = z.object({
  ...createParentSchema.shape,
  childData: childDataSchema.optional(),
});

// Type exports
export type LoginForm = z.infer<typeof loginSchemaForm>;
export type CreateUserForm = z.infer<typeof createUserSchema>;
export type ChildDataForm = z.infer<typeof childDataSchema>;
export type CreateParentWithChildForm = z.infer<
  typeof createParentWithChildSchema
>;
