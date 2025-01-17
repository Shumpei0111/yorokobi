"use client";

import { SelectLang } from "@/components/ui/select-lang";
import { type Language } from "@/app/i18n/settings";
import Link from "next/link";
import Image from "next/image";
import seigaiha from "/public/images/seigaiha.svg";
import { useTranslation } from "@/app/i18n/client";

export const GlobalFooter = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation(lang);

  return (
    <footer className="mx-auto w-full font-sans px-2 bg-slate-800">
      <div className="h-[20px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <Image
            src={seigaiha.src}
            alt="seigaiha"
            width={1000}
            height={1000}
            className="object-center object-cover"
          />
        </div>
      </div>
      <div className="py-20 flex flex-col items-center gap-5">
        <h1 className="text-5xl font-[800] font-sans text-primary">
          <Link href={`/${lang}`}>Yorokobi</Link>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xs text-gray-400 font-serif px-2">MENU</h2>
          <ul>
            <li>
              <Link
                href={`/${lang}/taste-diagnosis`}
                className="text-base text-white font-hannariMincho"
              >
                {t("common:メニュー.味覚診断")}
              </Link>
            </li>
          </ul>
        </div>
        <hr className="w-full border-gray-400" />
        <div className="w-[100px] mx-auto pt-5">
          <SelectLang />
        </div>
        {lang === "ja" && (
          <p className="text-xs text-gray-300 text-center w-full inline-block pt-5">
            20歳未満の者の飲酒は法律で禁止されています。
          </p>
        )}
        <small className="text-[10px] text-gray-300 text-center w-full inline-block">
          &copy; Yorokobi All rights reserved. | Made by{" "}
          <a
            href="https://x.com/seventhseven"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shumpei
          </a>
        </small>
      </div>
    </footer>
  );
};
