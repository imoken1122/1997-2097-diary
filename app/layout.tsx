import type { Metadata } from "next";
import "./globals.css";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (filename: string) => `${siteBasePath}/${filename}`;

export const metadata: Metadata = {
  title: "1997–2097 — Public Field Note",
  description: "1997年に生まれた。2097年は、その100年後。観察し、調べ、試したことを100年の時間軸に置いて残す。",
  openGraph: {
    title: "1997–2097 — Public Field Note",
    description: "1997年に生まれた。2097年は、その100年後。観察し、調べ、試したことを100年の時間軸に置いて残す。",
    type: "website",
    images: [{ url: assetPath("og.png"), width: 1200, height: 630, alt: "1997–2097 Public Field Note" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "1997–2097 — Public Field Note",
    description: "1997年に生まれた。2097年は、その100年後。観察し、調べ、試したことを100年の時間軸に置いて残す。",
    images: [assetPath("og.png")],
  },
  icons: { icon: assetPath("favicon.svg"), shortcut: assetPath("favicon.svg") },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <style>{`:root { --field-image: url("${assetPath("night-field.png")}"); }`}</style>
        {children}
      </body>
    </html>
  );
}
