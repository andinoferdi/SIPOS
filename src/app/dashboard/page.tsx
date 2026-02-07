import type { Metadata } from "next";
import { DashboardPage } from "@/blocks/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | PropertyPOS",
  description: "Operations dashboard for POS monitoring and payment flow.",
};

const DashboardRoute = () => {
  return <DashboardPage />;
};

export default DashboardRoute;
