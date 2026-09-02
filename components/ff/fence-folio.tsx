"use client"

import { useState } from "react"
import { useModals } from "./modal-provider"

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const folioChapters = [
  {
    tab: "1. Cover",
    title: "Heritage Cedar — 6' Privacy",
    sheet: "SHEET A-01 — FRONT SHOWCASE — SI VIEW",
    price: "$42–$57",
    img: "/images/catalog-vpf-natural.svg",
  },
  {
    tab: "2. Community",
    title: "Si View ARC Rules & Height Caps",
    sheet: "SHEET A-02 — COMMUNITY GUIDELINE — SEC 4.1",
    price: "ARC PRE-APPROVED",
    img: "/images/Holographic fence icons/Find-it-Holographic-Map-Pin.png",
  },
  {
    tab: "3. Materials",
    title: "Clear WRC & Galvanized Takeoff",
    sheet: "SHEET M-01 — MATERIAL PREVIEW",
    price: "$2,640 EST. MATS",
    img: "/images/real-fences-structures/2508-Redwood-Stained-Heritage-Picket-Fence-Maple-Valley-Wa (9)-Compress.jpg",
  },
  {
    tab: "4. Blueprint",
    title: "Detailed Structural Flow",
    sheet: "SHEET B-01 — BUILDER REFERENCE MODEL",
    price: "PERMIT READY",
    img: "/images/ai-generated-fences/Rancher Fence Illustration.jpg",
  },
  {
    tab: "5. Add-ons",
    title: "Rot-Barrier Kickboard & Caps",
    sheet: "SHEET X-01 — MODULAR ADD-ONS & HARDWARE",
    price: "+$8 / LF OPTION",
    img: "/images/real-fences-structures/2411B-Legacy-Fence-Chestnut-Brown-Skyway-Renton-Wa (8).jpg",
  },
  {
    tab: "6. Ledger",
    title: "Transparent ~15% Cost Ledger",
    sheet: "SHEET L-01 — ITEMIZED PRICING LEDGER",
    price: "$5,376 TOTAL EST",
    img: "/images/Holographic fence icons/Fence-It-Holographic-Fence.png",
  },
]

