"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createPOSInstanceSchema,
  updatePOSInstanceSchema,
  type CreatePOSInstanceInput,
  type UpdatePOSInstanceInput,
} from "../schemas/pos-instance.schema";
import {
  useCreatePOSInstance,
  useUpdatePOSInstance,
} from "../hooks/use-pos-instances";
import type { POSInstanceResponse } from "../types";

type POSInstanceFormProps = {
  instance?: POSInstanceResponse;
};

export default function POSInstanceForm({ instance }: POSInstanceFormProps) {
  const router = useRouter();
  const isEdit = !!instance;

  const createMutation = useCreatePOSInstance();
  const updateMutation = useUpdatePOSInstance(instance?.id ?? "");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePOSInstanceInput | UpdatePOSInstanceInput>({
    resolver: zodResolver(isEdit ? updatePOSInstanceSchema : createPOSInstanceSchema),
    defaultValues: isEdit
      ? { name: instance.name, totalTable: instance.totalTable || undefined }
      : { name: "", type: "TABLE_SERVICE", totalTable: 1 },
  });

  const watchType = watch("type" as "name");

  const onSubmit = async (data: CreatePOSInstanceInput | UpdatePOSInstanceInput) => {
    try {
      if (isEdit) {
        const updateData: UpdatePOSInstanceInput = {};
        if (data.name) updateData.name = data.name;
        if ("totalTable" in data && data.totalTable !== undefined) {
          updateData.totalTable = data.totalTable;
        }
        await updateMutation.mutateAsync(updateData);
        toast.success("POS Instance berhasil diperbarui");
      } else {
        const createData = data as CreatePOSInstanceInput;
        if (createData.type === "TAB_SERVICE") {
          delete (createData as Record<string, unknown>).totalTable;
        }
        await createMutation.mutateAsync(createData);
        toast.success("POS Instance berhasil dibuat");
      }
      router.push("/dashboard/portal");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal menyimpan";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="pos-name"
          className="mb-1.5 block text-sm font-medium text-(--token-gray-700) dark:text-(--token-gray-300)"
        >
          Nama POS Instance
        </label>
        <input
          id="pos-name"
          type="text"
          {...register("name")}
          placeholder="Contoh: Outlet Lantai 1"
          className="block w-full rounded-lg border border-(--token-gray-300) bg-(--token-white) px-4 py-2.5 text-sm text-(--token-gray-900) placeholder:text-(--token-gray-400) focus:border-(--token-brand-500) focus:ring-2 focus:ring-(--token-brand-500)/20 dark:border-(--token-gray-600) dark:bg-(--token-gray-800) dark:text-(--token-white)"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Type (only on create) */}
      {!isEdit && (
        <div>
          <label
            htmlFor="pos-type"
            className="mb-1.5 block text-sm font-medium text-(--token-gray-700) dark:text-(--token-gray-300)"
          >
            Tipe Layanan
          </label>
          <select
            id="pos-type"
            {...register("type" as "name")}
            className="block w-full rounded-lg border border-(--token-gray-300) bg-(--token-white) px-4 py-2.5 text-sm text-(--token-gray-900) focus:border-(--token-brand-500) focus:ring-2 focus:ring-(--token-brand-500)/20 dark:border-(--token-gray-600) dark:bg-(--token-gray-800) dark:text-(--token-white)"
          >
            <option value="TABLE_SERVICE">Table Service</option>
            <option value="TAB_SERVICE">Tab Service</option>
          </select>
          {"type" in errors && errors.type && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {(errors.type as { message?: string }).message}
            </p>
          )}
        </div>
      )}

      {/* Read-only type display on edit */}
      {isEdit && instance && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-(--token-gray-700) dark:text-(--token-gray-300)">
            Tipe Layanan
          </label>
          <p className="rounded-lg border border-(--token-gray-200) bg-(--token-gray-50) px-4 py-2.5 text-sm text-(--token-gray-600) dark:border-(--token-gray-700) dark:bg-(--token-gray-800) dark:text-(--token-gray-400)">
            {instance.type === "TABLE_SERVICE" ? "Table Service" : "Tab Service"}
          </p>
        </div>
      )}

      {/* Total Table (TABLE_SERVICE only) */}
      {((!isEdit && watchType === "TABLE_SERVICE") ||
        (isEdit && instance?.type === "TABLE_SERVICE")) && (
        <div>
          <label
            htmlFor="pos-total-table"
            className="mb-1.5 block text-sm font-medium text-(--token-gray-700) dark:text-(--token-gray-300)"
          >
            Jumlah Meja
          </label>
          <input
            id="pos-total-table"
            type="number"
            min={1}
            max={200}
            {...register("totalTable", { valueAsNumber: true })}
            className="block w-full rounded-lg border border-(--token-gray-300) bg-(--token-white) px-4 py-2.5 text-sm text-(--token-gray-900) focus:border-(--token-brand-500) focus:ring-2 focus:ring-(--token-brand-500)/20 dark:border-(--token-gray-600) dark:bg-(--token-gray-800) dark:text-(--token-white)"
          />
          {errors.totalTable && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.totalTable.message}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-lg bg-(--token-brand-600) px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--token-brand-700) disabled:opacity-50"
        >
          {isSubmitting
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Buat POS Instance"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center rounded-lg border border-(--token-gray-300) bg-(--token-white) px-5 py-2.5 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-50) dark:border-(--token-gray-600) dark:bg-(--token-gray-800) dark:text-(--token-gray-300) dark:hover:bg-(--token-gray-700)"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
