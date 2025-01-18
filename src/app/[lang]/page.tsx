import { getTranslation } from "@/app/i18n/server";
import Link from "next/link";
import { type Language } from "../i18n/settings";
import { WhySakeCool } from "../feature/home/why-sake-cool";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  return (
    <div className="px-4 py-20 w-full h-full flex flex-col md:gap-36 gap-16 justify-center items-center">
      <section className="flex flex-col items-center min-h-[calc(100vh-700px)]">
        <strong className="text-3xl md:text-5xl block font-hannariMincho text-center">
          {t("home:ヒーロー:1行目")}
          <span className="text-base md:text-2xl block font-sans mt-2">
            {t("home:ヒーロー:2行目")}
          </span>
        </strong>
        <div className="pt-10 md:pt-16">
          <Link
            href={`/${lang}/taste-diagnosis`}
            className="bg-primary border-secondary border font-hannariMincho -mt-2 block text-black hover:brightness-75 transition duration-300  px-10 py-2 rounded-full hover:bg-primary/80 drop-shadow-md"
          >
            {t("home:味覚診断を始める")}
          </Link>
        </div>
      </section>
      <section className="w-auto pt-40">
        <h2 className="text-4xl font-sans font-bold text-center tracking-tighter">
          Why Sake is Cool?
        </h2>
        <WhySakeCool />
      </section>
    </div>
  );
}
