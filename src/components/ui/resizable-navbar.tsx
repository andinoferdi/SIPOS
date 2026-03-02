"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  scrollThreshold?: number;
  mode?: "fixed" | "sticky";
  glassOnScroll?: boolean;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  isScrolled?: boolean;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  isScrolled?: boolean;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({
  children,
  className,
  scrollThreshold = 24,
  mode = "fixed",
  glassOnScroll = true,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsScrolled(window.scrollY > scrollThreshold);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return (
    <div
      ref={navRef}
      className={cn(
        mode === "fixed" ? "fixed inset-x-0 top-0" : "sticky top-0",
        "z-50 w-full border-b transition-all duration-300",
        !glassOnScroll
          ? "border-transparent bg-transparent backdrop-blur-0 shadow-none"
          : isScrolled
            ? "border-soft shadow-[0_8px_30px_-22px_rgba(0,0,0,0.45)] backdrop-blur-xl supports-[backdrop-filter:blur(0px)]:bg-[color-mix(in_oklab,var(--color-marketing-light-canvas)_86%,transparent)] dark:supports-[backdrop-filter:blur(0px)]:bg-[color-mix(in_oklab,var(--color-marketing-dark-canvas)_82%,transparent)]"
            : "border-transparent bg-transparent backdrop-blur-0 shadow-none",
        className
      )}
      suppressHydrationWarning
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ isScrolled?: boolean }>,
              { isScrolled }
            )
          : child
      )}
    </div>
  );
};

export const NavBody = ({
  children,
  className,
  isScrolled,
  visible,
}: NavBodyProps) => {
  const isVisible = visible ?? true;

  return (
    <div
      data-scrolled={isScrolled ? "true" : "false"}
      data-visible={isVisible ? "true" : "false"}
      className={cn(
        "hidden h-20 w-full items-center justify-between px-6 py-6 transition-all duration-300 lg:flex",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center gap-8", className)}>
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "relative text-sm font-medium transition-colors duration-200",
            hovered === idx ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.name}
          {hovered === idx && (
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary transition-all duration-200" />
          )}
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({
  children,
  className,
  isScrolled,
  visible,
}: MobileNavProps) => {
  const isVisible = visible ?? true;

  return (
    <div
      data-scrolled={isScrolled ? "true" : "false"}
      data-visible={isVisible ? "true" : "false"}
      className={cn(
        "relative flex h-20 w-full items-center justify-between px-6 py-6 transition-all duration-300 lg:hidden",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <>
      {isOpen && (
        <div
          className={cn(
            "absolute inset-x-0 top-full z-40 mt-2 flex w-full flex-col gap-4 border border-border bg-background/85 backdrop-blur-md px-6 py-4 transition-all duration-300 lg:hidden",
            className
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <X className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  ) : (
    <Menu className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <Image src="/images/Logo.png" alt="SIPOS" width={30} height={30} />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 inline-block text-center cursor-pointer";

  const variantStyles: Record<
    NonNullable<
      "primary" | "secondary" | "dark" | "gradient"
    >,
    string
  > = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 active:scale-95",
    secondary: "text-foreground hover:bg-muted",
    dark: "bg-black text-white hover:bg-black/90 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-white/90",
    gradient:
      "bg-gradient-to-r from-primary via-primary/90 to-primary/75 text-primary-foreground hover:brightness-105 active:scale-95",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
