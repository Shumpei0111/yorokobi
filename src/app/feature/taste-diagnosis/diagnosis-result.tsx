import { AnimatePresence, motion } from "motion/react";
import { Scores } from "./types/questions";
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
              {key}: {value}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
