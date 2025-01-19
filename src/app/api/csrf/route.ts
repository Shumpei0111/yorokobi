import { NextResponse } from "next/server";
import { generateCSRFToken, getCookieOptions } from "@/lib/csrf";

export const runtime = "nodejs"; // Node.js環境で実行するように指定

export async function GET() {
  const csrfToken = generateCSRFToken();

  // レスポンスオブジェクトを作成
  const response = NextResponse.json({ csrfToken });

  // Cookieを設定
  const cookieOptions = getCookieOptions();
  response.cookies.set("csrfToken", csrfToken, cookieOptions);

  // 開発環境の場合、デバッグ情報をコンソールに出力
  if (process.env.NODE_ENV !== "production") {
    console.log("CSRF Token generated:", csrfToken);
    console.log("Cookie options:", cookieOptions);
  }

  return response;
}
