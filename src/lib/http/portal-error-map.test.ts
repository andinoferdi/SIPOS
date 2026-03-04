import { describe, expect, it } from "vitest";
import { mapPortalErrorCode } from "@/lib/http/portal-error-map";

describe("portal-error-map", () => {
  it("maps known conflict errors to HTTP 409", () => {
    expect(mapPortalErrorCode("duplicate_name")).toEqual({
      error: "duplicate_name",
      status: 409,
    });
    expect(mapPortalErrorCode("duplicate_table_label")).toEqual({
      error: "duplicate_table_label",
      status: 409,
    });
    expect(mapPortalErrorCode("conflict")).toEqual({
      error: "conflict",
      status: 409,
    });
  });

  it("maps known authorization and not found errors", () => {
    expect(mapPortalErrorCode("forbidden")).toEqual({
      error: "forbidden",
      status: 403,
    });
    expect(mapPortalErrorCode("workspace_not_found")).toEqual({
      error: "workspace_not_found",
      status: 404,
    });
    expect(mapPortalErrorCode("instance_not_found")).toEqual({
      error: "instance_not_found",
      status: 404,
    });
  });

  it("maps unknown errors to internal_error", () => {
    expect(mapPortalErrorCode("unexpected_error_code")).toEqual({
      error: "internal_error",
      status: 500,
    });
  });
});
