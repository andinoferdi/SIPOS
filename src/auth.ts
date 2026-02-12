import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { authValidation } from "@/features/auth/schemas/auth.schema";
import { verifyPassword } from "@/lib/auth/password";
import { resolvePermissionsFromRoles } from "@/lib/auth/rbac";
import { prisma } from "@/lib/db/prisma";
import type { PermissionKey, RoleCode } from "@/types/rbac";

const providers: Provider[] = [
  Credentials({
    name: "Staff Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const parsedCredentials = authValidation.login.safeParse(credentials);

      if (!parsedCredentials.success) {
        return null;
      }

      const email = parsedCredentials.data.email.trim().toLowerCase();
      const password = parsedCredentials.data.password;

      const staffUser = await prisma.staffUser.findUnique({
        where: { email },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!staffUser || !staffUser.isActive) {
        return null;
      }

      if (!verifyPassword(password, staffUser.passwordHash)) {
        return null;
      }

      const roleCodes = staffUser.userRoles.map(
        (userRole) => userRole.role.code as RoleCode
      );
      const activeWorkspaceId = staffUser.userRoles[0]?.workspaceId ?? null;
      const permissions = resolvePermissionsFromRoles(roleCodes);

      return {
        id: staffUser.id,
        name: staffUser.fullName,
        email: staffUser.email,
        roleCodes,
        permissions,
        activeWorkspaceId,
      };
    },
  }),
];

if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roleCodes = user.roleCodes ?? [];
        token.permissions = user.permissions ?? [];
        token.activeWorkspaceId = user.activeWorkspaceId ?? null;
      }

      if (!token.roleCodes && token.sub) {
        const userRoles = await prisma.userRole.findMany({
          where: { userId: token.sub },
          include: { role: true },
        });

        const roleCodes = userRoles.map(
          (userRole) => userRole.role.code as RoleCode
        );

        token.roleCodes = roleCodes;
        token.permissions = resolvePermissionsFromRoles(roleCodes);
        token.activeWorkspaceId = userRoles[0]?.workspaceId ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }

      session.user.id = token.sub ?? "";
      session.user.roleCodes = (token.roleCodes as RoleCode[] | undefined) ?? [];
      session.user.permissions =
        (token.permissions as PermissionKey[] | undefined) ?? [];
      session.user.activeWorkspaceId =
        (token.activeWorkspaceId as string | null | undefined) ?? null;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
