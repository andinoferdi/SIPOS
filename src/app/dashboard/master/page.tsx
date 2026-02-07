import type { Metadata } from "next";
import { MasterDashboardPage } from "@/blocks/dashboard/master";

export const metadata: Metadata = {
  title: "Master | PropertyPOS",
  description: "Master setup for inventory and POS reference data.",
};

const MasterRoute = () => {
  return <MasterDashboardPage />;
};

export default MasterRoute;
