import { AlertTriangle, CalendarClock, Gauge, Info, ListChecks, Timer } from "lucide-react";

export default function NotaTecnicaConteudo() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-slate-700">
      <Secao icone={<Timer className="h-4 w-4" />} titulo="Carga Horária">
        <p>
          A carga horária ambulatorial dos profissionais deve ser ofertada no SISREG em sua
          totalidade, vinculada às atividades assistenciais de consultas/procedimentos
          especializados.
        </p>
      </Secao>

      <Secao icone={<Gauge className="h-4 w-4" />} titulo="Dimensionamento">
        <p className="rounded-lg bg-brand-50 px-3 py-2 font-mono text-brand-800">
          Carga Horária Ambulatorial × Nº de consultas/procedimentos por hora = Total de oferta
          semanal
        </p>
      </Secao>

      <Secao icone={<AlertTriangle className="h-4 w-4" />} titulo="Espaçamento">
        <p>O espaçamento entre consultas/procedimentos não deve ser inferior a 15 minutos.</p>
      </Secao>

      <Secao icone={<ListChecks className="h-4 w-4" />} titulo="Reserva e Retorno">
        <p>
          A distribuição deve respeitar a proporcionalidade definida para cada
          especialidade/procedimento.
        </p>
      </Secao>

      <Secao icone={<CalendarClock className="h-4 w-4" />} titulo="Agendamento">
        <p>Os atendimentos devem ocorrer de acordo com a ordem de agendamento no SISREG.</p>
      </Secao>

      <Secao icone={<Info className="h-4 w-4" />} titulo="Registro">
        <p>
          Os atendimentos realizados devem ser registrados no SISREG por meio da confirmação.
        </p>
      </Secao>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="flex items-center gap-2 font-bold text-amber-800">
          <AlertTriangle className="h-4 w-4" /> Monitoramento
        </h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-amber-800">
          <li>
            Procedimentos com série histórica de absenteísmo maior ou igual a 10% possuem regra
            específica de incremento da oferta (overbooking).
          </li>
          <li>O cálculo considera a série histórica de 4 meses.</li>
          <li>A oferta deve respeitar a proporcionalidade estabelecida.</li>
          <li>Ociosidade acima de 20% é caracterizada como nível elevado na Nota Técnica.</li>
        </ul>
      </div>

      <p className="text-xs text-slate-400">
        Conteúdo resumido, sem alteração normativa, com base na Nota Técnica de Parametrização de
        Consultas e Procedimentos Especializados nas Policlínicas e Centros Municipais de Saúde —
        SMS-Rio.
      </p>
    </div>
  );
}

function Secao({ icone, titulo, children }: { icone: React.ReactNode; titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 font-bold text-slate-900">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          {icone}
        </span>
        {titulo}
      </h3>
      <div className="mt-1.5 pl-8">{children}</div>
    </div>
  );
}
