"use client";

import { useTranslation } from "@/app/i18n/client";
import { Language } from "@/app/i18n/settings";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export const RetryButton = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation(lang);
  return (
    <Button
      variant="outline"
      onClick={() => {
        scrollTo(0, 0);
        location.href = `/${lang}/taste-diagnosis`;
      }}
      className="bg-[rgba(0,43,92,0.8)] hover:bg-[rgba(0,43,92,1)] hover:text-white duration-300 text-white py-2 px-10 rounded shadow font-jost border border-primary font-bold"
    >
      <RotateCcw />
      {t("taste-diagnosis:診断をやり直す")}
    </Button>
  );
};
