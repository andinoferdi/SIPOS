import type { Metadata } from "next";
import { InventoriesPage } from "@/blocks/dashboard/master/inventories";

export const metadata: Metadata = {
  title: "Inventories | PropertyPOS",
  description: "Manage stock, pricing mode, and unlimited stock behavior.",
};

const InventoriesRoute = () => {
  return <InventoriesPage />;
};

export default InventoriesRoute;
