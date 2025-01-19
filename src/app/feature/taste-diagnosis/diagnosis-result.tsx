import { AnimatePresence } from "motion/react";
import { Category, Scores } from "./types/questions";
import { type Language } from "@/app/i18n/settings";
import { RadarChart } from "./radar-chart";
import { transformScoreKey } from "./helpers/transformScoreKey";
import { ScoreTable } from "./score-table";
import { getTranslation } from "@/app/i18n/server";
import { ShareLinks } from "./share-links";
import { generateShareUrl } from "./helpers/generateShareUrl";
import { RetryButton } from "./retry-button";

/** 診断結果 */
export const DiagnosisResult = async ({
  scores,
  lang,
}: {
  scores: Scores;
  lang: Language;
}) => {
  const { t } = await getTranslation(lang);
  const isJa = lang === "ja";

  const highestScore = Math.max(...Object.values(scores));
  const highestScoreType = Object.keys(scores).find(
    (key) => scores[key as keyof Scores] === highestScore
  );

  // スコア順にソート
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const {
    label: scoreLabel,
    ruby: scoreRuby,
    oneSentence,
  } = transformScoreKey(highestScoreType as Category, t);

  const { encodedShareText, hashtags, xShareText, lineShareText } =
    generateShareUrl(highestScoreType as Category, t);

  return (
    <AnimatePresence>
      <div className="px-4">
        <div>
          <div className="max-w-[600px] mx-auto mt-10">
            <h2 className="text-center text-xl font-[800]">
              {t("taste-diagnosis:あなたにおすすめの日本酒は")}
            </h2>
            <div className="flex justify-center flex-col gap-2 py-4 -mb-6">
              <ruby className="text-center text-3xl font-bold text-primary font-hannariMincho drop-shadow-md">
                {scoreLabel}
                <rp>(</rp>
                <rt className="text-sm pb-1">{scoreRuby}</rt>
                <rp>)</rp>
              </ruby>
              <p className="text-center text-sm font-[500]">{oneSentence}</p>
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
                t={t}
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
            <ShareLinks
              encodedShareText={encodedShareText}
              hashtags={hashtags}
              xShareText={xShareText}
              lineShareText={lineShareText}
            />
          </div>
        </div>
        <div className="flex justify-center my-10">
          <RetryButton lang={lang} />
        </div>
      </div>
    </AnimatePresence>
  );
};
