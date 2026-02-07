import { DashboardHomeMain } from "@/blocks/dashboard/components/dashboard-home-main";
import { DashboardPaymentPanel } from "@/blocks/dashboard/components/dashboard-payment-panel";
import { DashboardShell } from "@/blocks/dashboard/components/dashboard-shell";

export const DashboardPage = () => {
  return (
    <DashboardShell
      activePath="/dashboard"
      title="Good Morning, Alex"
      subtitle="Friday, 24th Nov, 10:45 AM"
      primaryActionLabel="New Reservation"
      sidePanel={<DashboardPaymentPanel />}
    >
      <DashboardHomeMain />
    </DashboardShell>
  );
};
