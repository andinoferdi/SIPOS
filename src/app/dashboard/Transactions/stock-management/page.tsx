import type { Metadata } from "next";
import { StockManagementTransactionsPage } from "@/blocks/dashboard/Transactions/stock-management";

export const metadata: Metadata = {
  title: "Stock Management | PropertyPOS",
  description: "Track stock movement from sales and purchase.",
};

const StockManagementRoute = () => {
  return <StockManagementTransactionsPage />;
};

export default StockManagementRoute;

