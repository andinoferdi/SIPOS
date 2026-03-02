import { redirect } from "next/navigation";
import { requireServerAuthUser } from "@/lib/auth/server";

export default async function DashboardHomePage() {
  await requireServerAuthUser();
  redirect("/portal");
}
