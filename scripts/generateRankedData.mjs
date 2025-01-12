import fs from "fs/promises";

const RANKINGS_API_URL = "https://muro.sakenowa.com/sakenowa-data/api/rankings";
const BRANDS_DATA_PATH = "src/app/data/categorized-brands.json";
const OUTPUT_PATH = "src/app/data/ranked-brands.json";

// ランキングデータを取得
const fetchRankings = async () => {
  const response = await fetch(RANKINGS_API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch rankings: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

// ブランドデータを読み込む
const loadBrandData = async () => {
  const rawData = await fs.readFile(BRANDS_DATA_PATH, "utf-8");
  return JSON.parse(rawData);
};

// ランキングデータと銘柄データをマッチング
const mergeData = (rankings, brands) => {
  return rankings
    .map((ranking) => {
      const brand = brands.find((b) => b.brandId === ranking.brandId);
      if (brand) {
        return {
          rank: ranking.rank,
          score: ranking.score,
          ...brand, // ブランドデータを展開
        };
      }
      return null; // マッチしない場合は無視
    })
    .filter((item) => item !== null); // nullを除外
};

// JSONファイルとして保存
const saveToFile = async (data, outputPath) => {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(outputPath, jsonData, "utf-8");
  console.log(`ファイルが生成されました: ${outputPath}`);
};

// メイン処理
const generateRankedBrands = async () => {
  try {
    console.log("データを取得中...");
    const [rankingsData, brands] = await Promise.all([
      fetchRankings(),
      loadBrandData(),
    ]);

    console.log(
      `ランキングデータ（overall）: ${rankingsData.overall.length}件`
    );
    console.log(`ランキングデータ（areas）: ${rankingsData.areas.length}件`);
    console.log(`ブランドデータ: ${brands.length}件`);

    console.log("データを結合中...");
    const overallRankings = mergeData(rankingsData.overall, brands);
    const areasRankings = rankingsData.areas.map((area) => ({
      ...area,
      ranking: mergeData(area.ranking, brands),
    }));

    const rankedBrands = {
      overall: overallRankings,
      areas: areasRankings,
    };

    console.log("結果を保存中...");
    await saveToFile(rankedBrands, OUTPUT_PATH);
  } catch (error) {
    console.error("エラーが発生しました:", error.message);
  }
};

// 実行
generateRankedBrands();
