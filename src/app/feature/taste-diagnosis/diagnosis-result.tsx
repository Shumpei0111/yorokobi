import { AnimatePresence, motion } from "motion/react";
import { ScoreKeys, Scores } from "./types/questions";
import { useTranslation } from "@/app/i18n/client";
import { type Language } from "@/app/i18n/settings";
import { RadarChart } from "./radar-chart";
import { transformScoreKey } from "./helpers/transformScoreKey";
import { ScoreTable } from "./score-table";
import { Button } from "@/components/ui/button";
import { Trans } from "react-i18next";
import Link from "next/link";
import { generateShareUrl } from "./helpers/generateShareUrl";
import { Share2, X } from "lucide-react";

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
    highestScoreType as ScoreKeys,
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
            <h3 className="text-center text-xl font-bold -mb-10">
              {t("taste-diagnosis:診断結果")}
            </h3>
            <div className="min-h-[340px]">
              <RadarChart scores={scores} lang={lang} />
            </div>
            <small className="text-[10px] flex justify-end text-gray-600 -mt-10">
              <a href="https://sakenowa.com" target="_blank" rel="noopener">
                さけのわデータ
              </a>
              {isJa ? " を利用しています" : " is used."}
            </small>
          </div>
          <div className="text-md my-10 text-center">
            <Trans
              i18nKey="taste-diagnosis:あなたにおすすめの日本酒は"
              t={t}
              components={{
                strong: <strong />,
              }}
              values={{
                type: transformScoreKey(highestScoreType as ScoreKeys, t),
              }}
            />
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
                <X className="w-4 h-4" />
                {t("common:Xで共有")}
              </Link>
            </div>
          </div>
          <div className="text-sm my-10">
            {sortedScores.map(([type, score]) => (
              <ScoreTable
                key={type}
                type={type as ScoreKeys}
                lang={lang}
                label={transformScoreKey(type as ScoreKeys, t)}
                score={score}
                isHighestScore={highestScoreType === type}
              />
            ))}
          </div>
        </motion.div>
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => window.location.reload()}>
            {t("taste-diagnosis:診断をやり直す")}
          </Button>
        </div>
      </div>
    </AnimatePresence>
  );
};
