import { env } from "@/env.mjs";
import { cookies } from "next/headers";

export function generateCSRFToken(): string {
  const token = crypto.randomUUID();
  return token;
}

export async function validateCSRFToken(token: string): Promise<boolean> {
  const storedToken = cookies().get("csrfToken")?.value;
  return storedToken === token;
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: env.ENABLE_CSRF,
    sameSite: env.ENABLE_CSRF ? ("strict" as const) : ("lax" as const),
    path: "/",
  };
}
