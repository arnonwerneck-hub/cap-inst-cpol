export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function correspondeABusca(termo: string, codigo: string, procedimento: string): boolean {
  const termoNormalizado = normalizar(termo.trim());
  if (termoNormalizado.length === 0) return true;
  return normalizar(codigo).includes(termoNormalizado) || normalizar(procedimento).includes(termoNormalizado);
}
