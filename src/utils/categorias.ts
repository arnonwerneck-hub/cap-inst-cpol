/**
 * Derivação de categoria/especialidade a partir do NOME do procedimento
 * (campo `procedimento` do Anexo 01), para fins de filtragem na interface.
 *
 * Este arquivo NÃO altera nenhum dado do Anexo 01 — apenas classifica os
 * registros existentes em grupos que já estão implícitos nos próprios
 * nomes ("CONSULTA EM CARDIOLOGIA", "TOMOGRAFIA...", "REABILITAÇÃO...", etc).
 * Nenhuma categoria fictícia é criada: a lista de categorias exibida nos
 * filtros é sempre calculada a partir dos dados realmente importados.
 */

const PALAVRAS_EXAME = [
  "CINTILOGRAFIA",
  "RESSONANCIA",
  "RESSONÂNCIA",
  "TOMOGRAFIA",
  "ULTRA-SONOGRAFIA",
  "ULTRASSONOGRAFIA",
  "ULTRASONOGRAFIA",
  "ULTRASONOGRAFÍA",
  "ECOCARDIOGRAFIA",
  "ECOBIOMETRIA",
  "DOPPLER",
  "MAMOGRAFIA",
  "ELETROCARDIOGRAMA",
  "ELETRONEUROMIOGRAFIA",
  "ESPIROMETRIA",
  "DENSITOMETRIA",
  "AUDIOMETRIA",
  "EMISSÕES OTOACÚSTICAS",
  "MONITORAMENTO",
  "ESTUDO URODINÂMICO",
  "VIDEOLARINGOSCOPIA",
  "RETOSSIGMOIDOSCOPIA",
  "TESTE DE ESFORCO",
  "TESTE DE ESCARRO",
  "RADIOGRAFIA",
  "ANGIORESSONANCIA",
  "GRUPO -",
];

const PALAVRAS_PROCEDIMENTO = [
  "BIÓPSIA",
  "BIOPSIA",
  "BRONCOSCOPIA",
  "COLONOSCOPIA",
  "COLANGIOPANCREATOGRAFIA",
  "PUNCAO LOMBAR",
  "TORACOCENTESE",
  "FRENECTOMIA",
  "MANOMETRIA",
  "LINFOCINTILOGRAFIA",
  "CISTOCINTILOGRAFIA",
  "ECOENDOSCOPIA",
  "ATENDIMENTO PADI",
  "ENDOSCOPIA",
];

const PREFIXO_CONSULTA_EM = /^CONSULTA (?:EM|MÉDICA(?: EM)?) /;

const MAPA_ESPECIALIDADE: Record<string, string> = {
  "SAÚDE DO TRABALHADOR": "Saúde do Trabalhador",
  "SAUDE DO TRABALHADOR": "Saúde do Trabalhador",
};

function capitalizar(texto: string): string {
  return texto
    .toLowerCase()
    .split(" ")
    .map((palavra) => (palavra.length > 0 ? palavra[0].toUpperCase() + palavra.slice(1) : palavra))
    .join(" ");
}

export function getCategoria(procedimento: string): string {
  const nome = procedimento.toUpperCase();

  if (nome.startsWith("CONSULTA EM ODONTOLOGIA")) return "Odontologia";
  if (nome.startsWith("CONSULTA EM FISIOTERAPIA")) return "Fisioterapia";
  if (nome.startsWith("CONSULTA EM SAÚDE MENTAL")) return "Saúde Mental";
  if (nome.startsWith("CONSULTA EM TERAPIA OCUPACIONAL")) return "Terapia Ocupacional";
  if (nome.startsWith("CONSULTA EM CARDIOLOGIA")) return "Cardiologia";
  if (nome.startsWith("CONSULTA EM NEUROLOGIA")) return "Neurologia";
  if (nome.startsWith("CONSULTA EM OFTALMOLOGIA")) return "Oftalmologia";
  if (nome.startsWith("OFTALMOLOGIA")) return "Oftalmologia";
  if (nome.startsWith("REABILITAÇÃO") || nome.startsWith("REABILITACAO")) return "Reabilitação";

  if (PREFIXO_CONSULTA_EM.test(nome)) {
    const resto = nome.replace(PREFIXO_CONSULTA_EM, "");
    const especialidade = resto.split(/[-–]/)[0].trim();
    if (MAPA_ESPECIALIDADE[especialidade]) return MAPA_ESPECIALIDADE[especialidade];
    return capitalizar(especialidade);
  }

  if (PALAVRAS_EXAME.some((palavra) => nome.includes(palavra))) return "Exames";
  if (PALAVRAS_PROCEDIMENTO.some((palavra) => nome.includes(palavra))) return "Procedimentos";
  if (nome.startsWith("AVALIAÇÃO")) return "Procedimentos";

  return "Outros";
}

export function listarCategorias(procedimentos: { procedimento: string }[]): string[] {
  const categorias = new Set<string>();
  for (const p of procedimentos) {
    categorias.add(getCategoria(p.procedimento));
  }
  return Array.from(categorias).sort((a, b) => a.localeCompare(b, "pt-BR"));
}
