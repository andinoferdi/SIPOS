import { describe, expect, it } from "vitest";
import { hashSync } from "bcryptjs";
import { randomBytes, scryptSync } from "node:crypto";
import { verifyPasswordHash } from "@/lib/auth/password";

describe("auth-password", () => {
  it("verifies bcrypt hash", async () => {
    const expectedHash = hashSync("admin123", 10);
    const isValid = await verifyPasswordHash({
      password: "admin123",
      expectedHash,
    });

    expect(isValid).toBe(true);
  });

  it("rejects invalid bcrypt password", async () => {
    const expectedHash = hashSync("admin123", 10);
    const isValid = await verifyPasswordHash({
      password: "wrong-password",
      expectedHash,
    });

    expect(isValid).toBe(false);
  });

  it("verifies scrypt hash format", async () => {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync("demo123", salt, 64).toString("hex");
    const expectedHash = `scrypt$${salt}$${hash}`;

    const isValid = await verifyPasswordHash({
      password: "demo123",
      expectedHash,
    });

    expect(isValid).toBe(true);
  });
});
