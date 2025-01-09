import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    /** ベーシック認証のユーザー名 */
    BASIC_AUTH_USER: z.string(),
    /** ベーシック認証のパスワード */
    BASIC_AUTH_PASSWORD: z.string(),
  },
});
