"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";

function switchLocale(pathname: string, locale: string) {
  // pathname is like /ko/... or /en/...
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${locale}`;
  parts[0] = locale;
  return `/${parts.join("/")}`;
}

export function LocaleSwitcher() {
  const pathname = usePathname() || "/ko";

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary btn-sm dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Lang
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link className="dropdown-item" href={switchLocale(pathname, "ko")}>
            한국어
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href={switchLocale(pathname, "en")}>
            English
          </Link>
        </li>
      </ul>
    </div>
  );
}
