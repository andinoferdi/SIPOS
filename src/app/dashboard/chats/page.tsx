import type { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Chats from "@/components/chats/Chats";

export const metadata: Metadata = {
  title: "Next.js Chats | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Chats page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function ChatsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Chats" />
      <Chats />
    </div>
  );
}
