"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Loader2,
  Pencil,
  Plus,
  RefreshCcw,
  Trash2,
  Monitor,
  Users,
  TableProperties,
} from "lucide-react";
import { toast } from "sonner";
import type { AuthUser } from "@/types/auth";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PortalHeader } from "@/app/portal/components/portal-header";
import {
  createPortalInstanceSchema,
  tableLabelSchema,
  updatePortalInstanceSchema,
  type CreatePortalInstanceFormInput,
  type CreatePortalInstanceInput,
  type TableLabelFormInput,
  type TableLabelInput,
  type UpdatePortalInstanceFormInput,
  type UpdatePortalInstanceInput,
} from "@/schemas/portal.schema";
import {
  createPortalInstance as createPortalInstanceRequest,
  deletePortalInstance as deletePortalInstanceRequest,
  fetchPortalInstances,
  type PortalData,
  type PortalInstance,
  updatePortalInstance as updatePortalInstanceRequest,
  updatePortalTableLabel as updatePortalTableLabelRequest,
} from "@/services/portal";
import { ServiceHttpError } from "@/services/http/errors";

type PortalClientProps = {
  session: AuthUser;
};

type POSInstance = PortalInstance;

const TYPE_LABEL: Record<POSInstance["type"], string> = {
  TABLE_SERVICE: "Table Service",
  TAB_SERVICE: "Tab Service",
};

const PRIMARY_BUTTON_CLS =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-(--color-primary-600) px-4 py-2.5 text-sm font-semibold text-(--token-white) transition-opacity hover:opacity-80";
const ICON_ACTION_CLS =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-soft text-(--token-gray-500) transition-colors hover:bg-(--token-gray-100) hover:text-(--token-gray-800) dark:text-(--token-gray-400) dark:hover:bg-(--token-white-5) dark:hover:text-(--token-white)";
const INPUT_CLS =
  "h-10 w-full rounded-lg border border-soft bg-(--token-white) px-3 text-sm text-(--token-gray-900) outline-none transition-colors focus:border-(--color-primary-500) disabled:opacity-50 dark:bg-(--color-surface-dark-subtle) dark:text-(--token-white-90)";
const SELECT_CLS = INPUT_CLS;
const LABEL_CLS =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.06em] text-(--token-gray-400) dark:text-(--token-gray-500)";
const FORM_ERROR_CLS = "intent-error-text mt-1 text-xs";

function getErrorLabel(code: string) {
  const map: Record<string, string> = {
    unauthorized: "Sesi login tidak valid.",
    forbidden: "Anda tidak memiliki izin untuk aksi ini.",
    invalid_payload: "Data yang dikirim tidak valid.",
    instance_not_found: "POS Instance tidak ditemukan.",
    instance_not_table_service: "Instance ini bukan Table Service.",
    duplicate_name: "Nama POS Instance sudah dipakai.",
    duplicate_table_label: "Label meja sudah dipakai pada instance ini.",
    type_immutable: "Type POS Instance tidak bisa diubah.",
    workspace_not_found: "Workspace aktif tidak ditemukan.",
    internal_error: "Terjadi kesalahan server.",
  };
  return map[code] ?? `Terjadi error: ${code}`;
}

