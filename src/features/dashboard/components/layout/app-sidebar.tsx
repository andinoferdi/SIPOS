"use client";

import { useSidebar } from "@/app/(dashboard)/dashboard/_hooks/use-sidebar";
import {
  BoxCubeIcon,
  CalenderIcon,
  DocsIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PlugInIcon,
  UserCircleIcon,
} from "@/icons";
import { hasAnyRole, hasPermission } from "@/lib/auth/rbac";
import { withDashboardBase } from "@/lib/utils/dashboard-routes";
import type { PermissionKey, RoleCode } from "@/types/rbac";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import SidebarWidget from "./sidebar-widget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  permissionKey?: PermissionKey;
  roleCodes?: RoleCode[];
};

const mainItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard POS",
    path: withDashboardBase("/"),
    permissionKey: "dashboard_pos:read",
  },
  {
    icon: <CalenderIcon />,
    name: "Sales POS",
    path: withDashboardBase("/pos/sales"),
    permissionKey: "sales:read",
  },
  {
    icon: <DocsIcon />,
    name: "Sales Approval",
    path: withDashboardBase("/pos/approval"),
    permissionKey: "sales_approval:read",
  },
  {
    icon: <ListIcon />,
    name: "Purchase",
    path: withDashboardBase("/pos/purchase"),
    permissionKey: "purchase:read",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Stock Management",
    path: withDashboardBase("/pos/stock"),
    permissionKey: "stock_management:read",
  },
];

const portalItems: NavItem[] = [
  {
    icon: <PlugInIcon />,
    name: "Inventory",
    path: withDashboardBase("/portal/inventory"),
    permissionKey: "inventory:read",
  },
  {
    icon: <PlugInIcon />,
    name: "Category",
    path: withDashboardBase("/portal/categories"),
    permissionKey: "category:read",
  },
  {
    icon: <DocsIcon />,
    name: "Reports POS",
    path: withDashboardBase("/portal/reports"),
    permissionKey: "reports:read",
  },
  {
    icon: <UserCircleIcon />,
    name: "User & Role",
    path: withDashboardBase("/admin/rbac"),
    roleCodes: ["admin"],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const { data: session } = useSession();

  const roleCodes = useMemo(
    () => session?.user?.roleCodes ?? [],
    [session?.user?.roleCodes]
  );

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const canAccessItem = useCallback(
    (item: NavItem) => {
      if (item.permissionKey && !hasPermission(roleCodes, item.permissionKey)) {
        return false;
      }

      if (item.roleCodes && !hasAnyRole(roleCodes, item.roleCodes)) {
        return false;
      }

      return true;
    },
    [roleCodes]
  );

  const visibleMainItems = mainItems.filter(canAccessItem);
  const visiblePortalItems = portalItems.filter(canAccessItem);

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.path}
            className={`menu-item group ${
              isActive(item.path) ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span
              className={`${
                isActive(item.path)
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }`}
            >
              {item.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{item.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[var(--token-white)] dark:bg-[var(--token-gray-900)] dark:border-[var(--token-gray-800)] text-[var(--token-gray-900)] h-screen transition-all duration-300 ease-in-out z-50 border-r border-[var(--token-gray-200)]
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href={withDashboardBase("/")}>
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-[var(--token-gray-400)] ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "POS Menu" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(visibleMainItems)}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-[var(--token-gray-400)] ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Portal" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(visiblePortalItems)}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
