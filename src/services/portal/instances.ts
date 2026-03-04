import { deleteJson, getJson, patchJson, postJson } from "@/services/http/client";
import type {
  CreatePortalInstancePayload,
  DeletePortalInstanceResponse,
  PortalData,
  PortalInstance,
  UpdatePortalInstancePayload,
  UpdatePortalTableLabelPayload,
  UpdatePortalTableLabelResponse,
} from "@/services/portal/types";

export function fetchPortalInstances() {
  return getJson<PortalData>("/api/portal/instances", {
    cache: "no-store",
  });
}

export function createPortalInstance(payload: CreatePortalInstancePayload) {
  return postJson<CreatePortalInstancePayload, PortalInstance>(
    "/api/portal/instances",
    payload,
  );
}

export function updatePortalInstance(id: string, payload: UpdatePortalInstancePayload) {
  return patchJson<UpdatePortalInstancePayload, PortalInstance>(
    `/api/portal/instances/${id}`,
    payload,
  );
}

export function deletePortalInstance(id: string) {
  return deleteJson<DeletePortalInstanceResponse>(`/api/portal/instances/${id}`);
}

export function updatePortalTableLabel(
  instanceId: string,
  position: number,
  payload: UpdatePortalTableLabelPayload,
) {
  return patchJson<UpdatePortalTableLabelPayload, UpdatePortalTableLabelResponse>(
    `/api/portal/instances/${instanceId}/tables/${position}`,
    payload,
  );
}
