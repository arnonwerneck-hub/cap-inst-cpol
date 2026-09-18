import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProcedimentoCard from "../../components/ProcedimentoCard/ProcedimentoCard";
import ProcedimentoDetails from "../../components/ProcedimentoDetails/ProcedimentoDetails";
import { procedimentos } from "../../data/procedimentos";
import { correspondeABusca } from "../../utils/busca";

export default function Procedimentos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [busca, setBusca] = useState(searchParams.get("busca") ?? "");
  const [detalheCodigo, setDetalheCodigo] = useState<string | null>(null);

  const resultados = useMemo(() => {
    return procedimentos.filter((p) => correspondeABusca(busca, p.codigo, p.procedimento));
  }, [busca]);

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
