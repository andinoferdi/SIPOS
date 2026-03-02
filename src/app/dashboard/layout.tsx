import type { ReactNode } from "react";
import DashboardShell from "@/app/dashboard/components/layout/dashboard-shell";
import { requireServerAuthUser } from "@/lib/auth/server";

type DashboardGroupLayoutProps = {
  children: ReactNode;
};

export default async function DashboardGroupLayout({
  children,
}: DashboardGroupLayoutProps) {
  const sessionUser = await requireServerAuthUser();

  return (
    <DashboardShell session={sessionUser}>{children}</DashboardShell>
  );
}
