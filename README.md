# BoutiqueWare — Landing Page

Marketing site for BoutiqueWare, a boutique and tailoring shop management platform.
Static HTML with no build step, no framework, and no dependencies.

## Structure

```
index.html              markup
assets/css/styles.css   all styles
assets/js/main.js       pricing Monthly/Annual toggle
assets/images/          (empty — the page uses inline SVG)
assets/fonts/           (empty — fonts load from Google Fonts)
vercel.json             clean URLs + cache headers for /assets
```

## Local preview

Open `index.html` in a browser, or serve the folder so paths behave exactly as in production:

```bash
npx serve .
```

## Deploy (Vercel)

Import the repository at [vercel.com/new](https://vercel.com/new) and accept the defaults:

- **Framework preset:** Other
- **Build command:** none
- **Output directory:** `.` (repository root)

Vercel serves `index.html` at `/` and redeploys on every push to `main`.
