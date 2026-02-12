import type { PermissionKey, RoleCode } from "@/types/rbac";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      roleCodes: RoleCode[];
      permissions: PermissionKey[];
      activeWorkspaceId: string | null;
    };
  }

  interface User {
    id: string;
    roleCodes?: RoleCode[];
    permissions?: PermissionKey[];
    activeWorkspaceId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roleCodes?: RoleCode[];
    permissions?: PermissionKey[];
    activeWorkspaceId?: string | null;
  }
}
