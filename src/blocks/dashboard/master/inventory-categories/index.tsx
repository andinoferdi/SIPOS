import { DashboardModulePage } from "@/blocks/dashboard/components/dashboard-module-page";

const columns = [
  { key: "name", label: "Category" },
  { key: "items", label: "Total Items" },
  { key: "serviceCharge", label: "Service Charge" },
  { key: "tax", label: "Tax" },
  { key: "updatedBy", label: "Updated By" },
];

const rows = [
  {
    id: "beverages",
    values: {
      name: "Beverages",
      items: "34",
      serviceCharge: "10%",
      tax: "11%",
      updatedBy: "admin_01",
    },
  },
  {
    id: "alcohol",
    values: {
      name: "Alcohol",
      items: "21",
      serviceCharge: "10%",
      tax: "11%",
      updatedBy: "manager_02",
    },
  },
  {
    id: "dessert",
    values: {
      name: "Dessert",
      items: "17",
      serviceCharge: "10%",
      tax: "11%",
      updatedBy: "admin_01",
    },
  },
];

export const InventoryCategoriesPage = () => {
  return (
    <DashboardModulePage
      activePath="/dashboard/master/inventory-categories"
      title="Inventory Categories"
      description="Define inventory grouping and fee policy per category"
      actionLabel="Add Category"
      metrics={[
        { label: "Total Categories", value: "12" },
        { label: "Default Service Charge", value: "10%" },
        { label: "Default Tax", value: "11%" },
      ]}
      columns={columns}
      rows={rows}
    />
  );
};
