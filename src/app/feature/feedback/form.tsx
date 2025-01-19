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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Rating } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/app/i18n/client";
import { Category } from "../taste-diagnosis/types/questions";
import { transformScoreKey } from "../taste-diagnosis/helpers/transformScoreKey";
import { Language } from "@/app/i18n/settings";
import { useLogic } from "./logic";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const FeedbackForm = ({
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
  const { method, predefinedResponses, onSubmit, onError } = useLogic({
    diagnosisResult,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[600px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>フィードバックを送る</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-xs text-justify">
          このプロダクトは成長途中です。より良いサービスにするために、ぜひあなたの感想を聞かせてください！
        </DialogDescription>
        <fieldset>
          <Form {...method}>
            <form
              onSubmit={method.handleSubmit(onSubmit, onError)}
              className="text-sm flex flex-col gap-4"
            >
              <div className="flex gap-4 text-base">
                <p className="font-bold">今回の診断結果</p>
                <p className="font-bold">
                  {method.getValues("diagnosis_result")
                    ? transformScoreKey(
                        method.getValues("diagnosis_result") as Category,
                        t
                      ).label
                    : "診断結果がありません"}
                </p>
              </div>
              <FormField
                control={method.control}
                name="feedback_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      アプリ全体に対する印象{" "}
                      <span className="text-red-500">(必須)</span>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={method.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      コメント記入欄 (任意)
                    </FormLabel>
                    <FormDescription>
                      アプリ全体に対するコメントを記入してください
                    </FormDescription>
                    <Textarea {...field} value={field.value || ""} />
                  </FormItem>
                )}
              />
              <FormField
                control={method.control}
                name="feature_feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      診断結果に対する感想 (任意)
                    </FormLabel>
                    <FormDescription>
                      診断結果に誤りがあるなども教えてもらえると嬉しいです
                    </FormDescription>
                    <FormControl>
                      <Textarea {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={method.control}
                name="app_rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      アプリ評価 (任意)
                    </FormLabel>
                    <FormControl>
                      <Rating
                        size="sm"
                        max={5}
                        value={Number(field.value)}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={method.control}
                name="other1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      このプロダクトを紹介したいと思いましたか？ (任意)
                    </FormLabel>
                    <FormControl>
                      <RadioGroup className="grid grid-cols-2 gap-1">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="紹介したいと思う"
                            id="紹介したいと思う"
                          />
                          <Label className="text-sm" htmlFor="紹介したいと思う">
                            はい
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="紹介したくないと思う"
                            id="紹介したくないと思う"
                          />
                          <Label
                            className="text-sm"
                            htmlFor="紹介したくないと思う"
                          >
                            いいえ
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={method.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      連絡先メールアドレス (任意)
                    </FormLabel>
                    <FormDescription>
                      返信が必要な場合などにお送りするために使用します。
                    </FormDescription>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">送信</Button>
              </div>
            </form>
          </Form>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
};
