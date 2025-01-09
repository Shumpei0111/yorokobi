import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /** ベーシック認証を有効にするかどうか */
    ENABLE_BASIC_AUTH: z.string().transform((value) => value === "true"),
    /** ベーシック認証のユーザー名 */
    BASIC_AUTH_USER: z.string().min(1),
    /** ベーシック認証のパスワード */
    BASIC_AUTH_PASSWORD: z.string().min(1),
  },
  runtimeEnv: {
    ENABLE_BASIC_AUTH: process.env.ENABLE_BASIC_AUTH,
    BASIC_AUTH_USER: process.env.BASIC_AUTH_USER,
    BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
  },
});
