import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1997–2097 — Public Field Note",
  description: "1997–2097 公開フィールドノート。",
  openGraph: {
    title: "1997–2097 — Public Field Note",
    description: "1997–2097 公開フィールドノート。",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "1997–2097 Public Field Note" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1997–2097 — Public Field Note",
    description: "1997–2097 公開フィールドノート。",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
