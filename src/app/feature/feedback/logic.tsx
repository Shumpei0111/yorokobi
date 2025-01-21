import { FieldErrors, useForm } from "react-hook-form";
import { feedbackFormSchema, FeedbackFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { TFunction } from "i18next";

export const useLogic = ({
  diagnosisResult,
  t,
}: {
  diagnosisResult: string | undefined;
  t: TFunction;
}) => {
  const method = useForm<FeedbackFormSchema>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      app_rating: 0,
      app_suggestions: "",
      comments: null,
      contact_email: null,
      device_info: `${navigator.userAgent}@w=${window.innerWidth}/h=${window.innerHeight}`,
      diagnosis_result: diagnosisResult || "",
      feature_feedback: "",
      feature_rating: 0,
      feedback_type: "",
      location: "",
      other1: null,
      other2: null,
      other3: null,
      suggested_corrections: "",
      user_id: "",
      agree_privacy_policy: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    method.reset(method.getValues());
  }, [method]);

  const predefinedResponses = [
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.診断結果に満足しました"
      ),
      value: t(
        "taste-diagnosis:フィードバック.feedback_type.診断結果に満足しました"
      ),
    },
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.診断結果に不満があります"
      ),
      value: t(
        "taste-diagnosis:フィードバック.feedback_type.診断結果に不満があります"
      ),
    },
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.アプリの使い勝手が良い"
      ),
      value: t(
        "taste-diagnosis:フィードバック.feedback_type.アプリの使い勝手が良い"
      ),
    },
    {
      label: t(
        "taste-diagnosis:フィードバック.feedback_type.改善してほしい点があります"
      ),
      value: t(
        "taste-diagnosis:フィードバック.feedback_type.改善してほしい点があります"
      ),
    },
    {
      label: t("taste-diagnosis:フィードバック.feedback_type.バグがあります"),
      value: t("taste-diagnosis:フィードバック.feedback_type.バグがあります"),
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
    console.log(data);
  };

  const onError = (errors: FieldErrors<FeedbackFormSchema>) => {
    console.log(errors);
  };

  return {
    method,
    predefinedResponses,
    predefinedComments,
    onSubmit,
    onError,
  };
};
