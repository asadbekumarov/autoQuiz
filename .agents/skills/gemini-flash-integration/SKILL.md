---
name: gemini-flash-integration
description: "Use when integrating Google Gemini API in React/Vite web apps — reliable model aliases, envPrefix secrets, and thinking-model response parsing"
metadata:
  origin: auto-extracted
---

# Google Gemini Flash Integration Pattern

**Extracted:** 2026-10-01
**Context:** Client-side and full-stack Vite/React apps integrating Gemini AI

## Problem
1. Hardcoded model names like `gemini-1.5-flash` or deprecated `gemini-2.5-flash` cause 404/NOT_FOUND errors on newer API keys.
2. Vite ignores standard `.env` variables like `GEMINI_API_KEY` unless they have `VITE_` prefix or custom `envPrefix`.
3. Gemini thinking models return multiple parts in `candidates[0].content.parts`, where the text is not guaranteed to be at index 0.

## Solution

### 1. Vite Config envPrefix
Configure `vite.config.js` to allow standard API key naming:
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'GEMINI_'],
});
```

### 2. Reliable Model Aliases & Fallback
Always use `gemini-flash-latest` as primary with automatic model fallback:
```js
const candidateModels = ["gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-3.5-flash"];

for (const model of candidateModels) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });

    if (!res.ok) continue;

    const data = await res.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const textPart = parts.find((p) => p.text)?.text;
    if (textPart) {
      return JSON.parse(textPart.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
    }
  } catch (err) {
    console.warn(`Model ${model} failed, trying next`, err);
  }
}
```

### 3. Keep Secrets in `.env`
- Never expose API key fields in the UI.
- Add `.env` to `.gitignore` and supply `.env.example`.
- Read securely via `import.meta.env.GEMINI_API_KEY`.

### 4. Fast Loop Unique ID Generation
When saving items in rapid succession, avoid `Date.now()` collisions by appending random base36 entropy:
```js
const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
```
