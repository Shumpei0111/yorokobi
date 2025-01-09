// スコアリング設定の型定義
export interface ScoringConfig {
  question_weights: Record<string, number>; // 質問ごとの重み
  category_weights: Record<string, number>; // カテゴリごとの重み
  calculation: {
    formula: string; // 計算式の説明
  };
}
