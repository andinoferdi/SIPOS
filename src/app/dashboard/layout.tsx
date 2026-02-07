import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | PropertyPOS",
  description: "Dashboard area for POS operations.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <section className="min-h-screen bg-dashboard-canvas">{children}</section>;
};

export default DashboardLayout;
