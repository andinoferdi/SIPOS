import { z } from "zod";
import { apiError, apiOk } from "@/lib/http/api-response";
import { mapPortalErrorCode } from "@/lib/http/portal-error-map";
import { getRouteAuthUser } from "@/lib/auth/route-auth";
import {
  PortalServiceError,
  softDeletePortalInstance,
  updatePortalInstance,
} from "@/lib/portal/service";

export const runtime = "nodejs";

const updateSchema = z
  .object({
    name: z.string().trim().min(3).max(80).optional(),
    total_table: z.coerce.number().int().min(1).max(500).optional(),
  })
  .refine((value) => value.name !== undefined || value.total_table !== undefined, {
    message: "minimal satu field wajib dikirim",
  });

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Context) {
  const user = await getRouteAuthUser();
  if (!user) {
    return apiError("unauthorized", 401);
  }

  const { id } = await context.params;
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return apiError("invalid_payload", 400);
  }

  if (Object.prototype.hasOwnProperty.call(payload, "type")) {
    return apiError("type_immutable", 400);
  }

  const parsed = updateSchema.safeParse(payload);
  if (!parsed.success) {
    return apiError("invalid_payload", 400);
  }

  try {
    const data = await updatePortalInstance(user, id, {
      name: parsed.data.name,
      totalTable: parsed.data.total_table,
    });
    return apiOk(data);
  } catch (error) {
    if (error instanceof PortalServiceError) {
      const mapped = mapPortalErrorCode(error.code);
      return apiError(mapped.error, mapped.status);
    }
    return apiError("internal_error", 500);
  }
}

export async function DELETE(_request: Request, context: Context) {
  const user = await getRouteAuthUser();
  if (!user) {
    return apiError("unauthorized", 401);
  }

  const { id } = await context.params;

  try {
    const data = await softDeletePortalInstance(user, id);
    return apiOk(data);
  } catch (error) {
    if (error instanceof PortalServiceError) {
      const mapped = mapPortalErrorCode(error.code);
      return apiError(mapped.error, mapped.status);
    }
    return apiError("internal_error", 500);
  }
}