export function FenceFolio() {
  const [chapter, setChapter] = useState(0)
  const { open } = useModals()
  const data = folioChapters[chapter]
  const total = folioChapters.length

  const next = () => setChapter((c) => (c + 1) % total)
  const prev = () => setChapter((c) => (c - 1 + total) % total)

  return (
    <section
      className="step-section has-outside-corners"
      id="fence-pillar"
      style={{
        ...{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        },
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: "2rem",
        alignItems: "stretch",
        marginBottom: "1.5rem",
        padding: "2.5rem clamp(1.5rem, 4vw, 3rem)",
        backgroundColor: "#0A0908",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.55) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.55) 1px, transparent 1px),
          linear-gradient(90deg, #0A0908 0%, #1A1408 35%, rgba(229,184,66,0.45) 72%, #C9982A 100%)
        `,
        backgroundSize: "28px 28px, 28px 28px, 100% 100%",
        border: "none",
        borderTop: "2.5px solid var(--ink)",
        borderBottom: "2.5px solid var(--ink)",
        borderRadius: 0,
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        position: "relative",
      }}
    >
      <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
      <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

      {/* ── LEFT COLUMN: Fence It Copy + Checklist Card ── */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h2
            style={{
              ...rowdies(700),
              fontSize: "2.5rem",
              color: "#4ADE80",
              lineHeight: 1.1,
              marginBottom: "0.4rem",
              letterSpacing: "0.01em",
            }}
          >
            Fence it.
          </h2>
          <p
            style={{
              ...rowdies(400),
              fontSize: "1.05rem",
              color: "#FAF6EE",
              lineHeight: 1.35,
              marginBottom: "1.5rem",
            }}
          >
            The blueprint your community actually wants to see.
          </p>

          {/* Dark Container Plate */}
          <div
            style={{
              background: "#080E0A",
              border: "1.5px solid rgba(74,222,128,0.35)",
              borderRadius: "var(--radius)",
              padding: "1.4rem",
              boxShadow: "inset 0 0 16px rgba(0,0,0,0.6)",
            }}
          >
            <div
              style={{
                ...rowdies(700),
                fontSize: "0.8rem",
                color: "#E5B842",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
            >
              EVERY FENCE-FOLIO INCLUDES
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {/* Item 1 */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#4ADE80",
                    color: "#080E0A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  ✓
                </div>
                <div>
                  <h4 style={{ ...rowdies(700), fontSize: "0.95rem", color: "#FAF6EE", margin: "0 0 0.15rem 0" }}>
                    Code Compliant
                  </h4>
                  <p style={{ ...rowdies(300), fontSize: "0.82rem", color: "#B5C2BA", lineHeight: 1.4, margin: 0 }}>
                    Community and local rules built in and listed to give you or your builder all the information in one place.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#4ADE80",
                    color: "#080E0A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  ✓
                </div>
                <div>
                  <h4 style={{ ...rowdies(700), fontSize: "0.95rem", color: "#FAF6EE", margin: "0 0 0.15rem 0" }}>
                    Fence Documents
                  </h4>
                  <p style={{ ...rowdies(300), fontSize: "0.82rem", color: "#B5C2BA", lineHeight: 1.4, margin: "0 0 0.5rem 0" }}>
                    The Fence-Folio bundles several standalone documents into one easily viewable package. Included are:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", paddingLeft: "0.5rem" }}>
                    <div style={{ ...rowdies(300), fontSize: "0.8rem", color: "#FAF6EE", display: "flex", gap: "0.4rem" }}>
                      <span style={{ color: "#4ADE80", fontWeight: 700 }}>✓</span>
                      <span><strong>Builder&rsquo;s Blueprint</strong> &mdash; Elevation + plan views ready for ARC or contractor handoff.</span>
                    </div>
                    <div style={{ ...rowdies(300), fontSize: "0.8rem", color: "#FAF6EE", display: "flex", gap: "0.4rem" }}>
                      <span style={{ color: "#4ADE80", fontWeight: 700 }}>✓</span>
                      <span><strong>Material List</strong> &mdash; Takeoff with quantities so substitutions can&rsquo;t sneak in.</span>
                    </div>
                    <div style={{ ...rowdies(300), fontSize: "0.8rem", color: "#FAF6EE", display: "flex", gap: "0.4rem" }}>
                      <span style={{ color: "#4ADE80", fontWeight: 700 }}>✓</span>
                      <span><strong>Pricing Estimate</strong> &mdash; Honest &plusmn;15% range for your ZIP &mdash; not a hard quote.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#4ADE80",
                    color: "#080E0A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  ✓
                </div>
                <div>
                  <h4 style={{ ...rowdies(700), fontSize: "0.95rem", color: "#FAF6EE", margin: "0 0 0.15rem 0" }}>
                    PDF Export
                  </h4>
                  <p style={{ ...rowdies(300), fontSize: "0.82rem", color: "#B5C2BA", lineHeight: 1.4, margin: 0 }}>
                    One-click PDF export, ready to download or attach to your ARC application.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#4ADE80",
                    color: "#080E0A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    marginTop: 2,
                  }}
                >
                  ✓
                </div>
                <div>
                  <h4 style={{ ...rowdies(700), fontSize: "0.95rem", color: "#FAF6EE", margin: "0 0 0.15rem 0" }}>
                    HOA Submission
                  </h4>
                  <p style={{ ...rowdies(300), fontSize: "0.82rem", color: "#B5C2BA", lineHeight: 1.4, margin: 0 }}>
                    If your community is a partnered HOA, we&rsquo;ll submit your documents directly to them on your behalf.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Interactive FENCE-FOLIO Widget + Find a Builder Button ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Folio Card */}
        <div
          className="card-solid has-outside-corners"
          style={{
            backgroundColor: "#16432D",
            backgroundImage:
              "linear-gradient(rgba(74,222,128,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.14) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            border: "2.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            padding: "1.4rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            position: "relative",
          }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

          {/* Header Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <span style={{ ...rowdies(700), fontSize: "1.1rem", color: "#E5B842", letterSpacing: "0.04em" }}>
              FENCE-FOLIO
            </span>
            <span
              style={{
                ...rowdies(700),
                fontSize: "0.72rem",
                background: "#D9B872",
                color: "#141B16",
                padding: "0.2rem 0.6rem",
                borderRadius: 3,
                letterSpacing: "0.04em",
              }}
            >
              HOA READY
            </span>
          </div>

          {/* Chapter Tabs */}
          <div
            role="tablist"
            style={{
              display: "flex",
              gap: "0.3rem",
              overflowX: "auto",
              paddingBottom: "0.4rem",
              marginBottom: "0.8rem",
              borderBottom: "1px solid rgba(229,184,66,0.25)",
            }}
          >
            {folioChapters.map((c, i) => (
              <button
                key={c.tab}
                type="button"
                role="tab"
                aria-selected={chapter === i}
                onClick={() => setChapter(i)}
                style={{
                  ...rowdies(400),
                  fontSize: "0.78rem",
                  padding: "0.35rem 0.65rem",
                  borderRadius: 3,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background: chapter === i ? "#E5B842" : "rgba(14,24,18,0.7)",
                  color: chapter === i ? "#141B16" : "#DBD0BD",
                  fontWeight: chapter === i ? 700 : 400,
                }}
              >
                {c.tab}
              </button>
            ))}
          </div>

          {/* Title + Price */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.9rem", gap: "0.8rem" }}>
            <div>
              <h3 style={{ ...rowdies(700), fontSize: "1.2rem", color: "#FFFFFF", marginBottom: "0.2rem", lineHeight: 1.2 }}>
                {data.title}
              </h3>
              <div style={{ ...rowdies(400), fontSize: "0.72rem", color: "#A5D6A7", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {data.sheet}
              </div>
            </div>
            <div
              style={{
                background: "#0F2417",
                border: "1.5px solid #E5B842",
                borderRadius: 4,
                padding: "0.3rem 0.65rem",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              <div style={{ ...rowdies(400), fontSize: "0.6rem", color: "#E5B842", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                EST. PRICE
              </div>
              <div style={{ ...rowdies(700), fontSize: "1.05rem", color: "#E5B842" }}>
                {data.price} <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "#FAF6EE" }}>/ LF</span>
              </div>
            </div>
          </div>

          {/* Viewport with Rulers */}
          <div
            style={{
              position: "relative",
              background: "#161B17",
              border: "2px solid #141B16",
              borderRadius: 4,
              overflow: "hidden",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.7)",
            }}
          >
            {/* Top Ruler */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 20,
                borderBottom: "1px solid rgba(229,184,66,0.3)",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                ...rowdies(300),
                fontSize: "0.6rem",
                color: "rgba(229,184,66,0.7)",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <span>0&prime;</span>
              <span>2&prime;</span>
              <span>4&prime;</span>
              <span>6&prime;</span>
              <span>8&prime;</span>
            </div>
            {/* Left Ruler */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 0,
                bottom: 0,
                width: 18,
                borderRight: "1px solid rgba(229,184,66,0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                ...rowdies(300),
                fontSize: "0.6rem",
                color: "rgba(229,184,66,0.7)",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <span>6&prime;</span>
              <span>4&prime;</span>
              <span>2&prime;</span>
            </div>

            {/* Rendered CAD Preview */}
            <div
              style={{
                marginLeft: 18,
                marginTop: 20,
                padding: "0.8rem 1rem 0 1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                minHeight: 180,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.img || "/placeholder.svg"}
                alt={data.title}
                style={{
                  width: "100%",
                  maxHeight: 170,
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 2,
                  filter: "brightness(0.95)",
                }}
              />
            </div>

            {/* Next Chapter Button Overlay */}
            <button
              type="button"
              onClick={next}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                background: "#E5B842",
                color: "#141B16",
                ...rowdies(700),
                fontSize: "0.75rem",
                border: "2px solid #141B16",
                borderRight: "none",
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                padding: "0.4rem 0.5rem",
                cursor: "pointer",
                boxShadow: "-2px 2px 6px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                zIndex: 5,
              }}
            >
              <span>{((chapter + 1) % total) + 1} &gt;</span>
            </button>
          </div>

          {/* Footer Nav Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.9rem" }}>
            <button
              type="button"
              onClick={prev}
              style={{
                ...rowdies(400),
                fontSize: "0.8rem",
                background: "rgba(14,24,18,0.7)",
                color: "#8E9A92",
                border: "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: 3,
                padding: "0.35rem 0.8rem",
                cursor: "pointer",
              }}
            >
              &lt; Prev
            </button>
            <span style={{ ...rowdies(400), fontSize: "0.8rem", color: "#A5D6A7" }}>
              Page {chapter + 1} of {total}
            </span>
            <button
              type="button"
              onClick={next}
              style={{
                ...rowdies(400),
                fontSize: "0.8rem",
                background: "#141B16",
                color: "#FFFFFF",
                border: "1.5px solid #E5B842",
                borderRadius: 3,
                padding: "0.35rem 0.8rem",
                cursor: "pointer",
              }}
            >
              Next &gt;
            </button>
          </div>
        </div>

        {/* ── Docked Button Plate: Find a Builder ── */}
        <button
          type="button"
          onClick={() => open("contractor")}
          className="has-outside-corners"
          style={{
            background: "#121A14",
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius)",
            padding: "0.85rem 1.2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
            position: "relative",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            width: "100%",
          }}
        >
          <span className="corner-mark-out bl c-gold" />
          <span className="corner-mark-out tr c-forest" style={{ zIndex: 2 }} />
          <span style={{ ...rowdies(700), fontSize: "1.05rem", color: "#E5B842", marginBottom: "0.15rem" }}>
            Find a Builder
          </span>
          <span style={{ ...rowdies(300), fontSize: "0.8rem", color: "#B5C2BA" }}>
            Match with 3 vetted local pros who bid on your finished plan.
          </span>
        </button>
      </div>
    </section>
  )
}
