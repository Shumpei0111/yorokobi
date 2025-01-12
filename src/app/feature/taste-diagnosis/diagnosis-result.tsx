import { AnimatePresence, motion } from "motion/react";
import { ScoreKeys, Scores } from "./types/questions";
import { useTranslation } from "@/app/i18n/client";
import { type Language } from "@/app/i18n/settings";

/** 診断結果 */
export const DiagnosisResult = ({
  scores,
  lang,
}: {
  scores: Scores;
  lang: Language;
}) => {
  const { t } = useTranslation(lang);

  const transformScoreKey = (key: ScoreKeys) => {
    switch (key) {
      case "daiginjo":
        return t("taste-diagnosis:大吟醸");
      case "junmaiGinjo":
        return t("taste-diagnosis:純米吟醸");
      case "tokubetsuJunmai":
        return t("taste-diagnosis:特別純米");
      case "futsushu":
        return t("taste-diagnosis:普通酒");
      default:
        return key;
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h3>{t("taste-diagnosis:診断結果")}</h3>
        <div>
          {Object.entries(scores).map(([key, value]) => (
            <div key={key}>
              {transformScoreKey(key as keyof Scores)}: {value}
            </div>
          ))}
        </div>
        <small className="text-xs">
          <a href="https://sakenowa.com" target="_blank" rel="noopener">
            さけのわデータ
          </a>
          {lang === "ja" ? " を利用しています" : " is used."}
        </small>
      </motion.div>
    </AnimatePresence>
  );
};
