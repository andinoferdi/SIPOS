import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

export const Input = ({ className, isInvalid, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40",
        isInvalid ? "border-destructive focus:border-destructive focus-visible:ring-destructive/30" : "",
        className,
      )}
      {...props}
    />
  );
};
