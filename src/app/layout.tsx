import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Onest } from 'next/font/google';
import './globals.css';
import { QueryProvider } from './_shared/providers/query-provider';
import { AuthSessionProvider } from './_shared/providers/session-provider';
import { ToasterProvider } from './_shared/providers/toaster';

const onest = Onest({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Demo AIStarterKit OSS - Next.js AI Starter Kit Demo',
    template: '%s | AIStarterKit OSS Demo',
  },
  description:
    'Demo website of AIStarterKit OSS boilerplate. Built using Next.js, Tailwind CSS, Drizzle ORM, and PostgreSQL.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-[var(--token-gray-50)] dark:bg-dark-secondary min-h-screen flex flex-col ${onest.className}`}
      >
        <AuthSessionProvider>
          <ThemeProvider disableTransitionOnChange>
            <QueryProvider>
              <ToasterProvider />
              <div className="isolate flex flex-col flex-1">{children}</div>
            </QueryProvider>
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
