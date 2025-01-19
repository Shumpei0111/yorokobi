import { FieldErrors, useForm } from "react-hook-form";
import { feedbackFormSchema, FeedbackFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export const useLogic = ({
  diagnosisResult,
}: {
  diagnosisResult: string | undefined;
}) => {
  const method = useForm<FeedbackFormSchema>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      app_rating: 0,
      app_suggestions: "",
      comments: null,
      contact_email: null,
      device_info: navigator.userAgent,
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
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    method.reset(method.getValues());
  }, [method]);

  const predefinedResponses = [
    { label: "レコメンドが的確でした", value: "レコメンドが的確でした" },
    {
      label: "レコメンドに満足していません",
      value: "レコメンドに満足していません",
    },
    { label: "アプリの使い勝手が良い", value: "アプリの使い勝手が良い" },
    {
      label: "改善してほしい点があります",
      value: "改善してほしい点があります",
    },
    {
      label: "バグがあります",
      value: "バグがあります",
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
    onSubmit,
    onError,
  };
};
