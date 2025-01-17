import { useTranslation } from "@/app/i18n/client";
import { Category } from "./types/questions";
import { match } from "ts-pattern";
import { Language } from "@/app/i18n/settings";
import { affiliate } from "@/app/data/affiliate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPickedUpBrands } from "./helpers/generateRecommendations";

export const ScoreTable = ({
  label,
  score,
  type,
  lang,
  isHighestScore,
}: {
  label: string;
  score: number;
  type: Category;
  lang: Language;
  isHighestScore: boolean;
}) => {
  const { t } = useTranslation(lang);

  const description = match(type)
    .with("daiginjo", () => t("sake-category:大吟醸とは"))
    .with("junmaiGinjo", () => t("sake-category:純米吟醸とは"))
    .with("tokubetsuJunmai", () => t("sake-category:特別純米とは"))
    .with("futsushu", () => t("sake-category:普通種とは"))
    .exhaustive();

  const recommendedDishes = match(type)
    .with("daiginjo", () => t("sake-category:相性の良い料理:大吟醸"))
    .with("junmaiGinjo", () => t("sake-category:相性の良い料理:純米吟醸"))
    .with("tokubetsuJunmai", () => t("sake-category:相性の良い料理:特別純米"))
    .with("futsushu", () => t("sake-category:相性の良い料理:普通酒"))
    .exhaustive();

  return (
    <div className="border-b border-gray-200 py-10 px-4">
      <div className="flex gap-x-4 justify-between items-center w-full">
        <p className="font-bold text-lg leading-5 flex-shrink-0">{label}</p>
        <div className="w-full flex-shrink-1 h-[1px] bg-black" />
        <p
          className={`font-jost font-bold text-right flex items-center justify-end flex-shrink-0 ${
            isHighestScore ? "text-primary" : ""
          }`}
        >
          {isHighestScore && (
            <span className="text-[10px] border border-primary rounded-full px-2 mr-2 bg-slate-50">
              {t("taste-diagnosis:あなたにおすすめ")}
            </span>
          )}
          {score}
        </p>
      </div>
      <div className="py-4">
        <div className="flex flex-col gap-y-1 items-center justify-center">
          <div
            dangerouslySetInnerHTML={{ __html: affiliate[type].imageWithHtml }}
            style={{
              border: "1px solid #cecece",
              backgroundColor: "#fff",
            }}
          />
          <Link href={affiliate[type].buttonLink} target="_blank">
            <Button className="px-10" size="sm">
              {t("taste-diagnosis:購入する")}
            </Button>
          </Link>
        </div>
        <div className="pt-4">
          <p className="text-xs font-sans text-gray-700 leading-5 font-bold pt-4">
            <span className="text-base">🍶</span>{" "}
            {t("taste-diagnosis:同じ種類の日本酒（ランダム）")}
          </p>
          <ul className="flex gap-x-1 items-center text-sm flex-wrap">
            {getPickedUpBrands(type).map((brand, index) => (
              <li key={brand.brandId} className="flex">
                {brand.brandName}
                {index < getPickedUpBrands(type).length - 1 && " / "}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs font-sans text-gray-700 leading-5 font-bold pt-4">
          <span className="text-base">🍲</span>{" "}
          {t("sake-category:相性の良い料理:ラベル")}
        </p>
        <p className="text-xs font-sans text-gray-700 leading-5">
          {recommendedDishes}
        </p>
      </div>
      <p className="text-xs font-sans text-gray-700 leading-5">
        <span className="text-base">📝</span> {description}
      </p>
    </div>
  );
};
