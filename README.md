# Chasing Checkers

The pursuit of performance, for racers looking for an edge.
Static site — no build step, no dependencies.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home. The discipline ladder, featured tool, field notes, editorial stance. |
| `karting.html` | Rung 01 hub — equipment, setup, tracks & series. |
| `frame.html` | **The Frame Is Not The Variable** — the chassis finder tool. |
| `about.html` | Who we are and how we work. |
| `assets/app.css` | Shared design system. |
| `assets/app.js` | Chassis data + finder logic. |
| `assets/logo-*.webp` | Badge lockup (home hero) and bar lockup (interior headers). |

## Publishing on GitHub Pages

1. Create a new repo — name it `chasing-checkers`.
2. Upload every file in this folder, keeping the `assets/` folder intact.
   (Repo page → **Add file** → **Upload files** → drag the whole folder in.)
3. **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → **Save**.
4. Wait ~60 seconds. Your URL will be:
   `https://<your-username>.github.io/chasing-checkers/`

To use a custom domain later: Settings → Pages → Custom domain, then point a
CNAME record at `<your-username>.github.io` from your registrar.

## Editing the chassis data

All chassis records live in the `KARTS` array at the top of `assets/app.js`.
Each entry:

```js
{
  name:'Margay Ignite K3/206',
  origin:'St. Louis, Missouri',
  classes:['206sr','206mast'],     // which class filters it appears under
  price:4095, used:1800,           // null = "Quote only"
  tubes:[32,28],                   // [32,28] = mixed; [30] = uniform; null = not published
  axle:40,                         // 40 | 50 | '40/50' | null
  brg:2,                           // 2 | 3 | null
  front:'...', wheelbase:'...', brakes:'...',   // null renders as "not published"
  note:'...',
  support:[{name:'Comet Kart Sales', city:'Greenfield, IN', region:'midwest'}]
}
```

`region` must be one of: `southeast`, `midwest`, `northeast`, `southcentral`,
`west`, `canada`. Dealers matching the visitor's selected region highlight gold.

**Compliance score** is derived, not hand-entered — `flexScore()` computes it
from tubing, axle diameter, and bearing count. Change the weighting there, not
per-chassis.

## Known gaps

- Cadet and Micro/Mini Swift classes have no chassis data yet.
- Dealer coverage is partial and regionally uneven.
- Prices are from dealer listings at build time and will drift.
- Non-karting disciplines are scaffolding only.
