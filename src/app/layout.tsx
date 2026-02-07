import type { Metadata } from "next";
import { Manrope } from "next/font/google";
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

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
        <SonnerProvider />
      </body>
    </html>
  );
};

export default RootLayout;
