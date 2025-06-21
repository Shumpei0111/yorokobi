import { useForm } from "react-hook-form";
import { feedbackFormSchema, FeedbackFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { TFunction } from "i18next";
import { Language } from "@/app/i18n/settings";
import { getUserId } from "@/lib/getUserId";
import { submitFeedback } from "./actions/actions";

export const useLogic = ({
  diagnosisResult,
  t,
  lang,
  setIsOpen,
}: {
  diagnosisResult:
    | {
        highestScoreType: string | undefined;
        forFeedbackKey: string;
      }
    | undefined;
  t: TFunction;
  lang: Language;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isAgreePrivacyPolicy, setIsAgreePrivacyPolicy] = useState(false);
  const handleAgreePrivacyPolicy = () => {
    setIsAgreePrivacyPolicy(true);
  };

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const method = useForm<FeedbackFormSchema>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      app_rating: 0,
      app_suggestions: null,
      comments: null,
      contact_email: null,
      device_info: `${navigator.userAgent}@w=${window.innerWidth}/h=${window.innerHeight}`,
      diagnosis_result: diagnosisResult?.forFeedbackKey || "",
      feature_feedback: null,
      feature_rating: 0,
      feedback_type: "",
      location: null,
      other1: null,
      other2: null,
      other3: null,
      suggested_corrections: null,
      user_id: getUserId(),
      lang, // Default language
    },
  });

  useEffect(() => {
    method.reset(method.getValues());
  }, [method]);

  const predefinedResponses = [
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.診断結果に満足しました"
      ),
      value: "診断結果に満足しました",
    },
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.診断結果に不満があります"
      ),
      value: "診断結果に不満があります",
    },
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.アプリの使い勝手が良い"
      ),
      value: "アプリの使い勝手が良い",
    },
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.改善してほしい点があります"
      ),
      value: "改善してほしい点があります",
    },
    {
      label: t("taste-diagnosis:フィードバック.feedback_type.バグがあります"),
      value: "バグがあります",
    },
  ] as const;

  const predefinedComments = [
    {
      label: t("taste-diagnosis:フィードバック.comments.使いやすかった"),
      value: t("taste-diagnosis:フィードバック.comments.使いやすかった"),
    },
    {
      label: t("taste-diagnosis:フィードバック.comments.レコメンドに満足"),
      value: t("taste-diagnosis:フィードバック.comments.レコメンドに満足"),
    },
    {
      label: t("taste-diagnosis:フィードバック.comments.改善してほしい点あり"),
      value: t("taste-diagnosis:フィードバック.comments.改善してほしい点あり"),
    },
  ] as const;

  const onSubmit = async (data: FeedbackFormSchema) => {
    try {
      const result = await submitFeedback(data);

      if (!result.success) {
        throw new Error(
          result.error || "Failed to submit feedback for an unknown reason"
        );
      }

      setIsSubmitSuccess(true);
      setTimeout(() => {
        alert(
          "フィードバックを送信しました。貴重なご意見ありがとうございます！"
        );
        method.reset();
        setIsOpen(false);
      }, 500);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(
        "フィードバックの送信に失敗しました。しばらくしてから再度お試しください。"
      );
      setIsSubmitSuccess(false);
    }
  };

  return {
    method,
    predefinedResponses,
    predefinedComments,
    isSubmitSuccess,
    setIsSubmitSuccess,
    isAgreePrivacyPolicy,
    handleAgreePrivacyPolicy,
    onSubmit,
  };
};
