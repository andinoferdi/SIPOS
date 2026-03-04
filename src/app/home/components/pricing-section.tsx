import Link from "next/link";

type PricingTier = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  ctaHref: string;
  highlighted: boolean;
  badge?: string;
  features: readonly string[];
};

const TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Pemula",
    price: "Gratis",
    period: "14 hari percobaan",
    description:
      "Coba semua fitur SIPOS tanpa biaya. Tidak perlu kartu kredit.",
    cta: "Mulai Gratis",
    ctaHref: "/login",
    highlighted: false,
    features: [
      "1 kasir aktif",
      "Manajemen produk dasar",
      "Laporan penjualan harian",
      "Dukungan via email",
    ],
  },
  {
    id: "pro",
    name: "Profesional",
    price: "Rp 299.000",
    period: "per outlet / bulan",
    description:
      "Untuk toko yang sudah aktif beroperasi dan butuh kontrol lebih rapi.",
    cta: "Mulai Sekarang",
    ctaHref: "/login",
    highlighted: true,
    badge: "Paling Populer",
    features: [
      "Kasir tidak terbatas",
      "Multi role kasir dan supervisor",
      "Manajemen stok dan mutasi",
      "Promo dan diskon fleksibel",
      "Laporan harian dan mingguan",
      "Dukungan prioritas via chat",
    ],
  },
  {
    id: "bisnis",
    name: "Bisnis",
    price: "Hubungi Kami",
    period: "harga khusus multi-outlet",
    description:
      "Untuk chain atau jaringan toko yang membutuhkan sinkronisasi lintas outlet.",
    cta: "Hubungi Tim",
    ctaHref: "/#faq",
    highlighted: false,
    features: [
      "Semua fitur Profesional",
      "Sinkron stok lintas outlet",
      "Dasbor monitoring terpusat",
      "Integrasi akuntansi",
      "Onboarding dan pelatihan tim",
      "SLA dan dedicated support",
    ],
  },
] as const;

function CheckIcon() {
  return (
    <svg
      className="marketing-accent-text h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="harga" className="scroll-mt-28 py-14 md:py-20">
      <div className="wrapper">
        <div className="mb-12 text-center">
          <p className="marketing-accent-text text-xs font-semibold uppercase tracking-widest">
            Harga
          </p>
          <h2 className="mt-3 text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white) md:text-3xl">
            Pilih Paket yang Sesuai
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400) md:text-base">
            Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`relative flex flex-col overflow-hidden rounded-2xl border ${
                tier.highlighted ? "marketing-highlight-border" : "border-soft"
              } surface-elevated p-6`}
            >
              {tier.badge && (
                <div className="absolute right-5 top-5">
                  <span className="marketing-primary-badge rounded-full px-2.5 py-1 text-[10px] font-bold">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-(--token-gray-500) dark:text-(--token-gray-400)">
                  {tier.name}
                </p>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
                    {tier.price}
                  </span>
                  <p className="mt-0.5 text-xs text-(--token-gray-400)">
                    {tier.period}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400)">
                  {tier.description}
                </p>
              </div>

              <ul className="my-6 flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-(--token-gray-600) dark:text-(--token-gray-300)"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`block rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-opacity ${
                  tier.highlighted
                    ? "marketing-primary-button hover:opacity-80"
                    : "border border-soft text-(--token-gray-700) hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
                }`}
              >
                {tier.cta}
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-(--token-gray-400) dark:text-(--token-gray-500)">
          Harga belum termasuk PPN. Pembayaran tahunan tersedia dengan diskon
          khusus.
        </p>
      </div>
    </section>
  );
}
