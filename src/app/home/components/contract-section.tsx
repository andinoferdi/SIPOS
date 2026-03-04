type WorkflowAccent = "purple" | "blue" | "green";

type Step = {
  label: string;
  description: string;
};

type Workflow = {
  title: string;
  tag: string;
  accent: WorkflowAccent;
  description: string;
  steps: readonly Step[];
};

const WORKFLOWS: Workflow[] = [
  {
    title: "Transaksi Kasir",
    tag: "Alur 01",
    accent: "purple",
    description:
      "Proses transaksi dibuat singkat agar kasir dapat melayani pelanggan dengan cepat dan konsisten di jam sibuk.",
    steps: [
      { label: "Pilih Produk", description: "Cari item di grid atau pakai kode cepat" },
      { label: "Checkout", description: "Terapkan diskon dan pilih metode bayar" },
      { label: "Struk", description: "Cetak atau kirim struk dalam hitungan detik" },
    ],
  },
  {
    title: "Pergerakan Stok",
    tag: "Alur 02",
    accent: "blue",
    description:
      "Setiap barang masuk atau keluar tercatat otomatis sehingga snapshot stok selalu siap dipakai tim operasional.",
    steps: [
      { label: "Barang Masuk/Keluar", description: "Input mutasi stok manual atau dari transaksi" },
      { label: "Update Inventori", description: "Jumlah stok per SKU langsung berubah" },
      { label: "Pantau Minimum", description: "Notifikasi stok mendekati batas reorder" },
    ],
  },
  {
    title: "Monitoring Harian",
    tag: "Alur 03",
    accent: "green",
    description:
      "Ringkasan transaksi harian membantu supervisor membaca performa toko tanpa menunggu rekap manual dari kasir.",
    steps: [
      { label: "Rekap Penjualan", description: "Total omzet dan jumlah transaksi per shift" },
      { label: "Rekap Kas", description: "Selisih kas aktual dan catatan sistem" },
      { label: "Analisis Produk", description: "Item terlaris dan tren penjualan harian" },
    ],
  },
];

const FLOW_ACCENT: Record<
  WorkflowAccent,
  { label: string; panel: string; connector: string; dot: string }
> = {
  purple: {
    label: "module-accent-purple-label",
    panel: "module-accent-purple-endpoint",
    connector: "module-accent-purple-connector",
    dot: "module-accent-purple-dot",
  },
  blue: {
    label: "module-accent-blue-label",
    panel: "module-accent-blue-endpoint",
    connector: "module-accent-blue-connector",
    dot: "module-accent-blue-dot",
  },
  green: {
    label: "module-accent-green-label",
    panel: "module-accent-green-endpoint",
    connector: "module-accent-green-connector",
    dot: "module-accent-green-dot",
  },
};

const FAQS = [
  {
    question: "Apakah SIPOS cocok untuk retail dan F&B?",
    answer:
      "Ya. Alur kasir, stok, dan ringkasan penjualan dirancang untuk kebutuhan operasional harian retail dan F&B.",
  },
  {
    question: "Bisakah dipakai oleh lebih dari satu kasir?",
    answer:
      "Bisa. SIPOS mendukung alur multi kasir dengan kontrol role agar tugas tim tetap rapi dan mudah diaudit.",
  },
  {
    question: "Bagaimana evaluasi performa harian dilakukan?",
    answer:
      "Supervisor dapat memantau ringkasan penjualan, jumlah transaksi, dan item terlaris dari satu dasbor.",
  },
  {
    question: "Apakah data stok ikut terpantau?",
    answer:
      "Ya. Pergerakan stok masuk dan keluar dicatat sehingga snapshot stok selalu siap dipantau kapan saja.",
  },
  {
    question: "Apakah tersedia versi percobaan?",
    answer:
      "Ada. Anda bisa mencoba semua fitur SIPOS gratis selama 14 hari tanpa memasukkan informasi kartu kredit.",
  },
  {
    question: "Bagaimana dukungan teknis diberikan?",
    answer:
      "Tim SIPOS siap membantu melalui email dan live chat selama jam operasional untuk memastikan toko Anda berjalan lancar.",
  },
] as const;

export default function ContractSection() {
  return (
    <section id="alur" className="scroll-mt-28 py-14 md:py-20">
      <div className="wrapper">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest marketing-accent-text">
            Alur SIPOS
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white) md:text-3xl">
            Alur Operasional yang Ringkas dari Kasir sampai Laporan
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400) md:text-base">
            Setiap alur dirancang agar tim di lapangan dapat bekerja konsisten
            tanpa perlu pelatihan panjang.
          </p>
        </div>

        {/* Workflow cards */}
        <div className="space-y-4">
          {WORKFLOWS.map((workflow) => {
            const accent = FLOW_ACCENT[workflow.accent];

            return (
              <article
                key={workflow.title}
                className="overflow-hidden rounded-2xl border border-soft surface-elevated"
              >
                <div className="flex items-center justify-between border-b border-soft px-5 py-4 md:px-7">
                  <div>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${accent.panel}`}
                    >
                      {workflow.tag}
                    </span>
                    <h3 className="mt-1.5 text-sm font-bold text-(--token-gray-900) dark:text-(--token-white) md:text-base">
                      {workflow.title}
                    </h3>
                  </div>
                  <p className="hidden max-w-xs text-xs leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400) md:block">
                    {workflow.description}
                  </p>
                </div>

                <p className="px-5 pt-4 text-xs leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400) md:hidden md:px-7">
                  {workflow.description}
                </p>

                {/* Step flow */}
                <div className="flex flex-col gap-3 p-5 md:flex-row md:items-start md:gap-0 md:px-7 md:py-6">
                  {workflow.steps.map((step, index) => {
                    const isLast = index === workflow.steps.length - 1;

                    return (
                      <div
                        key={`${workflow.title}-${step.label}`}
                        className="flex flex-1 items-start gap-3 md:flex-col md:items-center md:gap-0 md:text-center"
                      >
                        <div className="flex flex-col items-center md:w-full">
                          {/* Step indicator */}
                          <div className="flex items-center md:w-full">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${accent.panel}`}
                            >
                              {index + 1}
                            </div>
                            {!isLast && (
                              <div
                                className={`hidden h-0.5 flex-1 md:block ${accent.connector}`}
                              />
                            )}
                          </div>
                        </div>

                        <div className="md:mt-3 md:px-2">
                          <p className="text-xs font-semibold text-(--token-gray-800) dark:text-(--token-gray-200)">
                            {step.label}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400)">
                            {step.description}
                          </p>
                        </div>

                        {/* Mobile connector */}
                        {!isLast && (
                          <div
                            className={`ml-[15px] h-4 w-0.5 md:hidden ${accent.connector}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        {/* FAQ */}
        <div
          id="faq"
          className="mt-14 scroll-mt-28 rounded-2xl border border-soft surface-elevated p-6 md:p-8"
        >
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest marketing-accent-text">
              FAQ
            </p>
            <h3 className="mt-2 text-xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
              Pertanyaan yang Sering Ditanyakan
            </h3>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-soft p-4 transition-colors hover:bg-(--token-gray-100) dark:hover:bg-(--token-white-5)"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-(--token-gray-900) dark:text-(--token-white)">
                  {faq.question}
                </summary>
                <p className="mt-2.5 text-sm leading-relaxed text-(--token-gray-500) dark:text-(--token-gray-400)">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
