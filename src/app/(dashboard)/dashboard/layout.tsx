"use client";

import { SidebarProvider } from "@/app/_shared/providers/sidebar-provider";
import { RightSidebarProvider } from "@/app/_shared/providers/right-sidebar-context";
import { useSidebar } from "@/app/(dashboard)/dashboard/_hooks/use-sidebar";
import AppHeader from "@/features/dashboard/components/layout/app-header";
import AppSidebar from "@/features/dashboard/components/layout/app-sidebar";
import Backdrop from "@/features/dashboard/components/layout/backdrop";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <RightSidebarProvider>
        <DashboardShell>{children}</DashboardShell>
      </RightSidebarProvider>
    </SidebarProvider>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
