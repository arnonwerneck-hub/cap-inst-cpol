export type FaixaPorHora = "todos" | "0-1" | "1-2" | "2-3" | "3-4" | "4+";
export type FaixaTempo = "todos" | "ate20" | "21-30" | "31-40" | "41-60" | "acima60";

export const FAIXAS_POR_HORA: { valor: FaixaPorHora; label: string }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "0-1", label: "0–1" },
  { valor: "1-2", label: "1–2" },
  { valor: "2-3", label: "2–3" },
  { valor: "3-4", label: "3–4" },
  { valor: "4+", label: "4 ou mais" },
];

export const FAIXAS_TEMPO: { valor: FaixaTempo; label: string }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "ate20", label: "Até 20 min" },
  { valor: "21-30", label: "21–30 min" },
  { valor: "31-40", label: "31–40 min" },
  { valor: "41-60", label: "41–60 min" },
  { valor: "acima60", label: "Acima de 60 min" },
];

export function correspondeFaixaPorHora(valor: number, faixa: FaixaPorHora): boolean {
  switch (faixa) {
    case "todos": return true;
    case "0-1": return valor > 0 && valor <= 1;
    case "1-2": return valor > 1 && valor <= 2;
    case "2-3": return valor > 2 && valor <= 3;
    case "3-4": return valor > 3 && valor <= 4;
    case "4+": return valor > 4;
  }
}

export function correspondeFaixaTempo(valor: number, faixa: FaixaTempo): boolean {
  switch (faixa) {
    case "todos": return true;
    case "ate20": return valor <= 20;
    case "21-30": return valor > 20 && valor <= 30;
    case "31-40": return valor > 30 && valor <= 40;
    case "41-60": return valor > 40 && valor <= 60;
    case "acima60": return valor > 60;
  }
}

interface FiltersProps {
  categorias: string[];
  categoriaAtiva: string;
  onCategoriaChange: (categoria: string) => void;
  faixaPorHora: FaixaPorHora;
  onFaixaPorHoraChange: (faixa: FaixaPorHora) => void;
  faixaTempo: FaixaTempo;
  onFaixaTempoChange: (faixa: FaixaTempo) => void;
}

export default function Filters({
  categorias,
  categoriaAtiva,
  onCategoriaChange,
  faixaPorHora,
  onFaixaPorHoraChange,
  faixaTempo,
  onFaixaTempoChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <FilterChip label="Todos" ativo={categoriaAtiva === "Todos"} onClick={() => onCategoriaChange("Todos")} />
        {categorias.map((categoria) => (
          <FilterChip
            key={categoria}
            label={categoria}
            ativo={categoriaAtiva === categoria}
            onClick={() => onCategoriaChange(categoria)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <FilterSelect
          label="Procedimentos por hora"
          value={faixaPorHora}
          options={FAIXAS_POR_HORA}
          onChange={(v) => onFaixaPorHoraChange(v as FaixaPorHora)}
        />
        <FilterSelect
          label="Tempo"
          value={faixaTempo}
          options={FAIXAS_TEMPO}
          onChange={(v) => onFaixaTempoChange(v as FaixaTempo)}
        />
      </div>
    </div>
  );
}

function FilterChip({ label, ativo, onClick }: { label: string; ativo: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        ativo
          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
      }`}
    >
      {label}
    </button>
  );
}

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { valor: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="font-medium text-slate-500">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      >
        {options.map((opt) => (
          <option key={opt.valor} value={opt.valor}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
