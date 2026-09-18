import { NavLink } from "react-router-dom";
import { Calculator, ClipboardList, Info } from "lucide-react";

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "bg-brand-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-brand-700"
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/logo-sms-rio.png"
            alt="Prefeitura do Rio — Saúde / SUS"
            className="h-12 w-auto sm:h-14"
          />
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-slate-900">
              Coordenação de Policlínicas - CPOL
            </span>
            <span className="block text-xs font-medium text-slate-500">
              Parametrização de Consultas e Procedimentos — Policlínicas
            </span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-1.5">
          <NavLink to="/calculadora" className={navItemClass}>
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Calculadora</span>
          </NavLink>
          <NavLink to="/procedimentos" className={navItemClass}>
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Procedimentos</span>
          </NavLink>
          <NavLink to="/informacoes" className={navItemClass}>
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Informações</span>
          </NavLink>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-2 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          Base: Nota Técnica de Parametrização — SMS-Rio
        </p>
      </div>
    </header>
  );
}
