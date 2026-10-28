# SiteWarrior — production website

Five-language, static Vite multi-page site. Target hosting: **GitHub Pages with custom domain `www.sitewarrior.eu`**. `sitewarrior.eu` automatically redirects to www via GitHub Pages when both DNS records are configured.

## Structure

- `index.html` — English `/`
- `pl/index.html` — Polish `/pl/`
- `no/index.html` — Norwegian Bokmål `/no/`
- `fr/index.html` — French `/fr/`
- `de/index.html` — German `/de/`
- `src/main-*.js` — localized page content & interactions
- `src/data*.js` — localized offers and prices
- `src/style.css` — shared design
- `public/` — static assets
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment
- `scripts/check-site.mjs` — basic structural smoke test

## Run locally in GitHub Codespaces

```sh
npm ci
npm run check
npm run build
npm run dev
```

The local dev server address is only a preview. **`git push origin main`** publishes via GitHub Actions. Build output is `dist/` (ignored by Git).

## Connect domain (home.pl + GitHub Pages)

1. Keep DNS hosted at home.pl, with A records for apex (`@`) at `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and CNAME for `www` pointing to `karidiallo.github.io`. Do not create duplicate records. Do not delete email MX/TXT records.
2. In GitHub repo → **Settings → Pages** select **Source: GitHub Actions**.
3. In **Custom domain** set exactly `www.sitewarrior.eu` and Save. The repo includes no CNAME file because it is not required for the GitHub Actions deployment method.
4. Wait for the DNS check and HTTPS certificate. Turn on **Enforce HTTPS** when available.
5. After a successful Actions deployment test `https://www.sitewarrior.eu/` and `https://www.sitewarrior.eu/pl/`, etc. Apex `https://sitewarrior.eu/` should redirect to www.

`vite.config.js` has `base: '/'`, required for a custom domain root. Do **not** point GitHub Pages to `main` branch `/root` because the source files need a Vite build.

## Troubleshooting

- **NXDOMAIN**: DNS resolver/delegation issue. GitHub Actions cannot fix DNS.
- **TOO_MANY_REDIRECTS**: confirm actual redirects using `curl -IL https://sitewarrior.eu/` and `curl -IL https://www.sitewarrior.eu/`.
- **White page but HTTP 200**: browser DevTools → Console + Network; check JS assets under `/assets/`.
- **Build fails**: open the failed Actions step; run `npm ci && npm run build` in Codespaces.

## Pricing

Polish PLN prices differ from rounded EUR prices for EN/NO/FR/DE. Express 48-hour delivery surcharge is provisionally 50%; confirm commercial terms before publishing.

## Shared section anchors (EN / PL / NO / FR / DE)

All languages use `#benefits` (why it works / simulation), `#process` (method), `#pricing` (configurator), and `#faq`. Visible copy remains translated. The language switch preserves these anchors and old links (`#arena`, `#metoda`, `#wycena`) are normalized in the browser.

## Design / legal revision (October 2026)
- Removed decorative emoji glyphs from site interactions (language flags remain intentional).
- Replaced hard split in the decision section with a restrained dark-rust gradient.
- Corrected public contact email to `contact@sitewarrior.eu`.
- Added `/privacy/` and `/terms/` for EN, and equivalent paths under `/pl/`, `/no/`, `/fr/`, `/de/`; footer and Formspree enquiry dialog link to these.
- IMPORTANT: these legal documents contain placeholders for the legal operator identity, address, data retention and provider transfer details. Finish and review them before publishing. See `LEGAL-REVIEW-REQUIRED.md`.
