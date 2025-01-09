import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /** ベーシック認証のユーザー名 */
    BASIC_AUTH_USER: z.string().min(1),
    /** ベーシック認証のパスワード */
    BASIC_AUTH_PASSWORD: z.string().min(1),
  },
  runtimeEnv: {
    BASIC_AUTH_USER: process.env.BASIC_AUTH_USER,
    BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
  },
});
