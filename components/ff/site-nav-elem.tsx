"use client"

import { useEffect, useRef, useState } from "react"
import { ACCOUNT_ROLES } from "@/lib/account-roles"
import { BRAND_ASSETS } from "@/lib/brand-assets"
import { fenceItHref, membershipLoginHref } from "@/lib/membership-session"
import styles from "./site-nav.module.css"

/** Global site header — used on every public page including auth-gate and designer. */
export function SiteNavElem() {
  const [open, setOpen] = useState(false)
  /** Guests default to login; members upgrade to /blueprint after mount. */
  const [fenceHref, setFenceHref] = useState(membershipLoginHref("/blueprint"))
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFenceHref(fenceItHref())
  }, [])

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
              src={BRAND_ASSETS.logo}
              alt=""
              width={48}
              height={48}
              style={{
                width: 48,
                height: 48,
                objectFit: "contain",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
                flexShrink: 0,
              }}
            />
            <span className={styles.brandName}>
              <span style={{ color: "#4ADE80" }}>Fence</span>&nbsp;
              <span style={{ color: "#E5B842" }}>Frames</span>
            </span>
          </a>

          <nav className={styles.pillars} aria-label="Three pillars">
            <a
              href="/wa"
              className={`${styles.pillar} ${styles.pillarFind}`}
              title="Step 1 · State Directory → County Selection → City Code Compliancy → Community / HOA Bylaws"
            >
              <span className={styles.pillarDot} />
              <span className={styles.pillarLabel}>Find It</span>
              <span className={styles.pillarSub}>(Location)</span>
            </a>
            <a href="/frame" className={`${styles.pillar} ${styles.pillarFrame}`} title="Step 2 · Catalog & Designer">
              <span className={styles.pillarDot} />
              <span className={styles.pillarLabel}>Frame It</span>
              <span className={styles.pillarSub}>(Design)</span>
            </a>
            <a
              href={fenceHref}
              className={`${styles.pillar} ${styles.pillarFence}`}
              title="Step 3 · Fence-Folio (members) — sign in required"
            >
              <span className={styles.pillarDot} />
              <span className={styles.pillarLabel}>Fence It</span>
              <span className={styles.pillarSub}>(Folio)</span>
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
                <span>{ACCOUNT_ROLES.founder.emoji}</span>
                <div>
                  <span className={styles.accountTitle} style={{ color: ACCOUNT_ROLES.founder.color }}>
                    {ACCOUNT_ROLES.founder.labelWithClarifier}
                  </span>
                  <span className={styles.accountSub}>Saved Fence-Folios &amp; 3-Bid Tracker</span>
                </div>
              </a>
              <a href="/contractors/projects" className={styles.accountItem}>
                <span>{ACCOUNT_ROLES.fabricator.emoji}</span>
                <div>
                  <span className={styles.accountTitle} style={{ color: ACCOUNT_ROLES.fabricator.color }}>
                    {ACCOUNT_ROLES.fabricator.labelWithClarifier}
                  </span>
                  <span className={styles.accountSub}>72-Hr Job Feed &amp; Live SMS Bids</span>
                </div>
              </a>
              <a href="/wa/king-county/north-bend/si-view" className={styles.accountItem}>
                <span>{ACCOUNT_ROLES.facilitator.emoji}</span>
                <div>
                  <span className={styles.accountTitle} style={{ color: ACCOUNT_ROLES.facilitator.color }}>
                    {ACCOUNT_ROLES.facilitator.labelWithClarifier}
                  </span>
                  <span className={styles.accountSub}>ARC Committee Portal &amp; Bylaw Standards</span>
                </div>
              </a>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "2px 0" }} />
              <a href="/auth-gate" className={styles.accountItem}>
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
