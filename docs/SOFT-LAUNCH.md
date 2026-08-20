# Fence Frames — soft launch (password-protected)

**As-built:** June 2026  
**Wix site ID:** `87124d40-f445-43c6-ba04-f4d7ac855980`  
**Velo repo:** `LewLine3/fenceframes` (local folder `Fence-Frames-Wix-Site/`)  
**Embed bundle:** `LewLine3/Fence-Frames-Public-Website` → GitHub Pages

---

## Live site (owner)

| Item | Status |
|------|--------|
| Wix Studio site | **Exists** — Fence Frames (not TLB) |
| **Home** (`Home.c1dmp`) | Built — **password protected** |
| **Configure** (`Configure.bkwu3`, `/configure`) | Built — Heritage iframe **working** — **password protected** |
| Site password | **On** — soft launch gate |
| Wix Members | **Enabled** — signup allowed |
| Member approval | **Manual** — owner approves members in Wix dashboard |
| Email verification | **Required** — Wix Members email confirm before full access |
| Custom domain | Not attached for soft launch (`*.wixstudio.com`) |

**Owner action:** Publish site in Wix (password stays on). Share site URL + password with testers.

---

## Velo wiring (in repo)

| File | Role |
|------|------|
| `src/pages/Configure.bkwu3.js` | iframe host — `#ffConfigurator`, `BUNDLE_BASE_URL` |
| `src/public/ffEmbedHost.js` | `fenceframes-embed` postMessage protocol |
| `src/pages/Home.c1dmp.js` | Marketing shell — wires chrome IDs via `ffSiteChrome.js` |
| `src/pages/masterPage.js` | Shared nav targets |
| `src/public/ffSiteChrome.js` | Path constants + optional element binding |
| `src/public/ffGeoShell.js` | W1 geo helpers (`seoStatus`, CTAs, noindex) |
| `src/public/ffRedirectMap.js` | `/wa` + `/community/{slug}` targets |

**Shell stubs / Studio create list:** [`SHELL-STUBS.md`](SHELL-STUBS.md) · **Deferred:** [`DEFERRED-v1.md`](DEFERRED-v1.md)

**Production embed URL** (in `Configure.bkwu3.js`):

```text
https://lewline3.github.io/Fence-Frames-Public-Website/configure/heritage-v1
```

---

## Auth & gates (v1 soft launch)

| Action | Anonymous | Logged-in member |
|--------|-----------|------------------|
| Browse configurator, quote range | Yes | Yes |
| Save design | No → `wixUsers.promptLogin()` | Stub (P3 Supabase) |
| Contact / marketplace | No → login prompt | Stub (P3) |
| Blueprint export | No → login prompt | Stub (P3) |
| Contractor board / seats | N/A | Manual approval + email verify first |

Configurator **member context** is sent via postMessage after login (`syncMember` in Configure page). Supabase persistence is **not** wired in v1.

---

## Release checklist (embed bundle)

When SVG/JS changes in FenceBook:

1. `cd FenceBook && npm run build:heritage-embed`
2. Robocopy `FenceBook/public/configure/heritage-v1/` → `Fence-Frames-Public-Website/configure/heritage-v1/` (`/MIR`)
3. Commit + push **Fence-Frames-Public-Website** `main` → GitHub Pages redeploys (~2 min)
4. Smoke-test iframe on `/configure` (no Wix push needed unless Velo changed)

When only Velo changes: commit + push **`fenceframes`** `main` → Wix syncs.

---

## Not in scope for soft launch

- Public SEO / sitemap / domain `fenceframes.com`
- Automatic contractor verification (UBI/license) — manual for now
- Supabase `builds` / lead create from save & contact
- Wordmark asset in repo (shelved — Affinity master in Design)

---

## Full public launch (later)

- Remove site password
- Register + attach domain
- Handbook Phase 0 gates (LLC, Stripe, SMS, etc.) per `FenceBook/docs/handbook/16-roadmap-and-phases.md`
- Graduate docs; expand geo/HOA pages (P4)
