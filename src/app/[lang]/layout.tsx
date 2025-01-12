import type { Metadata } from "next";
import { Montserrat, Jost } from "next/font/google";
import localFont from "next/font/local";
import { dir } from "i18next";
import { GlobalHeader } from "@/components/global/global-header/global-header";
import { Language } from "../i18n/settings";
import "./globals.css";
import { GlobalFooter } from "@/components/global/global-footer/global-footer";
import { Brightness } from "@/components/global/brightness/brightness";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const hannariMincho = localFont({
  src: "../../../public/font/HannariMincho-Regular.otf",
  variable: "--font-hannari-mincho",
});

export const metadata: Metadata = {
  title: "Yorokobi",
  description: "Discover Your Perfect Sake.日本酒の喜びを、あなたに。",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} dir={dir(lang)}>
      <body
        className={`
          ${montserrat.variable}
          ${hannariMincho.variable}
          ${jost.variable}
          ${lang === "ja" ? "font-hannariMincho" : "font-jost"}
          antialiased overflow-x-hidden  
          flex flex-col min-h-screen           bg-background relative`}
      >
        <GlobalHeader lang={lang} />
        <main style={{ flex: 1 }} className="relative w-full">
          {children}
        </main>
        <GlobalFooter />
        <div className="fixed inset-0 top-0 left-0 w-full h-full z-[-1] opacity-20">
          <Brightness />
        </div>
      </body>
    </html>
  );
}
