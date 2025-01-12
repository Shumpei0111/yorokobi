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
    <div className="absolute w-full h-full flex justify-center items-center px-4">
      <div className="flex flex-col items-center gap-6">
        <strong className="text-xl block font-sans">
          {t("common:ヒーロー:1行目")}
          <br />
          {t("common:ヒーロー:2行目")}
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
