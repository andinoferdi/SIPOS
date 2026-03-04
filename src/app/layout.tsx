import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { QueryProvider } from '../providers/query-provider';
import { ToasterProvider } from '../providers/toaster';
import { AuthProvider } from '../providers/auth-provider';

export const metadata: Metadata = {
  title: {
    default: "SIPOS",
    template: "%s | SIPOS",
  },
  description:
    "SIPOS portal untuk multi outlet POS dalam satu workspace.",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <body
        className="surface-base min-h-screen flex flex-col"
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <ToasterProvider />
              <div className="isolate flex flex-col flex-1">{children}</div>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
