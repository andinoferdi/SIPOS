"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  usePOSInstanceDetail,
} from "@/features/portal/hooks/use-pos-instance-detail";
import {
  useDeletePOSInstance,
  useRestorePOSInstance,
} from "@/features/portal/hooks/use-pos-instances";
import POSInstanceForm from "@/features/portal/components/pos-instance-form";

export default function POSInstanceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: instance, isLoading } = usePOSInstanceDetail(id);
  const deleteMutation = useDeletePOSInstance();
  const restoreMutation = useRestorePOSInstance();

  const handleDelete = async () => {
    if (!instance) return;
    try {
      await deleteMutation.mutateAsync(instance.id);
      toast.success("POS Instance dinonaktifkan");
      router.push("/dashboard/portal");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal menonaktifkan";
      toast.error(message);
    }
  };

  const handleRestore = async () => {
    if (!instance) return;
    try {
      await restoreMutation.mutateAsync(instance.id);
      toast.success("POS Instance diaktifkan kembali");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal mengaktifkan";
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--token-brand-600) border-t-transparent" />
      </div>
    );
  }

  if (!instance) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-(--token-gray-500)">
          POS Instance tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
            Edit POS Instance
          </h1>
          <p className="mt-1 text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
            Kelola detail outlet
          </p>
        </div>
        <div className="flex items-center gap-2">
          {instance.type === "TABLE_SERVICE" && (
            <Link
              href={`/dashboard/portal/pos-instances/${id}/tables`}
              className="inline-flex items-center rounded-lg border border-(--token-gray-300) bg-(--token-white) px-4 py-2 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-50) dark:border-(--token-gray-600) dark:bg-(--token-gray-800) dark:text-(--token-gray-300) dark:hover:bg-(--token-gray-700)"
            >
              Label Meja
            </Link>
          )}
          {instance.isActive ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="inline-flex items-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
            >
              Nonaktifkan
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRestore}
              disabled={restoreMutation.isPending}
              className="inline-flex items-center rounded-lg border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
            >
              Aktifkan
            </button>
          )}
        </div>
      </div>

      <POSInstanceForm instance={instance} />
    </div>
  );
}
