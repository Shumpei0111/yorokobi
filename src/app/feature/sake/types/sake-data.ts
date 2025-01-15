/** レコメンドなどで使う酒データ */
export interface Brand {
  /** 銘柄ID */
  brandId: number;
  /** 銘柄名 */
  brandName: string;
  /** 蔵元名 */
  breweryName: string;
  /** 県名 */
  prefecture: string;
  /** カテゴリ */
  category: string;
  /** スコア
   * @example
   * "daiginjo": 0.7929060975998666,
   * "junmaiGinjo": 0.626436564690078,
   * "tokubetsuJunmai": 0.13063250706699547,
   * "futsushu": 0.2979510349372191
   */
  scores: Record<string, number>;
}
