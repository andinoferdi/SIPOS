import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  Plus,
  Settings,
  Store,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DashboardNavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface DashboardShellProps {
  activePath: string;
  children: ReactNode;
  primaryActionLabel?: string;
  sidePanel?: ReactNode;
  subtitle: string;
  title: string;
}

interface SidebarItemProps {
  activePath: string;
  item: DashboardNavItem;
}

const topNavItems: DashboardNavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/Transactions/sales", icon: ClipboardList, label: "Orders" },
  { href: "/dashboard/master/inventories", icon: Boxes, label: "Inventory" },
  { href: "/dashboard/Transactions/stock-management", icon: BarChart3, label: "Reports" },
];

const bottomNavItems: DashboardNavItem[] = [
  { href: "/dashboard/master", icon: Settings, label: "Master" },
];

const isActive = (activePath: string, href: string) => {
  return activePath === href || activePath.startsWith(`${href}/`);
};

const SidebarItem = ({ activePath, item }: SidebarItemProps) => {
  const Icon = item.icon;
  const itemIsActive = isActive(activePath, item.href);

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
        itemIsActive
          ? "bg-dashboard-accent/15 text-dashboard-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {itemIsActive ? <span className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-dashboard-accent" /> : null}
      <Icon className="h-5 w-5" />
      <span className="hidden lg:inline">{item.label}</span>
    </Link>
  );
};

export const DashboardShell = ({
  activePath,
  children,
  primaryActionLabel,
  sidePanel,
  subtitle,
  title,
}: DashboardShellProps) => {
  return (
    <div className="min-h-screen bg-dashboard-canvas text-foreground">
      <div className="flex min-h-screen">
        <aside className="flex h-screen w-20 flex-col justify-between border-r border-border bg-dashboard-sidebar px-3 py-4 lg:w-72 lg:px-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dashboard-accent text-dashboard-accent-foreground shadow-lg shadow-dashboard-accent/30">
                <Store className="h-6 w-6" />
              </div>
              <div className="hidden lg:block">
                <p className="text-xl font-extrabold tracking-tight text-foreground">SIKASIR</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Vibrant POS</p>
              </div>
            </div>

            <nav className="space-y-2">
              {topNavItems.map((item) => (
                <SidebarItem key={item.href} activePath={activePath} item={item} />
              ))}
            </nav>
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            {bottomNavItems.map((item) => (
              <SidebarItem key={item.href} activePath={activePath} item={item} />
            ))}

            <div className="mt-3 flex items-center gap-3 rounded-xl px-2 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <User className="h-5 w-5" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-bold text-foreground">Alex M.</p>
                <p className="text-xs text-muted-foreground">Manager</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 lg:py-8">
          <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{title}</h1>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
              </button>

              {primaryActionLabel ? (
                <button
                  type="button"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-dashboard-accent px-5 text-sm font-bold text-dashboard-accent-foreground shadow-md shadow-dashboard-accent/30 transition hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  {primaryActionLabel}
                </button>
              ) : null}
            </div>
          </header>

          <div className={cn("grid gap-6", sidePanel ? "xl:grid-cols-[minmax(0,1fr)_22rem]" : "")}>
            <div>{children}</div>
            {sidePanel ? <div className="hidden xl:block">{sidePanel}</div> : null}
          </div>
        </main>
      </div>
    </div>
  );
};
