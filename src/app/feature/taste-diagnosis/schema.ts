import { z } from "zod";

export const tasteDiagnosisSchema = z.object({
  daiginjo: z.number(),
  junmaiGinjo: z.number(),
  tokubetsuJunmai: z.number(),
  futsushu: z.number(),
});

export type TasteDiagnosisSchema = z.infer<typeof tasteDiagnosisSchema>;
