import { describe, expect, it } from "vitest";
import { authValidation } from "@/lib/validations/auth.schema";

describe("authValidation", () => {
  it("validates a correct login payload", () => {
    const result = authValidation.login.safeParse({
      email: "test@example.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid login payload", () => {
    const result = authValidation.login.safeParse({
      email: "not-an-email",
      password: "123",
    });

    expect(result.success).toBe(false);
  });
});
