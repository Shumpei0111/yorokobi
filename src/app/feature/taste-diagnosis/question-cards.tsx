import { AnimatePresence, motion } from "motion/react";
import { Question, UserAnswer } from "./types/questions";
import { type Language } from "@/app/i18n/settings";

/** 質問カード */
export const QuestionCards = ({
  questions,
  currentIndex,
  lang,
  handleAnswer,
}: {
  questions: Question[];
  currentIndex: number;
  lang: Language;
  handleAnswer: (answer: UserAnswer) => void;
}) => {
  return (
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
  );
};
