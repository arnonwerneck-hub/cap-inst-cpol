# CAP-Inst-CPOL — Capacidade Instalada

Ferramenta de consulta rápida da parametrização de consultas e procedimentos
especializados ofertados nas Policlínicas e Centros Municipais de Saúde da
Secretaria Municipal de Saúde do Rio de Janeiro (SMS-Rio).

Aplicação web client-side (React + TypeScript + Vite + Tailwind CSS) que
permite pesquisar procedimentos, visualizar sua parametrização (código,
consultas/procedimentos por hora, tempo de atendimento, proporção de Reserva
e Retorno) e calcular a oferta semanal, a distribuição entre Reserva/Retorno
e a carga horária necessária para uma meta de atendimentos — seguindo
exatamente a fórmula da Nota Técnica de Parametrização de Consultas e
Procedimentos Especializados nas Policlínicas e Centros Municipais de Saúde.

## Fonte dos dados

Todos os 469 procedimentos e seus parâmetros (Código Interno, Procedimento,
Consulta/hora, Tempo em minutos, Reserva e Retorno) foram transcritos
diretamente do **Anexo 01** da Nota Técnica oficial e estão versionados em
[`src/data/procedimentos.ts`](src/data/procedimentos.ts). Nenhum valor foi
inventado, alterado ou arredondado na base — o app não depende da leitura do
PDF em tempo de execução.

## Funcionalidades

- **Dashboard** com estatísticas gerais da base (total de procedimentos,
  média de procedimentos/hora, tempo médio de atendimento).
- **Busca instantânea** por nome (inclusive termos parciais, ex.: `cardio`)
  ou por código interno (ex.: `0729006`).
- **Filtros** por categoria/especialidade (derivada dos próprios nomes dos
  procedimentos — nenhuma categoria fictícia), por faixa de
  procedimentos/hora e por faixa de tempo de atendimento.
- **Card de parametrização** e **visualização detalhada** de cada
  procedimento, incluindo observações específicas da Nota Técnica (ex.:
  Colonoscopia).
- **Calculadora de Oferta Semanal**: `Carga Horária Ambulatorial ×
  Procedimentos/hora = Oferta Semanal`, com distribuição proporcional entre
  Reserva e Retorno, simulação rápida de cargas horárias (5h a 40h) e
  calculadora reversa (quantas horas são necessárias para uma meta de
  atendimentos).
- **Página de Informações** com o resumo das orientações normativas
  (carga horária, dimensionamento, espaçamento mínimo de 15 minutos,
  proporcionalidade, agendamento, registro e regras de monitoramento /
  overbooking / ociosidade).
- Totalmente responsivo (desktop, notebook, tablet e celular) e preparado
  como **PWA** (instalável, com cache offline dos recursos estáticos).

## Stack técnica

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router
- Lucide Icons
- vite-plugin-pwa

## Estrutura do projeto

```text
cap-inst-cpol/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── DashboardCard/
│   │   ├── ProcedimentoCard/
│   │   ├── ProcedimentoDetails/
│   │   ├── SearchBar/
│   │   ├── Filters/
│   │   ├── Calculator/
│   │   └── InfoModal/
│   ├── data/
│   │   └── procedimentos.ts     # Base oficial (Anexo 01) — não alterar valores
│   ├── pages/
│   │   ├── Home/
│   │   ├── Procedimentos/
│   │   ├── Calculadora/
│   │   └── Informacoes/
│   ├── utils/
│   │   ├── calculos.ts          # Fórmulas da Nota Técnica
│   │   ├── categorias.ts        # Derivação de categorias a partir dos dados
│   │   └── busca.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Como executar localmente

Requer Node.js 18+.

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### Build de produção

```bash
npm run build
npm run preview
```

## Roadmap (evolução futura)

O código está organizado para permitir, em versões futuras, sem reescrita
estrutural:

- Persistência em banco de dados e API própria.
- Autenticação e controle de acesso.
- Controle de versões da parametrização (histórico de alterações).
- Painel administrativo para importação de novas Notas Técnicas.

## Licença / Uso

Ferramenta de uso interno da gestão das Policlínicas e Centros Municipais de
Saúde da SMS-Rio, com base em documento normativo oficial (Nota Técnica de
Parametrização — SUBPAV/SAP/CPOL/CR/CSB).
