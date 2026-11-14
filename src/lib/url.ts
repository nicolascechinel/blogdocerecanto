// Monta links internos respeitando o BASE_PATH da hospedagem.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function dataBR(d: Date, estilo: 'long' | 'short' = 'long'): string {
  return d.toLocaleDateString('pt-BR', {
    day: estilo === 'long' ? 'numeric' : '2-digit',
    month: estilo === 'long' ? 'long' : '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function moeda(v: number | string | undefined | null): string {
  const n = Number(v);
  if (v === '' || v == null || Number.isNaN(n)) return '—';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
