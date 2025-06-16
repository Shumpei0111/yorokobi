import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    console.log("🍎", { requestData });

    const { data, error } = await supabaseClient
      .from("diagnosis_results")
      .insert([
        {
          result: requestData.result,
          user_id: requestData.user_id,
        },
      ])
      .select();

    console.log("🍎🍎🍎", { data, error });

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
