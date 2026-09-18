import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  icon: ReactNode;
  titulo: string;
  valor: string;
  subtitulo?: string;
  corIcone?: string;
  to?: string;
}

export default function DashboardCard({ icon, titulo, valor, subtitulo, corIcone = "brand", to }: DashboardCardProps) {
  const navigate = useNavigate();
  const clicavel = Boolean(to);

  const corMap: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    teal: "bg-teal-50 text-teal-accent",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
  };

  return (
    <div
      onClick={clicavel ? () => navigate(to as string) : undefined}
      className={`group relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all ${
        clicavel ? "cursor-pointer hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg" : ""
      }`}
    >
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${corMap[corIcone] ?? corMap.brand}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{titulo}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{valor}</p>
        {subtitulo && <p className="mt-1 text-xs text-slate-400">{subtitulo}</p>}
      </div>
    </div>
  );
}
