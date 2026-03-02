"use client";

import type { ReactNode } from "react";
import type { AuthUser } from "@/types/auth";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { useSidebar } from "@/hooks/use-sidebar";
import AppHeader from "@/app/dashboard/components/layout/app-header";
import AppSidebar from "@/app/dashboard/components/layout/app-sidebar";
import Backdrop from "@/app/dashboard/components/layout/backdrop";

type DashboardShellProps = {
  session: AuthUser;
  children: ReactNode;
};

export default function DashboardShell({ session, children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardContent session={session}>{children}</DashboardContent>
    </SidebarProvider>
  );
}

function DashboardContent({
  session,
  children,
}: {
  session: AuthUser;
  children: ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const sidebarWidth = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[260px]"
      : "lg:ml-[72px]";

  return (
    <div className="dashboard-theme-scope surface-base min-h-dvh">
      <AppSidebar />
      <Backdrop />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarWidth}`}>
        <AppHeader session={session} />
        <main className="mx-auto max-w-screen-2xl p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
