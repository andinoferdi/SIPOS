"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const THEME_TRANSITION_DURATION_MS = 250;
const THEME_SWITCHING_ATTR = "data-theme-switching";

type ThemeMode = "light" | "dark";

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      document.documentElement.removeAttribute(THEME_SWITCHING_ATTR);
    };
  }, []);

  const setThemeWithTransition = useCallback(
    (nextTheme: ThemeMode) => {
      if (typeof window === "undefined") return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTheme(nextTheme);
        return;
      }

      const root = document.documentElement;

      root.setAttribute(THEME_SWITCHING_ATTR, "true");
      setTheme(nextTheme);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        root.removeAttribute(THEME_SWITCHING_ATTR);
        timeoutRef.current = null;
      }, THEME_TRANSITION_DURATION_MS);
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

