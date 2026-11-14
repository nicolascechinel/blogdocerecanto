import QRCode from 'qrcode';

// Gera o "copia e cola" do PIX (BR Code estático, padrão EMV do Banco Central).
const campo = (id: string, valor: string) => `${id}${String(valor.length).padStart(2, '0')}${valor}`;

const semAcento = (s: string, max: number) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
    .slice(0, max);

function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Telefone precisa ir no formato +55DDDNÚMERO; CPF/CNPJ só com dígitos.
function normalizaChave(chave: string, tipo: string): string {
  const c = chave.trim();
  const t = tipo.toLowerCase();
  if (t === 'cnpj' || t === 'cpf') return c.replace(/\D/g, '');
  if (t === 'telefone') {
    const d = c.replace(/\D/g, '');
    return d.startsWith('55') && d.length > 11 ? `+${d}` : `+55${d}`;
  }
  if (t === 'e-mail' || t === 'email') return c.toLowerCase();
  return c;
}

export function pixCopiaECola(chave: string, tipo: string, titular: string, cidade: string): string {
  const conta = campo('00', 'br.gov.bcb.pix') + campo('01', normalizaChave(chave, tipo));
  const payload =
    campo('00', '01') +
    campo('26', conta) +
    campo('52', '0000') +
    campo('53', '986') +
    campo('58', 'BR') +
    campo('59', semAcento(titular, 25) || 'DOCE RECANTO') +
    campo('60', semAcento(cidade, 15) || 'SAO JOAQUIM') +
    campo('62', campo('05', '***')) +
    '6304';
  return payload + crc16(payload);
}

export function pixQrSvg(codigo: string): Promise<string> {
  return QRCode.toString(codigo, { type: 'svg', margin: 1, errorCorrectionLevel: 'M' });
}
