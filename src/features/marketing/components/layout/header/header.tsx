'use client';
import { CloseIcon, MenuIcon } from '@/icons/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DesktopNav from './desktop-nav';
import MainMobileNav from './main-mobile-nav';
import ThemeToggle from './theme-toggle';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-[var(--token-white)] dark:bg-dark-primary border-b dark:border-[var(--token-gray-800)] border-[var(--token-gray-100)] sticky top-0 z-50 py-2 lg:py-4">
      <div className="px-4 sm:px-6 lg:px-7">
        <div className="grid grid-cols-2 items-center lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center">
            <Link href="/" className="flex items-end gap-2">
              <Image
                src="/images/logo-black.svg"
                className="block dark:hidden"
                alt="AiStarterKit Logo"
                width={180}
                height={30}
              />

              <Image
                src="/images/logo-white.svg"
                className="hidden dark:block"
                alt="AiStarterKit Logo"
                width={180}
                height={30}
              />

              <span className="inline-block px-1.5 py-0.5 rounded-lg rounded-bl-none bg-primary-500/90 text-[var(--token-white)] text-xs font-medium mb-0.5">
                Demo
              </span>
            </Link>
          </div>

          <DesktopNav />

          <div className="flex items-center gap-4 justify-self-end">
            <ThemeToggle />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              type="button"
              className="order-last shrink-0 inline-flex items-center justify-center p-2 rounded-md text-[var(--token-gray-500)] dark:text-[var(--token-gray-400)] hover:text-[var(--token-gray-700)] dark:hover:text-[var(--token-gray-300)] hover:bg-[var(--token-gray-100)] dark:hover:bg-[var(--token-gray-700)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <Link
              href="/login"
              className="text-sm hidden lg:block font-medium text-[var(--token-gray-700)] dark:text-[var(--token-gray-400)] hover:text-primary-500"
            >
              Sign In
            </Link>

            <Link
              href="/login"
              className="lg:inline-flex items-center px-5 py-3 gradient-btn hidden text-sm text-[var(--token-white)] rounded-full button-bg h-11"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </div>

      <MainMobileNav isOpen={mobileMenuOpen} />
    </header>
  );
}
