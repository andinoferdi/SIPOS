import type { Metadata } from "next";
import { InventoryCategoriesPage } from "@/blocks/dashboard/master/inventory-categories";

export const metadata: Metadata = {
  title: "Inventory Categories | PropertyPOS",
  description: "Manage inventory category and fee policy.",
};

const InventoryCategoriesRoute = () => {
  return <InventoryCategoriesPage />;
};

export default InventoryCategoriesRoute;
