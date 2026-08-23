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
            <span className="home-ico" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="Fence Frames Icon" width={34} height={34} />
            </span>
            <span className="name">
              <span className="nav-fence">Fence</span>&nbsp;<span className="nav-frames">Frames</span>
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
            href="#communities"
            onClick={(e) => {
              e.preventDefault()
              openModal("modal-hoa")
            }}
          >
            Communities (140+)
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
            href="#contractors"
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
