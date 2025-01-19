import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    // SupabaseにINSERT
    const { data, error } = await supabaseClient
      .from("feedback")
      .insert([{ ...requestData, created_at: new Date().toISOString() }]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    console.error("API Error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
