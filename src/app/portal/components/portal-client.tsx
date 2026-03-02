"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Loader2,
  Pencil,
  Plus,
  RefreshCcw,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Monitor,
  Users,
  TableProperties,
} from "lucide-react";
import { toast } from "sonner";
import type { AuthUser } from "@/types/auth";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PortalHeader } from "@/app/portal/components/portal-header";



type POSInstance = {
  id: string;
  name: string;
  type: "TABLE_SERVICE" | "TAB_SERVICE";
  total_table: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  table_labels: Array<{
    position: number;
    label: string;
  }>;
};

type PortalData = {
  workspace: {
    id: string;
    code: string;
    name: string;
  };
  items: POSInstance[];
};

type PortalClientProps = {
  session: AuthUser;
};

type APIResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TYPE_LABEL: Record<POSInstance["type"], string> = {
  TABLE_SERVICE: "Table Service",
  TAB_SERVICE: "Tab Service",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

async function parseApiResponse<T>(response: Response) {
  const data = (await response.json().catch(() => null)) as APIResponse<T> | null;
  if (!data) throw new Error("internal_error");
  if (!data.ok) throw new Error(data.error);
  return data.data;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

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
  onDelete,
}: {
  instance: POSInstance;
  isAdmin: boolean;
  onEdit: (instance: POSInstance) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-soft surface-elevated transition-shadow hover:shadow-md">
      {/* Card header */}
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

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Meta */}
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

        {/* Status */}
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              instance.is_active ? "bg-green-400" : "bg-(--token-gray-300)"
            }`}
          />
          <span className="text-xs font-medium text-(--token-gray-500) dark:text-(--token-gray-400)">
            {instance.is_active ? "Aktif" : "Tidak aktif"}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          <Link
            href={`/dashboard/${instance.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            Masuk POS
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {isAdmin && (
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => onEdit(instance)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-soft text-(--token-gray-500) transition-colors hover:bg-(--token-gray-100) hover:text-(--token-gray-800) dark:text-(--token-gray-400) dark:hover:bg-(--token-white-5) dark:hover:text-(--token-white)"
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
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          <Plus size={15} />
          Tambah Instance Pertama
        </button>
      )}
    </div>
  );
}

const INPUT_CLS =
  "h-10 w-full rounded-lg border border-soft bg-(--token-white) px-3 text-sm text-(--token-gray-900) outline-none transition-colors focus:border-primary-500 disabled:opacity-50 dark:bg-(--color-surface-dark-subtle) dark:text-(--token-white-90)";

const SELECT_CLS =
  "h-10 w-full rounded-lg border border-soft bg-(--token-white) px-3 text-sm text-(--token-gray-900) outline-none transition-colors focus:border-primary-500 disabled:opacity-50 dark:bg-(--color-surface-dark-subtle) dark:text-(--token-white-90)";

const LABEL_CLS =
  "block text-xs font-semibold uppercase tracking-[0.06em] text-(--token-gray-400) dark:text-(--token-gray-500) mb-1.5";

