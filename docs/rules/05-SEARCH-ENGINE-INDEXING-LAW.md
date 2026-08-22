# 🛡️ Rule 05: Search Engine Indexing & Stealth Mode Law

## 1. Current State: Stealth Mode (`noindex, nofollow`)
- In `app/layout.tsx`: `robots: { index: false, follow: false }`.
- In `public/robots.txt`: `User-agent: * \n Disallow: /`.
- In HTML prototypes: `<meta name="robots" content="noindex, nofollow, noarchive" />`.

## 2. Purpose
- Keeps `fenceframes.com` private from Google search results and scrapers during development.

## 3. 1-Click Launch Switch
- At public launch: change to `index: true, follow: true` and `Allow: /`.
