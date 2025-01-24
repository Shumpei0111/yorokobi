"use server";

import { Language } from "@/app/i18n/settings";
import { validateCSRFToken } from "@/lib/csrf";
import { FeedbackFormSchema } from "../schema";
import { cookies } from "next/headers";

export async function submitFeedback(
  lang: Language,
  data: FeedbackFormSchema,
  csrfToken: string
) {
  if (!(await validateCSRFToken(csrfToken))) {
    throw new Error("[submitFeedback] Invalid CSRF token");
  }

  try {
    // 結果に一意のIDを割り当て
    const resultId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    // 結果をクッキーに保存
    cookies().set("feedbackResult", JSON.stringify({ id: resultId, ...data }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1時間の有効期限
    });

    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.VERCEL_URL || "localhost:3200";
    const apiUrl = `${protocol}://${host}/api/feedback`;

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("フィードバックを送信しました");
      return { success: true };
    } else {
      console.error("🍏API responded with an error:", response.status);
      return { success: false, error: `API error: ${response.status}` };
    }
  } catch (error) {
    console.error("🍎フィードバックの送信に失敗しました", error);
    return { success: false, error: "Internal server error" };
  }
}
