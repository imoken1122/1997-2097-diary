import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1997–2097 — Public Field Note",
  description: "技術、観察、写真、思想、都市、AI、実験をひとつの時系列として残す公開フィールドノート。",
  openGraph: {
    title: "1997–2097 — Public Field Note",
    description: "まだ名前のないものを、時間の中に置いておく。",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "1997–2097 Public Field Note" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1997–2097 — Public Field Note",
    description: "まだ名前のないものを、時間の中に置いておく。",
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
