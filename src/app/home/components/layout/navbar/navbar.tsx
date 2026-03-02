'use client';

import BrandLogo from '@/components/ui/brand-logo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ThemeToggle from './theme-toggle';
import { usePathname } from 'next/navigation';
import { navItems } from './nav-items';
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
} from '@/components/ui/resizable-navbar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navbarItems = navItems.map((item) => ({
    name: item.label,
    link: item.href,
  }));

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener('hashchange', closeMenu);
    return () => window.removeEventListener('hashchange', closeMenu);
  }, []);

  return (
    <Navbar mode="fixed" scrollThreshold={24}>
      <NavBody className="mx-auto h-auto w-full max-w-7xl px-5 py-3 sm:px-7 lg:py-4">
        <Link href="/" className="inline-flex items-center">
          <BrandLogo size="md" priority />
        </Link>
        <NavItems
          items={navbarItems}
          className="text-(--token-gray-500) dark:text-(--token-gray-400)"
        />
        <div className="relative z-10 flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="inline-flex items-center rounded-lg border border-soft bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80 dark:hover:opacity-90"
          >
            Masuk ke SIPOS
          </Link>
        </div>
      </NavBody>

      <MobileNav className="mx-auto h-auto w-full max-w-7xl px-5 py-3 sm:px-7">
        <MobileNavHeader>
          <Link href="/" className="inline-flex items-center">
            <BrandLogo size="md" priority />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="border-soft bg-(--color-marketing-light-canvas)/95 dark:bg-(--color-marketing-dark-canvas)/90"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block w-full rounded-lg px-3 py-2.5 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="w-full border-t border-soft pt-3">
            <Link
              href="/login"
              className="block rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Masuk ke SIPOS
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
