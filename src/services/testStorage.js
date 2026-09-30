/**
 * Service layer for Quiz storage and management
 * Prepares the codebase for seamless migration to cloud API / Supabase / backend
 */

const STORAGE_KEY = "savedTests";
const DRAFT_KEY = "draftTest";

export const testStorage = {
  // Get all saved tests
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load tests", e);
      return [];
    }
  },

  // Get single test by id
  getById(id) {
    const tests = this.getAll();
    return tests.find((t) => String(t.id) === String(id)) || null;
  },

  // Save new test or update existing
  save(testData) {
    try {
      const tests = this.getAll();
      const newTest = {
        ...testData,
        id: testData.id || `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: testData.createdAt || new Date().toISOString(),
      };

      const existingIndex = tests.findIndex((t) => String(t.id) === String(newTest.id));
      if (existingIndex >= 0) {
        tests[existingIndex] = newTest;
      } else {
        tests.unshift(newTest);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
      window.dispatchEvent(new Event("storage"));
      return newTest;
    } catch (e) {
      console.error("Failed to save test", e);
      throw e;
    }
  },

  // Delete test by id
  delete(id) {
    try {
      const tests = this.getAll();
      const filtered = tests.filter((t) => String(t.id) !== String(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("storage"));
      return true;
    } catch (e) {
      console.error("Failed to delete test", e);
      return false;
    }
  },

  // Draft operations
  getDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveDraft(draft) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn("Autosave draft failed", e);
    }
  },

  clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
  },
};
