import { AlertTriangle, ArrowRight, Clock, Timer } from "lucide-react";
import type { Procedimento } from "../../data/procedimentos";
import { formatarNumero } from "../../utils/calculos";

interface ProcedimentoCardProps {
  procedimento: Procedimento;
  onAbrirDetalhes: (codigo: string) => void;
  onCalcularOferta: (codigo: string) => void;
}

export default function ProcedimentoCard({ procedimento, onAbrirDetalhes, onCalcularOferta }: ProcedimentoCardProps) {
  const { codigo, procedimento: nome, consultasPorHora, tempoMinutos, reserva, retorno, observacao } = procedimento;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg">
      <button type="button" onClick={() => onAbrirDetalhes(codigo)} className="text-left">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900">{nome}</h3>
        <p className="mt-1 text-xs font-medium text-slate-400">Código: {codigo}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-brand-50 p-3">
            <div className="flex items-center gap-1.5 text-brand-700">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">por hora</span>
            </div>
            <p className="mt-1 text-2xl font-extrabold text-brand-800">{formatarNumero(consultasPorHora)}</p>
          </div>
          <div className="rounded-xl bg-teal-50 p-3">
            <div className="flex items-center gap-1.5 text-teal-700">
              <Timer className="h-3.5 w-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">minutos</span>
            </div>
            <p className="mt-1 text-2xl font-extrabold text-teal-800">{tempoMinutos}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Reserva: <b>{reserva}</b>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Retorno: <b>{retorno}</b>
          </span>
          <span className="font-semibold text-slate-500">
            {reserva}:{retorno}
          </span>
        </div>

        {observacao && (
          <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-50 px-2.5 py-2 text-xs font-medium text-amber-700">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <span className="line-clamp-2">Regra específica na Nota Técnica</span>
          </div>
        )}
      </button>

      <button
        type="button"
        onClick={() => onCalcularOferta(codigo)}
        className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Calcular oferta
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
