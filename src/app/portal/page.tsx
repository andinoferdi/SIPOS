import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PortalClient from "@/app/portal/components/portal-client";
import { requireServerAuthUser } from "@/lib/auth/server";
import { requirePermission } from "@/lib/auth/permissions";

export const metadata: Metadata = {
  title: "Portal POS",
};

export default async function PortalPage() {
  const user = await requireServerAuthUser();

  if (!requirePermission(user, "pos_instance:read")) {
    redirect("/login");
  }

  return <PortalClient session={user} />;
}

