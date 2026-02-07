"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type RegisterFormData, registerSchema } from "@/lib/validations/auth";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      toast.success(`Akun ${data.fullName} berhasil dibuat`);
    } catch {
      toast.error("Registrasi gagal");
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md border-border bg-card shadow-xl">
      <CardContent className="space-y-6 p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-accent text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Get started</p>
            <h1 className="text-xl font-extrabold text-foreground">
              Create your PropertyPOS account
            </h1>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-foreground"
            >
              Full name
            </label>
            <Input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              isInvalid={Boolean(errors.fullName)}
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
            {errors.fullName ? (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              isInvalid={Boolean(errors.email)}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              isInvalid={Boolean(errors.password)}
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            ) : null}
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-2 w-full" disabled={isSubmitting}>
            Create account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Sudah punya akun.{" "}
          <Link href="/login" className="font-bold text-primary hover:opacity-80">
            Login di sini
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
