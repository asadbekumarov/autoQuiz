import { describe, it, expect, beforeEach, vi } from "vitest";
import { getStoredApiKey, generateQuizWithGemini } from "../aiService.js";

describe("aiService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should get API key from environment when present", () => {
    const key = getStoredApiKey();
    expect(typeof key).toBe("string");
  });

  it("should throw error if no API key is provided and none in env", async () => {
    const originalKey = import.meta.env.GEMINI_API_KEY;
    import.meta.env.GEMINI_API_KEY = "";
    import.meta.env.VITE_GEMINI_API_KEY = "";

    await expect(
      generateQuizWithGemini({
        topic: "Fizika",
        customApiKey: "",
      })
    ).rejects.toThrow("Gemini API kaliti topilmadi");

    import.meta.env.GEMINI_API_KEY = originalKey;
  });

  it("should parse Gemini JSON response format successfully", async () => {
    const mockResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: JSON.stringify([
                  {
                    text: "JavaScript-da o'zgaruvchi nima?",
                    answers: ["Qiymat saqlovchi konteyner", "Funksiya", "HTML tegi", "CSS qoidasi"],
                    correctIndex: 0,
                  },
                ]),
              },
            ],
          },
        },
      ],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await generateQuizWithGemini({
      topic: "JavaScript",
      subject: "Informatika",
      count: 1,
      customApiKey: "AIzaTestFakeKey123",
    });

    expect(result).toHaveLength(1);
    expect(result[0].text).toContain("JavaScript-da o'zgaruvchi nima?");
    expect(result[0].answers).toHaveLength(4);
    expect(result[0].correctIndex).toBe(0);
    expect(result[0].id).toBeDefined();
  });

  it("should handle markdown-wrapped JSON response from Gemini", async () => {
    const rawJson = [
      {
        text: "2 + 2 nechiga teng?",
        answers: ["2", "3", "4", "5"],
        correctIndex: 2,
      },
    ];

    const mockResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: "```json\n" + JSON.stringify(rawJson) + "\n```",
              },
            ],
          },
        },
      ],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await generateQuizWithGemini({
      topic: "Matematika",
      count: 1,
      customApiKey: "AIzaTestFakeKey123",
    });

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("2 + 2 nechiga teng?");
    expect(result[0].correctIndex).toBe(2);
  });

  it("should retry with next model if first model fails", async () => {
    const mockSuccessResponse = {
      candidates: [
        {
          content: {
            parts: [{ text: JSON.stringify([{ text: "Q?", answers: ["A", "B", "C", "D"], correctIndex: 0 }]) }],
          },
        },
      ],
    };

    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => ({ error: { message: "Model temporarily unavailable" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      });

    const result = await generateQuizWithGemini({
      topic: "Kimyo",
      count: 1,
      customApiKey: "AIzaTestFakeKey123",
    });

    expect(result).toHaveLength(1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it("should give user-friendly error on invalid API key", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: { message: "API_KEY_INVALID" } }),
    });

    await expect(
      generateQuizWithGemini({
        topic: "Biologiya",
        customApiKey: "bad_key",
      })
    ).rejects.toThrow("Gemini API kaliti noto'g'ri yoki yaroqsiz");
  });

  it("should give user-friendly error on quota exceeded", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: { message: "RESOURCE_EXHAUSTED" } }),
    });

    await expect(
      generateQuizWithGemini({
        topic: "Tarix",
        customApiKey: "key",
      })
    ).rejects.toThrow("Gemini API limiti tugagan");
  });
});
