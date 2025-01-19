import { getDiagnosisResult } from "@/app/feature/taste-diagnosis/actions/actions";
import { DiagnosisResult } from "@/app/feature/taste-diagnosis/diagnosis-result";
import { getTranslation } from "@/app/i18n/server";
import { Language } from "@/app/i18n/settings";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { lang: Language };
}): Promise<Metadata> => {
  const { t } = await getTranslation(params.lang);
  return {
    title: `Yorokobi | ${t("taste-diagnosis:おすすめ日本酒診断")}`,
    description: t("taste-diagnosis:あなたにぴったりの日本酒を提案します"),
  };
};

export default async function ResultPage({
  params,
}: {
  params: { lang: Language };
}) {
  const { lang } = params;
  const result = await getDiagnosisResult();
  if (!result) {
    return <div>診断結果がありません</div>;
  }

  const scores = {
    daiginjo: result.daiginjo,
    junmaiGinjo: result.junmaiGinjo,
    tokubetsuJunmai: result.tokubetsuJunmai,
    futsushu: result.futsushu,
  };

  return <DiagnosisResult scores={scores} lang={lang} />;
}
