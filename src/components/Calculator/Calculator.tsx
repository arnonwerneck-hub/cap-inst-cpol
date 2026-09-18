import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowLeftRight, Info, Search } from "lucide-react";
import { procedimentos, type Procedimento } from "../../data/procedimentos";
import { correspondeABusca } from "../../utils/busca";
import {
  calcularCargaHorariaNecessaria,
  calcularOfertaOperacional,
  formatarNumero,
} from "../../utils/calculos";

const CARGAS_SIMULACAO = [5, 10, 15, 20, 25, 30, 35, 40];

function parseNumeroBR(texto: string): number {
  const normalizado = texto.replace(/\./g, "").replace(",", ".");
  const valor = parseFloat(normalizado);
  return Number.isFinite(valor) ? valor : 0;
}

interface CalculatorProps {
  codigoInicial?: string | null;
}

export default function Calculator({ codigoInicial }: CalculatorProps) {
  const [cargaHorariaInput, setCargaHorariaInput] = useState("20");
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<Procedimento | null>(null);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [quantidadeDesejadaInput, setQuantidadeDesejadaInput] = useState("");

  useEffect(() => {
    if (codigoInicial) {
      const encontrado = procedimentos.find((p) => p.codigo === codigoInicial);
      if (encontrado) {
        setSelecionado(encontrado);
        setBusca(encontrado.procedimento);
      }
    }
  }, [codigoInicial]);

  const sugestoes = useMemo(() => {
    if (!mostrarSugestoes || busca.trim().length === 0) return [];
    return procedimentos
      .filter((p) => correspondeABusca(busca, p.codigo, p.procedimento))
      .slice(0, 8);
  }, [busca, mostrarSugestoes]);

  const cargaHoraria = parseNumeroBR(cargaHorariaInput);

  const resultado = useMemo(() => {
    if (!selecionado || cargaHoraria <= 0) return null;
    return calcularOfertaOperacional(cargaHoraria, selecionado);
  }, [selecionado, cargaHoraria]);

  const quantidadeDesejada = parseNumeroBR(quantidadeDesejadaInput);
  const cargaNecessaria = useMemo(() => {
    if (!selecionado || quantidadeDesejada <= 0) return null;
    return calcularCargaHorariaNecessaria(quantidadeDesejada, selecionado.consultasPorHora);
  }, [selecionado, quantidadeDesejada]);

  function selecionarProcedimento(p: Procedimento) {
    setSelecionado(p);
    setBusca(p.procedimento);
    setMostrarSugestoes(false);
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Calculadora de Oferta Semanal</h2>
        <p className="mt-1 text-sm text-slate-500">
          Informe a carga horária ambulatorial semanal e selecione o procedimento para calcular
          automaticamente a oferta semanal parametrizada.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Carga Horária Ambulatorial Semanal</label>
            <div className="relative mt-1.5">
              <input
                type="text"
                inputMode="decimal"
                value={cargaHorariaInput}
                onChange={(e) => setCargaHorariaInput(e.target.value)}
                placeholder="Ex: 20 ou 20,5"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-bold text-slate-800 outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">horas</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CARGAS_SIMULACAO.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setCargaHorariaInput(String(h))}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    cargaHoraria === h
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-700"
                  }`}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-semibold text-slate-700">Procedimento</label>
            <div className="relative mt-1.5">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setSelecionado(null);
                  setMostrarSugestoes(true);
                }}
                onFocus={() => setMostrarSugestoes(true)}
                onBlur={() => setTimeout(() => setMostrarSugestoes(false), 120)}
                placeholder="Buscar por nome ou código..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
              />
            </div>
            {sugestoes.length > 0 && (
              <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
                {sugestoes.map((p) => (
                  <li key={p.codigo}>
                    <button
                      type="button"
                      onMouseDown={() => selecionarProcedimento(p)}
                      className="flex w-full flex-col items-start px-4 py-2.5 text-left text-sm hover:bg-brand-50"
                    >
                      <span className="font-semibold text-slate-800">{p.procedimento}</span>
                      <span className="text-xs text-slate-400">Código: {p.codigo}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {selecionado && (
          <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-4">
            <InfoMini label="Código" valor={selecionado.codigo} />
            <InfoMini label="Procedimentos/hora" valor={formatarNumero(selecionado.consultasPorHora)} />
            <InfoMini label="Tempo (min)" valor={String(selecionado.tempoMinutos)} />
            <InfoMini label="Reserva : Retorno" valor={`${selecionado.reserva} : ${selecionado.retorno}`} />
          </div>
        )}

        {selecionado?.observacao && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>
              <b>⚠️ Regra específica:</b> {selecionado.observacao}
            </span>
          </div>
        )}
      </div>

      {resultado && selecionado && (
        <div className="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Resultado</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <ResultBox
              titulo="Oferta Semanal"
              valor={resultado.ofertaOperacional}
              corTexto="text-slate-900"
              destaque
            />
            <ResultBox titulo="Reserva" valor={resultado.reservaOperacional} corTexto="text-blue-700" cor="bg-blue-50" />
            <ResultBox titulo="Retorno" valor={resultado.retornoOperacional} corTexto="text-emerald-700" cor="bg-emerald-50" />
          </div>

          <p className="mt-4 text-center text-sm font-semibold text-slate-500">
            {selecionado.reserva} Reserva : {selecionado.retorno} Retorno{selecionado.retorno > 0 ? "s" : ""}
          </p>

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-xs text-slate-500 ring-1 ring-slate-100">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
            <p>
              Resultado matemático: <b className="text-slate-700">{formatarNumero(resultado.ofertaExata, 2)}</b>{" "}
              procedimentos/semana ({formatarNumero(cargaHoraria)}h × {formatarNumero(selecionado.consultasPorHora)}
              /h). A oferta operacional sugerida ({resultado.ofertaOperacional}) usa arredondamento padrão do total,
              e Reserva/Retorno são distribuídos preservando a proporção {selecionado.reserva}:{selecionado.retorno}, de
              forma que a soma sempre corresponda exatamente ao total operacional exibido.
            </p>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p>Este cálculo utiliza a Carga Horária Ambulatorial informada pelo usuário.</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <ArrowLeftRight className="h-5 w-5 text-brand-600" />
          Quantas horas são necessárias?
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Informe a quantidade de procedimentos desejada por semana para descobrir a carga horária
          necessária, considerando a parametrização do procedimento selecionado acima.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Quantidade de procedimentos desejada</label>
            <input
              type="text"
              inputMode="decimal"
              value={quantidadeDesejadaInput}
              onChange={(e) => setQuantidadeDesejadaInput(e.target.value)}
              placeholder="Ex: 60"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-bold text-slate-800 outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-4">
            {cargaNecessaria !== null && selecionado ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Carga horária necessária
                </p>
                <p className="mt-1 text-3xl font-extrabold text-brand-700">
                  {formatarNumero(cargaNecessaria, 2)}h
                </p>
                <p className="mt-1 text-xs text-slate-400">por semana</p>
              </>
            ) : (
              <p className="text-center text-sm text-slate-400">
                Selecione um procedimento e informe a quantidade desejada.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoMini({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-slate-800">{valor}</p>
    </div>
  );
}

function ResultBox({
  titulo,
  valor,
  corTexto,
  cor = "bg-white",
  destaque = false,
}: {
  titulo: string;
  valor: number;
  corTexto: string;
  cor?: string;
  destaque?: boolean;
}) {
  return (
    <div className={`rounded-xl ${cor} p-4 text-center shadow-sm ring-1 ring-slate-100`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{titulo}</p>
      <p className={`mt-1 font-extrabold ${corTexto} ${destaque ? "text-5xl" : "text-4xl"}`}>{valor}</p>
    </div>
  );
}
