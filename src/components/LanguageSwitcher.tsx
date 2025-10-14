"use client";
import { useI18n } from "@/i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { locale, switchLocale } = useI18n();
  return (
    <div className="flex items-center gap-2 text-sm" aria-label="Dil seçici">
      <button
        onClick={() => switchLocale("tr")}
        className={`px-2 py-1 rounded ${locale === "tr" ? "bg-black text-white dark:bg-white dark:text-black" : "border border-black/10 dark:border-white/10"}`}
      >TR</button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded ${locale === "en" ? "bg-black text-white dark:bg_white dark:text-black" : "border border-black/10 dark:border-white/10"}`}
      >EN</button>
    </div>
  );
}


