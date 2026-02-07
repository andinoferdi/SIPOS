import type { Metadata } from "next";
import { SalesTransactionsPage } from "@/blocks/dashboard/Transactions/sales";

export const metadata: Metadata = {
  title: "Sales | PropertyPOS",
  description: "Monitor sales and payment status.",
};

const SalesRoute = () => {
  return <SalesTransactionsPage />;
};

export default SalesRoute;

