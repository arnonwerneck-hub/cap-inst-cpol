import { AlertTriangle, Calculator, Gauge } from "lucide-react";
import Modal from "../InfoModal/Modal";
import type { Procedimento } from "../../data/procedimentos";
import { formatarNumero } from "../../utils/calculos";

interface ProcedimentoDetailsProps {
  procedimento: Procedimento;
  onClose: () => void;
  onCalcular: (codigo: string) => void;
}

export default function ProcedimentoDetails({ procedimento, onClose, onCalcular }: ProcedimentoDetailsProps) {
  const { codigo, procedimento: nome, consultasPorHora, tempoMinutos, reserva, retorno, observacao } = procedimento;

  return (
    <Modal titulo="Parametrização do Procedimento" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Identificação</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">{nome}</h3>
          <p className="mt-0.5 text-sm font-medium text-slate-500">Código interno: {codigo}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Parametrização</p>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricBox label="Procedimentos/hora" valor={formatarNumero(consultasPorHora)} />
            <MetricBox label="Tempo (min)" valor={String(tempoMinutos)} />
            <MetricBox label="Reserva" valor={String(reserva)} />
            <MetricBox label="Retorno" valor={String(retorno)} />
          </div>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Proporção Reserva/Retorno: <span className="font-bold text-slate-800">{reserva} : {retorno}</span>
          </p>
        </div>

        {observacao && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              <p className="font-bold">⚠️ Regra específica</p>
              <p className="mt-0.5">{observacao}</p>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Gauge className="h-3.5 w-3.5" /> Dimensionamento da oferta
          </p>
          <p className="mt-2 rounded-lg bg-white px-3 py-2 font-mono text-sm text-slate-700 shadow-sm">
            Carga Horária Ambulatorial × Procedimentos/hora = Oferta semanal
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
          <span aria-hidden>ℹ️</span>
          <p>Os parâmetros apresentados são os constantes da base cadastrada no sistema.</p>
        </div>

        <button
          type="button"
          onClick={() => onCalcular(codigo)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Calculator className="h-4 w-4" />
          Calcular para este procedimento
        </button>
      </div>
    </Modal>
  );
}

function MetricBox({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="rounded-xl bg-white p-3 text-center shadow-sm ring-1 ring-slate-100">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{valor}</p>
    </div>
  );
}
