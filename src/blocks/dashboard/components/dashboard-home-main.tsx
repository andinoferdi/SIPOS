import { Check, Circle, Pencil, Users } from "lucide-react";

interface KpiCard {
  badge: string;
  label: string;
  tone: "info" | "success" | "warning";
  trend: string;
  value: string;
}

interface TableCard {
  amount?: string;
  id: string;
  occupancy?: string;
  status: "empty" | "occupied" | "payment";
  subtitle: string;
}

interface InventoryAlert {
  category: string;
  item: string;
  status: "low" | "unlimited";
}

const kpiCards: KpiCard[] = [
  { badge: "Total Sales", label: "Today", tone: "success", trend: "+12% vs yesterday", value: "$1,245" },
  { badge: "Active Tables", label: "Capacity", tone: "info", trend: "66% capacity", value: "8/12" },
  { badge: "Avg Wait Time", label: "Service", tone: "warning", trend: "-5% improved", value: "15m" },
];

const tableCards: TableCard[] = [
  { amount: "$84.50", id: "01", occupancy: "Seated: 45m", status: "occupied", subtitle: "Occupied" },
  { amount: "$120.00", id: "02", status: "payment", subtitle: "Bill Requested" },
  { id: "03", status: "empty", subtitle: "Assign Table" },
  { amount: "$45.00", id: "04", occupancy: "Seated: 12m", status: "occupied", subtitle: "Occupied" },
  { id: "05", status: "empty", subtitle: "Assign Table" },
  { amount: "$210.00", id: "06", occupancy: "Seated: 1h 20m", status: "occupied", subtitle: "Occupied" },
];

const inventoryAlerts: InventoryAlert[] = [
  { category: "Beverages", item: "Sparkling Water", status: "unlimited" },
  { category: "Alcohol", item: "House Red Wine", status: "low" },
];

const toneClasses = {
  info: {
    badge: "bg-info/15 text-info",
    card: "bg-card text-foreground",
    icon: "bg-info/15 text-info",
    spark: "bg-info",
  },
  success: {
    badge: "bg-success/15 text-success",
    card: "bg-card text-foreground",
    icon: "bg-success/15 text-success",
    spark: "bg-success",
  },
  warning: {
    badge: "bg-warning/15 text-warning",
    card: "bg-card text-foreground",
    icon: "bg-warning/15 text-warning",
    spark: "bg-warning",
  },
};

const tableClasses = {
  empty: "border-dashed border-border bg-card text-muted-foreground",
  occupied: "border-info/35 bg-info/10 text-info",
  payment: "border-warning/45 bg-warning/10 text-warning",
};

const tableIcons = {
  empty: Circle,
  occupied: Users,
  payment: Check,
};

export const DashboardHomeMain = () => {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        {kpiCards.map((card) => {
          const tone = toneClasses[card.tone];

          return (
            <article key={card.badge} className={`rounded-3xl border border-border p-6 shadow-sm ${tone.card}`}>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-muted-foreground">{card.badge}</p>
                  <h3 className="mt-1 text-4xl font-black tracking-tight">{card.value}</h3>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tone.icon}`}>
                  <div className="h-2.5 w-2.5 rounded-full bg-current" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone.badge}`}>{card.trend}</span>
                <div className="flex w-20 items-end gap-1">
                  <span className={`h-2 w-3 rounded-full ${tone.spark} opacity-60`} />
                  <span className={`h-4 w-3 rounded-full ${tone.spark} opacity-80`} />
                  <span className={`h-3 w-3 rounded-full ${tone.spark}`} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Live Floor Status</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">Empty</span>
            <span className="rounded-full border border-info/40 bg-info/10 px-3 py-1 text-info">Occupied</span>
            <span className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-warning">Payment</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tableCards.map((table) => {
            const Icon = tableIcons[table.status];

            return (
              <article
                key={table.id}
                className={`relative min-h-44 rounded-3xl border-2 p-5 transition ${tableClasses[table.status]}`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <p className="text-4xl font-black tracking-tight">{table.id}</p>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-end justify-between gap-2">
                    <p className="text-sm font-bold">{table.subtitle}</p>
                    {table.amount ? <p className="text-3xl font-black tracking-tight">{table.amount}</p> : null}
                  </div>

                  {table.status === "payment" ? (
                    <button
                      type="button"
                      className="mt-2 h-10 w-full rounded-xl bg-warning px-3 text-sm font-bold text-warning-foreground"
                    >
                      Process Payment
                    </button>
                  ) : null}

                  {table.occupancy ? (
                    <p className="text-xs font-semibold text-muted-foreground">{table.occupancy}</p>
                  ) : null}

                  {table.status === "empty" ? (
                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <Circle className="h-4 w-4" />
                      <span>Assign Table</span>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Inventory Alerts</h2>
          <button type="button" className="text-sm font-bold text-primary">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-y border-border bg-muted/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-bold">Item Name</th>
                <th className="px-6 py-3 font-bold">Category</th>
                <th className="px-6 py-3 font-bold">Stock Status</th>
                <th className="px-6 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventoryAlerts.map((item) => {
                return (
                  <tr key={item.item} className="border-b border-border/70 text-sm">
                    <td className="px-6 py-4 font-semibold text-foreground">{item.item}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                    <td className="px-6 py-4">
                      {item.status === "unlimited" ? (
                        <span className="inline-flex rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
                          Unlimited
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
                          Low Stock (3)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button type="button" className="text-muted-foreground transition hover:text-foreground">
                        <Pencil className="ml-auto h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
