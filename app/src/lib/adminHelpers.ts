export function calcIMC(weight: number, height: number) {
  return Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
}

export function imcCategory(imc: number) {
  if (imc < 18.5) return { label: 'Bajo peso', color: 'text-amber-600', bg: 'bg-[rgba(243,156,18,0.1)]' };
  if (imc < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-[rgba(39,174,96,0.1)]' };
  if (imc < 30) return { label: 'Sobrepeso', color: 'text-amber-600', bg: 'bg-[rgba(243,156,18,0.1)]' };
  return { label: 'Obesidad', color: 'text-red-500', bg: 'bg-[rgba(239,68,68,0.1)]' };
}

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
}
