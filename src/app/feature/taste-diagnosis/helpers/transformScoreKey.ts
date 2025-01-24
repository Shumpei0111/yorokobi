import { Category } from "../types/questions";
import { TFunction } from "i18next";

// カテゴリー定義をマッピング
const categoryMapping = {
  daiginjo: {
    label: "sake-category:大吟醸",
    ruby: "sake-category:大吟醸ルビ",
    oneSentence: "taste-diagnosis:ひとこと:大吟醸",
    forFeedbackKey: "大吟醸",
  },
  junmaiGinjo: {
    label: "sake-category:純米吟醸",
    ruby: "sake-category:純米吟醸ルビ",
    oneSentence: "taste-diagnosis:ひとこと:純米吟醸",
    forFeedbackKey: "純米吟醸",
  },
  tokubetsuJunmai: {
    label: "sake-category:特別純米",
    ruby: "sake-category:特別純米ルビ",
    oneSentence: "taste-diagnosis:ひとこと:特別純米",
    forFeedbackKey: "特別純米",
  },
  futsushu: {
    label: "sake-category:普通酒",
    ruby: "sake-category:普通酒ルビ",
    oneSentence: "taste-diagnosis:ひとこと:普通酒",
    forFeedbackKey: "普通酒",
  },
} as const;

export const transformScoreKey = (
  key: Category,
  t: TFunction<"translation", undefined>
) => {
  const categoryData = categoryMapping[key];

  if (!categoryData) {
    console.warn(`Unknown category key: ${key}`);
    return { label: key, ruby: "", oneSentence: "", forFeedbackKey: "" };
  }

  // 翻訳済みのデータを返す
  return {
    label: t(categoryData.label),
    ruby: t(categoryData.ruby),
    oneSentence: t(categoryData.oneSentence),
    forFeedbackKey: categoryData.forFeedbackKey,
  };
};
