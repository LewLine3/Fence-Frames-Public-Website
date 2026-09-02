"use client"

import { useEffect, useRef, useState } from "react"

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const heroOpenStyles = [
  { name: "Open Design: Horizontal Slat, Single Post", img: "/images/hero-carousel/horizontal-01.png", bg: "#FFFFFF" },
  { name: "Open Design: Horizontal Slat, Gated Run", img: "/images/hero-carousel/horizontal-04.jpg", bg: "#0E0E0E" },
  { name: "Open Design: Horizontal Slat, Full Privacy Run", img: "/images/hero-carousel/horizontal-02.png", bg: "#FFFFFF" },
  { name: "Open Design: Horizontal Slat, Cedar Board Run", img: "/images/hero-carousel/horizontal-03.jpg", bg: "#0E0E0E" },
  { name: "Open Design: Horizontal Slat, Extended Line", img: "/images/hero-carousel/horizontal-06.png", bg: "#FFFFFF" },
  { name: "Open Design: Horizontal Slat, Full Perimeter", img: "/images/hero-carousel/horizontal-05.jpg", bg: "#0E0E0E" },
  { name: "Open Design: Vertical Board, Lattice-Top Corner", img: "/images/hero-carousel/vertical-01.png", bg: "#FFFFFF" },
  { name: "Open Design: Vertical Board, Lattice-Top Straight Run", img: "/images/hero-carousel/vertical-02.png", bg: "#FFFFFF" },
  { name: "Open Design: Vertical Board, Lattice-Top Gate", img: "/images/hero-carousel/vertical-03.png", bg: "#FFFFFF" },
  { name: "Open Design: Picket, Classic Gate Run", img: "/images/hero-carousel/vertical-04.jpg", bg: "#0E0E0E" },
  { name: "Open Design: Picket, Wide Gate Run", img: "/images/hero-carousel/vertical-05.jpg", bg: "#0E0E0E" },
  { name: "Open Design: Picket, Full Perimeter Run", img: "/images/hero-carousel/vertical-06.jpg", bg: "#0E0E0E" },
  { name: "Open Design: Chain Link, Gated Enclosure", img: "/images/hero-carousel/metal-01.jpg", bg: "#0E0E0E" },
  { name: "Open Design: Ornamental Spear-Top, Double Gate", img: "/images/hero-carousel/metal-02.png", bg: "#FFFFFF" },
  { name: "Open Design: Chain Link, Single Gate Run", img: "/images/hero-carousel/metal-03.png", bg: "#FFFFFF" },
]

