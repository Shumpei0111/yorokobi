import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();

    const { error } = await supabaseClient.from("diagnosis_results").insert([
      {
        result: requestData.result,
        user_id: requestData.user_id,
      },
    ]);

    if (error) {
      console.error("[result] Supabase insert error:", error);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("[result] API Error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "[result] An unknown error occurred" },
      { status: 500 }
    );
  }
}
