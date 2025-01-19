import { QuestionSlider } from "@/app/feature/taste-diagnosis/slider";
import { getTranslation } from "@/app/i18n/server";
import { type Language } from "@/app/i18n/settings";
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

export default async function TasteDiagnosisPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;

  return <QuestionSlider lang={lang} />;
}
