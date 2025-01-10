"use client";

import { useState } from "react";
import {
  Question,
  Scores,
  ScoringConfig,
  UserAnswer,
} from "../types/questions";
import { calculateScores } from "../helpers/calculateScores";
import scoringConfig from "@/app/data/scoring-config.json";

export const useAnswers = (questions: Question[]) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [progress, setProgress] = useState<number>(1);
  const [scores, setScores] = useState<Scores>({});

  const handleAnswer = (answer: UserAnswer) => {
    setAnswers([...answers, answer]);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(progress + 1);
      return;
    }

    // 診断結果をセット
    const scores = calculateScores({
      userAnswers: answers,
      weights: scoringConfig as ScoringConfig,
    });
    setScores(scores);
    console.log(scores);
  };

  return {
    currentIndex,
    answers,
    progress,
    done: Object.keys(scores).length > 0,
    scores,
    handleAnswer,
  };
};
