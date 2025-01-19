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
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { tasteDiagnosisSchema, TasteDiagnosisSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAnswers = (questions: Question[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [progress, setProgress] = useState<number>(1);
  const [scores, setScores] = useState<Scores>({
    daiginjo: 0,
    junmaiGinjo: 0,
    tokubetsuJunmai: 0,
    futsushu: 0,
  });

  const method = useForm<TasteDiagnosisSchema>({
    resolver: zodResolver(tasteDiagnosisSchema),
    defaultValues: {
      daiginjo: 0,
      junmaiGinjo: 0,
      tokubetsuJunmai: 0,
      futsushu: 0,
    },
  });

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

    for (const key in scores) {
      method.setValue(
        key as keyof TasteDiagnosisSchema,
        scores[key as keyof Scores]
      );
    }

    router.push(`${pathname}/result`);
  };

  const handleBack = () => {
    setCurrentIndex(currentIndex - 1);
    setProgress(progress - 1);
  };

  return {
    method,
    currentIndex,
    answers,
    progress,
    scores,
    handleAnswer,
    handleBack,
  };
};
