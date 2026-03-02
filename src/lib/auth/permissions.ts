import type { AuthRole, AuthUser } from "@/types/auth";
import type { PermissionKey } from "@/types/rbac";

const ROLE_PERMISSIONS: Record<AuthRole, readonly PermissionKey[]> = {
  admin: [
    "dashboard_pos:read",
    "sales:create",
    "sales:read",
    "sales:update",
    "sales:delete",
    "sales:print",
    "sales:export",
    "sales_approval:read",
    "sales_approval:approve",
    "purchase:create",
    "purchase:read",
    "purchase:update",
    "purchase:delete",
    "purchase:approve",
    "purchase:print",
    "purchase:export",
    "stock_management:create",
    "stock_management:read",
    "stock_management:update",
    "stock_management:delete",
    "stock_management:export",
    "inventory:create",
    "inventory:read",
    "inventory:update",
    "inventory:delete",
    "inventory:export",
    "category:create",
    "category:read",
    "category:update",
    "category:delete",
    "category:export",
    "reports:read",
    "reports:print",
    "reports:export",
    "user_role:create",
    "user_role:read",
    "user_role:update",
    "user_role:delete",
    "settings:create",
    "settings:read",
    "settings:update",
    "settings:delete",
    "settings:export",
    "pos_instance:create",
    "pos_instance:read",
    "pos_instance:update",
    "pos_instance:delete",
  ],
  fnb: [
    "dashboard_pos:read",
    "sales:create",
    "sales:read",
    "sales:print",
    "pos_instance:read",
  ],
  fnb_manager: [
    "dashboard_pos:read",
    "sales:create",
    "sales:read",
    "sales:update",
    "sales:delete",
    "sales:print",
    "sales:export",
    "sales_approval:read",
    "sales_approval:approve",
    "purchase:create",
    "purchase:read",
    "purchase:update",
    "purchase:delete",
    "purchase:approve",
    "purchase:print",
    "purchase:export",
    "stock_management:create",
    "stock_management:read",
    "stock_management:update",
    "stock_management:delete",
    "stock_management:export",
    "inventory:read",
    "category:read",
    "reports:read",
    "reports:print",
    "reports:export",
    "pos_instance:read",
  ],
  host: [
    "dashboard_pos:read",
    "sales:create",
    "sales:read",
    "sales:print",
    "pos_instance:read",
  ],
};

export function hasPermission(role: AuthRole, permission: PermissionKey) {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function requirePermission(user: AuthUser, permission: PermissionKey) {
  return hasPermission(user.role, permission);
}

export function isAdmin(user: AuthUser) {
  return user.role === "admin";
}

