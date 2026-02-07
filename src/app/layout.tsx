import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Onest } from "next/font/google";
import { AppQueryClientProvider } from "@/app/providers/query-client-provider";
import { ToasterProvider } from "@/app/providers/toaster";
import "@/app/globals.css";

const onest = Onest({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Demo AIStarterKit OSS - Next.js AI Starter Kit Demo",
    template: "%s | AIStarterKit OSS Demo",
  },
  description:
    "Demo website of AIStarterKit OSS boilerplate. Built using Next.js, Tailwind CSS, Prisma, and PostgreSQL.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-gray-50 dark:bg-dark-secondary min-h-screen flex flex-col ${onest.className}`}
      >
        <ThemeProvider disableTransitionOnChange>
          <AppQueryClientProvider>
            <ToasterProvider />
            <div className="isolate flex flex-1 flex-col">{children}</div>
          </AppQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
