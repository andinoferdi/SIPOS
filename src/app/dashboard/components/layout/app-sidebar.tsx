"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import BrandLogo from "@/components/ui/brand-logo";
import { ListIcon, TableIcon } from "@/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const dashboardPath = pathname.startsWith("/dashboard/") ? pathname : "/portal";

  const menuItems: NavItem[] = [
    {
      name: "Portal POS",
      path: "/portal",
      icon: <ListIcon className="h-4 w-4" />,
    },
    {
      name: "Dashboard Instance",
      path: dashboardPath,
      icon: <TableIcon className="h-4 w-4" />,
    },
  ];

  const showLabels = isExpanded || isHovered || isMobileOpen;

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={[
        "fixed left-0 top-0 z-50 mt-[53px] flex h-screen flex-col border-r border-soft bg-(--token-white) transition-all duration-300 ease-in-out dark:bg-(--color-surface-dark-elevated) lg:mt-0",
        isExpanded || isMobileOpen
          ? "w-[260px]"
          : isHovered
            ? "w-[260px]"
            : "w-[72px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      ].join(" ")}
    >
      <div
        className={`flex shrink-0 border-b border-soft px-4 py-4 ${
          showLabels ? "justify-start" : "lg:justify-center"
        }`}
      >
        <Link href="/portal">
          {showLabels ? <BrandLogo size="md" /> : <BrandLogo size="sm" showText={false} />}
        </Link>
      </div>

      <nav className="flex flex-col gap-1 overflow-y-auto p-3">
        <p
          className={[
            "mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-(--token-gray-400) dark:text-(--token-gray-500)",
            !showLabels ? "lg:text-center" : "",
          ].join(" ")}
        >
          {showLabels ? "Navigasi" : "-"}
        </p>

        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={[
                "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                !showLabels ? "lg:justify-center" : "",
                active
                  ? "bg-(--token-gray-100) text-(--token-gray-900) dark:bg-(--token-white-10) dark:text-(--token-white)"
                  : "text-(--token-gray-500) hover:bg-(--token-gray-100) hover:text-(--token-gray-800) dark:text-(--token-gray-400) dark:hover:bg-(--token-white-5) dark:hover:text-(--token-white)",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors",
                  active
                    ? "dashboard-active-icon"
                    : "bg-(--token-gray-100) text-(--token-gray-500) dark:bg-(--token-white-5) dark:text-(--token-gray-400)",
                ].join(" ")}
              >
                {item.icon}
              </span>
              {showLabels && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