function getErrorCode(error: unknown) {
  if (error instanceof ServiceHttpError) {
    return error.code;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "internal_error";
}

function InstanceTypeBadge({ type }: { type: POSInstance["type"] }) {
  return (
    <span className="intent-info-soft rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest">
      {TYPE_LABEL[type]}
    </span>
  );
}

function InstanceCard({
  instance,
  isAdmin,
  onEdit,
  onEditLabels,
  onDelete,
}: {
  instance: POSInstance;
  isAdmin: boolean;
  onEdit: (instance: POSInstance) => void;
  onEditLabels: (instanceId: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-soft surface-elevated transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3 border-b border-soft p-5">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-bold text-(--token-gray-900) dark:text-(--token-white)">
            {instance.name}
          </h2>
          <p className="mt-0.5 text-xs text-(--token-gray-500) dark:text-(--token-gray-400)">
            Diperbarui{" "}
            {new Date(instance.updated_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <InstanceTypeBadge type={instance.type} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-(--token-gray-500) dark:text-(--token-gray-400)">
            {instance.type === "TABLE_SERVICE" ? (
              <>
                <TableProperties size={13} className="shrink-0" />
                <span>{instance.total_table} meja</span>
              </>
            ) : (
              <>
                <Users size={13} className="shrink-0" />
                <span>Mode tab tanpa meja</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-(--token-gray-500) dark:text-(--token-gray-400)">
            <Monitor size={13} className="shrink-0" />
            <span>{TYPE_LABEL[instance.type]}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              instance.is_active ? "intent-success-dot" : "intent-info-dot"
            }`}
          />
          <span className="text-xs font-medium text-(--token-gray-500) dark:text-(--token-gray-400)">
            {instance.is_active ? "Aktif" : "Tidak aktif"}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          <Link
            href={`/dashboard/${instance.id}`}
            className={`${PRIMARY_BUTTON_CLS} flex-1`}
          >
            Masuk POS
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {isAdmin && (
            <div className="flex gap-1.5">
              {instance.type === "TABLE_SERVICE" ? (
                <button
                  type="button"
                  onClick={() => onEditLabels(instance.id)}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-soft px-3 text-xs font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
                  aria-label="Edit label meja"
                >
                  Label Meja
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => onEdit(instance)}
                className={ICON_ACTION_CLS}
                aria-label="Edit instance"
              >
                <Pencil size={14} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(instance.id)}
                className="button-danger-soft inline-flex h-9 w-9 items-center justify-center rounded-lg border"
                aria-label="Hapus instance"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyState({ isAdmin, onAdd }: { isAdmin: boolean; onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-soft surface-elevated px-8 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-soft bg-(--token-gray-100) dark:bg-(--token-white-5)">
        <Monitor size={24} className="text-(--token-gray-400) dark:text-(--token-gray-500)" />
      </div>
      <h3 className="mt-4 text-base font-bold text-(--token-gray-900) dark:text-(--token-white)">
        Belum ada POS Instance
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
        Workspace ini belum memiliki instance aktif.{" "}
        {isAdmin ? "Buat instance pertama untuk mulai beroperasi." : "Hubungi admin Anda."}
      </p>
      {isAdmin && (
        <button
          type="button"
          onClick={onAdd}
          className={`${PRIMARY_BUTTON_CLS} mt-6 px-5`}
        >
          <Plus size={15} />
          Tambah Instance Pertama
        </button>
      )}
    </div>
  );
}

function TableLabelRow({
  instanceId,
  position,
  fallbackLabel,
  disabled,
  onSave,
}: {
  instanceId: string;
  position: number;
  fallbackLabel: string;
  disabled: boolean;
  onSave: (instanceId: string, position: number, label: string) => Promise<void>;
}) {
  const labelForm = useForm<TableLabelFormInput, unknown, TableLabelInput>({
    resolver: zodResolver(tableLabelSchema),
    defaultValues: { label: fallbackLabel },
  });

  useEffect(() => {
    labelForm.reset({ label: fallbackLabel });
  }, [fallbackLabel, labelForm]);

  const isSubmitting = disabled || labelForm.formState.isSubmitting;

  return (
    <form
      onSubmit={labelForm.handleSubmit(async (values) => {
        await onSave(instanceId, position, values.label);
      })}
      className="flex items-center gap-2 rounded-lg border border-soft px-3 py-2"
    >
      <span className="w-14 shrink-0 text-xs font-semibold text-(--token-gray-500) dark:text-(--token-gray-400)">
        Meja {position}
      </span>
      <div className="flex-1">
        <input
          {...labelForm.register("label")}
          className="h-8 w-full rounded-md border border-soft bg-transparent px-2 text-xs text-(--token-gray-900) outline-none transition-colors focus:border-(--color-primary-500) dark:text-(--token-white-90)"
          maxLength={10}
          disabled={isSubmitting}
        />
        {labelForm.formState.errors.label?.message ? (
          <p className={FORM_ERROR_CLS}>{labelForm.formState.errors.label.message}</p>
        ) : null}
      </div>
      <button
        type="submit"
        className="inline-flex h-8 shrink-0 items-center rounded-md bg-(--color-primary-600) px-2 text-xs font-semibold text-(--token-white) transition-opacity hover:opacity-80 disabled:opacity-50"
        disabled={isSubmitting}
      >
        Simpan
      </button>
    </form>
  );
}

export default function PortalClient({ session }: PortalClientProps) {
  const [portalData, setPortalData] = useState<PortalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tableEditorId, setTableEditorId] = useState<string | null>(null);

  const createForm = useForm<
    CreatePortalInstanceFormInput,
    unknown,
    CreatePortalInstanceInput
  >({
    resolver: zodResolver(createPortalInstanceSchema),
    defaultValues: {
      name: "",
      type: "TABLE_SERVICE",
      total_table: 10,
    },
  });

  const updateForm = useForm<
    UpdatePortalInstanceFormInput,
    unknown,
    UpdatePortalInstanceInput
  >({
    resolver: zodResolver(updatePortalInstanceSchema),
    defaultValues: {
      name: "",
      total_table: undefined,
    },
  });

  const createType = createForm.watch("type");

  const isAdmin = session.role === "admin";
  const activeInstances = useMemo(() => portalData?.items ?? [], [portalData]);
  const editingTarget = useMemo(
    () => activeInstances.find((item) => item.id === editingId) ?? null,
    [activeInstances, editingId],
  );
  const tableEditorTarget = useMemo(
    () =>
      activeInstances.find(
        (item) => item.id === tableEditorId && item.type === "TABLE_SERVICE",
      ) ?? null,
    [activeInstances, tableEditorId],
  );

  const loadInstances = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPortalInstances();
      setPortalData(data);
    } catch (error) {
      const message = getErrorCode(error);
      toast.error(getErrorLabel(message));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInstances();
  }, [loadInstances]);

  useEffect(() => {
    if (!showCreateModal) {
      createForm.reset({
        name: "",
        type: "TABLE_SERVICE",
        total_table: 10,
      });
    }
  }, [showCreateModal, createForm]);

  async function handleCreateInstance(values: CreatePortalInstanceInput) {
    if (!isAdmin) return;
    setIsMutating(true);
    try {
      const payload: { name: string; type: POSInstance["type"]; total_table?: number } = {
        name: values.name,
        type: values.type,
      };
      if (values.type === "TABLE_SERVICE") payload.total_table = values.total_table;

      await createPortalInstanceRequest(payload);
      toast.success("POS Instance berhasil dibuat.");
      setShowCreateModal(false);
      await loadInstances();
    } catch (error) {
      const message = getErrorCode(error);
      toast.error(getErrorLabel(message));
    } finally {
      setIsMutating(false);
    }
  }

  function startEdit(instance: POSInstance) {
    setEditingId(instance.id);
    updateForm.reset({
      name: instance.name,
      total_table: instance.type === "TABLE_SERVICE" ? instance.total_table : undefined,
    });
  }

  async function handleUpdateInstance(values: UpdatePortalInstanceInput) {
    if (!isAdmin || !editingId) return;
    const target = activeInstances.find((item) => item.id === editingId);
    if (!target) return;

    setIsMutating(true);
    try {
      const payload: { name?: string; total_table?: number } = {};
      if (values.name && values.name.trim() !== target.name) payload.name = values.name;
      if (target.type === "TABLE_SERVICE") {
        const numericTotal = values.total_table;
        if (numericTotal !== undefined && !Number.isNaN(numericTotal) && numericTotal !== target.total_table)
          payload.total_table = numericTotal;
      }
      if (Object.keys(payload).length === 0) {
        toast.info("Tidak ada perubahan untuk disimpan.");
        return;
      }
      await updatePortalInstanceRequest(editingId, payload);
      toast.success("POS Instance berhasil diperbarui.");
      setEditingId(null);
      await loadInstances();
    } catch (error) {
      const message = getErrorCode(error);
      toast.error(getErrorLabel(message));
    } finally {
      setIsMutating(false);
    }
  }

  async function handleDeleteInstance(id: string) {
    if (!isAdmin) return;
    const confirmed = window.confirm("Hapus POS Instance ini?");
    if (!confirmed) return;
    setIsMutating(true);
    try {
      await deletePortalInstanceRequest(id);
      toast.success("POS Instance berhasil dihapus.");
      if (editingId === id) setEditingId(null);
      if (tableEditorId === id) setTableEditorId(null);
      await loadInstances();
    } catch (error) {
      const message = getErrorCode(error);
      toast.error(getErrorLabel(message));
    } finally {
      setIsMutating(false);
    }
  }

  async function handleSaveLabel(instanceId: string, position: number, label: string) {
    if (!isAdmin) return;
    setIsMutating(true);
    try {
      await updatePortalTableLabelRequest(instanceId, position, { label });
      toast.success(`Label meja #${position} berhasil disimpan.`);
      await loadInstances();
    } catch (error) {
      const message = getErrorCode(error);
      toast.error(getErrorLabel(message));
    } finally {
      setIsMutating(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="portal-theme-scope min-h-dvh bg-(--color-marketing-light-canvas) dark:bg-(--color-marketing-dark-canvas)">

      <PortalHeader session={session} workspace={portalData?.workspace} />

      <main className="mx-auto w-full max-w-7xl px-5 py-10 pt-24 sm:px-7 md:py-12 md:pt-28">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-600) dark:text-(--color-primary-400)">
              SIPOS Portal
            </p>
            <h1 className="mt-1.5 text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white) md:text-3xl">
              Pilih POS Instance
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void loadInstances()}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg border border-soft px-3 py-2 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) disabled:opacity-50 dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
            >
              <RefreshCcw size={14} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>

            {isAdmin && !isLoading && activeInstances.length > 0 && (
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-(--color-primary-600) px-3 py-2 text-sm font-semibold text-(--token-white) transition-opacity hover:opacity-80"
              >
                <Plus size={14} />
                Tambah Instance
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-2xl border border-soft surface-elevated"
              />
            ))}
          </div>
        ) : activeInstances.length === 0 ? (
          <EmptyState isAdmin={isAdmin} onAdd={() => setShowCreateModal(true)} />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {activeInstances.map((instance) => (
                <InstanceCard
                  key={instance.id}
                  instance={instance}
                  isAdmin={isAdmin}
                  onEdit={startEdit}
                  onEditLabels={setTableEditorId}
                  onDelete={(id) => void handleDeleteInstance(id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Tambah POS Instance</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={createForm.handleSubmit(async (values) => {
              await handleCreateInstance(values);
            })}
            className="space-y-4"
          >
            <div>
              <label className={LABEL_CLS}>Nama Instance</label>
              <input
                {...createForm.register("name")}
                placeholder="Cth: Kasir Utama, Outlet Lantai 2"
                className={INPUT_CLS}
                disabled={isMutating}
              />
              {createForm.formState.errors.name?.message ? (
                <p className={FORM_ERROR_CLS}>{createForm.formState.errors.name.message}</p>
              ) : null}
            </div>

            <div>
              <label className={LABEL_CLS}>Tipe</label>
              <select
                value={createType}
                onChange={(event) => {
                  const nextType = event.target.value as POSInstance["type"];
                  createForm.setValue("type", nextType, { shouldValidate: true });
                  if (nextType === "TAB_SERVICE") {
                    createForm.setValue("total_table", undefined, { shouldValidate: true });
                    return;
                  }
                  if (!createForm.getValues("total_table")) {
                    createForm.setValue("total_table", 10, { shouldValidate: true });
                  }
                }}
                className={SELECT_CLS}
                disabled={isMutating}
              >
                <option value="TABLE_SERVICE">Table Service</option>
                <option value="TAB_SERVICE">Tab Service</option>
              </select>
            </div>

            {createType === "TABLE_SERVICE" && (
              <div>
                <label className={LABEL_CLS}>Total Meja</label>
                <input
                  value={String(createForm.watch("total_table") ?? "")}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    createForm.setValue(
                      "total_table",
                      Number.isNaN(next) ? undefined : next,
                      { shouldValidate: true },
                    );
                  }}
                  placeholder="10"
                  type="number"
                  min="1"
                  className={INPUT_CLS}
                  disabled={isMutating}
                />
                {createForm.formState.errors.total_table?.message ? (
                  <p className={FORM_ERROR_CLS}>{createForm.formState.errors.total_table.message}</p>
                ) : null}
              </div>
            )}

            <DialogFooter className="mt-2 border-0 pt-0">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="inline-flex h-10 items-center rounded-lg border border-soft px-4 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isMutating}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-(--color-primary-600) px-5 text-sm font-semibold text-(--token-white) transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {isMutating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Tambah
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingId && editingTarget)} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Edit POS Instance</DialogTitle>
          </DialogHeader>
          {editingId && editingTarget && (
            <form
              onSubmit={updateForm.handleSubmit(async (values) => {
                await handleUpdateInstance(values);
              })}
              className="space-y-4"
            >
            <div>
              <label className={LABEL_CLS}>Nama Instance</label>
              <input
                {...updateForm.register("name")}
                className={INPUT_CLS}
                disabled={isMutating}
              />
              {updateForm.formState.errors.name?.message ? (
                <p className={FORM_ERROR_CLS}>{updateForm.formState.errors.name.message}</p>
              ) : null}
            </div>

            {editingTarget.type === "TABLE_SERVICE" && (
              <div>
                <label className={LABEL_CLS}>Total Meja</label>
                <input
                  value={String(updateForm.watch("total_table") ?? "")}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    updateForm.setValue(
                      "total_table",
                      Number.isNaN(next) ? undefined : next,
                      { shouldValidate: true },
                    );
                  }}
                  type="number"
                  min="1"
                  className={INPUT_CLS}
                  disabled={isMutating}
                />
                {updateForm.formState.errors.total_table?.message ? (
                  <p className={FORM_ERROR_CLS}>{updateForm.formState.errors.total_table.message}</p>
                ) : null}
              </div>
            )}

            <DialogFooter className="mt-2 border-0 pt-0">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="inline-flex h-10 items-center rounded-lg border border-soft px-4 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isMutating}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-(--color-primary-600) px-5 text-sm font-semibold text-(--token-white) transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {isMutating ? <Loader2 size={14} className="animate-spin" /> : null}
                Simpan
              </button>
            </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(tableEditorTarget)}
        onOpenChange={(open) => {
          if (!open) setTableEditorId(null);
        }}
      >
        <DialogContent size="xl">
          <DialogHeader>
            <DialogTitle>
              Edit Label Meja{tableEditorTarget ? ` - ${tableEditorTarget.name}` : ""}
            </DialogTitle>
          </DialogHeader>
          {tableEditorTarget ? (
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {(() => {
                const byPosition = new Map(
                  tableEditorTarget.table_labels.map((item) => [item.position, item.label]),
                );

                return Array.from({ length: tableEditorTarget.total_table }, (_, idx) => {
                  const position = idx + 1;
                  const fallback = byPosition.get(position) ?? `${position}`;
                  return (
                    <TableLabelRow
                      key={`${tableEditorTarget.id}:${position}`}
                      instanceId={tableEditorTarget.id}
                      position={position}
                      fallbackLabel={fallback}
                      disabled={isMutating}
                      onSave={handleSaveLabel}
                    />
                  );
                });
              })()}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
