import { TransactionsModulePage } from "@/blocks/dashboard/Transactions/module-page";

export const SalesTransactionsPage = () => {
  return (
    <TransactionsModulePage
      activePath="/dashboard/Transactions/sales"
      title="Sales"
      subtitle="Monitor active order, payment status, and mark as paid flow"
    />
  );
};

