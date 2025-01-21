"use client";

import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { X, Send } from "lucide-react";
import { Language } from "@/app/i18n/settings";
import { LightWeightForm } from "./light-weight-form";
import { useTranslation } from "@/app/i18n/client";

export const FeedbackBanner = ({
  lang,
  diagnosisResult,
}: {
  lang: Language;
  diagnosisResult: string | undefined;
}) => {
  const [isShowBanner, setIsShowBanner] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isClickCloseOnce, setIsClickCloseOnce] = useState(false);
  const { t } = useTranslation(lang);

  useEffect(() => {
    const handleScroll = (): void => {
      const triggerPoint = window.innerHeight * 0.5;
      if (window.scrollY > triggerPoint && !isShowBanner && !isClickCloseOnce) {
        setIsShowBanner(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isShowBanner, isClickCloseOnce]);

  return (
    <div>
      {isShowBanner && (
        <AnimatePresence>
          <motion.div
            className="rounded-lg text-sm fixed bottom-[3%] left-1/2 -translate-x-1/2 w-[90%] z-50 bg-black/80 text-white h-max flex flex-col items-center px-4 py-4 justify-between gap-2 drop-shadow-lg max-w-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="absolute top-0 right-0 bg-transparent hover:bg-transparent"
              onClick={() => {
                setIsShowBanner(false);
                setShowForm(false);
                setIsClickCloseOnce(true);
              }}
            >
              <X />
            </Button>
            <p className="text-xs pt-2 text-center">
              {t(
                "taste-diagnosis:フィードバック.ぜひあなたの感想を聞かせてください！"
              )}
            </p>
            <Button
              className="border-1 bg-primary text-gray-100 font-bold w-[80%]"
              onClick={() => setShowForm(true)}
            >
              <Send />
              {t("taste-diagnosis:フィードバック.フィードバックを送る")}
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
      {showForm && !isClickCloseOnce && (
        <LightWeightForm
          isOpen={showForm}
          setIsOpen={setShowForm}
          diagnosisResult={diagnosisResult}
          lang={lang}
        />
      )}
    </div>
  );
};
