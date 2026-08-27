"use client"

export function SiteNav() {
  return (
    <header className="nav" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
      <div className="wrap nav-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div className="nav-left-suite">
          <a className="brand" href="/" aria-label="Fence Frames home" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <span className="home-ico" aria-hidden="true" style={{ width: "34px", height: "34px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/fence-frames-logo-icon.svg"
                alt="Fence Frames Icon"
                style={{ width: "34px", height: "34px", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
              />
            </span>
            <span className="name">
              <span className="nav-fence" style={{ color: "#4ADE80" }}>
                Fence
              </span>
              &nbsp;
              <span className="nav-frames" style={{ color: "#E5B842" }}>
                Frames
              </span>
            </span>
          </a>

          <nav className="nav-pillar-group" style={{ display: "flex" }}>
            <a href="/geo-north-bend.html" className="nav-pillar-box nav-pillar-find" title="Step 1 · Code & HOA Matcher">
              <span className="nav-pillar-dot" />
              <span className="nav-pillar-label">Find It</span>
              <span className="nav-pillar-sub">(Location)</span>
            </a>
            <a href="/catalog-hub.html" className="nav-pillar-box nav-pillar-frame" title="Step 2 · Architectural Catalog & Designer">
              <span className="nav-pillar-dot" />
              <span className="nav-pillar-label">Frame It</span>
              <span className="nav-pillar-sub">(Design)</span>
            </a>
            <a href="/blueprint" className="nav-pillar-box nav-pillar-fence" title="Step 3 · Blueprints & Takeoff Ledger">
              <span className="nav-pillar-dot" />
              <span className="nav-pillar-label">Fence It</span>
              <span className="nav-pillar-sub">(Build)</span>
            </a>
          </nav>
        </div>

        <div className="nav-end" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="nav-accounts-wrapper">
            <button
              type="button"
              className="nav-accounts-trigger"
              onClick={(e) => {
                const menu = e.currentTarget.nextElementSibling
                if (menu) menu.classList.toggle("is-open")
              }}
            >
              <span>👤</span>
              <span>Accounts</span>
              <span style={{ fontSize: "9px", opacity: 0.8 }}>▼</span>
            </button>

            <div className="nav-accounts-menu">
              <div
                style={{
                  padding: "4px 8px 6px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "10px",
                  color: "#E5B842",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Select Account Portal
              </div>
              <a href="/homeowner" className="nav-account-item">
                <span className="account-icon">🏡</span>
                <div>
                  <span className="account-title" style={{ color: "#4ADE80" }}>
                    Homeowner Account
                  </span>
                  <span className="account-sub">Saved Fence-Folios &amp; 3-Bid Tracker</span>
                </div>
              </a>
              <a href="/contractors-hub.html" className="nav-account-item">
                <span className="account-icon">🔨</span>
                <div>
                  <span className="account-title" style={{ color: "#F27A22" }}>
                    Contractor Account
                  </span>
                  <span className="account-sub">72-Hr Job Feed &amp; Live SMS Bids</span>
                </div>
              </a>
              <a href="/geo-si-view.html" className="nav-account-item">
                <span className="account-icon">🏛️</span>
                <div>
                  <span className="account-title" style={{ color: "#E5B842" }}>
                    HOA Official Account
                  </span>
                  <span className="account-sub">ARC Committee Portal &amp; Bylaw Standards</span>
                </div>
              </a>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "2px 0" }} />
              <a href="/log-in" className="nav-account-item">
                <span className="account-icon">🔑</span>
                <div>
                  <span className="account-title" style={{ color: "#FAF6EE" }}>
                    Sign In / Switch Role
                  </span>
                  <span className="account-sub">Zero-Data-Loss Phone OTP Auth</span>
                </div>
              </a>
            </div>
          </div>

          <a href="/designer" className="ff-btn btn-gold btn-chamfer" style={{ padding: "0.45rem 1rem", fontSize: "0.84rem" }}>
            + New Build
          </a>
        </div>
      </div>
    </header>
  )
}
