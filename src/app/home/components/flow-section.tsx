type FeatureAccent = "purple" | "blue" | "green";

type Feature = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: FeatureAccent;
  highlight?: boolean;
};

const accentConfig: Record<
  FeatureAccent,
  { icon: string; badge: string; dot: string }
> = {
  purple: {
    icon: "module-accent-purple-endpoint",
    badge: "module-accent-purple-label",
    dot: "module-accent-purple-dot",
  },
  blue: {
    icon: "module-accent-blue-endpoint",
    badge: "module-accent-blue-label",
    dot: "module-accent-blue-dot",
  },
  green: {
    icon: "module-accent-green-endpoint",
    badge: "module-accent-green-label",
    dot: "module-accent-green-dot",
  },
};

function KasirIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function StokIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function LaporanIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function RoleIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function PromoIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function MultiOutletIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="8" height="6" rx="1" />
      <rect x="14" y="3" width="8" height="6" rx="1" />
      <rect x="8" y="14" width="8" height="6" rx="1" />
      <path d="M6 9v2.5M18 9v2.5M12 9v2.5M6 11.5H18M12 14v-2" />
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    id: "kasir",
    icon: <KasirIcon />,
    title: "Kasir dan Checkout Cepat",
    description:
      "Pencarian produk, perhitungan otomatis, dan pembayaran fleksibel selesai dalam satu layar tanpa alur yang berlebihan.",
    accent: "purple",
    highlight: true,
  },
  {
    id: "stok",
    icon: <StokIcon />,
    title: "Produk dan Stok Realtime",
    description:
      "Setiap pergerakan barang masuk dan keluar langsung tercatat sehingga data stok selalu sinkron dengan kondisi gudang.",
    accent: "blue",
    highlight: true,
  },
  {
    id: "laporan",
    icon: <LaporanIcon />,
    title: "Laporan Penjualan Otomatis",
    description:
      "Ringkasan omzet, jumlah transaksi, dan produk terlaris tersaji setiap hari tanpa perlu rekap manual.",
    accent: "green",
    highlight: true,
  },
  {
    id: "role",
    icon: <RoleIcon />,
    title: "Multi Kasir dan Role",
    description:
      "Akses fitur disesuaikan per peran sehingga aktivitas kasir dan supervisor tetap terkontrol dan mudah diaudit.",
    accent: "purple",
  },
  {
    id: "promo",
    icon: <PromoIcon />,
    title: "Promo dan Diskon",
    description:
      "Aturan diskon nominal atau persentase diterapkan langsung saat checkout agar program promo berjalan konsisten.",
    accent: "blue",
  },
  {
    id: "outlet",
    icon: <MultiOutletIcon />,
    title: "Sinkron Lintas Outlet",
    description:
      "Data kasir dan stok dari beberapa outlet tersinkron sehingga monitoring operasional tetap terpusat.",
    accent: "green",
  },
];

export default function FlowSection() {
  return (
    <section id="fitur" className="scroll-mt-28 py-14 md:py-20">
      <div className="wrapper">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest marketing-accent-text">
            Fitur SIPOS
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white) md:text-3xl">
            Semua yang Dibutuhkan untuk Operasional Harian
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400) md:text-base">
            Dari kasir sampai laporan, SIPOS menyatukan alur kerja tim dalam
            satu sistem yang ringan dan mudah dipelajari.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => {
            const accent = accentConfig[feature.accent];

            return (
              <article
                key={feature.id}
                className={`group relative overflow-hidden rounded-2xl border border-soft surface-elevated p-6 transition-shadow hover:shadow-md ${
                  feature.highlight ? "" : ""
                }`}
              >
                <div
                  className={`mb-4 inline-flex items-center justify-center rounded-xl border p-3 ${accent.icon}`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-sm font-bold text-(--token-gray-900) dark:text-(--token-white)">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400)">
                  {feature.description}
                </p>

                <span
                  className={`mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest ${accent.badge}`}
                >
                  <span className={`h-1 w-1 rounded-full ${accent.dot}`} />
                  Tersedia
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
