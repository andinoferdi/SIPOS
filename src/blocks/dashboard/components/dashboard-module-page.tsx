import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { DashboardShell } from "@/blocks/dashboard/components/dashboard-shell";

interface ModuleMetric {
  label: string;
  value: string;
}

interface ModuleTableColumn {
  key: string;
  label: string;
}

interface ModuleTableRow {
  id: string;
  values: Record<string, string>;
}

interface DashboardModulePageProps {
  actionHref?: string;
  actionLabel?: string;
  activePath: string;
  columns: ModuleTableColumn[];
  description: string;
  metrics: ModuleMetric[];
  rows: ModuleTableRow[];
  title: string;
  toolbar?: ReactNode;
}

export const DashboardModulePage = ({
  actionHref,
  actionLabel,
  activePath,
  columns,
  description,
  metrics,
  rows,
  title,
  toolbar,
}: DashboardModulePageProps) => {
  return (
    <DashboardShell activePath={activePath} title={title} subtitle={description} primaryActionLabel={actionLabel}>
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-foreground">{metric.value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-card shadow-sm">
          <header className="flex flex-col gap-3 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-lg font-bold text-foreground">Data List</p>
            <div className="flex items-center gap-2">
              {toolbar}
              {actionHref && actionLabel ? (
                <Link href={actionHref} className="inline-flex items-center gap-1 rounded-xl bg-dashboard-accent px-4 py-2 text-sm font-bold text-dashboard-accent-foreground">
                  {actionLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-border bg-muted/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  {columns.map((column) => (
                    <th key={column.key} className="px-5 py-3 font-bold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/70 text-sm">
                    {columns.map((column) => (
                      <td key={`${row.id}-${column.key}`} className="px-5 py-4 text-foreground">
                        {row.values[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
};
