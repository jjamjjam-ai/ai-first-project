import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { ThemeInitScript } from "@/components/ThemeInitScript";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "ai-first-project",
  description: "Anonymous board with password-protected edit/delete (ko/en)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          id="bootswatch-theme"
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/flatly/bootstrap.min.css"
        />
        <ThemeInitScript />
      </head>
      <body>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />

        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
          <div className="container">
            <Link className="navbar-brand fw-semibold" href="/">
              ai-first-project
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#nav"
              aria-controls="nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="nav">
              <div className="ms-auto d-flex gap-2 align-items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
