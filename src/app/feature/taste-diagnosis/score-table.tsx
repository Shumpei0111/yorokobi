import { useTranslation } from "@/app/i18n/client";
import { Category } from "./types/questions";
import { match } from "ts-pattern";
import { Language } from "@/app/i18n/settings";

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
    <div className="border-b border-gray-200 py-2 px-5">
      <div className="grid grid-cols-[80px_70px_1fr] items-center">
        <p className="font-bold">{label}</p>
        <div className="w-[70px] h-[1px] bg-black" />
        <p
          className={`font-jost font-bold text-right flex items-center justify-end ${
            isHighestScore ? "text-primary" : ""
          }`}
        >
          {isHighestScore && (
            <span className="text-[10px] border border-primary rounded-full px-2 mx-2 bg-slate-50">
              {t("taste-diagnosis:あなたにおすすめ")}
            </span>
          )}
          {score}
        </p>
      </div>
      <div className="py-2">
        <p className="text-xs font-sans text-gray-700 leading-5 font-bold">
          {t("sake-category:相性の良い料理:ラベル")}
        </p>
        <p className="text-xs font-sans text-gray-700 leading-5">
          {recommendedDishes}
        </p>
      </div>
      <p className="text-xs py-2 font-sans text-gray-700 leading-5">
        {description}
      </p>
    </div>
  );
};
