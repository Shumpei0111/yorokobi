"use server";

import { FeedbackFormSchema } from "../schema";
import { supabaseClient } from "@/lib/supabaseClient";
import { Database } from "@/types/database";
import { fetchUserCountry } from "@/lib/utils";

interface SubmitFeedbackReturn {
  success: boolean;
  error?: string;
}

export async function submitFeedback(
  data: FeedbackFormSchema
): Promise<SubmitFeedbackReturn> {
  try {
    const country = await fetchUserCountry();
    const user_id = data.user_id;

    const { error } = await supabaseClient.from("feedback").insert([
      {
        ...data,
        user_id,
        created_at: new Date().toISOString(),
        location: country,
      } satisfies Database["public"]["Tables"]["feedback"]["Insert"],
    ]);

    if (error) {
      console.error("[submitFeedback]Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    console.log("フィードバックを送信しました");
    return { success: true };
  } catch (error) {
    console.error("🍎フィードバックの送信に失敗しました", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Internal server error" };
  }
}
