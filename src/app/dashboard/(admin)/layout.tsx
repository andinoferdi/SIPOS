"use client";

import AppHeader from "@/components/layout/dashboard/app-header";
import AppSidebar from "@/components/layout/dashboard/app-sidebar";
import Backdrop from "@/components/layout/dashboard/backdrop";
import { useSidebarStore } from "@/stores/sidebar-store";
import type { ReactNode } from "react";

const AdminLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  const isExpanded = useSidebarStore((state) => state.isExpanded);
  const isHovered = useSidebarStore((state) => state.isHovered);
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
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
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
