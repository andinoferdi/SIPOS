import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const registerHighlights = [
  "Setup sistem kasir dalam hitungan menit.",
  "Sinkronisasi menu, stok, dan laporan otomatis.",
  "Skalakan bisnis dari satu outlet ke banyak cabang.",
];

export const RegisterSocialProof = () => {
  return (
    <div className="space-y-6">
      <p className="inline-flex rounded-full border border-slate-200 bg-card px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
        Build for growth
      </p>

      <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
        Daftar sekarang dan mulai pakai POS yang dibuat untuk hospitality modern.
      </h2>

      <ul className="space-y-3">
        {registerHighlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80"
      >
        Lihat landing page
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
