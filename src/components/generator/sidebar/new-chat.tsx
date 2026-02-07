"use client";

import Link from "next/link";

interface NewChatProps {
  toggleSidebar: () => void;
}

export const NewChat = ({ toggleSidebar }: NewChatProps) => {
  return (
    <Link
      className="flex w-full items-center justify-center rounded-full bg-gray-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:pointer-events-none disabled:opacity-80 dark:bg-white/15 dark:hover:bg-white/25"
      href="/text-generator"
      onClick={toggleSidebar}
    >
      New Chat
    </Link>
  );
};
