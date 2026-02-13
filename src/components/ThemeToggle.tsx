"use client";

import { useEffect, useState } from "react";
import { bootswatchHref, THEME_STORAGE_KEY, type ThemeMode } from "./theme";

function resolveTheme(mode: ThemeMode) {
  if (mode !== "system") return mode;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null) ?? "system";
  });

  useEffect(() => {
    if (!mode) return;

    localStorage.setItem(THEME_STORAGE_KEY, mode);
    const resolved = resolveTheme(mode);

    document.documentElement.dataset.bsTheme = resolved;

    const link = document.getElementById("bootswatch-theme") as HTMLLinkElement | null;
    if (link) link.href = bootswatchHref(resolved);
  }, [mode]);

  return (
    <select
      className="form-select form-select-sm"
      aria-label="Theme"
      value={mode}
      onChange={(e) => setMode(e.target.value as ThemeMode)}
      style={{ width: 140 }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
