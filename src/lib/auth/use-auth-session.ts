"use client";

import { useSession } from "next-auth/react";
import { parseAuthUserFromSessionUser } from "@/lib/auth/session-user";

export function useAuthSession() {
  const sessionState = useSession();
  const user = parseAuthUserFromSessionUser(sessionState.data?.user);

  return {
    user,
    isLoading: sessionState.status === "loading",
    isAuthenticated: sessionState.status === "authenticated",
  };
}
