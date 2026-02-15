"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePOSInstances } from "@/features/portal/hooks/use-pos-instances";
import POSInstanceCard from "@/features/portal/components/pos-instance-card";
import type { RoleCode } from "@/types/rbac";

export default function PortalPage() {
  const { data: session } = useSession();
  const { data: instances, isLoading } = usePOSInstances();

  const roleCode = (session?.user?.roleCode as RoleCode) ?? null;
  const isAdmin = roleCode === "admin";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
            POS Outlets
          </h1>
          <p className="mt-1 text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
            Pilih outlet untuk mulai operasional POS
          </p>
        </div>
        {isAdmin && (
          <Link
            href="/dashboard/portal/pos-instances/create"
            className="inline-flex items-center rounded-lg bg-(--token-brand-600) px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-(--token-brand-700)"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah POS Instance
          </Link>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--token-brand-600) border-t-transparent" />
        </div>
      )}

      {!isLoading && (!instances || instances.length === 0) && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-(--token-gray-300) py-20 dark:border-(--token-gray-600)">
          <p className="text-lg font-medium text-(--token-gray-500) dark:text-(--token-gray-400)">
            Belum ada POS Instance
          </p>
          {isAdmin && (
            <Link
              href="/dashboard/portal/pos-instances/create"
              className="mt-4 text-sm font-medium text-(--token-brand-600) hover:text-(--token-brand-700) dark:text-(--token-brand-400)"
            >
              Buat POS Instance pertama →
            </Link>
          )}
        </div>
      )}

      {!isLoading && instances && instances.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instances.map((instance) => (
            <POSInstanceCard
              key={instance.id}
              instance={instance}
              roleCode={roleCode}
            />
          ))}
        </div>
      )}
    </div>
  );
}
