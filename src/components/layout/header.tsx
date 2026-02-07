import type { ReactNode } from "react";

interface HeaderProps {
  rightSlot?: ReactNode;
}

export const Header = ({ rightSlot }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-foreground">PropertyPOS</p>
        {rightSlot ? <div>{rightSlot}</div> : null}
      </div>
    </header>
  );
};
