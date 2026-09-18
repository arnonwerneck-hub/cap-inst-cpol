import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, ClipboardList, Clock3, Timer } from "lucide-react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProcedimentoCard from "../../components/ProcedimentoCard/ProcedimentoCard";
import ProcedimentoDetails from "../../components/ProcedimentoDetails/ProcedimentoDetails";
import { procedimentos } from "../../data/procedimentos";
import { correspondeABusca } from "../../utils/busca";
import { formatarNumero } from "../../utils/calculos";

export default function Home() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [detalheCodigo, setDetalheCodigo] = useState<string | null>(null);

  const estatisticas = useMemo(() => {
    const totais = procedimentos.map((p) => p.consultasPorHora);
    const tempos = procedimentos.map((p) => p.tempoMinutos);
    return {
      total: procedimentos.length,
      mediaPorHora: totais.reduce((a, b) => a + b, 0) / totais.length,
      minPorHora: Math.min(...totais),
      maxPorHora: Math.max(...totais),
      mediaTempo: tempos.reduce((a, b) => a + b, 0) / tempos.length,
      minTempo: Math.min(...tempos),
      maxTempo: Math.max(...tempos),
    };
  }, []);

  const resultados = useMemo(() => {
    if (busca.trim().length === 0) return [];
    return procedimentos
      .filter((p) => correspondeABusca(busca, p.codigo, p.procedimento))
      .slice(0, 9);
  }, [busca]);

  const procedimentoDetalhe = procedimentos.find((p) => p.codigo === detalheCodigo) ?? null;

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
        <p className="mt-1 text-sm text-slate-500">
          Consulta rápida da parametrização de consultas e procedimentos especializados.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            icon={<ClipboardList className="h-5 w-5" />}
            titulo="Procedimentos cadastrados"
            valor={String(estatisticas.total)}
            subtitulo="Importados do Anexo 01"
            corIcone="brand"
            to="/procedimentos"
          />
          <DashboardCard
            icon={<Clock3 className="h-5 w-5" />}
            titulo="Procedimentos por hora"
            valor={formatarNumero(estatisticas.mediaPorHora)}
            subtitulo={`Média geral · de ${formatarNumero(estatisticas.minPorHora)} a ${formatarNumero(estatisticas.maxPorHora)}`}
            corIcone="teal"
          />
          <DashboardCard
            icon={<Timer className="h-5 w-5" />}
            titulo="Tempo de atendimento"
            valor={`${Math.round(estatisticas.mediaTempo)} min`}
            subtitulo={`Média geral · de ${estatisticas.minTempo} a ${estatisticas.maxTempo} min`}
            corIcone="amber"
          />
          <DashboardCard
            icon={<Calculator className="h-5 w-5" />}
            titulo="Calculadora de Oferta"
            valor="Calcular"
            subtitulo="Simule a oferta semanal"
            corIcone="violet"
            to="/calculadora"
          />
        </div>
      </section>

      <section>
        <SearchBar value={busca} onChange={setBusca} />

        {resultados.length > 0 && (
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resultados.map((p) => (
                <ProcedimentoCard
                  key={p.codigo}
                  procedimento={p}
                  onAbrirDetalhes={setDetalheCodigo}
                  onCalcularOferta={(codigo) => navigate(`/calculadora?codigo=${codigo}`)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate(`/procedimentos?busca=${encodeURIComponent(busca)}`)}
              className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-800"
            >
              Ver todos os resultados em Procedimentos →
            </button>
          </div>
        )}

        {busca.trim().length > 0 && resultados.length === 0 && (
          <p className="mt-4 text-sm text-slate-400">Nenhum procedimento encontrado para "{busca}".</p>
        )}
      </section>

      {procedimentoDetalhe && (
        <ProcedimentoDetails
          procedimento={procedimentoDetalhe}
          onClose={() => setDetalheCodigo(null)}
          onCalcular={(codigo) => navigate(`/calculadora?codigo=${codigo}`)}
        />
      )}
    </div>
  );
}
