"use client";
import { useMemo } from "react";
import { validateFormula } from "@/utils/formula";

type Props = {
  formula: string;
  onChange: (v: string) => void;
  indicators: string[];
};

export default function ParameterEditor({ formula, onChange, indicators }: Props) {
  const check = useMemo(() => validateFormula(formula, indicators), [formula, indicators]);
  return (
    <div>
      <textarea className="mt-2 w-full rounded border border-black/10 dark:border-white/10 p-2 text-sm" rows={4} value={formula} onChange={(e)=>onChange(e.target.value)} />
      {check.ok ? (
        <div className="mt-2 text-xs text-emerald-700">Formül geçerli.</div>
      ) : (
        <div className="mt-2 text-xs text-red-700" role="alert">
          {check.message} {check.hint ? <span className="text-black/70 dark:text-white/70">— {check.hint}</span> : null}
        </div>
      )}
      <div className="mt-3">
        <div className="text-xs text-black/60 dark:text-white/60">Önizleme (son 12-24 ay):</div>
        <div className="mt-1 h-24 w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" aria-label="Parametre önizleme" />
      </div>
    </div>
  );
}


