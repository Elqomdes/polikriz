const FUNCTIONS = ["z","minmax","ma","lag","yoy","pct_change","clip"] as const;
type FnName = typeof FUNCTIONS[number];

export type FormulaCheck = { ok: true } | { ok: false; message: string; hint?: string };

export function validateFormula(input: string, indicators: string[]): FormulaCheck {
  if (!input.trim()) return { ok: false, message: "Formül boş.", hint: "Örnek: 0.4*z(CDS) + 0.6*z(İşsizlik)" };
  let balance = 0;
  for (const ch of input) {
    if (ch === '(') balance++;
    else if (ch === ')') balance--;
    if (balance < 0) return { ok: false, message: "Parantez sırası hatalı.", hint: "Aç-Kapa parantez sayısını dengeleyin." };
  }
  if (balance !== 0) return { ok: false, message: "Parantez eksik.", hint: "Parantezleri kapatın." };
  const tokens = input.match(/[A-Za-zÇĞİÖŞÜçğıöşü_]+/g) || [];
  for (const t of tokens) {
    if (isFunctionName(t)) continue;
    if (!indicators.includes(t)) {
      const suggestion = suggest(t, indicators);
      return { ok: false, message: `Tanımlanmamış gösterge adı: ${t}`, hint: suggestion ? `Şunu mu demek istediniz: ${suggestion}?` : "Sözlükten bir gösterge seçiniz." };
    }
  }
  return { ok: true };
}

function isFunctionName(name: string): name is FnName { return FUNCTIONS.includes(name as FnName); }

function suggest(term: string, list: string[]): string | undefined {
  const lower = term.toLowerCase();
  return list.find(k => k.toLowerCase().startsWith(lower));
}


