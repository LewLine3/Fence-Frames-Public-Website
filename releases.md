# Heritage embed releases (`configure/heritage-v1`)

Log every **GitHub Pages** push. Local `:5199` work is **DEV** — do not log here.

| buildId | category | commit | summary | smoke |
|---------|----------|--------|---------|-------|
| 2026-06-24 | PILOT | 260cc34 | Soft-launch baseline — Heritage VPF stack composer live | backcheck + live /configure |

## How to add a row

1. Set `FF_BUNDLE_CATEGORY` (SYM | ASM | CFG | PILOT | HOTFIX)
2. Build, smoke per `_workspaces/.cursor/rules/ff-embed-bundle-release.mdc`
3. Push `main`, confirm live `bundle-manifest.json`
4. Append row: `buildId`, category, short git hash, one-line summary, smoke tier passed

## Commit prefix

`[CATEGORY] heritage-v1 YYYY-MM-DD: summary`
