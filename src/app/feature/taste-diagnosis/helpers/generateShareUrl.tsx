import { TFunction } from "i18next";
import { Category } from "../types/questions";
import { match } from "ts-pattern";
import { transformScoreKey } from "./transformScoreKey";

export const generateShareUrl = (scoreType: Category, t: TFunction) => {
  const shareTextRaw = match(scoreType)
    .with("daiginjo", () => t("taste-diagnosis:share.大吟醸"))
    .with("junmaiGinjo", () => t("taste-diagnosis:share.純米吟醸"))
    .with("tokubetsuJunmai", () => t("taste-diagnosis:share.特別純米"))
    .with("futsushu", () => t("taste-diagnosis:share.普通酒"))
    .exhaustive();

  const translatedScoreType = transformScoreKey(scoreType, t);

  const textWithNewLine = shareTextRaw.replace(/%NEWLINE%/g, "\n");
  const encodedShareText = encodeURIComponent(textWithNewLine);

  const hashtags = t("taste-diagnosis:hashtags", {
    scoreType: translatedScoreType.label,
  });

  return {
    encodedShareText,
    hashtags,
    xShareText: t("common:Xで共有"),
    lineShareText: t("common:LINEで共有"),
  };
};
