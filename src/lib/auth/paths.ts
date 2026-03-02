import type { AuthRole } from "@/types/auth";

export function getDashboardPathByRole(_role: AuthRole) {
  return "/portal";
}
