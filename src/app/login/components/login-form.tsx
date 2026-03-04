"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getDashboardPathByRole } from "@/lib/auth/paths";
import { loginSchema, type LoginSchema } from "@/schemas/login.schema";
import type { AuthRole } from "@/types/auth";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const INPUT_BASE = "login-input-base h-11 w-full rounded-lg border px-3 text-sm";

const INPUT_NORMAL = "login-input-normal";

const INPUT_ERROR = "login-input-error";

const InputGroup = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-[0.06em] text-(--token-gray-400) dark:text-(--token-gray-500)"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          {...props}
          className={[INPUT_BASE, error ? INPUT_ERROR : INPUT_NORMAL, className]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={Boolean(error)}
        />
        {error ? (
          <p className="login-input-error-text text-xs">{error}</p>
        ) : null}
      </div>
    );
  },
);

InputGroup.displayName = "InputGroup";

const PasswordInput = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-[0.06em] text-(--token-gray-400) dark:text-(--token-gray-500)"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            {...props}
            type={visible ? "text" : "password"}
            className={[
              INPUT_BASE,
              "pr-10",
              error ? INPUT_ERROR : INPUT_NORMAL,
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={Boolean(error)}
          />
          <button
            type="button"
            aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
            onClick={() => setVisible((prev) => !prev)}
            className="login-input-toggle absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 transition-colors"
          >
            {visible ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {error ? (
          <p className="login-input-error-text text-xs">{error}</p>
        ) : null}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: LoginSchema) {
    const result = await signIn("credentials", {
      identifier: data.identifier.trim(),
      password: data.password,
      redirect: false,
    });

    if (!result || result.error) {
      toast.error("Email atau password tidak valid");
      return;
    }

    toast.success("Login berhasil");
    const session = await getSession();
    const role = session?.user?.role as AuthRole | undefined;
    router.replace(getDashboardPathByRole(role ?? "admin"));
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-5">
        <InputGroup
          label="Email"
          type="text"
          placeholder="admin@sipos.local"
          autoComplete="username"
          disabled={isSubmitting}
          error={form.formState.errors.identifier?.message}
          {...form.register("identifier")}
        />

        <PasswordInput
          label="Password"
          placeholder="Masukkan password"
          autoComplete="current-password"
          disabled={isSubmitting}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="login-submit-button mt-1 w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity active:opacity-70 disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Masuk"}
        </button>
      </div>
    </form>
  );
}
