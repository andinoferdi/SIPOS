import Link from "next/link";
import PosMockup from "./pos-mockup";

const TAGS = [
  "Kasir cepat untuk transaksi harian",
  "Kontrol stok per produk dan varian",
  "Laporan penjualan harian otomatis",
] as const;

export default function HeroSection() {
  return (
    <section className="pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="wrapper">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-soft bg-(--token-gray-100) px-3 py-1.5 dark:bg-(--token-white-5)">
              <span className="marketing-live-dot h-1.5 w-1.5 animate-pulse rounded-full" />
              <p className="marketing-accent-text text-xs font-semibold">
                SIPOS - Point of Sale Modern
              </p>
            </div>

            <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.2rem)] font-bold leading-[1.06] tracking-tight text-(--token-gray-900) dark:text-(--token-white)">
              Satu Sistem untuk{" "}
              <span className="marketing-accent-text">Kasir, Stok, dan Laporan</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-(--token-gray-500) dark:text-(--token-gray-400) md:text-lg md:leading-8">
              SIPOS mempercepat checkout, menjaga pergerakan stok tetap akurat,
              dan menyajikan ringkasan penjualan harian tanpa alur kerja yang
              rumit.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 rounded-lg border border-soft bg-transparent px-3 py-1.5 text-xs font-medium text-(--token-gray-600) dark:text-(--token-gray-300)"
                >
                  <span className="marketing-accent-text h-1 w-1 shrink-0 rounded-full bg-current" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="marketing-primary-button inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold transition-opacity"
              >
                Mulai Gratis 14 Hari
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
                className="inline-flex items-center rounded-xl border border-soft px-6 py-3 text-sm font-semibold text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
              >
                Lihat Fitur Utama
              </Link>
            </div>

            <p className="mt-4 text-xs text-(--token-gray-400)">
              Tidak perlu kartu kredit. Setup dalam 5 menit.
            </p>
          </div>

          <div className="relative">
            <div className="marketing-primary-glow absolute -inset-4 rounded-3xl blur-2xl" />
            <div className="relative">
              <PosMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
