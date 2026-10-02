import { GoogleGenAI } from "@google/genai";

/**
 * Get Gemini API Key strictly from .env
 */
export function getStoredApiKey() {
  const envKey =
    import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || "";
  if (envKey && envKey !== "sizning_rasmdagi_kalitingiz_shu_yerga_tashlanadi") {
    return envKey.trim();
  }
  return "";
}

/**
 * Generate quiz questions using Gemini AI
 * @param {Object} params
 * @param {string} params.topic - Mavzu (e.g., "Nyuton qonunlari")
 * @param {string} params.subject - Fan (e.g., "Fizika")
 * @param {string} params.grade - Sinf / Daraja (e.g., "9-sinf")
 * @param {number} params.count - Savollar soni (e.g., 5, 10)
 * @param {string} params.lang - Til ("uz", "ru", "en")
 * @param {string} [params.customApiKey] - Ixtiyoriy kiritilgan kalit
 */
export async function generateQuizWithGemini({
  topic,
  subject = "Umumiy",
  grade = "Maktab",
  count = 5,
  lang = "uz",
  customApiKey = "",
}) {
  const apiKey = (customApiKey || getStoredApiKey()).trim();

  if (!apiKey || apiKey === "sizning_rasmdagi_kalitingiz_shu_yerga_tashlanadi") {
    throw new Error(
      "Gemini API kaliti topilmadi! Iltimos, .env faylida GEMINI_API_KEY ni ko'rsating yoki modalda kalitni kiriting."
    );
  }

  const langNames = {
    uz: "O'zbek tili (lotin yozuvida)",
    ru: "Русский язык",
    en: "English language",
  };

  const selectedLang = langNames[lang] || langNames.uz;

  const isMathSubject = /matematika|algebra|geometriya|geometry|math/i.test(subject);
  const mathInstruction = isMathSubject
    ? `\n- Matematika / Algebra / Geometriya uchun maxsus qoidalar: formulalar va tenglamalarni $...$ (LaTeX) formatida yoki qulay belgilarda yozing (masalan: $x^2 - 4 = 0$, $\\frac{a}{b}$, $S = \\pi r^2$, burchaklar uchun $45^\\circ$, ildizlar uchun $\\sqrt{x}$). Geometriya uchun burchaklar, perimetr, yuza, Pifagor teoremasi kabi aniq masalalar bering. Hisob-kitoblar to'liq tekshirilgan va aniq bo'lsin.`
    : "";

  const prompt = `
Siz professional o'qituvchi va test tuzuvchi mutaxassissiz.
Quyidagi talablar asosida sifatli, qiziqarli va xatosiz ko'p variantli (MCQ) test savollarini tuzing:

- Fan: ${subject}
- Mavzu: ${topic}
- Sinf/Daraja: ${grade}
- Savollar soni: ${count} ta
- Til: ${selectedLang}${mathInstruction}

MUHIM QOIDALAR:
1. Har bir savolda aniq 4 ta javob varianti (A, B, C, D) bo'lsin.
2. Har bir savol uchun faqat bitta to'g'ri javob bo'lsin.
3. correctIndex 0 dan 3 gacha butun son bo'lib, to'g'ri javobning answers massividagi indeksini ko'rsatishi shart (masalan 0 bo'lsa 1-variant to'g'ri).
4. Javobingiz FAQAT quyidagi toza JSON formatida bo'lsin, hech qanday qo'shimcha matn yoki izohlarsiz:

[
  {
    "text": "Savol matni?",
    "answers": ["1-variant", "2-variant", "3-variant", "4-variant"],
    "correctIndex": 0
  }
]
`;

  // Candidate models that work with modern Gemini API
  const candidateModels = ["gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-3.5-flash"];

  let lastError = null;

  for (const model of candidateModels) {
    try {
      // Direct REST call to v1beta API with json response type
      const restUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(restUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errMsg = errorData.error?.message || `HTTP ${res.status}`;
        console.warn(`Model ${model} returned error: ${errMsg}`);
        lastError = new Error(errMsg);
        continue; // Try next model
      }

      const restJson = await res.json();
      const parts = restJson.candidates?.[0]?.content?.parts || [];
      const textPart = parts.find((p) => p.text)?.text || "";

      if (!textPart) {
        console.warn(`Model ${model} returned empty text, trying next`);
        continue;
      }

      // Clean JSON response (strip any possible ```json ... ```)
      let cleanedJson = textPart.trim();
      if (cleanedJson.startsWith("```")) {
        cleanedJson = cleanedJson
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/, "");
      }

      const parsedQuestions = JSON.parse(cleanedJson);

      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error("AI javobini savollar formatiga o'tkazib bo'lmadi.");
      }

      // Sanitize and structure questions
      return parsedQuestions.map((q, idx) => ({
        id: Date.now() + idx,
        text: q.text?.endsWith("?") ? q.text : `${q.text}?`,
        answers: Array.isArray(q.answers) ? q.answers.slice(0, 4) : ["A", "B", "C", "D"],
        correctIndex: typeof q.correctIndex === "number" ? q.correctIndex : 0,
      }));
    } catch (err) {
      console.warn(`Model ${model} failed:`, err);
      lastError = err;
    }
  }

  // If all models failed, provide helpful message
  let message = lastError?.message || "Xatolik yuz berdi.";
  if (message.includes("API_KEY_INVALID") || message.includes("invalid API key")) {
    message = "Gemini API kaliti noto'g'ri yoki yaroqsiz! Iltimos, kalitni tekshiring.";
  } else if (message.includes("RESOURCE_EXHAUSTED") || message.includes("Quota")) {
    message = "Gemini API limiti tugagan (Quota exceeded). Bir necha daqiqadan so'ng qayta urining.";
  }
  throw new Error(message);
}
