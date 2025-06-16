import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";
import { fetchUserCountry } from "@/lib/utils";
import { Database } from "@/types/database";
import { feedbackFormSchema } from "@/app/feature/feedback/schema";
import { getUserId } from "@/lib/getUserId";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const validatedData = feedbackFormSchema.parse(requestData);
    console.log("validatedData: ", validatedData);

    // ユーザーの国を取得
    const country = await fetchUserCountry();

    const user_id = validatedData.user_id; // ユーザーIDをリクエストペイロードから取得

    // SupabaseにINSERTしてuser_idを返す。LocalStorageに保存する。
    const { data, error } = await supabaseClient
      .from("feedback")
      .insert([
        {
          ...validatedData,
          user_id,
          created_at: new Date().toISOString(),
          location: country,
        } satisfies Database["public"]["Tables"]["feedback"]["Insert"],
      ])
      .select("user_id");

    if (error) {
      console.error("[feedback]Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data, user_id }, { status: 200 });
  } catch (err: unknown) {
    console.error("[feedback] API Error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "[feedback] An unknown error occurred" },
      { status: 500 }
    );
  }
}
