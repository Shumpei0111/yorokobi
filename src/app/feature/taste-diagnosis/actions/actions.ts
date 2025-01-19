"use server";

import { Scores, ScoringConfig, UserAnswer } from "../types/questions";
import { calculateScores } from "../helpers/calculateScores";
import scoringConfig from "@/app/data/scoring-config.json";
import { validateCSRFToken } from "@/lib/csrf";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Language } from "@/app/i18n/settings";

const results = new Map<string, Scores>();

export async function submitDiagnosis(
  lang: Language,
  answers: UserAnswer[],
  csrfToken: string
) {
  if (!(await validateCSRFToken(csrfToken))) {
    throw new Error("[submitDiagnosis] Invalid CSRF token");
  }

  const scores = calculateScores({
    userAnswers: answers,
    weights: scoringConfig as ScoringConfig,
  });

  // 結果に一意のIDを割り当て
  const resultId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  results.set(resultId, scores);

  // セッションにIDを保存
  cookies().set("resultId", resultId, { httpOnly: true, secure: true });

  redirect(`/${lang}/taste-diagnosis/result`);
}
