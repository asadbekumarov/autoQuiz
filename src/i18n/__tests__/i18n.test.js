import { describe, it, expect } from "vitest";
import uz from "../uz.json";
import ru from "../ru.json";
import en from "../en.json";

describe("i18n Translations Consistency", () => {
  const uzKeys = Object.keys(uz);
  const ruKeys = Object.keys(ru);
  const enKeys = Object.keys(en);

  it("should have non-empty dictionary files", () => {
    expect(uzKeys.length).toBeGreaterThan(20);
    expect(ruKeys.length).toBeGreaterThan(20);
    expect(enKeys.length).toBeGreaterThan(20);
  });

  it("should contain all uzbek keys in english dictionary", () => {
    uzKeys.forEach((key) => {
      expect(en[key], `Missing English key for: "${key}"`).toBeDefined();
      expect(en[key].length).toBeGreaterThan(0);
    });
  });

  it("should contain all uzbek keys in russian dictionary", () => {
    uzKeys.forEach((key) => {
      expect(ru[key], `Missing Russian key for: "${key}"`).toBeDefined();
      expect(ru[key].length).toBeGreaterThan(0);
    });
  });

  it("should have app name and basic navigation translated properly", () => {
    expect(uz.appName).toBe("AutoQuiz");
    expect(ru.appName).toBe("AutoQuiz");
    expect(en.appName).toBe("AutoQuiz");

    expect(uz.create).toBe("Test Yaratish");
    expect(ru.create).toBe("Создать тест");
    expect(en.create).toBe("Create Test");
  });
});
