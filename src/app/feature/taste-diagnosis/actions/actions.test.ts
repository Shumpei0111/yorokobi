import { describe, it, expect, vi } from "vitest";
import { postResult, PostResultData } from "./actions";

// Next.jsのサーバー専用機能をモックする
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => undefined),
    set: vi.fn(),
  })),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("postResult Server Action", () => {
  it("正しい形式のデータで呼び出された場合、成功レスポンスを返す", async () => {
    const validData: PostResultData = {
      result: { score: 100, type: "daiginjo" },
      user_id: "test-user-id-123",
    };

    const response = await postResult(validData);

    expect(response).toEqual({ success: true });
  });

  it("user_idがない不正なデータで呼び出された場合、失敗レスポンスを返す", async () => {
    const invalidData = {
      result: { score: 100, type: "daiginjo" },
      // user_id is missing
    };

    // @ts-expect-error - 意図的に不正なデータを渡すテスト
    const response = await postResult(invalidData);

    expect(response).toEqual({
      success: false,
      error: "Invalid data format",
    });
  });

  it("resultがobjectでない場合（null）、失敗レスポンスを返す", async () => {
    const invalidData = {
      result: null,
      user_id: "test-user-id-123",
    };

    // @ts-expect-error - 意図的に不正なデータを渡すテスト
    const response = await postResult(invalidData);

    expect(response).toEqual({
      success: false,
      error: "Invalid data format",
    });
  });

  it("空のデータで呼び出された場合、失敗レスポンスを返す", async () => {
    const invalidData = {};

    // @ts-expect-error - 意図的に不正なデータを渡すテスト
    const response = await postResult(invalidData);

    expect(response).toEqual({
      success: false,
      error: "Invalid data format",
    });
  });
});
