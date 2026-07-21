# MUI Showcase

Material UI components shown **in situation** — composed into realistic screens rather than
listed in isolation. Built with React 19, MUI v9, TypeScript and Vite.

## What's inside

| Page | What it demonstrates |
| --- | --- |
| **Dashboard** | Stat cards, progress bars, avatar groups, list composition, responsive `Grid` |
| **Data grid** | `@mui/x-data-grid` with sorting, filtering, column visibility, quick search, CSV export, custom cell renderers and checkbox selection over 180 rows |
| **Forms** | A full onboarding form: React Hook Form + Zod validation, `Controller`-wrapped MUI inputs, date picker, autocomplete, slider, and the submitted payload |
| **Inputs** | Buttons, text fields, toggles, sliders and chips across variants, sizes and states |
| **Feedback** | Dialogs, drawers, snackbars, alerts, backdrops, progress indicators and skeletons |
| **Data display** | Tables, tabs, steppers, accordions, breadcrumbs and lists |

Light and dark themes are both defined on a single theme object, so MUI emits CSS variables
for each and the toggle only flips a `data-mui-color-scheme` attribute — no re-render cascade,
and no flash of the wrong theme on load.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check then bundle to dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Deploying to Vercel

The repo is ready for Vercel's free Hobby plan — it's a static build with no server runtime.

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repository.
3. Vercel auto-detects Vite. The defaults are correct:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

`vercel.json` handles the two things the defaults get wrong for a client-routed SPA:

- **Rewrites** send every path to `index.html`, so deep links like `/data-grid` don't 404 on refresh.
- **Cache headers** mark the content-hashed files in `/assets` as immutable.

To deploy from the CLI instead:

```bash
npx vercel        # preview deployment
npx vercel --prod # production
```

## Notes

- All employee data is generated at runtime from a seeded PRNG (`src/data/employees.ts`), so
  the demo looks identical on every reload and no backend is involved.
- Routes are lazy-loaded, keeping the initial bundle to the app shell plus the dashboard.
- MUI v9 removed system shorthand props (`fontWeight`, `flexWrap`, …) from component APIs —
  all styling here goes through `sx`, which is the supported path going forward.

## License

MIT
