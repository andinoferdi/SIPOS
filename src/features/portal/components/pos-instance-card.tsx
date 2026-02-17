"use client";

import type { RoleCode } from "@/types/rbac";
import { useRouter } from "next/navigation";
import { getPosEntryRoute } from "@/features/portal/utils/pos-entry-route";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { useDeletePOSInstance } from "@/features/portal/hooks/use-pos-instances";
import POSInstanceForm from "@/features/portal/components/pos-instance-form";
import { Card, CardContent } from "@/components/ui/card/card";
import type { POSInstanceResponse } from "../types";

type POSInstanceCardProps = {
  instance: POSInstanceResponse;
  roleCode: RoleCode | null;
};

export default function POSInstanceCard({
  instance,
  roleCode,
}: POSInstanceCardProps) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeletePOSInstance();

  const handleClick = () => {
    if (!instance.isActive && roleCode !== "admin") return;
    router.push(getPosEntryRoute(roleCode, instance.id));
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(instance.id);
      toast.success("POS Instance berhasil dihapus");
      setIsDeleteOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal menghapus";
      toast.error(message);
    }
  };

  const typeLabel =
    instance.type === "TABLE_SERVICE" ? "Table Service" : "Tab Service";

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
          }
        }}
        aria-disabled={!instance.isActive && roleCode !== "admin"}
        variant="default"
        size="lg"
        interactive={instance.isActive || roleCode === "admin"}
        className={`group relative w-full rounded-2xl border p-6 text-left transition-all duration-200
          ${
            instance.isActive
              ? "border-[var(--color-brand-500)] bg-(--token-white) shadow-[0_0_0_1px_var(--color-brand-500),0_0_16px_var(--token-blue-light-500-30)] hover:shadow-[0_0_0_1px_var(--color-brand-500),0_0_24px_var(--token-blue-light-500-30)] dark:bg-(--token-gray-800)"
              : "border-dashed border-[var(--color-brand-500)] bg-(--token-gray-50) opacity-60 shadow-[0_0_0_1px_var(--color-brand-500),0_0_12px_var(--token-blue-light-500-15)] dark:bg-(--token-gray-900)"
          }
          ${!instance.isActive && roleCode !== "admin" ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-(--token-gray-900) dark:text-(--token-white)">
                {instance.name}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${
                    instance.type === "TABLE_SERVICE"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                  }`}
                >
                  {typeLabel}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${
                    instance.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {instance.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            {roleCode === "admin" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Edit outlet ${instance.name}`}
                  title={`Edit outlet ${instance.name}`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setIsEditOpen(true);
                  }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-(--token-gray-300) text-(--token-gray-700) transition-colors hover:bg-(--token-gray-50) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--token-brand-500) dark:border-(--token-gray-600) dark:text-(--token-gray-300) dark:hover:bg-(--token-gray-700)"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={`Hapus outlet ${instance.name}`}
                  title={`Hapus outlet ${instance.name}`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setIsDeleteOpen(true);
                  }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--token-red-400)] text-[var(--token-red-500)] transition-colors hover:bg-[var(--token-error-50)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--token-red-500) dark:border-[var(--token-red-500)] dark:text-[var(--token-red-400)] dark:hover:bg-[var(--token-red-500)]/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {instance.type === "TABLE_SERVICE" && (
            <div className="mt-4 flex items-center gap-1.5 text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>{instance.totalTable} meja</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="border-(--token-gray-200) bg-(--token-white) dark:border-(--token-gray-700) dark:bg-(--token-gray-800)">
          <DialogHeader>
            <DialogTitle className="text-(--token-gray-900) dark:text-(--token-white)">
              Edit POS Instance
            </DialogTitle>
            <DialogDescription className="text-(--token-gray-500) dark:text-(--token-gray-400)">
              Ubah data outlet tanpa keluar dari halaman portal.
            </DialogDescription>
          </DialogHeader>
          <POSInstanceForm
            instance={instance}
            redirectOnSuccess={false}
            onSuccess={() => setIsEditOpen(false)}
            onCancel={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="border-(--token-gray-200) bg-(--token-white) dark:border-(--token-gray-700) dark:bg-(--token-gray-800)">
          <DialogHeader>
            <DialogTitle className="text-(--token-gray-900) dark:text-(--token-white)">
              Hapus POS Instance
            </DialogTitle>
            <DialogDescription className="text-(--token-gray-500) dark:text-(--token-gray-400)">
              POS Instance{" "}
              <span className="font-medium text-(--token-gray-700) dark:text-(--token-gray-200)">
                {instance.name}
              </span>{" "}
              akan dihapus permanen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(false)}
              className="inline-flex items-center justify-center rounded-lg border border-(--token-gray-300) bg-(--token-white) px-4 py-2 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-50) dark:border-(--token-gray-600) dark:bg-(--token-gray-800) dark:text-(--token-gray-300) dark:hover:bg-(--token-gray-700)"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--token-red-400)] bg-[var(--token-white)] px-4 py-2 text-sm font-medium text-[var(--token-red-500)] transition-colors hover:bg-[var(--token-error-50)] disabled:opacity-50 dark:border-[var(--token-red-500)] dark:bg-[var(--token-red-500)]/20 dark:text-[var(--token-red-400)] dark:hover:bg-[var(--token-red-500)]/40"
            >
              {deleteMutation.isPending ? "Memproses..." : "Hapus"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
