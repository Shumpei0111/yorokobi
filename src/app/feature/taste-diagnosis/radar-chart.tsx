"use client";

import { Language } from "@/app/i18n/settings";
import { Scores } from "./types/questions";
import { useTranslation } from "@/app/i18n/client";
import { transformScoreKey } from "./helpers/transformScoreKey";
import { useState } from "react";

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const RadarChart = ({
  scores,
  lang,
}: {
  scores: Scores;
  lang: Language;
}) => {
  const { t } = useTranslation(lang);
  const [chartHeight, setChartHeight] = useState<number>(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      return 340;
    } else {
      return 600;
    }
  });

  const chartData = {
    series: [
      {
        name: t("taste-diagnosis:診断結果"),
        data: Object.values(scores),
      },
    ],
    options: {
      chart: {
        height: chartHeight,
        type: "radar" as const,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: Object.keys(scores).map((key) =>
          transformScoreKey(key as keyof Scores, t)
        ),
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="radar"
      height={chartHeight}
    />
  );
};
