import { z } from "zod";
import { apiError, apiOk } from "@/lib/http/api-response";
import { mapPortalErrorCode } from "@/lib/http/portal-error-map";
import { getRouteAuthUser } from "@/lib/auth/route-auth";
import { listPortalInstances, createPortalInstance, PortalServiceError } from "@/lib/portal/service";

export const runtime = "nodejs";

const createSchema = z
  .object({
    name: z.string().trim().min(3).max(80),
    type: z.enum(["TABLE_SERVICE", "TAB_SERVICE"]),
    total_table: z.coerce.number().int().min(0).max(500).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.type === "TABLE_SERVICE") {
      if (!value.total_table || value.total_table < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["total_table"],
          message: "total_table wajib untuk TABLE_SERVICE",
        });
      }
      return;
    }

    if (value.total_table !== undefined && value.total_table !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["total_table"],
        message: "total_table harus kosong atau 0 untuk TAB_SERVICE",
      });
    }
  });

export async function GET() {
  const user = await getRouteAuthUser();
  if (!user) {
    return apiError("unauthorized", 401);
  }

  try {
    const data = await listPortalInstances(user);
    return apiOk(data);
  } catch (error) {
    if (error instanceof PortalServiceError) {
      const mapped = mapPortalErrorCode(error.code);
      return apiError(mapped.error, mapped.status);
    }
    return apiError("internal_error", 500);
  }
}

export async function POST(request: Request) {
  const user = await getRouteAuthUser();
  if (!user) {
    return apiError("unauthorized", 401);
  }

  const payload = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(payload);

  if (!parsed.success) {
    return apiError("invalid_payload", 400);
  }

  try {
    const data = await createPortalInstance(user, {
      name: parsed.data.name,
      type: parsed.data.type,
      totalTable: parsed.data.total_table ?? 0,
    });
    return apiOk(data, 201);
  } catch (error) {
    if (error instanceof PortalServiceError) {
      const mapped = mapPortalErrorCode(error.code);
      return apiError(mapped.error, mapped.status);
    }
    return apiError("internal_error", 500);
  }
}