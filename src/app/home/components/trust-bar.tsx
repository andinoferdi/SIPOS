const STATS = [
    { value: "500+", label: "Toko Aktif" },
    { value: "2 Juta+", label: "Transaksi Diproses" },
    { value: "< 5 Dtk", label: "Rata-rata Checkout" },
    { value: "99.9%", label: "Uptime Sistem" },
  ] as const;
  
  const MERCHANT_TYPES = [
    {
      label: "Retail & Minimarket",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: "Kafe & F&B",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8h1a4 4 0 010 8h-1" />
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
    },
    {
      label: "UMKM & Warung",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      label: "Apotek & Toko Spesialis",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      ),
    },
  ] as const;
  
  export default function TrustBar() {
    return (
      <section className="border-y border-soft bg-(--token-gray-50) py-10 dark:bg-(--token-white-5)">
        <div className="wrapper">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-(--token-gray-400) dark:text-(--token-gray-500)">
            Dipercaya oleh ratusan toko di seluruh Indonesia
          </p>
  
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold tabular-nums text-(--token-gray-900) dark:text-(--token-white) md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-(--token-gray-500) dark:text-(--token-gray-400)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
  
          {/* Merchant types */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {MERCHANT_TYPES.map((type) => (
              <span
                key={type.label}
                className="flex items-center gap-2 rounded-full border border-soft px-4 py-2 text-xs font-medium text-(--token-gray-600) dark:text-(--token-gray-400)"
              >
                <span className="text-(--token-gray-400) dark:text-(--token-gray-500)">
                  {type.icon}
                </span>
                {type.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }