"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/app/i18n/client";
import { Category } from "../taste-diagnosis/types/questions";
import { transformScoreKey } from "../taste-diagnosis/helpers/transformScoreKey";
import { Language } from "@/app/i18n/settings";
import { useLogic } from "./logic";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Send } from "lucide-react";
import { FormErrorMessage } from "@/components/ui/form-error-message";

export const LightWeightForm = ({
  lang,
  isOpen,
  setIsOpen,
  diagnosisResult,
}: {
  lang: Language;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  diagnosisResult: string | undefined;
}) => {
  const { t } = useTranslation(lang);
  const { method, predefinedResponses, predefinedComments, onSubmit, onError } =
    useLogic({
      diagnosisResult,
      t,
    });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[600px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="font-jost text-xl">
            🍶{t("taste-diagnosis:フィードバック.フィードバックを送る")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-xs text-justify">
          {t("taste-diagnosis:フィードバック.このプロダクトは成長途中です。")}
        </DialogDescription>
        <Form {...method}>
          <form
            onSubmit={method.handleSubmit(onSubmit, onError)}
            className="text-sm flex flex-col gap-4"
          >
            <div className="flex flex-col text-base items-center border border-primary bg-white p-1 rounded-md shadow-sm">
              <p className="text-sm">
                {t("taste-diagnosis:フィードバック.今回の診断結果")}
              </p>
              <p className="font-bold text-lg">
                {method.getValues("diagnosis_result")
                  ? transformScoreKey(
                      method.getValues("diagnosis_result") as Category,
                      t
                    ).label
                  : t("taste-diagnosis:フィードバック.診断結果がありません")}
              </p>
            </div>
            <FormField
              control={method.control}
              name="feedback_type"
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold">
                    {t("taste-diagnosis:フィードバック.feedback_type.ラベル")}
                    <span className="text-red-500 px-1 text-lg -mt-2 inline-block">
                      *
                    </span>
                  </FormLabel>
                  <div className="grid md:grid-cols-2 gap-1">
                    <RadioGroup>
                      {predefinedResponses.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <RadioGroupItem
                            id={option.value}
                            onClick={() =>
                              method.setValue("feedback_type", option.value)
                            }
                            value={option.value}
                          />
                          <Label className="text-sm" htmlFor={option.value}>
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  {method.formState.errors.feedback_type && (
                    <FormErrorMessage>
                      {t(
                        "taste-diagnosis:フィードバック.error_message.選択してください"
                      )}
                    </FormErrorMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={method.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    {t("taste-diagnosis:フィードバック.comments.ラベル")}
                  </FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {predefinedComments.map((comment, index) => (
                      <Button
                        key={index}
                        size="sm"
                        onClick={() =>
                          method.setValue("comments", comment.value)
                        }
                      >
                        {comment.label}
                      </Button>
                    ))}
                  </div>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    placeholder={t(
                      "taste-diagnosis:フィードバック.comments.例"
                    )}
                    rows={4}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={method.control}
              name="agree_privacy_policy"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2 justify-center">
                  <div className="flex items-center gap-2">
                    <FormLabel className="text-xs text-gray-600 flex items-center gap-1">
                      <Link
                        href={`/${lang}/privacy`}
                        className="underline"
                        target="_blank"
                      >
                        {t(
                          "taste-diagnosis:フィードバック.プライバシーポリシー"
                        )}
                      </Link>
                      {t("taste-diagnosis:フィードバック.を確認し同意します")}
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!m-0"
                      />
                    </FormControl>
                  </div>
                  {method.formState.errors.agree_privacy_policy && (
                    <FormErrorMessage>
                      {t(
                        "taste-diagnosis:フィードバック.error_message.プライバシーポリシーを確認し同意してください"
                      )}
                    </FormErrorMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-1">
                <Send className="w-4 h-4" />
                {t("taste-diagnosis:フィードバック.送信")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
