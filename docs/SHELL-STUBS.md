# Fence Frames — shell stubs (Studio + Velo)

**Status:** Implemented in repo 2026-07-18 — Studio page creation still required for new URLs.  
**Canon:** `FenceBook/docs/fence-frames-site-architecture.md` + v1 addendum.  
**KEEP:** `/configure` + `Configure.bkwu3.js` + `ffEmbedHost.js` unchanged.

---

## Already live in this repo

| Asset | Path |
|-------|------|
| Home Velo | `src/pages/Home.c1dmp.js` |
| Master chrome | `src/pages/masterPage.js` |
| Chrome helpers | `src/public/ffSiteChrome.js` |
| Geo helpers | `src/public/ffGeoShell.js` |
| Redirect map | `src/public/ffRedirectMap.js` |
| Configure host | `src/pages/Configure.bkwu3.js` (**do not redesign**) |

---

## Owner — Studio Home (this weekend)

1. Open `Design/FenceBook/wix-pages/specs/home.md` + prototype `prototypes/home.html` (sibling workspace under `Lew-Line-Workspaces/Design/`).
2. Build Home sections + master nav IDs (`#navDesign`, `#navCommunities`, CTAs).
3. Sync design → Git. Velo already wires IDs when present.
4. Do **not** change Configure page layout or iframe.

---

## Studio — create pages then paste templates

Wix does **not** pick up new page `.js` files from the IDE. Create each page in Studio → sync → paste from `docs/page-templates/`.

| Page | URL | Template | Spec |
|------|-----|----------|------|
| County dynamic | `/wa/{slug}` | `County.template.js` | `Design/.../specs/county.md` |
| City dynamic | `/wa/{county}/{city}` | `City.template.js` | `city.md` |
| Community dynamic | `/wa/.../{community}` | `Community.template.js` | `community.md` |
| WA redirect | `/wa` | `WaRedirect.template.js` | S1 → `/wa/king-county` |
| Community alias | `/community/{slug}` | `CommunityAlias.template.js` | O-Alias (router preferred) |
| How it works | `/how-it-works` | `HowItWorks.template.js` | `how-it-works.md` |
| Design shell | `/design` | `DesignCatalog.template.js` | `design.md` |

### CMS datasets (W0 already seeded)

- **Counties** — 1 (`king-county`)
- **Cities** — 17
- **Communities** — 28 (Si View `seoStatus: stub`, preset `si-view`)

### Si View checklist

1. Publish community dynamic for `si-view` only among North Bend (others `coming_soon` unpublished).
2. Confirm CTA → `/configure?community_preset=si-view`.
3. `seoStatus: stub` → `wixSeo.setSeoStatus(false)` in template + Studio noindex.
4. Add `/community/si-view` alias when landing is stub/live.

---

## Media-engine

Contracts live under `Design/media-engine/`. Site may hide `#btnPacketDownload` until a stable output URL exists. **No** shared code with Velo.

---

## Deferred

See [`DEFERRED-v1.md`](DEFERRED-v1.md).
