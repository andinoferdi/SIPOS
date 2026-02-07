import { TransactionsModulePage } from "@/blocks/dashboard/Transactions/module-page";

export const InventoryCategoriesTransactionsPage = () => {
  return (
    <TransactionsModulePage
      activePath="/dashboard/Transactions/inventory-categories"
      title="Inventory Categories Transactions"
      subtitle="Audit category-level changes and fee adjustments"
    />
  );
};

