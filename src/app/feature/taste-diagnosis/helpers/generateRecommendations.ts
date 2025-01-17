import { Brand } from "../../sake/types/sake-data";
import { Category } from "../types/questions";
import brands from "../../../data/categorized-brands.json";

// ランダムにN個の要素を取得する関数
const getRandomItems = (array: Brand[], n: number) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const getPickedUpBrands = (targetCategory: Category, limit = 5) => {
  const categoryBrands = brands.filter(
    (brand) => brand.category === targetCategory
  );
  return getRandomItems(categoryBrands, limit);
};

// 各カテゴリのおすすめを生成する関数
export const generateRecommendations = (
  targetCategory: Category,
  targetCount = 5,
  otherCount = 1
) => {
  const categories: Category[] = [
    "daiginjo",
    "junmaiGinjo",
    "tokubetsuJunmai",
    "futsushu",
  ];
  const recommendations: Record<Category, Brand[]> = {
    daiginjo: [],
    junmaiGinjo: [],
    tokubetsuJunmai: [],
    futsushu: [],
  };

  categories.forEach((category) => {
    const categoryBrands = brands.filter(
      (brand) => brand.category === category
    );

    if (category === targetCategory) {
      // ターゲットカテゴリの場合、指定数を取得
      recommendations[category] = getRandomItems(categoryBrands, targetCount);
    } else {
      // その他のカテゴリの場合、1つ取得
      recommendations[category] = getRandomItems(categoryBrands, otherCount);
    }
  });

  return recommendations;
};
