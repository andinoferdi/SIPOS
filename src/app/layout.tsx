import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { QueryProvider } from "@/components/ui/query-provider";
import { SonnerProvider } from "@/components/ui/sonner-provider";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "PropertyPOS",
  description: "Modern hospitality software for faster operations and higher revenue.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-background text-foreground font-sans antialiased">
        <QueryProvider>
          {children}
          <SonnerProvider />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
