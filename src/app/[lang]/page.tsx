import { Button } from "@/components/ui/button";
import { getTranslation } from "@/app/i18n/server";
import Link from "next/link";
import { availableLanguages } from "../i18n/settings";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: (typeof availableLanguages)[number] }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <div>
        <Button variant="outline">
          <Link href={`/${lang}/taste-diagnosis`}>
            {t("home:味覚診断を始める")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
