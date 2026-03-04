import "server-only";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth-options";
import type { AuthUser } from "@/types/auth";
import { parseAuthUserFromSessionUser } from "@/lib/auth/session-user";

export async function getServerAuthUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions);
  return parseAuthUserFromSessionUser(session?.user);
}

export async function requireServerAuthUser() {
  const user = await getServerAuthUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

