import { useTranslation } from "@/app/i18n/client";
import { ScoreKeys } from "./types/questions";
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
  type: ScoreKeys;
  lang: Language;
  isHighestScore: boolean;
}) => {
  const { t } = useTranslation(lang);

  const description = match(type)
    .with("daiginjo", () => t("taste-diagnosis:大吟醸とは"))
    .with("junmaiGinjo", () => t("taste-diagnosis:純米吟醸とは"))
    .with("tokubetsuJunmai", () => t("taste-diagnosis:特別純米とは"))
    .with("futsushu", () => t("taste-diagnosis:普通種とは"))
    .exhaustive();

  return (
    <div className="border-b border-gray-200 py-2 px-5">
      <div className="grid grid-cols-[80px_50px_1fr] items-center">
        <p className="font-bold">{label}</p>
        <div className="w-[70px] h-[1px] bg-black" />
        <p
          className={`font-jost font-bold text-right flex items-center justify-end ${
            isHighestScore ? "text-blue-500" : ""
          }`}
        >
          {isHighestScore && (
            <span className="text-[10px] border border-blue-500 rounded-full px-2 py-0.5 mx-2">
              {t("taste-diagnosis:あなたにおすすめ")}
            </span>
          )}
          {score}
        </p>
      </div>
      <p className="text-xs py-2 font-sans text-gray-700 leading-5">
        {description}
      </p>
    </div>
  );
};
