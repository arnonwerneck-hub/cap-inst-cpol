import type { Procedimento } from "../data/procedimentos";

/**
 * Fórmula da Nota Técnica (item 2.1):
 * (Carga Horária Ambulatorial) x (Nº de consulta ou procedimento por hora) = Total de oferta semanal
 */
export function calcularOfertaSemanal(cargaHorariaSemanal: number, consultasPorHora: number): number {
  return cargaHorariaSemanal * consultasPorHora;
}

/**
 * Distribuição proporcional entre Reserva e Retorno (item 2.2), a partir
 * dos valores de proporcionalidade cadastrados para o procedimento.
 * Os valores matemáticos (fracionários) não são arredondados aqui.
 */
export interface DistribuicaoReservaRetorno {
  reservaExata: number;
  retornoExata: number;
}

export function calcularDistribuicaoReservaRetorno(
  ofertaSemanal: number,
  reserva: number,
  retorno: number
): DistribuicaoReservaRetorno {
  const proporcaoTotal = reserva + retorno;
  if (proporcaoTotal === 0) {
    return { reservaExata: ofertaSemanal, retornoExata: 0 };
  }
  return {
    reservaExata: (ofertaSemanal * reserva) / proporcaoTotal,
    retornoExata: (ofertaSemanal * retorno) / proporcaoTotal,
  };
}

/**
 * Arredondamento operacional: a oferta semanal calculada pode ser
 * fracionária. Para a quantidade "operacional" sugerida, arredonda-se a
 * oferta total para o inteiro mais próximo (arredondamento padrão) e, na
 * sequência, distribui-se esse total inteiro entre Reserva e Retorno
 * preservando a proporcionalidade cadastrada, de forma que a soma das
 * partes inteiras sempre resulte exatamente no total operacional exibido
 * (evitando divergências do tipo Reserva + Retorno != Oferta).
 */
export interface OfertaOperacional {
  ofertaExata: number;
  ofertaOperacional: number;
  reservaOperacional: number;
  retornoOperacional: number;
}

export function calcularOfertaOperacional(
  cargaHorariaSemanal: number,
  procedimento: Pick<Procedimento, "consultasPorHora" | "reserva" | "retorno">
): OfertaOperacional {
  const ofertaExata = calcularOfertaSemanal(cargaHorariaSemanal, procedimento.consultasPorHora);
  const ofertaOperacional = Math.round(ofertaExata);

  const proporcaoTotal = procedimento.reserva + procedimento.retorno;
  if (proporcaoTotal === 0) {
    return { ofertaExata, ofertaOperacional, reservaOperacional: ofertaOperacional, retornoOperacional: 0 };
  }

  const reservaExata = (ofertaOperacional * procedimento.reserva) / proporcaoTotal;
  const reservaOperacional = Math.round(reservaExata);
  const retornoOperacional = ofertaOperacional - reservaOperacional;

  return { ofertaExata, ofertaOperacional, reservaOperacional, retornoOperacional };
}

export function formatarNumero(valor: number, casasDecimais = 1): string {
  const arredondado = Math.round(valor * 10 ** casasDecimais) / 10 ** casasDecimais;
  return arredondado.toLocaleString("pt-BR", {
    minimumFractionDigits: arredondado % 1 === 0 ? 0 : casasDecimais,
    maximumFractionDigits: casasDecimais,
  });
}
