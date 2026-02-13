export type ThemeMode = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "aip_theme";

export const BOOTSWATCH_LIGHT = "flatly";
export const BOOTSWATCH_DARK = "darkly";

export function bootswatchHref(theme: "light" | "dark") {
  const name = theme === "dark" ? BOOTSWATCH_DARK : BOOTSWATCH_LIGHT;
  return `https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/${name}/bootstrap.min.css`;
}
