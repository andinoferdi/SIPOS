import { afterEach, describe, expect, it, vi } from "vitest";
import { deleteJson, getJson, patchJson, postJson, requestJson } from "@/services/http/client";
import { ServiceHttpError } from "@/services/http/errors";

function mockResponse(params: {
  ok: boolean;
  status: number;
  body?: string;
}): Response {
  return {
    ok: params.ok,
    status: params.status,
    text: vi.fn().mockResolvedValue(params.body ?? ""),
  } as unknown as Response;
}

describe("services/http/client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed data when envelope is success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      mockResponse({
        ok: true,
        status: 200,
        body: JSON.stringify({ ok: true, data: { id: "one" } }),
      }),
    );

    const result = await requestJson<{ id: string }>("/api/test");

    expect(result).toEqual({ id: "one" });
  });

  it("throws mapped ServiceHttpError when envelope is failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      mockResponse({
        ok: false,
        status: 400,
        body: JSON.stringify({
          ok: false,
          error: "invalid_payload",
          fieldErrors: { name: ["required"] },
        }),
      }),
    );

    await expect(requestJson("/api/test")).rejects.toMatchObject({
      name: "ServiceHttpError",
      code: "invalid_payload",
      status: 400,
      fieldErrors: { name: ["required"] },
    });
  });

  it("throws invalid_response for non-json payload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      mockResponse({
        ok: true,
        status: 200,
        body: "<html>invalid</html>",
      }),
    );

    await expect(requestJson("/api/test")).rejects.toMatchObject({
      name: "ServiceHttpError",
      code: "invalid_response",
    });
  });

  it("throws invalid_response_shape for malformed envelope", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      mockResponse({
        ok: true,
        status: 200,
        body: JSON.stringify({ status: "ok", data: {} }),
      }),
    );

    await expect(requestJson("/api/test")).rejects.toMatchObject({
      name: "ServiceHttpError",
      code: "invalid_response_shape",
    });
  });

  it("throws network_error when fetch rejects", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("network down"));

    const promise = requestJson("/api/test");
    await expect(promise).rejects.toBeInstanceOf(ServiceHttpError);
    await expect(promise).rejects.toMatchObject({
      code: "network_error",
    });
  });

  it("returns undefined on 204", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      mockResponse({
        ok: true,
        status: 204,
      }),
    );

    const result = await requestJson<undefined>("/api/test");
    expect(result).toBeUndefined();
  });

  it("sends method and body helpers correctly", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        mockResponse({
          ok: true,
          status: 200,
          body: JSON.stringify({ ok: true, data: { success: true } }),
        }),
      );

    await getJson("/api/get");
    await postJson("/api/post", { x: 1 });
    await patchJson("/api/patch", { y: 2 });
    await deleteJson("/api/delete");

    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/get", expect.objectContaining({ method: "GET" }));
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/post",
      expect.objectContaining({ method: "POST", body: JSON.stringify({ x: 1 }) }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      "/api/patch",
      expect.objectContaining({ method: "PATCH", body: JSON.stringify({ y: 2 }) }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(4, "/api/delete", expect.objectContaining({ method: "DELETE" }));
  });
});
