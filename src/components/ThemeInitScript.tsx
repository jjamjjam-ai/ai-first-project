import { BOOTSWATCH_DARK, BOOTSWATCH_LIGHT, THEME_STORAGE_KEY } from "./theme";

// Placed in <head> to reduce theme flash before React mounts.
export function ThemeInitScript() {
  const code = `(() => {
    try {
      const key = ${JSON.stringify(THEME_STORAGE_KEY)};
      const stored = localStorage.getItem(key) || 'system';
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = stored === 'system' ? (prefersDark ? 'dark' : 'light') : stored;

      document.documentElement.dataset.bsTheme = resolved;

      const link = document.getElementById('bootswatch-theme');
      if (link) {
        const name = resolved === 'dark' ? ${JSON.stringify(BOOTSWATCH_DARK)} : ${JSON.stringify(BOOTSWATCH_LIGHT)};
        link.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/' + name + '/bootstrap.min.css');
      }
    } catch {}
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
