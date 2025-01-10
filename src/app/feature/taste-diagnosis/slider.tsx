"use client";

import { AnimatePresence, motion } from "motion/react";
import questions from "@/app/data/questions.json";
import { availableLanguages } from "@/app/i18n/settings";
import { type Question } from "./types/questions";
import { useAnswers } from "./hooks/use-answers";

export const QuestionSlider = ({
  lang,
}: {
  lang: (typeof availableLanguages)[number];
}) => {
  const { currentIndex, handleAnswer, scores, done } = useAnswers(
    questions as unknown as Question[]
  );

  return (
    <div className="overflow-x-hidden">
      {!done && (
        <AnimatePresence>
          <nav className="inline-flex items-center gap-4 py-2 px-4">
            {Array.from({ length: questions.length }).map((_, index) => (
              <div key={index} className="w-full h-full">
                <span
                  className={`${
                    index <= currentIndex ? "bg-gray-300 " : "bg-white "
                  } rounded-full py-1 px-2 border `}
                >
                  {index + 1}
                </span>
              </div>
            ))}
          </nav>
          <motion.div
            key={currentIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full flex flex-col justify-center items-center  rounded p-6"
          >
            <h3 className="text-xl font-bold mb-4">
              {questions[currentIndex].question[lang]}
            </h3>
            <div className="flex flex-col gap-4">
              {questions[currentIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                  onClick={() => {
                    handleAnswer(option.scores);
                  }}
                >
                  {option.text[lang]}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {done && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3>診断結果</h3>
            <div>
              {Object.entries(scores).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
