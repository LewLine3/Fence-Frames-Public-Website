const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..", "..", "..")
const pages = [
  ["app/frame/page.tsx", "catalog"],
  ["app/catalog/page.tsx", "catalog"],
  ["app/wizard/page.tsx", "wizard"],
  ["app/auth-gate/page.tsx", "auth"],
  ["app/wa/page.tsx", "hub"],
  ["app/wa/[county]/[city]/page.tsx", "hub"],
  ["app/wa/[county]/[city]/[community]/page.tsx", "hub"],
  ["app/contractor/match/page.tsx", "folio"],
  ["app/contractors/onboarding/page.tsx", "form"],
  ["app/terms/page.tsx", "legal"],
  ["app/privacy/page.tsx", "legal"],
  ["app/material-list/page.tsx", "folio"],
  ["app/ledger/page.tsx", "folio"],
]

const importOld =
  /import \{ SiteNav \} from '@\/components\/ff\/site-nav'\r?\nimport \{ SiteFooter \} from '@\/components\/ff\/site-footer'/

const wrapperRe =
  /return \(\s*\r?\n\s*<div[\s\S]*?<SiteNav[\s\S]*?\/>\s*\r?\n\s*<main[^>]*>\s*/m

const closingRe =
  /\s*<\/main>\s*\r?\n\s*<SiteFooter[\s\S]*?\/>\s*\r?\n\s*<\/div>\s*\r?\n\s*\)\s*\r?\n\}/m

for (const [rel, width] of pages) {
  const file = path.join(root, rel)
  let s = fs.readFileSync(file, "utf8")
  if (!s.includes("SiteNav")) {
    console.log("skip", rel)
    continue
  }
  s = s.replace(importOld, "import { SiteShell } from '@/components/ff/site-shell'")
  s = s.replace(wrapperRe, `return (\n    <SiteShell width="${width}">\n`)
  s = s.replace(closingRe, "\n    </SiteShell>\n  )\n}")
  fs.writeFileSync(file, s)
  console.log("migrated", rel)
}
