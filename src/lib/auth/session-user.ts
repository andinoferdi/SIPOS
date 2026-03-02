import type { Session } from "next-auth";
import type { AuthRole, AuthUser } from "@/types/auth";

export function toAuthRole(value: unknown): AuthRole | null {
  if (
    value === "admin" ||
    value === "fnb" ||
    value === "fnb_manager" ||
    value === "host"
  ) {
    return value;
  }
  return null;
}

export function parseAuthUserFromSessionUser(
  user: Session["user"] | null | undefined,
): AuthUser | null {
  if (!user) {
    return null;
  }

  const role = toAuthRole(user.role);
  if (!role) {
    return null;
  }

  if (
    typeof user.id !== "string" ||
    user.id.length === 0 ||
    typeof user.email !== "string" ||
    user.email.length === 0
  ) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role,
    name: typeof user.name === "string" ? user.name : "",
    workspaceCode:
      typeof user.workspaceCode === "string" && user.workspaceCode.length > 0
        ? user.workspaceCode
        : "main",
  };
}
