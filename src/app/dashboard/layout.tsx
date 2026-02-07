import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "flatpickr/dist/flatpickr.css";

const outfit = Outfit({
  subsets: ["latin"],
});

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`${outfit.className} dashboard-root dark:bg-gray-900`}>
      {children}
    </div>
  );
};

export default DashboardLayout;
