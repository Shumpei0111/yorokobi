import { Category } from "../types/questions";
import { TFunction } from "i18next";

export const transformScoreKey = (
  key: Category,
  t: TFunction<"translation", undefined>
) => {
  switch (key) {
    case "daiginjo":
      return t("sake-category:大吟醸");
    case "junmaiGinjo":
      return t("sake-category:純米吟醸");
    case "tokubetsuJunmai":
      return t("sake-category:特別純米");
    case "futsushu":
      return t("sake-category:普通酒");
    default:
      return key;
  }
};
