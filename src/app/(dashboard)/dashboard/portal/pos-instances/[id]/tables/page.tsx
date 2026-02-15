"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { usePOSInstanceDetail } from "@/features/portal/hooks/use-pos-instance-detail";
import TableLabelEditor from "@/features/portal/components/table-label-editor";

export default function TableLabelsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: instance, isLoading } = usePOSInstanceDetail(id);

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

  if (instance.type !== "TABLE_SERVICE") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-(--token-gray-500)">
          Fitur ini hanya untuk POS Instance bertipe Table Service
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
            Label Meja — {instance.name}
          </h1>
          <p className="mt-1 text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
            Kustomisasi label untuk setiap meja
          </p>
        </div>
        <Link
          href={`/dashboard/portal/pos-instances/${id}`}
          className="inline-flex items-center rounded-lg border border-(--token-gray-300) bg-(--token-white) px-4 py-2 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-50) dark:border-(--token-gray-600) dark:bg-(--token-gray-800) dark:text-(--token-gray-300) dark:hover:bg-(--token-gray-700)"
        >
          ← Kembali
        </Link>
      </div>

      <TableLabelEditor posInstanceId={id} />
    </div>
  );
}
