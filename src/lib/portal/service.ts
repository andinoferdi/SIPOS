import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { requirePermission } from "@/lib/auth/permissions";
import type { AuthUser } from "@/types/auth";

const DEFAULT_WORKSPACE_CODE = "main";

export type PortalServiceErrorCode =
  | "forbidden"
  | "workspace_not_found"
  | "instance_not_found"
  | "instance_not_table_service"
  | "duplicate_name"
  | "duplicate_table_label"
  | "conflict"
  | "invalid_payload"
  | "internal_error";

export class PortalServiceError extends Error {
  code: PortalServiceErrorCode;

  constructor(code: PortalServiceErrorCode) {
    super(code);
    this.code = code;
  }
}

type POSInstanceType = "TABLE_SERVICE" | "TAB_SERVICE";

type PortalInstancePayload = {
  id: string;
  name: string;
  type: POSInstanceType;
  total_table: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  table_labels: Array<{
    position: number;
    label: string;
  }>;
};

function ensurePermission(user: AuthUser, permission: Parameters<typeof requirePermission>[1]) {
  if (!requirePermission(user, permission)) {
    throw new PortalServiceError("forbidden");
  }
}

async function getActiveWorkspace() {
  const workspace = await prisma.workspace.findUnique({
    where: { code: DEFAULT_WORKSPACE_CODE },
  });

  if (!workspace || !workspace.isActive) {
    throw new PortalServiceError("workspace_not_found");
  }

  return workspace;
}

function normalizeLabel(label: string) {
  return label.trim().toLowerCase();
}

function toPortalInstancePayload(instance: {
  id: string;
  name: string;
  type: POSInstanceType;
  totalTable: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tableLabels: Array<{ position: number; label: string }>;
}): PortalInstancePayload {
  return {
    id: instance.id,
    name: instance.name,
    type: instance.type,
    total_table: instance.totalTable,
    is_active: instance.isActive,
    created_at: instance.createdAt.toISOString(),
    updated_at: instance.updatedAt.toISOString(),
    table_labels: instance.tableLabels.map((item) => ({
      position: item.position,
      label: item.label,
    })),
  };
}

function mapPrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = Array.isArray(error.meta?.target) ? error.meta.target.join(",") : "";
      if (target.includes("workspace_id") && target.includes("name")) {
        throw new PortalServiceError("duplicate_name");
      }
      if (target.includes("pos_instance_id") && target.includes("label")) {
        throw new PortalServiceError("duplicate_table_label");
      }
      throw new PortalServiceError("conflict");
    }
  }

  throw error;
}

function buildDefaultLabels(
  startPosition: number,
  endPosition: number,
  existingLabels: Set<string>,
) {
  const labels: Array<{ position: number; label: string }> = [];

  for (let position = startPosition; position <= endPosition; position += 1) {
    let candidate = `${position}`;
    let suffix = 1;
    while (existingLabels.has(candidate)) {
      candidate = `${position}-${suffix}`;
      suffix += 1;
    }

    existingLabels.add(candidate);
    labels.push({ position, label: candidate });
  }

  return labels;
}

