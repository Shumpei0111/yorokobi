import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { dir } from "i18next";
import { SelectLang } from "@/components/ui/select-lang";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} dir={dir(lang)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden  grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-screen `}
      >
        <div className="px-4">
          <header className="w-full flex justify-between items-center py-4 ">
            <h1 className="text-2xl font-bold">
              <Link href="/">Yorokobi</Link>
            </h1>
            <nav>
              <SelectLang />
            </nav>
          </header>
        </div>

        <main className="relative w-full">{children}</main>
        <footer className="mx-auto w-full">
          <small className="text-xs text-gray-500 text-center w-full inline-block">
            © 2025 Yorokobi All rights reserved. | Made by{" "}
            <a
              href="https://x.com/seventhseven"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shumpei
            </a>
          </small>
        </footer>
      </body>
    </html>
  );
}
