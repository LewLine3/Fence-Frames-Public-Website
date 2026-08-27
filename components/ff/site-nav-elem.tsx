"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./site-nav.module.css"

/** ELEM-01 self-contained header for pages that lack full ff-source nav cascade (e.g. /log-in). Do not use on Designer/Home. */
export function SiteNavElem() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  return (
    <header className={styles.ffChromeNav}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <a className={styles.brand} href="/" aria-label="Fence Frames home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/fence-frames-logo-icon.svg"
              alt=""
              width={34}
              height={34}
              style={{ width: 34, height: 34, objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
            />
            <span className={styles.brandName}>
              <span style={{ color: "#4ADE80" }}>Fence</span>&nbsp;
              <span style={{ color: "#E5B842" }}>Frames</span>
            </span>
          </a>

          <nav className={styles.pillars} aria-label="Three pillars">
            <a href="/geo-north-bend.html" className={`${styles.pillar} ${styles.pillarFind}`} title="Step 1 · Code & HOA Matcher">
              <span className={styles.pillarDot} />
              <span className={styles.pillarLabel}>Find It</span>
              <span className={styles.pillarSub}>(Location)</span>
            </a>
            <a href="/catalog-hub.html" className={`${styles.pillar} ${styles.pillarFrame}`} title="Step 2 · Catalog & Designer">
              <span className={styles.pillarDot} />
              <span className={styles.pillarLabel}>Frame It</span>
              <span className={styles.pillarSub}>(Design)</span>
            </a>
            <a href="/blueprint" className={`${styles.pillar} ${styles.pillarFence}`} title="Step 3 · Blueprints & Takeoff">
              <span className={styles.pillarDot} />
              <span className={styles.pillarLabel}>Fence It</span>
              <span className={styles.pillarSub}>(Build)</span>
            </a>
          </nav>
        </div>

        <div className={styles.end}>
          <div className={styles.accounts} ref={wrapRef}>
            <button type="button" className={styles.accountsBtn} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <span>👤</span>
              <span>Accounts</span>
              <span style={{ fontSize: 9, opacity: 0.8 }}>▼</span>
            </button>
            <div className={`${styles.accountsMenu} ${open ? styles.accountsMenuOpen : ""}`} role="menu">
              <div
                style={{
                  padding: "4px 8px 6px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 10,
                  color: "#E5B842",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Select Account Portal
              </div>
              <a href="/homeowner" className={styles.accountItem}>
                <span>🏡</span>
                <div>
                  <span className={styles.accountTitle} style={{ color: "#4ADE80" }}>
                    Homeowner Account
                  </span>
                  <span className={styles.accountSub}>Saved Fence-Folios &amp; 3-Bid Tracker</span>
                </div>
              </a>
              <a href="/contractors-hub.html" className={styles.accountItem}>
                <span>🔨</span>
                <div>
                  <span className={styles.accountTitle} style={{ color: "#F27A22" }}>
                    Contractor Account
                  </span>
                  <span className={styles.accountSub}>72-Hr Job Feed &amp; Live SMS Bids</span>
                </div>
              </a>
              <a href="/geo-si-view.html" className={styles.accountItem}>
                <span>🏛️</span>
                <div>
                  <span className={styles.accountTitle} style={{ color: "#E5B842" }}>
                    HOA Official Account
                  </span>
                  <span className={styles.accountSub}>ARC Committee Portal &amp; Bylaw Standards</span>
                </div>
              </a>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "2px 0" }} />
              <a href="/log-in" className={styles.accountItem}>
                <span>🔑</span>
                <div>
                  <span className={styles.accountTitle} style={{ color: "#FAF6EE" }}>
                    Sign In / Switch Role
                  </span>
                  <span className={styles.accountSub}>Zero-Data-Loss Phone OTP Auth</span>
                </div>
              </a>
            </div>
          </div>
          <a href="/designer" className={styles.newBuild}>
            + New Build
          </a>
        </div>
      </div>
    </header>
  )
}