const ITEMS_PER_PAGE = 6;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function PortalClient({ session }: PortalClientProps) {
  const [portalData, setPortalData] = useState<PortalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  // Create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createType, setCreateType] = useState<POSInstance["type"]>("TABLE_SERVICE");
  const [createTotalTable, setCreateTotalTable] = useState("10");

  // Edit modal
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editTotalTable, setEditTotalTable] = useState("");

  // Admin panel
  const [adminOpen, setAdminOpen] = useState(false);
  const [tableEditorId, setTableEditorId] = useState<string | null>(null);
  const [labelDrafts, setLabelDrafts] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const isAdmin = session.role === "admin";
  const activeInstances = useMemo(() => portalData?.items ?? [], [portalData]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(activeInstances.length / ITEMS_PER_PAGE)),
    [activeInstances.length],
  );
  const paginatedInstances = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return activeInstances.slice(start, start + ITEMS_PER_PAGE);
  }, [activeInstances, currentPage]);
  const editingTarget = useMemo(
    () => activeInstances.find((item) => item.id === editingId) ?? null,
    [activeInstances, editingId],
  );

  const loadInstances = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/portal/instances", {
        method: "GET",
        cache: "no-store",
      });
      const data = await parseApiResponse<PortalData>(response);
      setPortalData(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "internal_error";
      toast.error(getErrorLabel(message));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInstances();
  }, [loadInstances]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(Math.max(prev, 1), totalPages));
  }, [totalPages]);

  // Create
  async function handleCreateInstance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isAdmin) return;
    setIsMutating(true);
    try {
      const payload: { name: string; type: POSInstance["type"]; total_table?: number } = {
        name: createName,
        type: createType,
      };
      if (createType === "TABLE_SERVICE") payload.total_table = Number(createTotalTable);

      const response = await fetch("/api/portal/instances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await parseApiResponse<POSInstance>(response);
      toast.success("POS Instance berhasil dibuat.");
      setCreateName("");
      setCreateType("TABLE_SERVICE");
      setCreateTotalTable("10");
      setShowCreateModal(false);
      await loadInstances();
    } catch (error) {
      const message = error instanceof Error ? error.message : "internal_error";
      toast.error(getErrorLabel(message));
    } finally {
      setIsMutating(false);
    }
  }

  // Edit
  function startEdit(instance: POSInstance) {
    setEditingId(instance.id);
    setEditName(instance.name);
    setEditTotalTable(instance.type === "TABLE_SERVICE" ? String(instance.total_table) : "");
  }

  async function handleUpdateInstance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isAdmin || !editingId) return;
    const target = activeInstances.find((item) => item.id === editingId);
    if (!target) return;

    setIsMutating(true);
    try {
      const payload: { name?: string; total_table?: number } = {};
      if (editName.trim() !== target.name) payload.name = editName;
      if (target.type === "TABLE_SERVICE") {
        const numericTotal = Number(editTotalTable);
        if (!Number.isNaN(numericTotal) && numericTotal !== target.total_table)
          payload.total_table = numericTotal;
      }
      if (Object.keys(payload).length === 0) {
        toast.info("Tidak ada perubahan untuk disimpan.");
        return;
      }
      const response = await fetch(`/api/portal/instances/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await parseApiResponse<POSInstance>(response);
      toast.success("POS Instance berhasil diperbarui.");
      setEditingId(null);
      await loadInstances();
    } catch (error) {
      const message = error instanceof Error ? error.message : "internal_error";
      toast.error(getErrorLabel(message));
    } finally {
      setIsMutating(false);
    }
  }

  // Delete
  async function handleDeleteInstance(id: string) {
    if (!isAdmin) return;
    const confirmed = window.confirm("Hapus POS Instance ini?");
    if (!confirmed) return;
    setIsMutating(true);
    try {
      const response = await fetch(`/api/portal/instances/${id}`, { method: "DELETE" });
      await parseApiResponse<{ id: string; is_active: boolean }>(response);
      toast.success("POS Instance berhasil dihapus.");
      if (editingId === id) setEditingId(null);
      if (tableEditorId === id) setTableEditorId(null);
      await loadInstances();
    } catch (error) {
      const message = error instanceof Error ? error.message : "internal_error";
      toast.error(getErrorLabel(message));
    } finally {
      setIsMutating(false);
    }
  }

  // Table label
  async function handleSaveLabel(instanceId: string, position: number, fallbackLabel: string) {
    if (!isAdmin) return;
    const key = `${instanceId}:${position}`;
    const label = (labelDrafts[key] ?? fallbackLabel).trim().toLowerCase();
    setIsMutating(true);
    try {
      const response = await fetch(`/api/portal/instances/${instanceId}/tables/${position}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });
      await parseApiResponse<{ pos_instance_id: string; position: number; label: string }>(response);
      toast.success(`Label meja #${position} berhasil disimpan.`);
      await loadInstances();
    } catch (error) {
      const message = error instanceof Error ? error.message : "internal_error";
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

      {/* ── Main content ── */}
      <main className="mx-auto w-full max-w-7xl px-5 py-10 pt-24 sm:px-7 md:py-12 md:pt-28">

        {/* Page heading */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
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
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                <Plus size={14} />
                Tambah Instance
              </button>
            )}
          </div>
        </div>

        {/* Instance list */}
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
              {paginatedInstances.map((instance) => (
                <InstanceCard
                  key={instance.id}
                  instance={instance}
                  isAdmin={isAdmin}
                  onEdit={startEdit}
                  onDelete={(id) => void handleDeleteInstance(id)}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}

        {/* ── Admin panel (collapsible) ── */}
        {isAdmin && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-soft surface-elevated">
            <button
              type="button"
              onClick={() => setAdminOpen((prev) => !prev)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-(--token-gray-100) dark:hover:bg-(--token-white-5)"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                  Admin
                </p>
                <p className="mt-0.5 text-sm font-bold text-(--token-gray-900) dark:text-(--token-white)">
                  Kelola POS Instance
                </p>
              </div>
              {adminOpen ? (
                <ChevronUp size={18} className="shrink-0 text-(--token-gray-400)" />
              ) : (
                <ChevronDown size={18} className="shrink-0 text-(--token-gray-400)" />
              )}
            </button>

            {adminOpen && (
              <div className="space-y-5 border-t border-soft px-6 py-5">
                {/* Instance table */}
                <div className="overflow-x-auto rounded-xl border border-soft">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-(--token-gray-100) text-xs text-(--token-gray-600) dark:bg-(--token-white-5) dark:text-(--token-gray-300)">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Nama</th>
                        <th className="px-4 py-3 font-semibold">Tipe</th>
                        <th className="px-4 py-3 font-semibold">Total Meja</th>
                        <th className="px-4 py-3 font-semibold">Diperbarui</th>
                        <th className="px-4 py-3 font-semibold">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-soft">
                      {activeInstances.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-6 text-center text-(--token-gray-400)">
                            Belum ada instance.
                          </td>
                        </tr>
                      ) : (
                        paginatedInstances.map((instance) => (
                          <tr key={instance.id}>
                            <td className="px-4 py-3 font-medium text-(--token-gray-900) dark:text-(--token-white)">
                              {instance.name}
                            </td>
                            <td className="px-4 py-3 text-(--token-gray-600) dark:text-(--token-gray-300)">
                              {TYPE_LABEL[instance.type]}
                            </td>
                            <td className="px-4 py-3 text-(--token-gray-600) dark:text-(--token-gray-300)">
                              {instance.type === "TABLE_SERVICE" ? instance.total_table : "-"}
                            </td>
                            <td className="px-4 py-3 text-(--token-gray-600) dark:text-(--token-gray-300)">
                              {new Date(instance.updated_at).toLocaleString("id-ID")}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => startEdit(instance)}
                                  className="inline-flex items-center gap-1 rounded-md border border-soft px-2.5 py-1 text-xs font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
                                >
                                  <Pencil size={11} />
                                  Edit
                                </button>
                                {instance.type === "TABLE_SERVICE" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTableEditorId((prev) =>
                                        prev === instance.id ? null : instance.id,
                                      )
                                    }
                                    className="inline-flex items-center rounded-md border border-soft px-2.5 py-1 text-xs font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
                                  >
                                    Label Meja
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => void handleDeleteInstance(instance.id)}
                                  className="button-danger-soft inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium"
                                >
                                  <Trash2 size={11} />
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table label editor */}
                {tableEditorId && (
                  <div className="space-y-3 rounded-xl border border-soft p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-widest text-(--token-gray-500) dark:text-(--token-gray-400)">
                        Edit Label Meja —{" "}
                        {activeInstances.find((item) => item.id === tableEditorId)?.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => setTableEditorId(null)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-md text-(--token-gray-400) hover:bg-(--token-gray-100) dark:hover:bg-(--token-white-5)"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    {(() => {
                      const instance = activeInstances.find((item) => item.id === tableEditorId);
                      if (!instance || instance.type !== "TABLE_SERVICE") return null;
                      const byPosition = new Map(
                        instance.table_labels.map((l) => [l.position, l.label]),
                      );
                      return (
                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                          {Array.from({ length: instance.total_table }, (_, idx) => {
                            const position = idx + 1;
                            const fallback = byPosition.get(position) ?? `${position}`;
                            const key = `${instance.id}:${position}`;
                            return (
                              <div
                                key={key}
                                className="flex items-center gap-2 rounded-lg border border-soft px-3 py-2"
                              >
                                <span className="w-14 shrink-0 text-xs font-semibold text-(--token-gray-500) dark:text-(--token-gray-400)">
                                  Meja {position}
                                </span>
                                <input
                                  value={labelDrafts[key] ?? fallback}
                                  onChange={(e) =>
                                    setLabelDrafts((prev) => ({
                                      ...prev,
                                      [key]: e.target.value,
                                    }))
                                  }
                                  className="h-8 flex-1 rounded-md border border-soft bg-transparent px-2 text-xs text-(--token-gray-800) outline-none focus:border-primary-500 dark:text-(--token-gray-200)"
                                  maxLength={10}
                                  disabled={isMutating}
                                />
                                <button
                                  type="button"
                                  onClick={() => void handleSaveLabel(instance.id, position, fallback)}
                                  className="h-8 shrink-0 rounded-md bg-primary-600 px-2 text-xs font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-50"
                                  disabled={isMutating}
                                >
                                  Simpan
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Create modal ── */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Tambah POS Instance</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateInstance} className="space-y-4">
            <div>
              <label className={LABEL_CLS}>Nama Instance</label>
              <input
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="Cth: Kasir Utama, Outlet Lantai 2"
                className={INPUT_CLS}
                required
                disabled={isMutating}
              />
            </div>

            <div>
              <label className={LABEL_CLS}>Tipe</label>
              <select
                value={createType}
                onChange={(e) => setCreateType(e.target.value as POSInstance["type"])}
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
                  value={createTotalTable}
                  onChange={(e) => setCreateTotalTable(e.target.value)}
                  placeholder="10"
                  type="number"
                  min="1"
                  className={INPUT_CLS}
                  required
                  disabled={isMutating}
                />
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
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary-600 px-5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
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
            <form onSubmit={handleUpdateInstance} className="space-y-4">
            <div>
              <label className={LABEL_CLS}>Nama Instance</label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className={INPUT_CLS}
                required
                disabled={isMutating}
              />
            </div>

            {editingTarget.type === "TABLE_SERVICE" && (
              <div>
                <label className={LABEL_CLS}>Total Meja</label>
                <input
                  value={editTotalTable}
                  onChange={(e) => setEditTotalTable(e.target.value)}
                  type="number"
                  min="1"
                  className={INPUT_CLS}
                  disabled={isMutating}
                />
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
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary-600 px-5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {isMutating ? <Loader2 size={14} className="animate-spin" /> : null}
                Simpan
              </button>
            </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
