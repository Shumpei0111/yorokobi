"use client";

import questions from "@/app/data/questions.json";
import { type Language } from "@/app/i18n/settings";
import { type Question } from "./types/questions";
import { useAnswers } from "./hooks/use-answers";
import { QuestionCards } from "./question-cards";
import { DiagnosisResult } from "./diagnosis-result";

export const QuestionSlider = ({ lang }: { lang: Language }) => {
  const { currentIndex, handleAnswer, handleBack, scores, done } = useAnswers(
    questions as unknown as Question[]
  );

  return (
    <div className="overflow-x-hidden">
      {!done && (
        <QuestionCards
          questions={questions as unknown as Question[]}
          currentIndex={currentIndex}
          lang={lang}
          handleAnswer={handleAnswer}
          handleBack={handleBack}
        />
      )}
      {done && <DiagnosisResult scores={scores} lang={lang} />}
    </div>
  );
};
