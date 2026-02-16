"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

type ThemeMode = "light" | "dark";

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();

  const setThemeWithTransition = useCallback(
    (nextTheme: ThemeMode) => {
      setTheme(nextTheme);
    },
    [setTheme]
  );

  const toggleThemeWithTransition = useCallback(() => {
    const currentTheme: ThemeMode = resolvedTheme === "dark" ? "dark" : "light";
    const nextTheme: ThemeMode = currentTheme === "dark" ? "light" : "dark";

    setThemeWithTransition(nextTheme);
  }, [resolvedTheme, setThemeWithTransition]);

  return {
    resolvedTheme,
    setThemeWithTransition,
    toggleThemeWithTransition,
  };
}

