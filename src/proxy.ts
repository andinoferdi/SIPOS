import { auth } from "@/auth";
import { hasAnyRole, hasPermission } from "@/lib/auth/rbac";
import type { PermissionKey, RoleCode } from "@/types/rbac";
import { NextResponse } from "next/server";

const DASHBOARD_RULES: Array<{ prefix: string; permission: PermissionKey }> = [
  { prefix: "/dashboard/pos/sales", permission: "sales:read" },
  { prefix: "/dashboard/pos/approval", permission: "sales_approval:read" },
  { prefix: "/dashboard/pos/purchase", permission: "purchase:read" },
  { prefix: "/dashboard/pos/stock", permission: "stock_management:read" },
  { prefix: "/dashboard/portal/inventory", permission: "inventory:read" },
  { prefix: "/dashboard/portal/categories", permission: "category:read" },
  { prefix: "/dashboard/portal/reports", permission: "reports:read" },
  { prefix: "/dashboard/admin/rbac", permission: "user_role:read" },
  { prefix: "/dashboard", permission: "dashboard_pos:read" },
];

const ADMIN_ONLY_ROLES: RoleCode[] = ["admin"];

const resolveDashboardPermission = (
  pathname: string
): PermissionKey | null => {
  const match = DASHBOARD_RULES.find((rule) =>
    pathname.startsWith(rule.prefix)
  );

  return match?.permission ?? null;
};

const resolveApiPermission = (
  pathname: string,
  method: string
): PermissionKey | null => {
  if (pathname.startsWith("/api/portal/rbac")) {
    return "user_role:read";
  }

  if (pathname === "/api/pos/sales/export" && method === "GET") {
    return "sales:export";
  }

  if (
    /^\/api\/pos\/sales\/[^/]+\/approve$/.test(pathname) &&
    method === "POST"
  ) {
    return "sales_approval:approve";
  }

  if (/^\/api\/pos\/sales\/[^/]+\/print$/.test(pathname) && method === "POST") {
    return "sales:print";
  }

  if (/^\/api\/pos\/sales\/[^/]+$/.test(pathname)) {
    if (method === "GET") return "sales:read";
    if (method === "PUT") return "sales:update";
    if (method === "DELETE") return "sales:delete";
  }

  if (pathname === "/api/pos/sales") {
    if (method === "GET") return "sales:read";
    if (method === "POST") return "sales:create";
  }

  if (
    /^\/api\/pos\/purchases\/[^/]+\/approve$/.test(pathname) &&
    method === "POST"
  ) {
    return "purchase:approve";
  }

  if (/^\/api\/pos\/purchases\/[^/]+$/.test(pathname)) {
    if (method === "GET") return "purchase:read";
    if (method === "PUT") return "purchase:update";
    if (method === "DELETE") return "purchase:delete";
  }

  if (pathname === "/api/pos/purchases") {
    if (method === "GET") return "purchase:read";
    if (method === "POST") return "purchase:create";
  }

  if (/^\/api\/pos\/stock-movements\/[^/]+$/.test(pathname)) {
    if (method === "PUT") return "stock_management:update";
    if (method === "DELETE") return "stock_management:delete";
  }

  if (pathname === "/api/pos/stock-movements") {
    if (method === "GET") return "stock_management:read";
    if (method === "POST") return "stock_management:create";
  }

  if (/^\/api\/portal\/inventory\/[^/]+$/.test(pathname)) {
    if (method === "PUT") return "inventory:update";
    if (method === "DELETE") return "inventory:delete";
  }

  if (pathname === "/api/portal/inventory") {
    if (method === "GET") return "inventory:read";
    if (method === "POST") return "inventory:create";
  }

  if (/^\/api\/portal\/categories\/[^/]+$/.test(pathname)) {
    if (method === "PUT") return "category:update";
    if (method === "DELETE") return "category:delete";
  }

  if (pathname === "/api/portal/categories") {
    if (method === "GET") return "category:read";
    if (method === "POST") return "category:create";
  }

  if (pathname === "/api/portal/reports/export" && method === "GET") {
    return "reports:export";
  }

  if (pathname === "/api/portal/reports" && method === "GET") {
    return "reports:read";
  }

  return null;
};

const buildApiForbiddenResponse = (
  requiredPermission: PermissionKey,
  roleCodes: RoleCode[]
) => {
  return NextResponse.json(
    {
      message: "Forbidden",
      required_permission: requiredPermission,
      role: roleCodes,
    },
    { status: 403 }
  );
};

export const proxy = auth((request) => {
  const pathname = request.nextUrl.pathname;
  const session = request.auth;
  const roleCodes = (session?.user?.roleCodes ?? []) as RoleCode[];

  if (pathname.startsWith("/dashboard")) {
    if (!session?.user?.id) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname === "/dashboard/forbidden") {
      return NextResponse.next();
    }

    const requiredPermission = resolveDashboardPermission(pathname);

    if (requiredPermission && !hasPermission(roleCodes, requiredPermission)) {
      return NextResponse.redirect(new URL("/dashboard/forbidden", request.url));
    }

    if (!requiredPermission && !hasAnyRole(roleCodes, ADMIN_ONLY_ROLES)) {
      return NextResponse.redirect(new URL("/dashboard/forbidden", request.url));
    }
  }

  if (pathname.startsWith("/api")) {
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (pathname === "/api/chat" && !hasAnyRole(roleCodes, ADMIN_ONLY_ROLES)) {
      return NextResponse.json(
        {
          message: "Forbidden",
          required_permission: "admin",
          role: roleCodes,
        },
        { status: 403 }
      );
    }

    const requiredPermission = resolveApiPermission(pathname, request.method);
    if (requiredPermission && !hasPermission(roleCodes, requiredPermission)) {
      return buildApiForbiddenResponse(requiredPermission, roleCodes);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/chat", "/api/pos/:path*", "/api/portal/:path*"],
};
