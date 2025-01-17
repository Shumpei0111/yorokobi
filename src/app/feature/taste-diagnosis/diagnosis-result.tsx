import { AnimatePresence, motion } from "motion/react";
import { Category, Scores } from "./types/questions";
import { useTranslation } from "@/app/i18n/client";
import { type Language } from "@/app/i18n/settings";
import { RadarChart } from "./radar-chart";
import { transformScoreKey } from "./helpers/transformScoreKey";
import { ScoreTable } from "./score-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateShareUrl } from "./helpers/generateShareUrl";
import { Share2 } from "lucide-react";
import XLogo from "/public/images/logo-x.svg";
import Image from "next/image";

/** 診断結果 */
export const DiagnosisResult = ({
  scores,
  lang,
}: {
  scores: Scores;
  lang: Language;
}) => {
  const { t } = useTranslation(lang);
  const isJa = lang === "ja";

  const highestScore = Math.max(...Object.values(scores));
  const highestScoreType = Object.keys(scores).find(
    (key) => scores[key as keyof Scores] === highestScore
  );

  // スコア順にソート
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const { xShareUrl, lineShareUrl } = generateShareUrl(
    highestScoreType as Category,
    t
  );

  const { label: scoreLabel, ruby: scoreRuby } = transformScoreKey(
    highestScoreType as Category,
    t
  );

  return (
    <AnimatePresence>
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-[600px] mx-auto mt-10">
            <h2 className="text-center text-xl font-bold">
              {t("taste-diagnosis:あなたにおすすめの日本酒は")}
            </h2>
            <div className="flex justify-center py-4 -mb-6">
              <ruby className="text-center text-3xl font-bold text-primary font-hannariMincho drop-shadow-md">
                {scoreLabel}
                <rp>(</rp>
                <rt className="text-sm pb-1">{scoreRuby}</rt>
                <rp>)</rp>
              </ruby>
            </div>
            <div className="min-h-[340px]">
              <RadarChart scores={scores} lang={lang} />
            </div>
            <small className="text-[10px] flex justify-end pr-2 text-gray-600 -mt-10">
              <a href="https://sakenowa.com" target="_blank" rel="noopener">
                さけのわデータ
              </a>
              {isJa ? " を利用しています" : " is used."}
            </small>
          </div>
          <div className="text-sm my-10 max-w-[600px] mx-auto">
            {sortedScores.map(([type, score]) => (
              <ScoreTable
                key={type}
                type={type as Category}
                lang={lang}
                label={transformScoreKey(type as Category, t).label}
                score={score}
                isHighestScore={highestScoreType === type}
              />
            ))}
            <div className="text-[10px] text-right font-sans text-gray-700 pr-2 flex flex-col">
              <span>
                {t("sake-category:相性の良い料理:ラベル")}
                {" : "}
                {t("sake-category:相性の良い料理:参考")}
              </span>
              <span>{t("sake-category:相性の良い料理:注意書き")}</span>
            </div>
          </div>
          <div className="text-md my-10 text-center">
            <div className="flex justify-center gap-4 text-xs my-4">
              <Link
                className="border text-gray-50 font-bold rounded-md px-4 py-1 font-sans flex items-center justify-center gap-2 bg-[#3FCC40]"
                href={lineShareUrl}
                target="_blank"
                rel="noopener"
                aria-label={t("common:LINEで共有")}
              >
                <Share2 className="w-4 h-4" />
                {t("common:LINEで共有")}
              </Link>
              <Link
                className="border text-gray-50 font-bold rounded-md px-4 py-1 font-sans flex items-center justify-center gap-2 bg-[#379AF0]"
                href={xShareUrl}
                target="_blank"
                rel="noopener"
                aria-label={t("common:Xで共有")}
              >
                <Image src={XLogo} alt="X" width={12} height={12} />
                {t("common:Xで共有")}
              </Link>
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center my-10">
          <Button
            variant="outline"
            onClick={() => {
              scrollTo(0, 0);
              window.location.reload();
            }}
            className="bg-[rgba(0,43,92,0.8)] hover:bg-[rgba(0,43,92,1)] duration-300 text-white py-2 px-10 rounded shadow font-jost border border-primary font-bold"
          >
            {t("taste-diagnosis:診断をやり直す")}
          </Button>
        </div>
      </div>
    </AnimatePresence>
  );
};
