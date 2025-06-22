"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Language } from "@/app/i18n/settings";
import { TasteDiagnosisSchema, DiagnosisResultWithId } from "../schema";
import { z } from "zod";

export async function submitDiagnosis(
  lang: Language,
  data: TasteDiagnosisSchema
) {
  // 結果に一意のIDを割り当て
  const resultId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  const cookieData: DiagnosisResultWithId = { id: resultId, ...data };
  const jsonString = JSON.stringify(cookieData);

  // 結果をクッキーに保存
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1時間の有効期限
      path: "/", // パスを明示的に設定
      sameSite: "lax" as const, // SameSite属性を追加
    };

    cookies().set("diagnosisResult", jsonString, cookieOptions);
    console.log(
      `[Diagnosis] Cookie set successfully for result ID: ${resultId}`
    );
  } catch (error) {
    console.error("[Diagnosis] Failed to set cookie:", error);
  }

  redirect(`/${lang}/taste-diagnosis/result`);
}

export async function getDiagnosisResult(): Promise<TasteDiagnosisSchema | null> {
  try {
    const cookie = cookies().get("diagnosisResult");

    if (!cookie?.value) {
      console.log("[Diagnosis] No diagnosis result cookie found");
      return null;
    }

    const parsedData = JSON.parse(cookie.value) as DiagnosisResultWithId;
    console.log(`[Diagnosis] Retrieved result for ID: ${parsedData.id}`);

    // idを除いたTasteDiagnosisSchemaの形式で返す
    const { id, ...resultData } = parsedData;
    return resultData;
  } catch (error) {
    console.error("[Diagnosis] Failed to parse diagnosis result:", error);
    return null;
  }
}

const postResultSchema = z.object({
  result: z.object({}).passthrough(),
  user_id: z.string(),
});

export type PostResultData = z.infer<typeof postResultSchema>;

export async function postResult(data: PostResultData) {
  const validation = postResultSchema.safeParse(data);

  if (!validation.success) {
    console.error("Invalid data format for postResult:", validation.error);
    return { success: false, error: "Invalid data format" };
  }

  console.log("Received diagnosis result on server:", validation.data);
  // ここでデータベースへの保存処理などを実装する
  return { success: true };
}
