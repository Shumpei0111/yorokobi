import { getTranslation } from "@/app/i18n/server";
import { Language } from "@/app/i18n/settings";

export default async function Privacy({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  return (
    <section className="px-4 text-sm flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{t("privacy:タイトル")}</h1>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:はじめに.タイトル")}</h2>
        <p>{t("privacy:はじめに.内容")}</p>
        <div>
          <h3 className="text-lg font-bold">
            {t("privacy:はじめに.適用範囲.タイトル")}
          </h3>
          <p>{t("privacy:はじめに.適用範囲.内容")}</p>
        </div>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:1.タイトル")}</h2>
        <div>
          <h3 className="text-lg font-bold">{t("privacy:1.1-1.タイトル")}</h3>
          <p>{t("privacy:1.1-1.内容")}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">{t("privacy:1.1-2.タイトル")}</h3>
          <p>{t("privacy:1.1-2.内容")}</p>
          <ul>
            <li className="pl-4">
              {t("privacy:1.1-2.ユーザーのデバイス情報")}
            </li>
            <li className="pl-4">{t("privacy:1.1-2.アプリの利用状況")}</li>
            <li className="pl-4">{t("privacy:1.1-2.ログ")}</li>
          </ul>
        </div>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:2.タイトル")}</h2>
        <div>
          <h3 className="text-lg font-bold">{t("privacy:2.2-1.タイトル")}</h3>
          <p>{t("privacy:2.2-1.内容")}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">{t("privacy:2.2-2.タイトル")}</h3>
          <p>
            {t("privacy:2.2-2.内容1")}
            <br />
            {t("privacy:2.2-2.内容2")}
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              {t("privacy:2.2-2.内容3")}
            </a>
            {t("privacy:2.2-2.内容4")}
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              {t("privacy:2.2-2.内容5")}
            </a>
            {t("privacy:2.2-2.内容6")}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">{t("privacy:2.2-3.タイトル")}</h3>
          <p>{t("privacy:2.2-3.内容")}</p>
        </div>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:3.タイトル")}</h2>
        <p>{t("privacy:3.内容1")}</p>
        <ul>
          <li className="pl-4">{t("privacy:3.内容2")}</li>
          <li className="pl-4">{t("privacy:3.内容3")}</li>
          <li className="pl-4">{t("privacy:3.内容4")}</li>
        </ul>
        <div>
          <h3 className="text-lg font-bold">{t("privacy:3.3-1.タイトル")}</h3>
          <p>{t("privacy:3.3-1.内容")}</p>
        </div>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:4.タイトル")}</h2>
        <p>{t("privacy:4.内容")}</p>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:5.タイトル")}</h2>
        <p>{t("privacy:5.内容")}</p>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:6.タイトル")}</h2>
        <p>{t("privacy:6.内容")}</p>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:7.タイトル")}</h2>
        <p>{t("privacy:7.内容")}</p>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:8.タイトル")}</h2>
        <p>{t("privacy:8.内容1")}</p>
        <p>{t("privacy:8.内容2")}</p>
      </article>
      <article className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{t("privacy:9.タイトル")}</h2>
        <p>{t("privacy:9.内容1")}</p>
        <p>
          {t("privacy:9.内容2")}
          <a
            className="underline"
            href="https://x.com/seventhseven"
            target="_blank"
            rel="noopener"
          >
            @seventhseven
          </a>
          {t("privacy:9.内容3")}
        </p>
        <p>{t("privacy:9.内容4")}</p>
      </article>
    </section>
  );
}
