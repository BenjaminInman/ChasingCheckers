# Adding a race series to the news feed

Everything lives in `api/news.js`. Two edits, no other files.

## 1. Add the series

```js
const SERIES = [
  { id: 'karting', label: 'Karting' },
  { id: 'sccca',   label: 'SCCA' }      // <- new
];
```

`id` is internal, `label` is the chip text visitors see.

## 2. Add at least one source for it

```js
const SOURCES = [
  { id:'ekn',  name:'eKartingNews', url:'https://www.ekartingnews.com/feed/',
    series:['karting'], filter:null },

  { id:'scca', name:'SCCA', url:'https://www.scca.com/articles.rss',
    series:['scca'], filter:null }
];
```

That's it. Filter chips appear automatically once two or more series have a
working source. A series listed in `SERIES` with no source is never shown.

## General-motorsport feeds

Some outlets publish one firehose. Use `filter` to keep only relevant items:

```js
{ id:'racer', name:'RACER', url:'https://racer.com/feed/',
  series:['sportscar'], filter:/\b(imsa|gt3|gt4|prototype|sportscar)\b/i }
```

A source can serve several series: `series:['sportscar','gt4']`.

## Before adding a feed, check it works

```
curl -sL -A "Mozilla/5.0" <feed-url> | grep -c "<item"
```

Zero items, or a 403, means it won't work server-side. Known blockers as of
Aug 2026: IMSA, Sportscar365, TKart, Kartcom, KartSportNews, Radical.
Autosport's "karting" feed is mislabelled and returns general motorsport.

Verified working: eKartingNews (karting), SCCA (club racing),
RACER (general US), Motorsport.com and Autosport (general, need filters).

## Etiquette

We publish headline, source, date and link only — never article text or
images. Worth emailing a publisher before adding them; most welcome the
traffic, some ask for specific attribution.
