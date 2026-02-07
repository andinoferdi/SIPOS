import type { Metadata } from "next";
import { ApprovalSalesTransactionsPage } from "@/blocks/dashboard/Transactions/approval-sales";

export const metadata: Metadata = {
  title: "Approval Sales | PropertyPOS",
  description: "Review sales deletion approval and status.",
};

const ApprovalSalesRoute = () => {
  return <ApprovalSalesTransactionsPage />;
};

export default ApprovalSalesRoute;

