import fs from "fs";

const BASE_URL = "https://muro.sakenowa.com/sakenowa-data/api";

// APIエンドポイント
const ENDPOINTS = {
  flavorCharts: `${BASE_URL}/flavor-charts`,
  brands: `${BASE_URL}/brands`,
  breweries: `${BASE_URL}/breweries`,
  areas: `${BASE_URL}/areas`,
};

// カテゴリの重み付け
const categoryWeights = {
  daiginjo: {
    fruity: 1.0,
    aromatic: 0.8,
    light: 0.4,
    balanced: 0.2,
    dry: 0.0,
    heavy: 0.0,
  },
  junmaiGinjo: {
    balanced: 1.0,
    aromatic: 0.6,
    fruity: 0.4,
    light: 0.3,
    dry: 0.2,
    heavy: 0.0,
  },
  tokubetsuJunmai: {
    heavy: 1.0,
    balanced: 0.4,
    aromatic: 0.2,
    dry: 0.2,
    fruity: 0.0,
    light: 0.0,
  },
  futsushu: {
    dry: 1.0,
    light: 0.8,
    balanced: 0.5,
    fruity: 0.0,
    aromatic: 0.0,
    heavy: 0.0,
  },
};

// フレーバーとカテゴリのマッピング
const flavorToCategoryMapping = {
  f1: "fruity", // 華やか
  f2: "aromatic", // 芳醇
  f3: "heavy", // 重厚
  f4: "balanced", // 穏やか
  f5: "dry", // ドライ
  f6: "light", // 軽快
};

// 手動調整ルール
const manualOverride = {
  // "[サンプル]大吟醸 特選": "daiginjo",
};

// カテゴリスコアの計算
function calculateCategoryScore(flavor, categoryWeights) {
  const scores = {};
  for (const [category, weights] of Object.entries(categoryWeights)) {
    scores[category] = Object.entries(weights).reduce(
      (sum, [trait, weight]) => {
        const flavorKey = Object.keys(flavorToCategoryMapping).find(
          (key) => flavorToCategoryMapping[key] === trait
        );
        const flavorValue = flavorKey ? flavor[flavorKey] || 0 : 0;
        return sum + flavorValue * weight;
      },
      0
    );
  }
  return scores;
}

// 最適カテゴリを決定
function determineCategory(scores) {
  return Object.entries(scores).reduce(
    (best, [category, score]) =>
      score > best.score ? { category, score } : best,
    { category: "", score: 0 }
  ).category;
}

// APIからデータを取得
async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
  }
  return await response.json();
}

// データを取得して分類
async function generateStaticData() {
  try {
    // APIからデータ取得
    const [
      flavorChartsResponse,
      brandsResponse,
      breweriesResponse,
      areasResponse,
    ] = await Promise.all([
      fetchData(ENDPOINTS.flavorCharts),
      fetchData(ENDPOINTS.brands),
      fetchData(ENDPOINTS.breweries),
      fetchData(ENDPOINTS.areas),
    ]);

    const flavorCharts = flavorChartsResponse.flavorCharts;
    const brands = brandsResponse.brands;
    const breweries = breweriesResponse.breweries;
    const areas = areasResponse.areas;

    // 蔵元IDと県名をマッピング
    const breweryToAreaMap = Object.fromEntries(
      breweries.map((brewery) => {
        const area = areas.find((area) => area.id === brewery.areaId);
        return [brewery.id, area ? area.name : "Unknown"];
      })
    );

    // 銘柄ごとの分類結果を生成
    const categorizedData = flavorCharts.map((flavor) => {
      const scores = calculateCategoryScore(flavor, categoryWeights);
      const bestCategory = determineCategory(scores);
      const brand = brands.find((b) => b.id === flavor.brandId);
      const brewery = breweries.find((brew) => brew.id === brand?.breweryId);
      const area = breweryToAreaMap[brewery?.id] || "Unknown";

      // 手動調整ルールを適用
      const finalCategory = manualOverride[brand.name] || bestCategory;

      return {
        brandId: flavor.brandId,
        brandName: brand ? brand.name : "Unknown",
        breweryName: brewery ? brewery.name : "Unknown",
        prefecture: area,
        category: finalCategory,
        scores,
      };
    });

    // ファイルに保存
    const outputPath = "src/app/data/categorized-brands.json";
    fs.writeFileSync(outputPath, JSON.stringify(categorizedData, null, 2));
    console.log(`データを生成しました: ${outputPath}`);
  } catch (error) {
    console.error("エラーが発生しました:", error.message);
  }
}

// スクリプト実行
generateStaticData();
