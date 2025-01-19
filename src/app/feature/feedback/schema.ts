import { z } from "zod";

export const feedbackFormSchema = z
  .object({
    /** アプリ評価 */
    app_rating: z.number().max(5).nullable(),
    /** アプリ改善提案 */
    app_suggestions: z.string().nullable(),
    /** コメント */
    comments: z.string().nullable(),
    /** 連絡先*/
    contact_email: z
      .string()
      .email({ message: "正しい形式で入力してください" })
      .or(z.string().max(0))
      .nullable(),
    /** デバイス情報 */
    device_info: z.string().nullable(),
    /** 診断結果 */
    diagnosis_result: z.string(),
    /** 機能フィードバック */
    feature_feedback: z.string().nullable(),
    /** 機能評価 */
    feature_rating: z.number().max(5).nullable(),
    /** フィードバックタイプ */
    feedback_type: z.string(),
    /** 位置情報 */
    location: z.string().nullable(),
    /** その他1 */
    other1: z.string().nullable(),
    /** その他2 */
    other2: z.string().nullable(),
    /** その他3 */
    other3: z.string().nullable(),
    /** 提案された修正 */
    suggested_corrections: z.string().nullable(),
    /** ユーザーID */
    user_id: z.string().nullable(),
  })
  .refine((data) => data.feedback_type !== "", {
    path: ["feedback_type"],
    message: "必須項目です",
  });

export type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>;
