import { Jost, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { dir } from "i18next";
import { GlobalHeader } from "@/components/global/global-header/global-header";
import { Language } from "../i18n/settings";
import "./globals.css";
import { GlobalFooter } from "@/components/global/global-footer/global-footer";
import { Brightness } from "@/components/global/brightness/brightness";
import { FirstCheckDialog } from "@/components/global/first-check-dialog";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-manrope",
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

const siteUrl = new URL("https://yorokobi.mb-js.site/");

export const metadata = {
  metadataBase: siteUrl,
  title: "Yorokobi - Discover Your Perfect Sake.",
  description: "Discover Your Perfect Sake.日本酒の喜びを、あなたに。",
  openGraph: {
    title: "Yorokobi - Discover Your Perfect Sake.",
    description: "Discover Your Perfect Sake.日本酒の喜びを、あなたに。",
    images: [
      {
        url: "/images/ogp.png",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yorokobi - Discover Your Perfect Sake.",
    description: "Discover Your Perfect Sake.日本酒の喜びを、あなたに。",
    images: ["/images/ogp.png"],
  },
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
        className={`${hannariMincho.variable} ${jost.variable} ${
          manrope.variable
        } ${
          lang === "ja" ? "font-sans" : "font-manrope"
        } antialiased overflow-x-hidden flex flex-col min-h-screen relative bg-[#EDEDED]`}
      >
        <GlobalHeader lang={lang} />
        <main
          style={{ flex: 1 }}
          className="relative w-full py-10 max-w-[1024px] mx-auto"
        >
          {children}
        </main>
        <div className="text-[0px] text-nowrap font-[500] opacity-30 overflow-hidden">
          <div
            style={{ animationPlayState: "running" }}
            className="font-serif animate-text-scroll inline-block text-[25rem] h-[.25em] tracking-[-0.05em]"
          >
            Sake.
          </div>
          <div
            style={{ animationPlayState: "running" }}
            className="font-serif animate-text-scroll inline-block text-[25rem] h-[.25em] tracking-[-0.05em]"
          >
            Sake.
          </div>
        </div>
        <GlobalFooter lang={lang} />
        <div className="fixed inset-0 top-0 left-0 w-full h-full z-[-1] opacity-30">
          <Brightness />
        </div>
        <FirstCheckDialog lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
