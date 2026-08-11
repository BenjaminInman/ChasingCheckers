// Chasing Checkerz — karting news aggregator.
//
// Fetches headlines from karting outlets server-side (browsers can't read these
// feeds directly) and returns title, source, date and link only. No article
// text, no images — we link out to the publisher rather than mirror them.
//
// Adding a source is one entry in SOURCES below.

const SOURCES = [
  {
    id: 'ekn',
    name: 'eKartingNews',
    url: 'https://www.ekartingnews.com/feed/',
    // If a feed is general motorsport rather than karting-only, set a filter
    // regex here and only matching items are kept.
    filter: null
  }
];

const CACHE_SECONDS = 1800; // 30 min — enough to stay current without hammering
const PER_SOURCE = 12;
const TOTAL = 18;

function decodeEntities(s) {
  return String(s || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#8217;|&rsquo;/g, '\u2019')
    .replace(/&#8216;|&lsquo;/g, '\u2018')
    .replace(/&#8220;|&ldquo;/g, '\u201c')
    .replace(/&#8221;|&rdquo;/g, '\u201d')
    .replace(/&#8211;|&ndash;/g, '\u2013')
    .replace(/&#8212;|&mdash;/g, '\u2014')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/<[^>]*>/g, '')
    .trim();
}

function tag(block, name) {
  const m = block.match(new RegExp('<' + name + '[^>]*>([\\s\\S]*?)<\\/' + name + '>', 'i'));
  return m ? decodeEntities(m[1]) : '';
}

function parseFeed(xml, src) {
  const out = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const b of blocks) {
    const title = tag(b, 'title');
    const link = tag(b, 'link');
    if (!title || !link) continue;
    if (src.filter && !src.filter.test(title + ' ' + tag(b, 'description'))) continue;

    const raw = tag(b, 'pubDate') || tag(b, 'updated');
    const d = raw ? new Date(raw) : null;
    out.push({
      title,
      link,
      source: src.name,
      sourceId: src.id,
      date: d && !isNaN(d) ? d.toISOString() : null
    });
    if (out.length >= PER_SOURCE) break;
  }
  return out;
}

async function fetchSource(src) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch(src.url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'ChasingCheckerz/1.0 (+https://chasing-checkers.vercel.app)',
        Accept: 'application/rss+xml, application/xml, text/xml'
      }
    });
    if (!r.ok) return { items: [], error: 'HTTP ' + r.status };
    return { items: parseFeed(await r.text(), src), error: null };
  } catch (e) {
    return { items: [], error: e.name === 'AbortError' ? 'timeout' : String(e.message || e) };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async (req, res) => {
  const results = await Promise.all(SOURCES.map(fetchSource));

  const items = [];
  const sources = [];
  SOURCES.forEach((src, i) => {
    sources.push({ name: src.name, ok: !results[i].error, count: results[i].items.length });
    items.push(...results[i].items);
  });

  items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  // A stale-but-served response beats an empty page if a publisher is down.
  res.setHeader(
    'Cache-Control',
    `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`
  );
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).end(
    JSON.stringify({
      fetched: new Date().toISOString(),
      sources,
      items: items.slice(0, TOTAL)
    })
  );
};
