// Review request intake.
//
// Validates the submission and emails it on. Nothing is stored — there's no
// database yet, and an inbox is the right place for this volume anyway.
//
// Env vars (set in Vercel project settings):
//   RESEND_API_KEY  — Resend API key
//   REVIEW_TO       — where requests land
//   REVIEW_FROM     — verified sending address, e.g. site@yourdomain.com

const LIMITS = {
  name: 120, company: 160, email: 200, website: 300,
  kind: 80, location: 160, details: 4000, terms: 80
};

function clean(v, max) {
  return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.status(405).end(JSON.stringify({ error: 'POST only' }));
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot: a real person never fills a field they can't see.
  if (clean(body.website2, 50)) {
    res.status(200).end(JSON.stringify({ ok: true }));
    return;
  }

  const d = {};
  for (const k of Object.keys(LIMITS)) d[k] = clean(body[k], LIMITS[k]);

  const missing = ['name', 'company', 'email', 'kind', 'details'].filter(k => !d[k]);
  if (missing.length) {
    res.status(400).end(JSON.stringify({ error: 'Missing: ' + missing.join(', ') }));
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) {
    res.status(400).end(JSON.stringify({ error: 'Invalid email' }));
    return;
  }

  const KEY = process.env.RESEND_API_KEY;
  const TO = process.env.REVIEW_TO;
  const FROM = process.env.REVIEW_FROM;
  if (!KEY || !TO || !FROM) {
    console.error('review-request: mail env vars not configured');
    res.status(500).end(JSON.stringify({ error: 'Mail not configured' }));
    return;
  }

  const rows = [
    ['Name', d.name], ['Company', d.company], ['Email', d.email],
    ['Website', d.website], ['Type', d.kind], ['Location', d.location],
    ['Arrangement', d.terms]
  ].filter(r => r[1]);

  const html =
    '<h2 style="font-family:sans-serif">Review request</h2>' +
    '<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">' +
    rows.map(r =>
      '<tr><td style="padding:4px 12px 4px 0;color:#666">' + escapeHtml(r[0]) +
      '</td><td style="padding:4px 0"><b>' + escapeHtml(r[1]) + '</b></td></tr>').join('') +
    '</table><h3 style="font-family:sans-serif">Details</h3>' +
    '<p style="font-family:sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">' +
    escapeHtml(d.details) + '</p>';

  const text = rows.map(r => r[0] + ': ' + r[1]).join('\n') + '\n\nDetails:\n' + d.details;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: d.email,
        subject: 'Review request: ' + d.company + ' (' + d.kind + ')',
        html,
        text
      })
    });
    if (!r.ok) {
      console.error('resend failed', r.status, await r.text());
      res.status(502).end(JSON.stringify({ error: 'Send failed' }));
      return;
    }
  } catch (e) {
    console.error('resend error', e);
    res.status(502).end(JSON.stringify({ error: 'Send failed' }));
    return;
  }

  res.status(200).end(JSON.stringify({ ok: true }));
};
