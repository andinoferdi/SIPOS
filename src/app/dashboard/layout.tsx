import type { ReactNode } from "react";
import type { Metadata } from "next";
import DashboardShell from "@/app/dashboard/components/layout/dashboard-shell";
import { requireServerAuthUser } from "@/lib/auth/server";

type DashboardGroupLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardGroupLayout({
  children,
}: DashboardGroupLayoutProps) {
  const sessionUser = await requireServerAuthUser();

  return (
    <DashboardShell session={sessionUser}>{children}</DashboardShell>
  );
}
