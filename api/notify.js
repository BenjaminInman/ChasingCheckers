// Notify list signup (shop launch, and any future waitlist).
//
// Emails the address through so it can be added to the mailing list. Nothing
// is stored here — when an email platform is connected this should post to
// that instead, so unsubscribes are handled properly.
//
// Env vars: RESEND_API_KEY, REVIEW_TO, REVIEW_FROM

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

  // Honeypot
  if (String(body.website2 || '').trim()) {
    res.status(200).end(JSON.stringify({ ok: true }));
    return;
  }

  const email = String(body.email || '').trim().slice(0, 200);
  const list = String(body.list || 'general').trim().slice(0, 40);

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    res.status(400).end(JSON.stringify({ error: 'Invalid email' }));
    return;
  }

  const KEY = process.env.RESEND_API_KEY;
  const TO = process.env.REVIEW_TO;
  const FROM = process.env.REVIEW_FROM;
  if (!KEY || !TO || !FROM) {
    console.error('notify: mail env vars not configured');
    res.status(500).end(JSON.stringify({ error: 'Mail not configured' }));
    return;
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: 'Notify list signup (' + list + ')',
        text: 'List: ' + list + '\nEmail: ' + email + '\nAt: ' + new Date().toISOString()
      })
    });
    if (!r.ok) {
      console.error('resend failed', r.status);
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
