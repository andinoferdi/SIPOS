import { SidebarProvider } from "@/context/SidebarContext";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "flatpickr/dist/flatpickr.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${outfit.className} dashboard-root dark:bg-gray-900`}>
      <SidebarProvider>{children}</SidebarProvider>
    </div>
  );
}
