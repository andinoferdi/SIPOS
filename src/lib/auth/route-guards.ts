import { auth } from "@/auth";
import { hasAnyRole, hasPermission } from "@/lib/auth/rbac";
import type { PermissionKey, RoleCode } from "@/types/rbac";
import { NextResponse } from "next/server";

export type GuardResult = {
  response: NextResponse | null;
};

const buildUnauthorizedResponse = () => {
  return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
};

const buildForbiddenResponse = (
  requiredPermission: PermissionKey | RoleCode[],
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

export const requirePermission = async (
  permissionKey: PermissionKey
): Promise<GuardResult> => {
  const session = await auth();

  if (!session?.user?.id) {
    return { response: buildUnauthorizedResponse() };
  }

  const roleCodes = session.user.roleCodes ?? [];
  if (!hasPermission(roleCodes, permissionKey)) {
    return {
      response: buildForbiddenResponse(permissionKey, roleCodes),
    };
  }

  return { response: null };
};

export const requireAnyRole = async (
  allowedRoles: RoleCode[]
): Promise<GuardResult> => {
  const session = await auth();

  if (!session?.user?.id) {
    return { response: buildUnauthorizedResponse() };
  }

  const roleCodes = session.user.roleCodes ?? [];
  if (!hasAnyRole(roleCodes, allowedRoles)) {
    return {
      response: buildForbiddenResponse(allowedRoles, roleCodes),
    };
  }

  return { response: null };
};

export const isGuardBlocked = (
  result: GuardResult
): result is { response: NextResponse } => {
  return result.response !== null;
};
