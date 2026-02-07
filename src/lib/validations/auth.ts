import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(128, "Password terlalu panjang"),
});

export interface LoginFormData {
  email: string;
  password: string;
}

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(80, "Nama lengkap terlalu panjang"),
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(128, "Password terlalu panjang"),
});

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}
