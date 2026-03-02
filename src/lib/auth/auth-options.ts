import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { verifyPasswordHash } from "@/lib/auth/password";
import { toAuthRole } from "@/lib/auth/session-user";

const credentialsSchema = z.object({
  identifier: z.string().trim().min(1),
  password: z.string().min(1),
});

const DEFAULT_WORKSPACE_CODE = "main";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) {
          return null;
        }

        const email = parsed.data.identifier.trim().toLowerCase();
        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            role: true,
          },
        });

        if (!user || !user.isActive) {
          return null;
        }

        const normalizedRole = toAuthRole(user.role.code);
        if (!normalizedRole) {
          return null;
        }

        const isValidPassword = await verifyPasswordHash({
          password: parsed.data.password,
          expectedHash: user.passwordHash,
        });

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: normalizedRole,
          name: user.fullName,
          workspaceCode: DEFAULT_WORKSPACE_CODE,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.workspaceCode = user.workspaceCode;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const role = toAuthRole(token.role);
        if (typeof token.id === "string") {
          session.user.id = token.id;
        }
        if (typeof token.email === "string") {
          session.user.email = token.email;
        }
        if (role) {
          session.user.role = role;
        }
        if (typeof token.name === "string") {
          session.user.name = token.name;
        }
        if (typeof token.workspaceCode === "string") {
          session.user.workspaceCode = token.workspaceCode;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
};