export function Hero() {
  const [community, setCommunity] = useState("no-hoa")
  const [styleIdx, setStyleIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isSiView = community === "si-view"

  useEffect(() => {
    if (isSiView) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setStyleIdx((i) => (i + 1) % heroOpenStyles.length)
    }, 3200)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isSiView])

  const previewImg = isSiView ? "/images/catalog-vpf-natural.svg" : heroOpenStyles[styleIdx].img
  const previewBadge = isSiView ? "Si View Approved: 6' Heritage Cedar Privacy" : heroOpenStyles[styleIdx].name
  const previewBg = isSiView ? "#141B16" : heroOpenStyles[styleIdx].bg

  return (
    <section
      className="proto-hero-split has-outside-corners"
      style={{
        position: "relative",
        // Grid layers (minor 25px + major 100px) painted OVER the gradient.
        // The container's left edge sits on a page major grid line, and this grid
        // starts at 0,0 with the same 25/100 cadence, so its vertical lines line up
        // with the whole-page background grid. Gradient: near-black on top, fading
        // to a slightly desaturated forest green at the bottom.
        backgroundImage:
          "linear-gradient(rgba(90,171,106,0.10) 1px, transparent 1px)," +
          "linear-gradient(90deg, rgba(90,171,106,0.10) 1px, transparent 1px)," +
          "linear-gradient(rgba(90,171,106,0.16) 2px, transparent 2px)," +
          "linear-gradient(90deg, rgba(90,171,106,0.16) 2px, transparent 2px)," +
          "linear-gradient(180deg, #0b120e 0%, #183625 52%, #23503a 100%)",
        backgroundSize: "25px 25px, 25px 25px, 100px 100px, 100px 100px, cover",
        backgroundPosition: "0 0, 0 0, 0 0, 0 0, center",
        backgroundColor: "#0b120e",
      }}
    >
      <span className="corner-mark-out tl c-gold" />
      <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

      {/* Left: brand + 3-pillar narrative */}
      {/* Buffer 2 — column edge margin: pull the text column in from the left mat edge. */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.2rem", marginLeft: "25px" }}>
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(229,184,66,0.18)",
              border: "1.5px solid var(--gold-sun)",
              borderRadius: "var(--radius)",
              padding: "0.35rem 0.85rem",
              marginBottom: "0.9rem",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold-sun)", display: "inline-block" }} />
            <span
              style={{
                ...rowdies(400),
                fontSize: "0.8rem",
                color: "var(--gold-sun)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Frame Your Vision · Find Your Fence
            </span>
          </div>

          <h1
            style={{
              ...rowdies(700),
              fontSize: "2.3rem",
              lineHeight: 1.15,
              color: "#FFFFFF",
              marginBottom: "1rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            A Modern Approach to <br />
            <span style={{ color: "var(--gold-sun)" }}>How You Shop for a Fence</span>
          </h1>

          <div style={{ ...rowdies(300), fontSize: "0.9rem", lineHeight: 1.55, color: "#FAF6EE", maxWidth: "620px" }}>
            <p style={{ marginBottom: "0.9rem", fontSize: "1.05rem" }}>
              Fence Frames is a modern approach to the way you shop for a fence. Our main objective is to give you
              options to tailor your fence while showing you how the price changes for different styles selected. Our
              system is 3 steps:
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginBottom: "0.75rem",
                letterSpacing: "0.02em",
              }}
            >
              <div>
                <strong style={{ color: "var(--gold-sun)", fontWeight: 400, fontSize: "1.15rem" }}>
                  &ldquo;Find It&rdquo;
                </strong>{" "}
                &mdash; First we match you with any applicable HOA, community, or city to ensure we offer you only
                selections that pass code requirements for your address.
              </div>
              <div>
                <strong style={{ color: "#F27A22", fontWeight: 400, fontSize: "1.15rem" }}>&ldquo;Frame It&rdquo;</strong>{" "}
                &mdash; Next you use one of our 3 shopping modes: a Catalog of common fences for those wanting something
                quick, a Fence Wizard helping those maybe not so fence-savvy select options and styles, and finally our
                Designer which gives you full control of every option available.
              </div>
              <div>
                <strong style={{ color: "#4ADE80", fontWeight: 400, fontSize: "1.15rem" }}>&ldquo;Fence It&rdquo;</strong>{" "}
                &mdash; Once you&rsquo;ve made your selection, we provide you with what we call a Fence-Folio. It&rsquo;s
                everything you or your contractor needs to build the exact fence described: a fair price range based on
                your area and style, a material list with SKUs and national sellers, a builder&rsquo;s blueprint so your
                contractor knows the exact procedure, and an HOA submittal letter or submittal portal link.
              </div>
            </div>

            <p style={{ ...rowdies(300), fontSize: "0.95rem", color: "#FAF6EE", lineHeight: 1.55, marginBottom: "0.8rem" }}>
              Then finally, we offer you to get in touch with one of our partnered contractors who will receive and
              review your Fence-Folio before you&rsquo;re even contacted.
            </p>
            <p
              style={{
                ...rowdies(300),
                fontSize: "0.95rem",
                color: "var(--gold-sun)",
                lineHeight: 1.55,
                marginTop: "0.8rem",
                paddingTop: "0.6rem",
                borderTop: "1px dashed rgba(229,184,66,0.35)",
              }}
            >
              By the way, did we mention this is totally free to you? That&rsquo;s right &mdash; Fence Frames is a tool
              for the people. We hope it helps make the process a little smoother for you, and if it does, just tell your
              neighbors about us.
            </p>
          </div>
        </div>

        {/* 3 quick jump buttons */}
        <div style={{ marginTop: "2.5rem", position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              position: "relative",
              zIndex: 2,
              marginBottom: "-2px",
            }}
          >
            <a
              href="#hero-find-card"
              className="ff-btn btn-gold btn-tab"
              style={{
                ...rowdies(400),
                padding: "0.75rem 0.5rem",
                fontSize: "1.1rem",
                textAlign: "center",
                textTransform: "uppercase",
                border: "2px solid var(--ink)",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              Find It
            </a>
            <a
              href="#frame-pillar"
              className="ff-btn btn-ember btn-tab"
              style={{
                ...rowdies(400),
                padding: "0.75rem 0.5rem",
                fontSize: "1.1rem",
                textAlign: "center",
                textTransform: "uppercase",
                border: "2px solid var(--ink)",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              Frame It
            </a>
            <a
              href="#fence-pillar"
              className="ff-btn btn-forest btn-tab"
              style={{
                ...rowdies(400),
                padding: "0.75rem 0.5rem",
                fontSize: "1.1rem",
                textAlign: "center",
                textTransform: "uppercase",
                border: "2px solid var(--ink)",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              Fence It
            </a>
          </div>
          <div
            style={{
              height: 6,
              background: "var(--ink)",
              borderRadius: 3,
              position: "relative",
              zIndex: 1,
              width: "100%",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>

      {/* Right: Find It search card */}
      <div
        id="hero-find-card"
        className="card-solid has-outside-corners"
        style={{
          // Subtle neutral wash over the golden lumber image to take its
          // saturation down slightly (sits behind the card content).
          backgroundImage:
            "linear-gradient(rgba(122,114,96,0.20), rgba(122,114,96,0.20))," +
            "url('/images/card-trials/pexels-sergeispas-1151756-34615194.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "2.5px solid var(--ink)",
          padding: "1.8rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "var(--ink)",
          // Buffer 2 — column edge margin: pull the card in from the right mat edge.
          marginRight: "25px",
        }}
      >
        <span className="corner-mark-out tr c-gold" />
        <span className="corner-mark-out bl c-forest" />

        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div
            className="card-title-bar"
            style={{
              ...rowdies(700),
              marginBottom: "1rem",
              padding: "0.5rem 0.8rem",
              fontSize: "0.9rem",
              background: "var(--ink)",
              color: "var(--gold-sun)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>1. FIND IT · HOA &amp; CODE VERIFICATION</span>
            <span
              style={{
                ...rowdies(400),
                fontSize: "0.85rem",
                background: "var(--forest-deep)",
                color: "var(--gold-sun)",
                padding: "0.2rem 0.5rem",
                borderRadius: 2,
                border: "1px solid var(--gold-sun)",
              }}
            >
              [Step 1 / 3]
            </span>
          </div>

          {/* Holographic map pin viewport (fixed image) */}
          <div
            style={{
              position: "relative",
              borderTop: "1.5px solid var(--forest-bright)",
              borderLeft: "1.5px solid var(--forest-bright)",
              borderRight: "1.5px solid var(--forest-bright)",
              borderBottom: "none",
              borderTopLeftRadius: "var(--radius)",
              borderTopRightRadius: "var(--radius)",
              overflow: "hidden",
              height: 170,
              background: "#0E281B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Holographic fence icons/Find-it-Holographic-Map-Pin.png"
              alt="Find It holographic map pin over a green field"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(22,67,45,0.1) 0%, rgba(18,59,38,0.95) 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: "0.6rem", left: "0.8rem", right: "0.8rem", display: "flex", alignItems: "center" }}>
              <span
                style={{
                  ...rowdies(700),
                  fontSize: "0.8rem",
                  color: "var(--gold-sun)",
                  letterSpacing: "0.04em",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.9)",
                }}
              >
                Code Compliant Community Matcher
              </span>
            </div>
          </div>

          <p
            style={{
              ...rowdies(300),
              fontSize: "0.92rem",
              color: "#FFFFFF",
              lineHeight: 1.48,
              marginBottom: 0,
              background: "var(--ink)",
              padding: "0.8rem 1rem",
              borderBottomLeftRadius: "var(--radius)",
              borderBottomRightRadius: "var(--radius)",
              borderBottom: "1.5px solid var(--forest-bright)",
              borderLeft: "1.5px solid var(--forest-bright)",
              borderRight: "1.5px solid var(--forest-bright)",
              borderTop: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            We match your property address against local municipal building codes and HOA guidelines to surface
            pre-approved fence heights, setbacks, and material standards before you design.
          </p>

          {/* Find It controls */}
          <div
            style={{
              background: "var(--ink)",
              backdropFilter: "blur(5px)",
              border: "2px solid var(--gold-sun)",
              borderRadius: "var(--radius)",
              padding: "1.2rem",
              color: "#FFFFFF",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              marginTop: "1.8rem",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: "0.8rem", marginBottom: "0.8rem", alignItems: "flex-end" }}>
              <div>
                <label
                  htmlFor="hero-quick-zip"
                  style={{ ...rowdies(400), fontSize: "0.85rem", color: "var(--gold-sun)", display: "block", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
                >
                  Washington ZIP
                </label>
                <div style={{ height: 46, boxSizing: "border-box", display: "flex", alignItems: "center", background: "#FAF6EE", border: "2px solid var(--ink)", borderRadius: 4, padding: "0 0.6rem", gap: "0.4rem" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--forest-deep)" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M12 21s-6-5.686-6-10a6 6 0 1112 0c0 4.314-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                  <input
                    id="hero-quick-zip"
                    name="hero-zip"
                    inputMode="numeric"
                    maxLength={5}
                    defaultValue="98045"
                    placeholder="e.g. 98045"
                    style={{ border: "none", background: "transparent", ...rowdies(400), fontSize: "1.1rem", width: "100%", height: "100%", color: "var(--ink)", outline: "none" }}
                    aria-label="ZIP code"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="hero-community-select"
                  style={{ ...rowdies(400), fontSize: "0.85rem", color: "var(--gold-sun)", display: "block", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
                >
                  Community / HOA
                </label>
                <div style={{ height: 46, boxSizing: "border-box", display: "flex", alignItems: "center", background: "#FAF6EE", border: "2px solid var(--ink)", borderRadius: 4, padding: "0 0.5rem" }}>
                  <select
                    id="hero-community-select"
                    name="hero-community"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    style={{ ...rowdies(400), border: "none", background: "transparent", fontSize: "0.9rem", width: "100%", height: "100%", color: "var(--ink)", outline: "none", cursor: "pointer" }}
                  >
                    <option value="no-hoa">Open Design (No HOA)</option>
                    <option value="si-view">Si View · North Bend, WA</option>
                  </select>
                </div>
              </div>
            </div>

            <a className="btn-cut-outlined" href="#frame-pillar" style={{ width: "100%" }}>
              <span
                className="btn-cut-inner"
                style={{ ...rowdies(400), width: "100%", padding: "0.65rem", fontSize: "1.15rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                <span>Community Design Page</span>
                <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>&rarr;</span>
              </span>
            </a>

            {/* Fence design slideshow */}
            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginTop: "1rem" }}>
              <div
                style={{
                  position: "relative",
                  border: "1.5px solid var(--forest-bright)",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  flexGrow: 1,
                  minHeight: 160,
                  background: "#141B16",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)",
                  marginBottom: "0.8rem",
                }}
              >
                {/* Per-slide backdrop so white-canvas and black-canvas source art both sit cleanly. */}
                <div
                  style={{
                    position: "absolute",
                    inset: "0.4rem",
                    borderRadius: 4,
                    background: previewBg,
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={previewImg}
                  src={previewImg || "/placeholder.svg"}
                  alt="Community fence style preview"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", padding: "0.4rem" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.2rem" }}>
                <span style={{ ...rowdies(400), fontSize: "0.85rem", color: "var(--gold-sun)", letterSpacing: "0.02em" }}>{previewBadge}</span>
                <span
                  style={{
                    ...rowdies(400),
                    fontSize: "0.75rem",
                    background: isSiView ? "var(--forest-deep)" : "var(--ink)",
                    color: "var(--gold-sun)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: 3,
                    border: "1px solid var(--gold-sun)",
                  }}
                >
                  {isSiView ? "ARC SPEC LOCKED" : "AUTO CYCLING"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
