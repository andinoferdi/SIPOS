import { DashboardModulePage } from "@/blocks/dashboard/components/dashboard-module-page";

const columns = [
  { key: "module", label: "Module" },
  { key: "summary", label: "Summary" },
  { key: "status", label: "Status" },
  { key: "owner", label: "Owner" },
];

const rows = [
  {
    id: "inventory-categories",
    values: {
      module: "Inventory Categories",
      summary: "Manage category name, default service charge, and default tax",
      status: "Ready",
      owner: "Admin",
    },
  },
  {
    id: "inventories",
    values: {
      module: "Inventories",
      summary: "Track stock, unlimited stock, include or exclude tax and service charge",
      status: "Ready",
      owner: "Admin, FnB Manager read-only",
    },
  },
  {
    id: "approval",
    values: {
      module: "Approval Sales",
      summary: "Approve or reject void request from FnB team",
      status: "In Progress",
      owner: "Admin, FnB Manager",
    },
  },
];

export const MasterDashboardPage = () => {
  return (
    <DashboardModulePage
      activePath="/dashboard/master"
      title="Master"
      description="Centralized setup for POS catalog and reference data"
      actionLabel="Add Master Data"
      metrics={[
        { label: "Total Modules", value: "6" },
        { label: "Editable by Admin", value: "4" },
        { label: "Read-only by FnB Manager", value: "2" },
      ]}
      columns={columns}
      rows={rows}
    />
  );
};
