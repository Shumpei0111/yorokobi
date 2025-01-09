import { Button } from "@/components/ui/button";
import { getTranslation } from "@/app/i18n/server";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  return (
    <div>
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
