"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useTranslation } from "@/app/i18n/client";
import { Language } from "@/app/i18n/settings";
import { useState } from "react";
import { SelectLang } from "../ui/select-lang";

export const FirstCheckDialog = ({ lang }: { lang: Language }) => {
  const { t } = useTranslation(lang);
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("ageCheck") === "true" ? false : true;
  });

  const handleYes = () => {
    setOpen(false);
    window.localStorage.setItem("ageCheck", "true");
  };

  return (
    <Dialog open={open} defaultOpen={open}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <DialogTitle>言語/Language</DialogTitle>
            <DialogDescription>
              <SelectLang />
            </DialogDescription>
          </div>
          <div className="flex flex-col gap-2">
            <DialogTitle>{t("common:年齢確認")}</DialogTitle>
            <DialogDescription>
              {t(
                "common:あなたの国でアルコールを飲むことを認められた年齢ですか？"
              )}
              <div className="flex gap-2 justify-center py-4">
                <Button onClick={handleYes}>{t("common:はい")}</Button>
                <Button>{t("common:いいえ")}</Button>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
