import { QuestionSlider } from "@/app/feature/taste-diagnosis/slider";
import { getTranslation } from "@/app/i18n/server";
import { availableLanguages } from "@/app/i18n/settings";

export default async function TasteDiagnosisPage({
  params,
}: {
  params: Promise<{ lang: (typeof availableLanguages)[number] }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <div className="w-screen">
      <div>
        <QuestionSlider lang={lang} />
      </div>
    </div>
  );
}
