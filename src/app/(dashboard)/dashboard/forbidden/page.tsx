import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <section className="rounded-2xl border border-[var(--token-gray-200)] bg-[var(--token-white)] p-6 dark:border-[var(--token-gray-800)] dark:bg-[var(--token-gray-900)]">
      <h1 className="text-2xl font-semibold text-[var(--token-gray-800)] dark:text-[var(--token-white-90)]">
        Akses Ditolak
      </h1>
      <p className="mt-3 text-sm text-[var(--token-gray-500)] dark:text-[var(--token-gray-400)]">
        Role Anda tidak punya permission untuk membuka halaman ini.
      </p>
      <div className="mt-6">
        <Link
          href="/dashboard"
          className="inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-medium text-[var(--token-white)] hover:bg-primary-600"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </section>
  );
}
