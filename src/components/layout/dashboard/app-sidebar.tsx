"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChatIcon,
  ChevronDownIcon,
  DocsIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "@/icons";
import { withDashboardBase } from "@/lib/dashboard-routes";
import { useSidebarStore } from "@/stores/sidebar-store";
import SidebarWidget from "@/components/layout/dashboard/sidebar-widget";

interface NavSubItem {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: NavSubItem[];
}

interface OpenSubmenuState {
  type: "main" | "others";
  index: number;
}

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: withDashboardBase("/"), pro: false }],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: withDashboardBase("/calendar"),
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: withDashboardBase("/profile"),
  },
  {
    icon: <ChatIcon />,
    name: "Chats",
    path: withDashboardBase("/chats"),
  },
  {
    icon: <DocsIcon />,
    name: "Text Generator",
    path: withDashboardBase("/text-generator"),
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [
      { name: "Form Elements", path: withDashboardBase("/form-elements"), pro: false },
    ],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [
      { name: "Basic Tables", path: withDashboardBase("/basic-tables"), pro: false },
    ],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: withDashboardBase("/blank"), pro: false },
      { name: "404 Error", path: withDashboardBase("/error-404"), pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: withDashboardBase("/line-chart"), pro: false },
      { name: "Bar Chart", path: withDashboardBase("/bar-chart"), pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: withDashboardBase("/alerts"), pro: false },
      { name: "Avatar", path: withDashboardBase("/avatars"), pro: false },
      { name: "Badge", path: withDashboardBase("/badge"), pro: false },
      { name: "Buttons", path: withDashboardBase("/buttons"), pro: false },
      { name: "Images", path: withDashboardBase("/images"), pro: false },
      { name: "Videos", path: withDashboardBase("/videos"), pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: withDashboardBase("/signin"), pro: false },
      { name: "Sign Up", path: withDashboardBase("/signup"), pro: false },
    ],
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const isExpanded = useSidebarStore((state) => state.isExpanded);
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
  const isHovered = useSidebarStore((state) => state.isHovered);
  const setIsHovered = useSidebarStore((state) => state.setIsHovered);
  const [openSubmenu, setOpenSubmenu] = useState<OpenSubmenuState | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let hasMatch = false;

    for (const [menuType, items] of [
      ["main", navItems],
      ["others", othersItems],
    ] as const) {
      for (const [index, item] of items.entries()) {
        if (!item.subItems) {
          continue;
        }

        if (item.subItems.some((subItem) => isActive(subItem.path))) {
          setOpenSubmenu({ type: menuType, index });
          hasMatch = true;
          break;
        }
      }
    }

    if (!hasMatch) {
      setOpenSubmenu(null);
    }
  }, [isActive]);

  useEffect(() => {
    if (!openSubmenu) {
      return;
    }

    const key = `${openSubmenu.type}-${openSubmenu.index}`;
    const submenuRef = subMenuRefs.current[key];

    if (!submenuRef) {
      return;
    }

    setSubMenuHeight((prev) => ({
      ...prev,
      [key]: submenuRef.scrollHeight,
    }));
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((currentOpenSubmenu) => {
      if (
        currentOpenSubmenu &&
        currentOpenSubmenu.type === menuType &&
        currentOpenSubmenu.index === index
      ) {
        return null;
      }

      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => (
        <li key={item.name}>
          {item.subItems ? (
            <button
              className={`menu-item group cursor-pointer ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"} ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
              onClick={() => handleSubmenuToggle(index, menuType)}
              type="button"
            >
              <span
                className={`${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}
              >
                {item.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{item.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto h-5 w-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""}`}
                />
              )}
            </button>
          ) : (
            item.path && (
              <Link
                className={`menu-item group ${isActive(item.path) ? "menu-item-active" : "menu-item-inactive"}`}
                href={item.path}
              >
                <span
                  className={`${isActive(item.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}
                >
                  {item.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{item.name}</span>
                )}
              </Link>
            )
          )}
          {item.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              className="overflow-hidden transition-all duration-300"
              ref={(element) => {
                subMenuRefs.current[`${menuType}-${index}`] = element;
              }}
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`] || 0}px`
                    : "0px",
              }}
            >
              <ul className="ml-9 mt-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      className={`menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                      href={subItem.path}
                    >
                      {subItem.name}
                      <span className="ml-auto flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`menu-dropdown-badge ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"}`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`menu-dropdown-badge ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"}`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:mt-0 ${(isExpanded || isMobileOpen || isHovered) ? "w-[290px]" : "w-[90px]"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => {
        if (!isExpanded) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex py-8 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href={withDashboardBase("/")}>
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                alt="Logo"
                className="dark:hidden"
                height={40}
                src="/images/logo/logo.svg"
                width={150}
              />
              <Image
                alt="Logo"
                className="hidden dark:block"
                height={40}
                src="/images/logo/logo-dark.svg"
                width={150}
              />
            </>
          ) : (
            <Image
              alt="Logo"
              height={32}
              src="/images/logo/logo-icon.svg"
              width={32}
            />
          )}
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs uppercase leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div>
              <h2
                className={`mb-4 flex text-xs uppercase leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Others" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;
