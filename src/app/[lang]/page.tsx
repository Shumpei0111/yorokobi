import { getTranslation } from "@/app/i18n/server";
import Link from "next/link";
import { type Language } from "../i18n/settings";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <strong className="text-2xl block text-center font-sans">
          {t("home:あなたにぴったりの日本酒を提案します")}
        </strong>
        <Link
          href={`/${lang}/taste-diagnosis`}
          className="bg-primary text-white px-10 py-2 rounded-full hover:bg-primary/80"
        >
          {t("home:味覚診断を始める")}
        </Link>
        <p className="text-xs font-jost text-center mt-4">
          {t("home:さあ、始めましょう")}
        </p>
      </div>
    </div>
  );
}
