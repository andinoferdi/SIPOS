import type { Metadata } from "next";
import { InventoryCategoriesTransactionsPage } from "@/blocks/dashboard/Transactions/inventory-categories";

export const metadata: Metadata = {
  title: "Inventory Categories Transactions | PropertyPOS",
  description: "Track inventory category updates and history.",
};

const InventoryCategoriesTransactionsRoute = () => {
  return <InventoryCategoriesTransactionsPage />;
};

export default InventoryCategoriesTransactionsRoute;

