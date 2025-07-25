"use client";

import { type Language } from "@/app/i18n/settings";
import { AnimatePresence, motion } from "motion/react";
import { Question } from "./types/questions";
import { tv } from "tailwind-variants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ChevronsLeft } from "lucide-react";
import { useAnswers } from "./hooks/use-answers";
import questions from "@/app/data/questions.json";
import { Form } from "@/components/ui/form";
import { TasteDiagnosisSchema } from "./schema";
import { submitDiagnosis } from "./actions/actions";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

export const QuestionSlider = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation(lang);
  const {
    method,
    currentIndex,
    isLastQuestionClicked,
    handleAnswer,
    handleBack,
  } = useAnswers(questions as unknown as Question[]);

  const onSubmit = async (data: TasteDiagnosisSchema) => {
    try {
      await submitDiagnosis(lang, data);
    } catch (error) {
      console.error("Failed to submit diagnosis:", error);
    }
  };

  const mainButtonVariant = tv({
    base: "bg-[rgba(0,43,92,0.8)] hover:bg-[rgba(0,43,92,1)] duration-300 text-white py-2 px-4 rounded shadow font-manrope border border-primary font-bold break-words",
    variants: {
      lang: {
        ja: "text-sm",
        en: "text-base",
      },
    },
  });

  const subTextVariant = tv({
    base: "text-xs block text-gray-100 pt-2 font-normal break-keep",
    variants: {
      lang: {
        ja: "text-xs",
        en: "text-xs",
      },
    },
    defaultVariants: {
      lang: "ja",
    },
  });

  return (
    <>
      <div className="overflow-x-hidden">
        <AnimatePresence>
          <div className="min-h-screen max-w-[600px] w-full mx-auto">
            <nav className="flex flex-col justify-center items-center gap-4 py-2 px-4">
              <span className="text-sm font-manrope">
                Q.{currentIndex + 1} — {questions.length}
              </span>
              <Progress
                value={currentIndex * 25}
                max={questions.length}
                className="w-full"
              />
            </nav>
            <Form {...method}>
              <form onSubmit={method.handleSubmit(onSubmit)}>
                <motion.fieldset
                  key={currentIndex}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -translate-x-1/2 w-full max-w-[600px] top-[20%] flex flex-col justify-center items-center  rounded p-6"
                >
                  <h3 className="text-xl font-bold font-jost mb-4">
                    {questions[currentIndex].question[lang]}
                  </h3>
                  <div className="flex flex-col gap-4 w-full">
                    {questions[currentIndex].options.map((option, index) => (
                      <button
                        key={index}
                        className={mainButtonVariant({ lang })}
                        onClick={() => {
                          handleAnswer(option.scores);
                        }}
                      >
                        {option.text[lang]}
                        <span className={subTextVariant({ lang })}>
                          {option.subText[lang]}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="py-4 w-full">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="font-leagueSpartan text-xs gap-1"
                      disabled={currentIndex === 0}
                    >
                      <ChevronsLeft />
                      {t("taste-diagnosis:前の質問にもどる")}
                    </Button>
                  </div>
                </motion.fieldset>
              </form>
            </Form>
          </div>
        </AnimatePresence>
      </div>
      <Dialog open={isLastQuestionClicked}>
        <DialogTitle className="hidden">診断中</DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <DialogContent className="bg-transparent [&>button]:hidden border-none">
          <Spinner />
        </DialogContent>
      </Dialog>
    </>
  );
};
