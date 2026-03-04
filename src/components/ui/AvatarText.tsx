import React from "react";
import { cn } from "@/lib/utils";

type AvatarTextSize = "xs" | "sm" | "md" | "lg" | "xl";

type AvatarTextProps = {
  name: string;
  size?: AvatarTextSize;
  className?: string;
};

const sizeMap: Record<AvatarTextSize, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-14 text-lg",
};

const colorPalette = [
  "bg-(--color-module-accent-purple-soft) text-(--color-module-accent-purple-strong) dark:bg-(--color-module-accent-purple-soft-2) dark:text-(--color-module-accent-purple)",
  "bg-(--color-module-accent-blue-soft) text-(--color-module-accent-blue-strong) dark:bg-(--color-module-accent-blue-soft-2) dark:text-(--color-module-accent-blue)",
  "bg-(--color-module-accent-green-soft) text-(--color-module-accent-green-strong) dark:bg-(--color-module-accent-green-soft-2) dark:text-(--color-module-accent-green)",
  "bg-(--color-intent-warning-bg) text-(--color-intent-warning-text) dark:bg-(--color-intent-warning-ring) dark:text-(--color-warning-400)",
  "bg-(--color-intent-error-bg) text-(--color-intent-error-text) dark:bg-(--color-intent-error-ring) dark:text-(--color-error-400)",
  "bg-(--color-intent-info-bg) text-(--color-intent-info-text) dark:bg-(--color-intent-info-ring) dark:text-(--token-gray-300)",
  "bg-(--color-accent-soft-light) text-(--color-primary-700) dark:bg-(--color-accent-soft-dark) dark:text-(--color-primary-400)",
  "bg-(--color-module-accent-purple-soft-2) text-(--color-module-accent-purple) dark:bg-(--color-module-accent-blue-soft-2) dark:text-(--color-module-accent-blue)",
];

function getColorClass(name: string): string {
  const index = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorPalette[index % colorPalette.length];
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

const AvatarText: React.FC<AvatarTextProps> = ({
  name,
  size = "md",
  className,
}) => {
  return (
    <div
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-medium select-none",
        sizeMap[size],
        getColorClass(name),
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
};

export default AvatarText;
