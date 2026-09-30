import { describe, it, expect, beforeEach, vi } from "vitest";
import { testStorage } from "../testStorage.js";

// Mock localStorage and window events for node environment
const createLocalStorageMock = () => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

describe("testStorage Service", () => {
  beforeEach(() => {
    globalThis.localStorage = createLocalStorageMock();
    globalThis.window = {
      dispatchEvent: vi.fn(),
    };
    globalThis.Event = class Event {};
    vi.restoreAllMocks();
  });

  it("should return empty array when no tests are saved", () => {
    const tests = testStorage.getAll();
    expect(tests).toEqual([]);
  });

  it("should save and retrieve a new test", () => {
    const newTest = {
      name: "Fizika 9-sinf",
      questions: [
        { text: "Nyutonning 1-qonuni?", answers: ["A", "B", "C", "D"], correctIndex: 0 },
      ],
      settings: { subject: "Fizika" },
    };

    const saved = testStorage.save(newTest);
    expect(saved.id).toBeDefined();
    expect(saved.createdAt).toBeDefined();
    expect(saved.name).toBe("Fizika 9-sinf");

    const all = testStorage.getAll();
    expect(all.length).toBe(1);
    expect(all[0].name).toBe("Fizika 9-sinf");
  });

  it("should find test by ID", () => {
    const saved = testStorage.save({ name: "Matematika", questions: [] });
    const found = testStorage.getById(saved.id);
    expect(found).not.toBeNull();
    expect(found.name).toBe("Matematika");

    const notFound = testStorage.getById("non-existent-id");
    expect(notFound).toBeNull();
  });

  it("should update existing test if ID matches", () => {
    const saved = testStorage.save({ name: "Dastlabki nom", questions: [] });
    const updated = testStorage.save({ ...saved, name: "Yangilangan nom" });

    expect(updated.name).toBe("Yangilangan nom");
    const all = testStorage.getAll();
    expect(all.length).toBe(1);
    expect(all[0].name).toBe("Yangilangan nom");
  });

  it("should delete test by ID", () => {
    const test1 = testStorage.save({ name: "Test 1", questions: [] });
    const test2 = testStorage.save({ name: "Test 2", questions: [] });

    expect(testStorage.getAll().length).toBe(2);

    const deleted = testStorage.delete(test1.id);
    expect(deleted).toBe(true);

    const remaining = testStorage.getAll();
    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe(test2.id);
  });

  it("should handle draft operations correctly", () => {
    expect(testStorage.getDraft()).toBeNull();

    const draftData = { testName: "Qoralama test", questions: [] };
    testStorage.saveDraft(draftData);

    const retrievedDraft = testStorage.getDraft();
    expect(retrievedDraft).toEqual(draftData);

    testStorage.clearDraft();
    expect(testStorage.getDraft()).toBeNull();
  });

  it("should gracefully handle corrupted localStorage JSON", () => {
    localStorage.setItem("savedTests", "INVALID_JSON{");
    const tests = testStorage.getAll();
    expect(tests).toEqual([]);

    localStorage.setItem("draftTest", "INVALID_JSON{");
    const draft = testStorage.getDraft();
    expect(draft).toBeNull();
  });
});
