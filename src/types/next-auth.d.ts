import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      email?: string;
      role?: "admin" | "fnb" | "fnb_manager" | "host";
      workspaceCode?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    role: "admin" | "fnb" | "fnb_manager" | "host";
    name: string;
    workspaceCode: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    role?: "admin" | "fnb" | "fnb_manager" | "host";
    name?: string;
    workspaceCode?: string;
  }
}
