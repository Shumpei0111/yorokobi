import { Scores, UserAnswer, Weights } from "../types/questions";

export const calculateScores = ({
  userAnswers,
  weights,
}: {
  userAnswers: UserAnswer[];
  weights: Weights;
}): Scores => {
  const { questionWeights, categoryWeights } = weights;

  // スコアの初期化
  const questionScores: Record<string, number> = {};

  // 質問ごとのスコア計算（重み適用）
  userAnswers.forEach((answer, index) => {
    const questionWeight = Object.values(questionWeights)[index] || 1;

    Object.entries(answer).forEach(([categoryId, score]) => {
      questionScores[categoryId] =
        (questionScores[categoryId] || 0) + (score || 1) * questionWeight;
    });
  });

  // カテゴリごとのスコア計算
  const categoryScores: Scores = {
    daiginjo: 0,
    junmaiGinjo: 0,
    tokubetsuJunmai: 0,
    futsushu: 0,
  };
  Object.entries(categoryWeights).forEach(([categoryId, weight]) => {
    categoryScores[categoryId as keyof Scores] = roundTo(
      Object.entries(questionScores).reduce(
        (sum, [key, value]) => sum + value * (weight[key] || 0),
        0
      )
    );
  });

  return categoryScores;
};

export const roundTo = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
};
