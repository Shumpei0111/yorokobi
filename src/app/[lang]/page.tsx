import { Button } from "@/components/ui/button";
import { getTranslation } from "@/app/i18n/server";

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
        <Button variant="outline">{t("home:味覚診断を始める")}</Button>
      </div>
    </div>
  );
}
