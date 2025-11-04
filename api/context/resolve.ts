import type { VercelRequest, VercelResponse } from '@vercel/node';

function ccToCurrency(cc: string) {
  const map: Record<string, string> = { OM:'OMR', AE:'AED', SA:'SAR', KW:'KWD', QA:'QAR', BH:'BHD', US:'USD', GB:'GBP', EU:'EUR', MY:'MYR' };
  return map[cc] || 'USD';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const al = (req.headers['accept-language'] as string) || '';
  const lang = al.toLowerCase().startsWith('ar') ? 'ar' : 'en';

  const ipRaw = (req.headers['x-forwarded-for'] as string) || '';
  const ip = ipRaw.split(',')[0] || '';
  // ipapi.co يعمل حتى بدون IP محدد (يستنتج IP المتصل)
  const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, { cache: 'no-store' });
  const geo = await geoRes.json();

  const country = String(geo?.country || 'OM').toUpperCase();
  const currency = ccToCurrency(country);
  const timezone = geo?.timezone || 'Asia/Muscat';

  res.status(200).json({ lang, country, currency, timezone });
}
