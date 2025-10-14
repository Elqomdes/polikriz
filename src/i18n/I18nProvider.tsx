"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { tr } from "./dictionaries/tr";
import { en } from "./dictionaries/en";

type Locale = "tr" | "en";
type Dict = typeof tr;

const dicts: Record<Locale, Dict> = { tr, en };

type I18nCtx = { locale: Locale; t: Dict; switchLocale: (l: Locale) => void };
const Ctx = createContext<I18nCtx | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("tr");
  const t = useMemo(() => dicts[locale], [locale]);
  const switchLocale = useCallback((l: Locale) => setLocale(l), []);
  const value = useMemo(() => ({ locale, t, switchLocale }), [locale, t, switchLocale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}