export async function listPortalInstances(user: AuthUser) {
  ensurePermission(user, "pos_instance:read");
  const workspace = await getActiveWorkspace();

  const instances = await prisma.pOSInstance.findMany({
    where: {
      workspaceId: workspace.id,
      isActive: true,
    },
    include: {
      tableLabels: {
        orderBy: { position: "asc" },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return {
    workspace: {
      id: workspace.id,
      code: workspace.code,
      name: workspace.name,
    },
    items: instances.map((instance: Parameters<typeof toPortalInstancePayload>[0]) =>
      toPortalInstancePayload(instance),
    ),
  };
}

export async function getPortalInstanceById(user: AuthUser, instanceId: string) {
  ensurePermission(user, "pos_instance:read");
  const workspace = await getActiveWorkspace();

  const instance = await prisma.pOSInstance.findFirst({
    where: {
      id: instanceId,
      workspaceId: workspace.id,
      isActive: true,
    },
    include: {
      tableLabels: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!instance) {
    throw new PortalServiceError("instance_not_found");
  }

  return toPortalInstancePayload(instance);
}

export async function createPortalInstance(
  user: AuthUser,
  payload: {
    name: string;
    type: POSInstanceType;
    totalTable: number;
  },
) {
  ensurePermission(user, "pos_instance:create");
  const workspace = await getActiveWorkspace();

  const name = payload.name.trim();
  const totalTable = payload.type === "TABLE_SERVICE" ? payload.totalTable : 0;

  try {
    const created = await prisma.$transaction(async (tx) => {
      const instance = await tx.pOSInstance.create({
        data: {
          workspaceId: workspace.id,
          name,
          type: payload.type,
          totalTable,
          isActive: true,
        },
      });

      if (payload.type === "TABLE_SERVICE" && totalTable > 0) {
        const labels = Array.from({ length: totalTable }, (_, idx) => ({
          posInstanceId: instance.id,
          position: idx + 1,
          label: `${idx + 1}`,
        }));

        await tx.tableLabel.createMany({
          data: labels,
        });
      }

      return tx.pOSInstance.findUnique({
        where: { id: instance.id },
        include: {
          tableLabels: {
            orderBy: { position: "asc" },
          },
        },
      });
    });

    if (!created) {
      throw new PortalServiceError("internal_error");
    }

    return toPortalInstancePayload(created);
  } catch (error) {
    mapPrismaError(error);
  }
}

export async function updatePortalInstance(
  user: AuthUser,
  instanceId: string,
  payload: {
    name?: string;
    totalTable?: number;
  },
) {
  ensurePermission(user, "pos_instance:update");
  const workspace = await getActiveWorkspace();

  const current = await prisma.pOSInstance.findFirst({
    where: {
      id: instanceId,
      workspaceId: workspace.id,
      isActive: true,
    },
    include: {
      tableLabels: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!current) {
    throw new PortalServiceError("instance_not_found");
  }

  if (payload.totalTable !== undefined && current.type !== "TABLE_SERVICE") {
    throw new PortalServiceError("instance_not_table_service");
  }

  const nextName = payload.name?.trim() ?? current.name;
  const nextTotalTable =
    payload.totalTable !== undefined ? payload.totalTable : current.totalTable;

  try {
    const updated = await prisma.$transaction(async (tx) => {
      await tx.pOSInstance.update({
        where: { id: current.id },
        data: {
          name: nextName,
          totalTable: nextTotalTable,
        },
      });

      if (current.type === "TABLE_SERVICE" && payload.totalTable !== undefined) {
        if (nextTotalTable < current.totalTable) {
          await tx.tableLabel.deleteMany({
            where: {
              posInstanceId: current.id,
              position: {
                gt: nextTotalTable,
              },
            },
          });
        }

        if (nextTotalTable > current.totalTable) {
          const existingLabels = new Set(
            current.tableLabels.map((item: { label: string }) => item.label.toLowerCase()),
          );
          const defaults = buildDefaultLabels(
            current.totalTable + 1,
            nextTotalTable,
            existingLabels,
          );

          await tx.tableLabel.createMany({
            data: defaults.map((item: { position: number; label: string }) => ({
              posInstanceId: current.id,
              position: item.position,
              label: item.label,
            })),
          });
        }
      }

      return tx.pOSInstance.findUnique({
        where: { id: current.id },
        include: {
          tableLabels: {
            orderBy: { position: "asc" },
          },
        },
      });
    });

    if (!updated) {
      throw new PortalServiceError("internal_error");
    }

    return toPortalInstancePayload(updated);
  } catch (error) {
    mapPrismaError(error);
  }
}

export async function softDeletePortalInstance(user: AuthUser, instanceId: string) {
  ensurePermission(user, "pos_instance:delete");
  const workspace = await getActiveWorkspace();

  const current = await prisma.pOSInstance.findFirst({
    where: {
      id: instanceId,
      workspaceId: workspace.id,
      isActive: true,
    },
  });

  if (!current) {
    throw new PortalServiceError("instance_not_found");
  }

  await prisma.pOSInstance.update({
    where: { id: current.id },
    data: {
      isActive: false,
    },
  });

  return {
    id: current.id,
    is_active: false,
  };
}

export async function updateTableLabel(
  user: AuthUser,
  params: {
    instanceId: string;
    position: number;
    label: string;
  },
) {
  ensurePermission(user, "pos_instance:update");
  const workspace = await getActiveWorkspace();

  const instance = await prisma.pOSInstance.findFirst({
    where: {
      id: params.instanceId,
      workspaceId: workspace.id,
      isActive: true,
    },
  });

  if (!instance) {
    throw new PortalServiceError("instance_not_found");
  }

  if (instance.type !== "TABLE_SERVICE") {
    throw new PortalServiceError("instance_not_table_service");
  }

  if (params.position < 1 || params.position > instance.totalTable) {
    throw new PortalServiceError("invalid_payload");
  }

  const label = normalizeLabel(params.label);
  if (!label) {
    throw new PortalServiceError("invalid_payload");
  }

  try {
    const updated = await prisma.tableLabel.upsert({
      where: {
        posInstanceId_position: {
          posInstanceId: instance.id,
          position: params.position,
        },
      },
      update: {
        label,
      },
      create: {
        posInstanceId: instance.id,
        position: params.position,
        label,
      },
    });

    return {
      pos_instance_id: updated.posInstanceId,
      position: updated.position,
      label: updated.label,
      updated_at: updated.updatedAt.toISOString(),
    };
  } catch (error) {
    mapPrismaError(error);
  }
}



