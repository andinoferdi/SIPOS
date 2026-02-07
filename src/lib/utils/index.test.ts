import { describe, expect, it } from "vitest";
import { errorHandler, getMostRecentUserMessage } from "@/lib/utils";

describe("errorHandler", () => {
  it("returns a fallback for null", () => {
    expect(errorHandler(null)).toBe("unknown error");
  });

  it("returns string errors as-is", () => {
    expect(errorHandler("failed")).toBe("failed");
  });

  it("returns message from Error instance", () => {
    expect(errorHandler(new Error("boom"))).toBe("boom");
  });
});

describe("getMostRecentUserMessage", () => {
  it("returns the latest user message", () => {
    const message = getMostRecentUserMessage([
      { id: "1", role: "assistant", parts: [] },
      { id: "2", role: "user", parts: [] },
      { id: "3", role: "user", parts: [] },
    ]);

    expect(message?.id).toBe("3");
  });
});
