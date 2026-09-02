import styles from "./site-footer.module.css"
import { DEV_SITE_MAP } from "@/lib/dev-site-map"

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
            Build-phase site map — every page linked below while routes are in active development.
          </p>

          <div className={styles.signupRow}>
            <a href="/contractors/onboarding" className={styles.signupContractor}>
              Sign Up as Contractor
            </a>
            <a href="/auth-gate" className={styles.signupHoa}>
              Sign Up Your HOA / Community
            </a>
          </div>
        </div>

        <div className={styles.devCols}>
          {DEV_SITE_MAP.map((section) => (
            <div key={section.title}>
              <h4 className={styles.colHead} style={{ color: section.color }}>
                {section.title}
              </h4>
              <ul className={styles.list}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Fence Frames · Build sitemap footer</span>
        <span>King County, WA</span>
      </div>
    </footer>
  )
}
