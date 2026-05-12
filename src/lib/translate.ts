// Free MyMemory translation API — no key needed, 5000 chars/day
// https://mymemory.translated.net/doc/spec.php

export async function translateText(text: string, langpair: string): Promise<string> {
  if (!text.trim()) return "";
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    const translated: string = data?.responseData?.translatedText;
    if (!translated || translated === text) throw new Error("No translation");
    return translated;
  } catch {
    return text;
  }
}

export async function translateToHindi(text: string): Promise<string> {
  return translateText(text, "en|hi");
}

export async function translateToEnglish(text: string): Promise<string> {
  return translateText(text, "hi|en");
}

// Translate multiple fields at once in parallel
export async function translateFields<T extends Record<string, string>>(fields: T, langpair = "en|hi"): Promise<T> {
  const entries = Object.entries(fields);
  const translated = await Promise.all(
    entries.map(async ([key, val]) => [key, val ? await translateText(val, langpair) : val])
  );
  return Object.fromEntries(translated) as T;
}
