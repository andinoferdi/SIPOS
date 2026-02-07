import { DashboardModulePage } from "@/blocks/dashboard/components/dashboard-module-page";

interface TransactionsModulePageProps {
  activePath: string;
  subtitle: string;
  title: string;
}

export const TransactionsModulePage = ({ activePath, subtitle, title }: TransactionsModulePageProps) => {
  return (
    <DashboardModulePage
      activePath={activePath}
      title={title}
      description={subtitle}
      metrics={[
        { label: "Today", value: "32 records" },
        { label: "Pending", value: "5" },
        { label: "Completed", value: "27" },
      ]}
      columns={[
        { key: "number", label: "Reference" },
        { key: "actor", label: "User" },
        { key: "status", label: "Status" },
        { key: "time", label: "Updated At" },
      ]}
      rows={[
        {
          id: "1",
          values: {
            number: "TX-2026-0001",
            actor: "fnb_01",
            status: "Pending",
            time: "10:30",
          },
        },
        {
          id: "2",
          values: {
            number: "TX-2026-0002",
            actor: "manager_02",
            status: "Approved",
            time: "09:14",
          },
        },
        {
          id: "3",
          values: {
            number: "TX-2026-0003",
            actor: "admin_01",
            status: "Done",
            time: "08:48",
          },
        },
      ]}
    />
  );
};
