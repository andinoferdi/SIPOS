import { DashboardModulePage } from "@/blocks/dashboard/components/dashboard-module-page";

const columns = [
  { key: "name", label: "Inventory" },
  { key: "category", label: "Category" },
  { key: "pricing", label: "Price Mode" },
  { key: "stock", label: "Stock" },
  { key: "updatedBy", label: "Updated By" },
];

const rows = [
  {
    id: "sparkling-water",
    values: {
      name: "Sparkling Water",
      category: "Beverages",
      pricing: "Exclude service charge and tax",
      stock: "Unlimited",
      updatedBy: "admin_01",
    },
  },
  {
    id: "red-wine",
    values: {
      name: "House Red Wine",
      category: "Alcohol",
      pricing: "Include service charge and tax",
      stock: "3",
      updatedBy: "manager_02",
    },
  },
  {
    id: "croissant",
    values: {
      name: "Croissant Butter",
      category: "Bakery",
      pricing: "Exclude service charge and tax",
      stock: "14",
      updatedBy: "admin_01",
    },
  },
];

export const InventoriesPage = () => {
  return (
    <DashboardModulePage
      activePath="/dashboard/master/inventories"
      title="Inventories"
      description="Manage stock items, include or exclude pricing, and unlimited stock status"
      actionLabel="Add Inventory"
      metrics={[
        { label: "Total Inventory", value: "148" },
        { label: "Unlimited Stock", value: "42" },
        { label: "Low Stock", value: "9" },
      ]}
      columns={columns}
      rows={rows}
    />
  );
};
