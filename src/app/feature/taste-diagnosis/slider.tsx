"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import questions from "@/app/data/questions.json";
import { availableLanguages } from "@/app/i18n/settings";

export const QuestionSlider = ({
  lang,
}: {
  lang: (typeof availableLanguages)[number];
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    console.log(answers);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // 診断結果を表示
      console.log(answers);
    }
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full flex flex-col justify-center items-center bg-white rounded p-6"
        >
          <h2 className="text-xl font-bold mb-4">
            {questions[currentIndex].question[lang]}
          </h2>
          <div className="flex flex-col gap-4">
            {questions[currentIndex].options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                onClick={() => handleAnswer(option.text[lang])}
              >
                {option.text[lang]}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
