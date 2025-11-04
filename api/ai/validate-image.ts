import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { imageUrl } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const ok = !!imageUrl && /\.(jpg|jpeg|png|webp)$/i.test(imageUrl);
  res.status(200).json({ ok, label: ok ? 'food-or-drink' : 'invalid', confidence: ok ? 0.80 : 0.10 });
}
