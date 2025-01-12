import { AnimatePresence, motion } from "motion/react";
import { Scores } from "./types/questions";
import { useTranslation } from "@/app/i18n/client";
import { type Language } from "@/app/i18n/settings";
import { RadarChart } from "./radar-chart";
import { transformScoreKey } from "./helpers/transformScoreKey";
import { ScoreTable } from "./score-table";
import { Button } from "@/components/ui/button";

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
  console.log("highestScoreType: ", highestScoreType);

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
          <div className="text-sm my-10">
            <ScoreTable
              type="daiginjo"
              lang={lang}
              label={transformScoreKey("daiginjo", t)}
              score={scores.daiginjo}
              isHighestScore={highestScoreType === "daiginjo"}
            />
            <ScoreTable
              type="junmaiGinjo"
              lang={lang}
              label={transformScoreKey("junmaiGinjo", t)}
              score={scores.junmaiGinjo}
              isHighestScore={highestScoreType === "junmaiGinjo"}
            />
            <ScoreTable
              type="tokubetsuJunmai"
              lang={lang}
              label={transformScoreKey("tokubetsuJunmai", t)}
              score={scores.tokubetsuJunmai}
              isHighestScore={highestScoreType === "tokubetsuJunmai"}
            />
            <ScoreTable
              type="futsushu"
              lang={lang}
              label={transformScoreKey("futsushu", t)}
              score={scores.futsushu}
              isHighestScore={highestScoreType === "futsushu"}
            />
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
