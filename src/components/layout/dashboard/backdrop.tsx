"use client";

import { useSidebarStore } from "@/stores/sidebar-store";

const Backdrop = () => {
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
  const toggleMobileSidebar = useSidebarStore(
    (state) => state.toggleMobileSidebar,
  );

  if (!isMobileOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
