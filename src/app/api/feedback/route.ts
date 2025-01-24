import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";
import { fetchUserCountry } from "@/lib/utils";
import { Database } from "@/types/database";
import { feedbackFormSchema } from "@/app/feature/feedback/schema";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const validatedData = feedbackFormSchema.parse(requestData);
    console.log("validatedData: ", validatedData);

    // ユーザーの国を取得
    const country = await fetchUserCountry();

    // SupabaseにINSERT
    const { data, error } = await supabaseClient.from("feedback").insert([
      {
        ...validatedData,
        user_id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        location: country,
      } satisfies Database["public"]["Tables"]["feedback"]["Insert"],
    ]);

    if (error) {
      console.error("[feedback]Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
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
