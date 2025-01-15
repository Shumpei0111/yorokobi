export interface Question {
  id: number;
  question: {
    ja: string;
    en: string;
  };
  options: Option[];
}

export interface Option {
  id: string;
  text: {
    ja: string;
    en: string;
  };
  scores: Record<string, number>;
}

// スコアリング設定の型定義
export interface ScoringConfig {
  questionWeights: Record<string, number>; // 質問ごとの重み
  categoryWeights: Record<string, Record<string, number>>; // カテゴリごとの重み
  calculation: {
    formula: string; // 計算式の説明
  };
}

export type Weights = Pick<
  ScoringConfig,
  "questionWeights" | "categoryWeights"
>;

export type UserAnswer = Record<string, number | undefined>;

export type Category =
  | "daiginjo"
  | "junmaiGinjo"
  | "tokubetsuJunmai"
  | "futsushu";

export type Scores = Record<Category, number>;
