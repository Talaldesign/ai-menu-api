import type { VercelRequest, VercelResponse } from '@vercel/node';

let cache: { at: number; data: any } | null = null;

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const now = Date.now();
  if (!cache || (now - cache.at) > 12 * 60 * 60 * 1000) {
    const r = await fetch('https://api.exchangerate.host/latest?base=USD', { cache: 'no-store' });
    const data = await r.json();
    cache = { at: now, data };
  }
  res.status(200).json(cache.data);
}
