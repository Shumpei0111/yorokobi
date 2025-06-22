import { z } from "zod";

export const tasteDiagnosisSchema = z.object({
  daiginjo: z.number(),
  junmaiGinjo: z.number(),
  tokubetsuJunmai: z.number(),
  futsushu: z.number(),
});

export type TasteDiagnosisSchema = z.infer<typeof tasteDiagnosisSchema>;

// クッキーに保存される診断結果の型（idを含む）
export type DiagnosisResultWithId = TasteDiagnosisSchema & {
  id: string;
};
