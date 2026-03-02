"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import BrandLogo from "@/components/ui/brand-logo";
import { ThemeToggleButton } from "@/app/dashboard/components/common/ThemeToggleButton";
import type { AuthUser } from "@/types/auth";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type AppHeaderProps = {
  session: AuthUser;
};

const ROLE_LABEL: Record<AuthUser["role"], string> = {
  admin: "Admin",
  fnb: "FnB",
  fnb_manager: "FnB Manager",
  host: "Host",
};

export default function AppHeader({ session }: AppHeaderProps) {
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  function handleToggle() {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
      return;
    }
    toggleMobileSidebar();
  }

  async function handleLogout() {
    await signOut({ callbackUrl: "/login" });
  }

  return (
    <header className="sticky top-0 z-9999 border-b border-soft bg-(--token-white)/90 backdrop-blur-xl dark:bg-(--color-surface-dark-elevated)/90">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-soft text-(--token-gray-500) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-400) dark:hover:bg-(--token-white-5)"
          >
            {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          <Link href="/portal" className="lg:hidden">
            <BrandLogo size="md" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2.5 rounded-lg border border-soft px-3 py-1.5 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-(--token-gray-100) text-[11px] font-bold text-(--token-gray-700) dark:bg-(--token-white-10) dark:text-(--token-white-80)">
              {session.name.charAt(0).toUpperCase()}
            </span>
            <div className="text-xs leading-tight">
              <p className="max-w-[120px] truncate font-semibold text-(--token-gray-800) dark:text-(--token-white)">
                {session.name}
              </p>
              <p className="text-(--token-gray-400) dark:text-(--token-gray-500)">
                {ROLE_LABEL[session.role]}
              </p>
            </div>
          </div>

          <ThemeToggleButton />

          <button
            type="button"
            onClick={handleLogout}
            className="danger-ghost-action inline-flex items-center gap-1.5 rounded-lg border border-soft px-3 py-1.5 text-xs font-medium text-(--token-gray-600) transition-colors dark:text-(--token-gray-300)"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

