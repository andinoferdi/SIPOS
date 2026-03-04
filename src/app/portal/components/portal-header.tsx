"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/layout/theme-toggle";
import BrandLogo from "@/components/ui/brand-logo";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
} from "@/components/ui/resizable-navbar";
import type { AuthUser } from "@/types/auth";

type WorkspaceInfo = {
  code: string;
  name: string;
};

type PortalHeaderProps = {
  session: AuthUser;
  workspace?: WorkspaceInfo;
};

const ROLE_LABEL: Record<AuthUser["role"], string> = {
  admin: "Admin",
  fnb: "FnB",
  fnb_manager: "FnB Manager",
  host: "Host",
};

export function PortalHeader({ session, workspace }: PortalHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  return (
    <Navbar mode="fixed" scrollThreshold={24}>
      <NavBody className="mx-auto h-auto w-full max-w-7xl px-5 py-3 sm:px-7 lg:py-4">
        <div className="flex items-center gap-3">
          <Link href="/portal" className="inline-flex items-center">
            <BrandLogo size="md" />
          </Link>
          {workspace && (
            <>
              <span className="hidden h-4 w-px bg-soft sm:block" />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-(--token-gray-900) dark:text-(--token-white)">
                  {workspace.name}
                </p>
                <p className="text-[10px] text-(--token-gray-400) dark:text-(--token-gray-500)">
                  {workspace.code}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-soft px-3 py-1.5 sm:flex">
            <div className="accent-soft flex h-5 w-5 items-center justify-center rounded-full">
              <span className="text-[9px] font-bold text-(--color-primary-600) dark:text-(--color-primary-400)">
                {session.name?.charAt(0).toUpperCase() ?? "U"}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-(--token-gray-800) dark:text-(--token-gray-200)">
                {session.name}
              </p>
              <p className="text-[10px] text-(--token-gray-400) dark:text-(--token-gray-500)">
              {ROLE_LABEL[session.role]}
              </p>
            </div>
          </div>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => void signOut({ callbackUrl: "/login" })}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-soft text-(--token-gray-500) transition-colors hover:bg-(--token-gray-100) hover:text-(--token-gray-800) dark:text-(--token-gray-400) dark:hover:bg-(--token-white-5) dark:hover:text-(--token-white)"
            aria-label="Logout"
          >
            <LogOut size={15} />
          </button>
        </div>
      </NavBody>

      <MobileNav className="mx-auto h-auto w-full max-w-7xl px-5 py-3 sm:px-7">
        <MobileNavHeader>
          <Link href="/portal" className="inline-flex items-center">
            <BrandLogo size="md" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="border-soft bg-(--color-marketing-light-canvas)/95 dark:bg-(--color-marketing-dark-canvas)/90"
        >
          <div className="rounded-lg border border-soft px-3 py-2.5">
            <p className="text-xs font-semibold text-(--token-gray-800) dark:text-(--token-gray-200)">
              {session.name}
            </p>
            <p className="text-[10px] text-(--token-gray-400) dark:text-(--token-gray-500)">
              {ROLE_LABEL[session.role]}
            </p>
          </div>

          {workspace && (
            <div className="rounded-lg border border-soft px-3 py-2.5">
              <p className="text-xs font-semibold text-(--token-gray-800) dark:text-(--token-gray-200)">
                {workspace.name}
              </p>
              <p className="text-[10px] text-(--token-gray-400) dark:text-(--token-gray-500)">
                {workspace.code}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              void signOut({ callbackUrl: "/login" });
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-soft px-3 py-2.5 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
            aria-label="Logout"
          >
            <LogOut size={14} />
            Logout
          </button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
