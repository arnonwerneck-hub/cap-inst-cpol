import { useSearchParams } from "react-router-dom";
import Calculator from "../../components/Calculator/Calculator";

export default function Calculadora() {
  const [searchParams] = useSearchParams();
  const codigoInicial = searchParams.get("codigo");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Calculadora de Oferta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Simule a oferta semanal, a distribuição entre Reserva e Retorno, e a carga horária
          necessária para atingir uma meta de atendimentos.
        </p>
      </div>
      <Calculator codigoInicial={codigoInicial} />
    </div>
  );
}
