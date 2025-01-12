import { TFunction } from "i18next";
import { transformScoreKey } from "./transformScoreKey";
import { ScoreKeys } from "../types/questions";

export const generateShareUrl = (scoreType: ScoreKeys, t: TFunction) => {
  const translatedScoreType = transformScoreKey(scoreType, t);

  const shareText = t("taste-diagnosis:shareText", {
    scoreType: translatedScoreType,
  });
  const hashtags = t("taste-diagnosis:hashtags");

  const xShareUrl = encodeURI(
    `https://x.com/intent/tweet?text=${shareText}&url=${window.location.href}&hashtags=${hashtags}`
  );

  const lineShareUrl = encodeURI(
    `https://line.me/R/msg/text/?${shareText}%0A${window.location.href}`
  );

  return { xShareUrl, lineShareUrl };
};
