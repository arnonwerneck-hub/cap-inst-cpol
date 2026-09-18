import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters, {
  correspondeFaixaPorHora,
  correspondeFaixaTempo,
  type FaixaPorHora,
  type FaixaTempo,
} from "../../components/Filters/Filters";
import ProcedimentoCard from "../../components/ProcedimentoCard/ProcedimentoCard";
import ProcedimentoDetails from "../../components/ProcedimentoDetails/ProcedimentoDetails";
import { procedimentos } from "../../data/procedimentos";
import { correspondeABusca } from "../../utils/busca";
import { getCategoria, listarCategorias } from "../../utils/categorias";

export default function Procedimentos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [busca, setBusca] = useState(searchParams.get("busca") ?? "");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [faixaPorHora, setFaixaPorHora] = useState<FaixaPorHora>("todos");
  const [faixaTempo, setFaixaTempo] = useState<FaixaTempo>("todos");
  const [detalheCodigo, setDetalheCodigo] = useState<string | null>(null);

  const categorias = useMemo(() => listarCategorias(procedimentos), []);

  const resultados = useMemo(() => {
    return procedimentos.filter((p) => {
      if (!correspondeABusca(busca, p.codigo, p.procedimento)) return false;
      if (categoriaAtiva !== "Todos" && getCategoria(p.procedimento) !== categoriaAtiva) return false;
      if (!correspondeFaixaPorHora(p.consultasPorHora, faixaPorHora)) return false;
      if (!correspondeFaixaTempo(p.tempoMinutos, faixaTempo)) return false;
      return true;
    });
  }, [busca, categoriaAtiva, faixaPorHora, faixaTempo]);

  const procedimentoDetalhe = procedimentos.find((p) => p.codigo === detalheCodigo) ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Procedimentos</h1>
        <p className="mt-1 text-sm text-slate-500">
          {resultados.length} de {procedimentos.length} procedimentos parametrizados
        </p>
      </div>

      <SearchBar value={busca} onChange={setBusca} />

      <Filters
        categorias={categorias}
        categoriaAtiva={categoriaAtiva}
        onCategoriaChange={setCategoriaAtiva}
        faixaPorHora={faixaPorHora}
        onFaixaPorHoraChange={setFaixaPorHora}
        faixaTempo={faixaTempo}
        onFaixaTempoChange={setFaixaTempo}
      />

      {resultados.length > 0 ? (
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
      ) : (
        <p className="py-10 text-center text-sm text-slate-400">Nenhum procedimento encontrado.</p>
      )}

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
