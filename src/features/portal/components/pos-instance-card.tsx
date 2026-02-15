"use client";

import type { RoleCode } from "@/types/rbac";
import { useRouter } from "next/navigation";
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

  const handleClick = () => {
    if (!instance.isActive && roleCode !== "admin") return;

    if (roleCode === "admin") {
      router.push(`/dashboard/portal/pos-instances/${instance.id}`);
      return;
    }

    const base = `/dashboard/pos/sales`;
    const params = `?posInstanceId=${instance.id}`;

    if (roleCode === "fnb") {
      router.push(`${base}/create${params}`);
    } else {
      router.push(`${base}${params}`);
    }
  };

  const typeLabel =
    instance.type === "TABLE_SERVICE" ? "Table Service" : "Tab Service";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!instance.isActive && roleCode !== "admin"}
      className={`group relative w-full rounded-2xl border p-6 text-left transition-all duration-200
        ${
          instance.isActive
            ? "border-(--token-gray-200) bg-(--token-white) hover:border-(--token-brand-300) hover:shadow-lg dark:border-(--token-gray-700) dark:bg-(--token-gray-800) dark:hover:border-(--token-brand-600)"
            : "border-dashed border-(--token-gray-300) bg-(--token-gray-50) opacity-60 dark:border-(--token-gray-600) dark:bg-(--token-gray-900)"
        }`}
    >
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
      </div>

      {instance.type === "TABLE_SERVICE" && (
        <div className="mt-4 flex items-center gap-1.5 text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span>{instance.totalTable} meja</span>
        </div>
      )}
    </button>
  );
}
