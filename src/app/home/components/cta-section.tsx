import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="wrapper">
        <div className="relative overflow-hidden rounded-3xl border border-soft surface-elevated px-8 py-14 text-center md:px-14 md:py-20">
          <div className="hero-dot-grid pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" />

          <div className="relative">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-soft bg-(--token-gray-100) px-4 py-2 dark:bg-(--token-white-5)">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                Siap dalam 5 menit
              </p>
            </div>

            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-(--token-gray-900) dark:text-(--token-white) md:text-4xl">
              Mulai Kelola Toko Anda Hari Ini
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400) md:text-base">
              Ribuan toko sudah mempercepat transaksi dan memperketat kontrol
              stok dengan SIPOS. Bergabung dan rasakan perbedaannya.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Coba Gratis 14 Hari
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/#fitur"
                className="inline-flex items-center rounded-xl border border-soft px-7 py-3.5 text-sm font-semibold text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
              >
                Pelajari Fitur
              </Link>
            </div>

            <p className="mt-5 text-xs text-(--token-gray-400)">
              Tidak perlu kartu kredit. Tidak ada kontrak jangka panjang.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}