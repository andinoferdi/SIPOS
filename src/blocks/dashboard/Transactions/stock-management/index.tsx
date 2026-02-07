import { TransactionsModulePage } from "@/blocks/dashboard/Transactions/module-page";

export const StockManagementTransactionsPage = () => {
  return (
    <TransactionsModulePage
      activePath="/dashboard/Transactions/stock-management"
      title="Stock Management"
      subtitle="Track stock movement from sales and purchase records"
    />
  );
};

