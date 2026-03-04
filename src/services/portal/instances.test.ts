import { beforeEach, describe, expect, it, vi } from "vitest";

const { getJsonMock, postJsonMock, patchJsonMock, deleteJsonMock } = vi.hoisted(() => ({
  getJsonMock: vi.fn(),
  postJsonMock: vi.fn(),
  patchJsonMock: vi.fn(),
  deleteJsonMock: vi.fn(),
}));

vi.mock("@/services/http/client", () => ({
  getJson: getJsonMock,
  postJson: postJsonMock,
  patchJson: patchJsonMock,
  deleteJson: deleteJsonMock,
}));

import {
  createPortalInstance,
  deletePortalInstance,
  fetchPortalInstances,
  updatePortalInstance,
  updatePortalTableLabel,
} from "@/services/portal/instances";

describe("services/portal/instances", () => {
  beforeEach(() => {
    getJsonMock.mockReset();
    postJsonMock.mockReset();
    patchJsonMock.mockReset();
    deleteJsonMock.mockReset();
  });

  it("requests portal list with no-store cache", async () => {
    getJsonMock.mockResolvedValueOnce({ workspace: { id: "1", code: "main", name: "Main" }, items: [] });

    await fetchPortalInstances();

    expect(getJsonMock).toHaveBeenCalledWith("/api/portal/instances", {
      cache: "no-store",
    });
  });

  it("posts create payload to portal endpoint", async () => {
    const payload = { name: "Main Floor", type: "TABLE_SERVICE" as const, total_table: 20 };

    await createPortalInstance(payload);

    expect(postJsonMock).toHaveBeenCalledWith("/api/portal/instances", payload);
  });

  it("patches update payload to portal instance endpoint", async () => {
    const payload = { name: "Renamed" };

    await updatePortalInstance("instance-1", payload);

    expect(patchJsonMock).toHaveBeenCalledWith("/api/portal/instances/instance-1", payload);
  });

  it("deletes portal instance by id", async () => {
    await deletePortalInstance("instance-1");

    expect(deleteJsonMock).toHaveBeenCalledWith("/api/portal/instances/instance-1");
  });

  it("patches table label payload to table endpoint", async () => {
    const payload = { label: "a-01" };

    await updatePortalTableLabel("instance-1", 2, payload);

    expect(patchJsonMock).toHaveBeenCalledWith("/api/portal/instances/instance-1/tables/2", payload);
  });
});
