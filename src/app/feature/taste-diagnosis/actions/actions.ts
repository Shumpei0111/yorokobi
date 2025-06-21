"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Language } from "@/app/i18n/settings";
import { TasteDiagnosisSchema } from "../schema";
import { z } from "zod";

export async function submitDiagnosis(
  lang: Language,
  data: TasteDiagnosisSchema
) {
  // 結果に一意のIDを割り当て
  const resultId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  // 結果をクッキーに保存
  cookies().set("diagnosisResult", JSON.stringify({ id: resultId, ...data }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1時間の有効期限
  });

  redirect(`/${lang}/taste-diagnosis/result`);
}

export async function getDiagnosisResult(): Promise<TasteDiagnosisSchema | null> {
  const resultCookie = cookies().get("diagnosisResult")?.value;
  if (!resultCookie) {
    return null;
  }
  try {
    const result = JSON.parse(resultCookie) as TasteDiagnosisSchema;
    return result;
  } catch (error) {
    console.error("Failed to parse diagnosis result:", error);
    return null;
  }
}

const postResultSchema = z.object({
  result: z.object({}).passthrough(),
  user_id: z.string(),
});

export async function postResult(data: { result: unknown; user_id: string }) {
  const validation = postResultSchema.safeParse(data);

  if (!validation.success) {
    console.error("Invalid data format for postResult:", validation.error);
    return { success: false, error: "Invalid data format" };
  }

  console.log("Received diagnosis result on server:", validation.data);
  // ここでデータベースへの保存処理などを実装する
  return { success: true };
}
