import { hashSync } from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { findUniqueUserMock } = vi.hoisted(() => ({
  findUniqueUserMock: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    user: {
      findUnique: findUniqueUserMock,
    },
  },
}));

import { authOptions } from "@/lib/auth/auth-options";

function getCredentialsAuthorize() {
  const provider = authOptions.providers?.find((item) => item.id === "credentials");
  if (!provider || typeof provider !== "object") {
    throw new Error("credentials provider not found");
  }

  const authorizeFromOptions =
    "options" in provider &&
    provider.options &&
    typeof provider.options === "object" &&
    "authorize" in provider.options
      ? provider.options.authorize
      : undefined;

  const authorize =
    typeof authorizeFromOptions === "function"
      ? authorizeFromOptions
      : "authorize" in provider && typeof provider.authorize === "function"
        ? provider.authorize
        : null;

  if (!authorize) {
    throw new Error("credentials authorize is not configured");
  }

  return authorize as (credentials: unknown) => Promise<unknown>;
}

describe("auth-options credentials", () => {
  beforeEach(() => {
    findUniqueUserMock.mockReset();
  });

  it("authorizes valid credentials", async () => {
    const authorize = getCredentialsAuthorize();
    findUniqueUserMock.mockResolvedValueOnce({
      id: "usr_1",
      email: "admin@sipos.local",
      fullName: "Admin SIPOS",
      role: { code: "admin" },
      isActive: true,
      passwordHash: hashSync("admin123", 10),
    });

    const user = await authorize({
      identifier: "admin@sipos.local",
      password: "admin123",
    });

    expect(user).toEqual({
      id: "usr_1",
      email: "admin@sipos.local",
      role: "admin",
      name: "Admin SIPOS",
      workspaceCode: "main",
    });
  });

  it("rejects invalid password", async () => {
    const authorize = getCredentialsAuthorize();
    findUniqueUserMock.mockResolvedValueOnce({
      id: "usr_1",
      email: "admin@sipos.local",
      fullName: "Admin SIPOS",
      role: { code: "admin" },
      isActive: true,
      passwordHash: hashSync("valid-password", 10),
    });

    const user = await authorize({
      identifier: "admin@sipos.local",
      password: "wrong-password",
    });

    expect(user).toBeNull();
  });

  it("rejects user with unknown role", async () => {
    const authorize = getCredentialsAuthorize();
    findUniqueUserMock.mockResolvedValueOnce({
      id: "usr_1",
      email: "admin@sipos.local",
      fullName: "Admin SIPOS",
      role: { code: "superadmin" },
      isActive: true,
      passwordHash: hashSync("valid-password", 10),
    });

    const user = await authorize({
      identifier: "admin@sipos.local",
      password: "valid-password",
    });

    expect(user).toBeNull();
  });
});

describe("auth-options callbacks", () => {
  it("stores custom fields on jwt and session", async () => {
    const callbacks = authOptions.callbacks;
    if (!callbacks?.jwt || !callbacks.session) {
      throw new Error("callbacks not configured");
    }

    const token = await callbacks.jwt({
      token: {},
      user: {
        id: "usr_2",
        email: "manager@demo.sipos.local",
        role: "fnb_manager",
        name: "FnB Manager Demo",
        workspaceCode: "main",
      } as never,
      account: null,
      profile: undefined,
      trigger: "signIn",
      isNewUser: false,
    });

    const session = await callbacks.session(
      {
        session: {
          expires: "2099-01-01T00:00:00.000Z",
          user: {
            name: "",
            email: null,
            image: null,
          },
        },
        token,
      } as never,
    );

    expect(token).toMatchObject({
      id: "usr_2",
      email: "manager@demo.sipos.local",
      role: "fnb_manager",
      name: "FnB Manager Demo",
      workspaceCode: "main",
    });
    expect(session.user).toMatchObject({
      id: "usr_2",
      email: "manager@demo.sipos.local",
      role: "fnb_manager",
      name: "FnB Manager Demo",
      workspaceCode: "main",
    });
  });
});
