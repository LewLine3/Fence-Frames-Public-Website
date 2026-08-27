import styles from "./site-footer.module.css"

/** ELEM-01 footer for /log-in and similar. Home/Designer keep SiteFooter. */
const findFrame = [
  { href: "/geo-north-bend.html", label: "City of North Bend Codes" },
  { href: "/geo-si-view.html", label: "Si View HOA Pre-Approved ARC" },
  { href: "/catalog-hub.html", label: "12+ Architectural Style Catalog" },
  { href: "/designer", label: "Universal 2D CAD Configurator" },
]

const fencePros = [
  { href: "/blueprint", label: 'Portrait 8.5" × 11" ARC Blueprints' },
  { href: "/contractors-hub.html", label: "72-Hour Contractor Job Board" },
  { href: "/contractor-match.html", label: "Live 3-Seat SMS Scramble" },
  { href: "/homeowner", label: "Homeowner Command Center" },
]

const standards = [
  { href: null as string | null, label: "Anti-Angi 3-Seat Monopoly Law" },
  { href: "/design-system-guide.html", label: "Rowdies Design System Tokens" },
  { href: "/box-styles-showcase.html", label: "Canonical CAD Box Styles" },
  { href: "/log-in", label: "Zero-Data-Loss Sign In" },
]

export function SiteFooterElem() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <a href="/" className={styles.brandLink}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/fence-frames-logo-icon.svg"
              alt=""
              width={38}
              height={38}
              style={{ width: 38, height: 38, objectFit: "contain", filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.6))" }}
            />
            <span className={styles.brandName}>
              <span style={{ color: "#4ADE80" }}>Fence</span>&nbsp;
              <span style={{ color: "#E5B842" }}>Frames</span>
            </span>
          </a>
          <p className={styles.tagline}>
            The parametric fence engineering &amp; HOA pre-approval platform. Frame Your Vision | Find Your Fence.
          </p>
          <div className={styles.badges}>
            <span className={styles.badgeGreen}>✓ ZERO DATA LOSS</span>
            <span className={styles.badgeGold}>✓ 3-SEAT CAPPED PROS</span>
          </div>
        </div>

        <div className={styles.cols}>
          <div>
            <h4 className={styles.colHead} style={{ color: "#E5B842" }}>
              Find &amp; Frame
            </h4>
            <ul className={styles.list}>
              {findFrame.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={styles.link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={styles.colHead} style={{ color: "#4ADE80" }}>
              Fence &amp; Pros
            </h4>
            <ul className={styles.list}>
              {fencePros.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={styles.link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={styles.colHead} style={{ color: "#F27A22" }}>
              Standards &amp; Legal
            </h4>
            <ul className={styles.list}>
              {standards.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} className={styles.link}>
                      {l.label}
                    </a>
                  ) : (
                    <span className={styles.link}>{l.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Fence Frames. All rights reserved. Authored &amp; Operated by Two Lew Builders LLC.</span>
        <span>King County, Washington · Piloting at Si View, North Bend, WA</span>
      </div>
    </footer>
  )
}
