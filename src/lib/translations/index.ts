import { en, TranslationsType } from "./en";
import { ka } from "./ka";

export type Language = "en" | "ka";

export const translations: Record<Language, TranslationsType> = {
  en,
  ka,
};

export const SUPPORTED_LANGUAGES = [
  { code: "en" as Language, label: "English", shortLabel: "EN", flag: "🇬🇧" },
  { code: "ka" as Language, label: "ქართული", shortLabel: "ქარ", flag: "🇬🇪" },
];

export function getTranslations(lang: Language): TranslationsType {
  return translations[lang] || en;
}

export type { TranslationsType };

