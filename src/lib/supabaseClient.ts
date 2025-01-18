import { createClient } from "@supabase/supabase-js";
import { env } from "@/env.mjs";

const supabaseUrl = env.NEXT_PUBLIC_DB_PROJECT_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_DB_API_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
