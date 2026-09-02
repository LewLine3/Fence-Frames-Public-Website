import styles from "./site-footer.module.css"
import { ACCOUNT_ROLES } from "@/lib/account-roles"
import { BRAND_ASSETS } from "@/lib/brand-assets"
import { DEV_SITE_MAP } from "@/lib/dev-site-map"

export function SiteFooterElem() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <a href="/" className={styles.brandLink}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND_ASSETS.logo}
              alt=""
              width={52}
              height={52}
              style={{
                width: 52,
                height: 52,
                objectFit: "cover",
                borderRadius: 6,
                border: "1.5px solid #E5B842",
                boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                flexShrink: 0,
              }}
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
              {ACCOUNT_ROLES.fabricator.signUpCta}
            </a>
            <a href="/auth-gate" className={styles.signupHoa}>
              {ACCOUNT_ROLES.facilitator.signUpCta}
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
