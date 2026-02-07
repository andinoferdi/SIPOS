import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const loginHighlights = [
  "Pantau transaksi real-time tanpa refresh.",
  "Laporan penjualan harian langsung siap pakai.",
  "Akses multi-cabang dengan satu akun.",
];

export const LoginSocialProof = () => {
  return (
    <div className="space-y-6">
      <p className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Trusted by modern hospitality teams
      </p>

      <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
        Kelola operasional restoran Anda dengan cepat dan akurat.
      </h2>

      <ul className="space-y-3">
        {loginHighlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-foreground">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80"
      >
        Kembali ke landing page
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};
