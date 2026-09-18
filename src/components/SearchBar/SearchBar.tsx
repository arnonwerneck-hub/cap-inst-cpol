import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ value, onChange, placeholder, autoFocus }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "🔎 Pesquisar procedimento ou código"}
        className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-11 text-base font-medium text-slate-800 shadow-sm outline-none transition-shadow placeholder:text-slate-400 focus:border-brand-400 focus:shadow-md focus:ring-4 focus:ring-brand-100"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpar busca"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
