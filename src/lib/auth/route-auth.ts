import "server-only";

import { getServerSession } from "next-auth";
import type { AuthUser } from "@/types/auth";
import { authOptions } from "@/lib/auth/auth-options";
import { parseAuthUserFromSessionUser } from "@/lib/auth/session-user";

export async function getRouteAuthUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions);
  return parseAuthUserFromSessionUser(session?.user);
}

