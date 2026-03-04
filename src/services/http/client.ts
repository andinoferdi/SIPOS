import { ServiceHttpError } from "@/services/http/errors";
import type { ApiEnvelope, ApiFailure } from "@/services/http/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseEnvelope<T>(payload: unknown): ApiEnvelope<T> {
  if (!isRecord(payload) || typeof payload.ok !== "boolean") {
    throw new ServiceHttpError("invalid_response_shape");
  }

  if (payload.ok === true) {
    return {
      ok: true,
      data: payload.data as T,
    };
  }

  if (typeof payload.error !== "string") {
    throw new ServiceHttpError("invalid_response_shape");
  }

  return {
    ok: false,
    error: payload.error,
    fieldErrors: isRecord(payload.fieldErrors)
      ? (payload.fieldErrors as ApiFailure["fieldErrors"])
      : undefined,
  };
}

async function parseJsonPayload(response: Response): Promise<unknown> {
  const text = await response.text();

  if (text.trim().length === 0) {
    throw new ServiceHttpError("invalid_response");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new ServiceHttpError("invalid_response");
  }
}

export async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, init);
  } catch {
    throw new ServiceHttpError("network_error");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await parseJsonPayload(response);
  const envelope = parseEnvelope<T>(payload);

  if (envelope.ok) {
    return envelope.data;
  }

  throw new ServiceHttpError(envelope.error, {
    status: response.status,
    fieldErrors: envelope.fieldErrors,
  });
}

export function getJson<T>(path: string, init?: RequestInit) {
  return requestJson<T>(path, {
    ...init,
    method: "GET",
  });
}

export function postJson<TBody, TRes>(path: string, body: TBody, init?: RequestInit) {
  return requestJson<TRes>(path, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: JSON.stringify(body),
  });
}

export function patchJson<TBody, TRes>(path: string, body: TBody, init?: RequestInit) {
  return requestJson<TRes>(path, {
    ...init,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: JSON.stringify(body),
  });
}

export function deleteJson<TRes>(path: string, init?: RequestInit) {
  return requestJson<TRes>(path, {
    ...init,
    method: "DELETE",
  });
}
