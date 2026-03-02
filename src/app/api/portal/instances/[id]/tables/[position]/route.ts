import { z } from "zod";
import { apiError, apiOk } from "@/lib/http/api-response";
import { mapPortalErrorCode } from "@/lib/http/portal-error-map";
import { getRouteAuthUser } from "@/lib/auth/route-auth";
import { PortalServiceError, updateTableLabel } from "@/lib/portal/service";

export const runtime = "nodejs";

const bodySchema = z.object({
  label: z.string().trim().min(1).max(10).regex(/^[a-z0-9-]+$/),
});

type Context = {
  params: Promise<{ id: string; position: string }>;
};

export async function PATCH(request: Request, context: Context) {
  const user = await getRouteAuthUser();
  if (!user) {
    return apiError("unauthorized", 401);
  }

  const { id, position } = await context.params;
  const payload = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(payload);

  if (!parsed.success) {
    return apiError("invalid_payload", 400);
  }

  const parsedPosition = Number(position);
  if (!Number.isInteger(parsedPosition) || parsedPosition < 1) {
    const mapped = mapPortalErrorCode("invalid_query");
    return apiError(mapped.error, mapped.status);
  }

  try {
    const data = await updateTableLabel(user, {
      instanceId: id,
      position: parsedPosition,
      label: parsed.data.label,
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