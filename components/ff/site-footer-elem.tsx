import styles from "./site-footer.module.css"
import { ACCOUNT_ROLES } from "@/lib/account-roles"
import { BRAND_ASSETS } from "@/lib/brand-assets"
import { DEV_SITE_MAP } from "@/lib/dev-site-map"

export function SiteFooterElem() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <div className={styles.signupRow}>
            <a href="/auth-gate" className={`${styles.signupBtn} ${styles.signupFounder}`}>
              <span className={styles.signupMain}>Sign Up as {ACCOUNT_ROLES.founder.name}</span>
              <span className={styles.signupClarifier}>({ACCOUNT_ROLES.founder.clarifier})</span>
            </a>
            <a href="/contractors/onboarding" className={`${styles.signupBtn} ${styles.signupFabricator}`}>
              <span className={styles.signupMain}>Sign Up as {ACCOUNT_ROLES.fabricator.name}</span>
              <span className={styles.signupClarifier}>({ACCOUNT_ROLES.fabricator.clarifier})</span>
            </a>
            <a href="/auth-gate" className={`${styles.signupBtn} ${styles.signupFacilitator}`}>
              <span className={styles.signupMain}>Sign Up as {ACCOUNT_ROLES.facilitator.name}</span>
              <span className={styles.signupClarifier}>({ACCOUNT_ROLES.facilitator.clarifier})</span>
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
        <a href="/" className={styles.bottomBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND_ASSETS.logo}
            alt=""
            width={28}
            height={28}
          />
          <span className={styles.bottomBrandName}>
            <span style={{ color: "#4ADE80" }}>Fence</span>
            &nbsp;
            <span style={{ color: "#E5B842" }}>Frames</span>
          </span>
          <span className={styles.bottomCopy}>© 2026</span>
        </a>
        <span>King County, WA</span>
      </div>
    </footer>
  )
}
