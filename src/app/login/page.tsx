import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/app/login/components/login-form";
import BrandLogo from "@/components/ui/brand-logo";
import { getServerAuthUser } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Login",
};

const HIGHLIGHTS = [
  {
    icon: (
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    label: "Kasir & Checkout Cepat",
  },
  {
    icon: (
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    label: "Stok Realtime",
  },
  {
    icon: (
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    label: "Laporan Harian",
  },
] as const;

export default async function LoginPage() {
  const user = await getServerAuthUser();
  if (user) {
    redirect("/portal");
  }

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center bg-(--color-marketing-light-canvas) px-5 py-16 dark:bg-(--color-marketing-dark-canvas)">
      {/* Background grid */}
      <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.055]" />

      {/* Soft glow behind card */}
      <div className="login-primary-glow pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      {/* Back link */}
      <div className="relative w-full max-w-[420px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-(--token-gray-400) transition-colors hover:text-(--token-gray-700) dark:text-(--token-gray-500) dark:hover:text-(--token-gray-200)"
        >
          <ArrowLeft size={12} />
          Kembali ke Landing
        </Link>
      </div>

      {/* Card */}
      <div className="relative mt-4 w-full max-w-[420px] overflow-hidden rounded-2xl border border-soft surface-elevated shadow-xl">

        {/* Card top: brand + headline */}
        <div className="px-8 pb-6 pt-8">
          <Link href="/" className="inline-flex items-center">
            <BrandLogo size="md" priority />
          </Link>

          <div className="mt-6">
            <h1 className="text-xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
              Masuk ke SIPOS
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400)">
              Sistem POS untuk kasir, stok, dan laporan harian.
            </p>
          </div>

          {/* Feature pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {HIGHLIGHTS.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-soft bg-(--token-gray-100) px-2.5 py-1 text-[11px] font-medium text-(--token-gray-500) dark:bg-(--token-white-5) dark:text-(--token-gray-400)"
              >
                <span className="text-(--token-gray-400) dark:text-(--token-gray-500)">
                  {item.icon}
                </span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 border-t border-soft" />

        {/* Form area */}
        <div className="px-8 pb-8 pt-6">
          <LoginForm />
        </div>

        {/* Card bottom: status bar */}
        <div className="flex items-center justify-between border-t border-soft bg-(--token-gray-50) px-8 py-3 dark:bg-(--token-white-5)">
          <div className="flex items-center gap-1.5">
            <span className="status-dot-success h-1.5 w-1.5 rounded-full" />
            <p className="text-[11px] font-medium text-(--token-gray-400) dark:text-(--token-gray-500)">
              Sistem aktif
            </p>
          </div>
          <p className="text-[11px] text-(--token-gray-400) dark:text-(--token-gray-500)">
            SIPOS POS Portal
          </p>
        </div>
      </div>

      <p className="relative mt-5 text-center text-xs text-(--token-gray-400) dark:text-(--token-gray-500)">
        Butuh akun? Hubungi administrator toko Anda.
      </p>
    </section>
  );
}
