import { Category } from "../types/questions";
import { TFunction } from "i18next";

export const transformScoreKey = (
  key: Category,
  t: TFunction<"translation", undefined>
) => {
  switch (key) {
    case "daiginjo":
      return {
        label: t("sake-category:大吟醸"),
        ruby: t("sake-category:大吟醸ルビ"),
      };
    case "junmaiGinjo":
      return {
        label: t("sake-category:純米吟醸"),
        ruby: t("sake-category:純米吟醸ルビ"),
      };
    case "tokubetsuJunmai":
      return {
        label: t("sake-category:特別純米"),
        ruby: t("sake-category:特別純米ルビ"),
      };
    case "futsushu":
      return {
        label: t("sake-category:普通酒"),
        ruby: t("sake-category:普通酒ルビ"),
      };
    default:
      return key;
  }
};
