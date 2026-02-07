import { CheckCircle2, CreditCard, QrCode, Wallet } from "lucide-react";

const paymentOptions = [
  { icon: Wallet, id: "cash", label: "Cash" },
  { icon: CreditCard, id: "card", label: "Card" },
  { icon: QrCode, id: "qris", label: "QRIS" },
] as const;

export const DashboardPaymentPanel = () => {
  return (
    <aside className="rounded-3xl border border-border bg-card shadow-lg">
      <div className="border-b border-border px-5 py-4">
        <p className="text-3xl font-bold tracking-tight text-foreground">Table 02</p>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Awaiting Payment</p>
      </div>

      <div className="space-y-6 p-5">
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          <div className="space-y-1">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-dashboard-accent text-dashboard-accent-foreground">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <p>Review</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-dashboard-accent text-dashboard-accent-foreground">2</div>
            <p>Payment</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">3</div>
            <p>Receipt</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/60 px-4 py-5 text-center">
          <p className="text-sm font-semibold text-muted-foreground">Total Due</p>
          <p className="mt-1 text-5xl font-black tracking-tight text-foreground">$120.00</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-bold text-foreground">Select Method</p>
          <div className="grid grid-cols-3 gap-2">
            {paymentOptions.map((option, index) => {
              const Icon = option.icon;
              const isActive = index === 0;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={isActive
                    ? "rounded-xl border-2 border-dashboard-accent bg-dashboard-accent/10 p-3 text-dashboard-accent-foreground"
                    : "rounded-xl border border-border bg-card p-3 text-muted-foreground hover:bg-muted"}
                >
                  <Icon className="mx-auto h-5 w-5" />
                  <p className="mt-2 text-xs font-bold">{option.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-bold text-foreground">Received Amount</p>
          <div className="rounded-xl border border-border bg-muted px-4 py-3 text-3xl font-black tracking-tight text-foreground">$120.00</div>
          <div className="flex gap-2">
            <button type="button" className="rounded-lg bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">$120</button>
            <button type="button" className="rounded-lg bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">$130</button>
            <button type="button" className="rounded-lg bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">$150</button>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-5">
        <button
          type="button"
          className="h-12 w-full rounded-xl bg-dashboard-accent text-base font-bold text-dashboard-accent-foreground shadow-md shadow-dashboard-accent/30"
        >
          Mark as Paid
        </button>
        <button type="button" className="mt-2 h-10 w-full rounded-xl text-sm font-bold text-muted-foreground">Split Bill</button>
      </div>
    </aside>
  );
};
