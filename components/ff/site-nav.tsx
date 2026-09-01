"use client"

import { useModal } from "./modal-provider"

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export function SiteNav() {
  const { openModal } = useModal()

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <div className="nav-left">
          <a className="brand" href="#top" aria-label="Fence Frames home">
            <span className="name">
              <span className="nav-fence">Fence</span>&nbsp;<span className="nav-frames">Frames</span>
            </span>
            <span className="home-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="fi-grass"
                  d="M2 20c2-2.4 4-2.4 5.5-.6C9 21.2 11 21.2 12 19c1-2.2 3-2.2 4.5-.4C18 20.4 20 20.4 22 18"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="fi-fence"
                  d="M4 20V9M4 9l-2 3M4 9l2 3M9.5 20V7M9.5 7l-2 3M9.5 7l2 3M15 20V9M15 9l-2 3M15 9l2 3M20.5 20V11M20.5 11l-2 3M20.5 11l2 3"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path className="fi-rail" d="M2.5 13.5h19M2.5 17h19" fill="none" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </a>
        </div>

        <div className="nav-mid" id="navMid">
          <div className="nav-dd" data-dd="find">
            <button
              type="button"
              className="nav-dd-trigger nav-dd-trigger--step"
              aria-expanded="false"
              onClick={() => openModal("modal-hoa")}
            >
              <span className="nav-step-label">Find It</span>
              <span className="nav-step-sub">(Location)</span>
            </button>
          </div>

          <a
            className="nav-text-link"
            href="/wa"
            onClick={(e) => {
              e.preventDefault()
              openModal("modal-hoa")
            }}
          >
            Communities (/wa)
          </a>

          <div className="nav-dd" data-dd="frame">
            <button
              type="button"
              className="nav-dd-trigger nav-dd-trigger--step"
              aria-expanded="false"
              onClick={() => scrollTo("frame-pillar")}
            >
              <span className="nav-step-label">Frame It</span>
              <span className="nav-step-sub">(Design)</span>
            </button>
          </div>

          <a
            className="nav-text-link nav-text-link--contractors"
            href="/contractors/projects"
            onClick={(e) => {
              e.preventDefault()
              openModal("modal-contractor")
            }}
          >
            Contractors
          </a>

          <div className="nav-dd" data-dd="fence">
            <button
              type="button"
              className="nav-dd-trigger nav-dd-trigger--step"
              aria-expanded="false"
              onClick={() => openModal("modal-blueprint")}
            >
              <span className="nav-step-label">Fence It</span>
              <span className="nav-step-sub">(Build)</span>
            </button>
          </div>
        </div>

        <div className="nav-end" id="navRightZone" style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            className="ff-btn btn-gold btn-chamfer"
            style={{ padding: "0.45rem 1rem", fontSize: "0.84rem" }}
            onClick={() => openModal("modal-signin")}
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
