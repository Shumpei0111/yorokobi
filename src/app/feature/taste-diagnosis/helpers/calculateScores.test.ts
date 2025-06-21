import { UserAnswer, Weights } from "../types/questions";
import { calculateScores } from "./calculateScores";
import { test, expect } from "vitest";

const mockData = () => {
  const userAnswers: UserAnswer[] = [{ premium: 3 }, { light: 3 }, { rich: 6 }];

  const weights: Weights = {
    questionWeights: {
      answer1: 0.4, // 「飲むときの気分」の重み
      answer2: 0.6, // 「日本酒にどんな印象を求めますか？」の重み
    },
    categoryWeights: {
      daiginjo: { premium: 1.0, fruity: 0.8 },
      junmai: { light: 1.0, mellow: 0.8 },
      tokubetsuJunmai: { rich: 0.8, heavy: 0.6 },
    },
  };

  return { userAnswers, weights };
};

test("スコアの計算", () => {
  const { userAnswers, weights } = mockData();
  const result = calculateScores({
    userAnswers,
    weights,
  });

  expect(result).toEqual({
    daiginjo: 1.2,
    junmaiGinjo: 0,
    tokubetsuJunmai: 4.8,
    futsushu: 0,
    junmai: 1.79,
  });
});
