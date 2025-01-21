import { getDiagnosisResult } from "@/app/feature/taste-diagnosis/actions/actions";
import { DiagnosisResult } from "@/app/feature/taste-diagnosis/diagnosis-result";
import { getTranslation } from "@/app/i18n/server";
import { Language } from "@/app/i18n/settings";
import { RotateCcw } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

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
  const { t } = await getTranslation(lang);
  const result = await getDiagnosisResult();

  if (!result) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Oops!</h1>
          <p className="text-gray-500 mt-2 text-sm">
            {t(
              "taste-diagnosis:診断データがありません。ぜひこちらから診断をやり直してください。"
            )}
          </p>
          <div className="mt-4">
            <Link
              href={`/${lang}/taste-diagnosis`}
              className="bg-[rgba(0,43,92,0.8)] hover:bg-[rgba(0,43,92,1)] hover:text-white duration-300 text-white py-2 px-10 rounded shadow font-jost border border-primary font-bold inline-flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              {t("taste-diagnosis:診断をやり直す")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const scores = {
    daiginjo: result.daiginjo,
    junmaiGinjo: result.junmaiGinjo,
    tokubetsuJunmai: result.tokubetsuJunmai,
    futsushu: result.futsushu,
  };

  return <DiagnosisResult scores={scores} lang={lang} />;
}
