import NotaTecnicaConteudo from "../../components/InfoModal/NotaTecnicaConteudo";

export default function Informacoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orientações da Nota Técnica</h1>
        <p className="mt-1 text-sm text-slate-500">
          Resumo institucional, sem alteração do conteúdo normativo original.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <NotaTecnicaConteudo />
      </div>
    </div>
  );
}
