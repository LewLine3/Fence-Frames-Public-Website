"use client"

import { useState } from "react"

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const folioChapters = [
  {
    tab: "1. Cover",
    title: "Heritage Cedar \u2014 6' Privacy",
    sheet: "SHEET A-01 \u00b7 ELEVATION SPEC \u00b7 SI VIEW",
    price: "$42\u2013$57",
    img: "/images/card-trials/grey-lumber-with-fern.jpg",
  },
  {
    tab: "2. Community",
    title: "Si View ARC Rules & Height Caps",
    sheet: "SHEET A-02 \u2014 COMMUNITY GUIDELINE \u2014 SEC 4.1",
    price: "ARC PRE-APPROVED",
    img: "/images/Holographic fence icons/Find-it-Holographic-Map-Pin.png",
  },
  {
    tab: "3. Materials",
    title: "Clear WRC & Galvanized Takeoff",
    sheet: "SHEET M-01 \u2014 MATERIAL PREVIEW",
    price: "$2,640 EST. MATS",
    img: "/images/real-fences-structures/2508-Redwood-Stained-Heritage-Picket-Fence-Maple-Valley-Wa (9)-Compress.jpg",
  },
  {
    tab: "4. Blueprint",
    title: "Detailed Structural Flow",
    sheet: "SHEET B-01 \u2014 BUILDER REFERENCE MODEL",
    price: "PERMIT READY",
    img: "/images/ai-generated-fences/Rancher Fence Illustration.jpg",
  },
  {
    tab: "5. Add-ons",
    title: "Rot-Barrier Kickboard & Caps",
    sheet: "SHEET X-01 \u2014 MODULAR ADD-ONS & HARDWARE",
    price: "+$8 / LF OPTION",
    img: "/images/real-fences-structures/2411B-Legacy-Fence-Chestnut-Brown-Skyway-Renton-Wa (8).jpg",
  },
  {
    tab: "6. Ledger",
    title: "Transparent ~15% Cost Ledger",
    sheet: "SHEET L-01 \u2014 ITEMIZED PRICING LEDGER",
    price: "$5,376 TOTAL EST",
    img: "/images/Holographic fence icons/Fence-It-Holographic-Fence.png",
  },
]

const bullets = [
  "To-scale elevation & plan views generated automatically from your design.",
  "Community rules pre-loaded \u2014 height caps, setbacks, and stain requirements flagged before you submit.",
  "One-click PDF export ready to attach to your ARC application.",
]

export function FenceFolio() {
  const [chapter, setChapter] = useState(0)
  const data = folioChapters[chapter]
  const total = folioChapters.length

  const next = () => setChapter((c) => (c + 1) % total)
  const prev = () => setChapter((c) => (c - 1 + total) % total)

  return (
    <section
      className="folio-two-col-layout has-outside-corners"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.25fr",
        gap: "3rem",
        alignItems: "center",
        marginBottom: "1.5rem",
        padding: "4rem 3rem",
        backgroundImage:
          "linear-gradient(rgba(242,122,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(242,122,34,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(20,27,22,0.95) 0%, rgba(50,20,5,0.98) 100%), url('/images/ai-generated-fences/Rancher Fence Illustration.jpg')",
        backgroundSize: "20px 20px, 20px 20px, cover, cover",
        backgroundPosition: "center",
        border: "2.5px solid var(--ink)",
        borderRadius: "var(--radius)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
        position: "relative",
      }}
    >
      <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
      <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

      {/* Left: copy + bullets */}
      <div>
        <span style={{ ...rowdies(400), fontSize: "1.15rem", color: "var(--gold-sun)", letterSpacing: "0.02em", display: "block", marginBottom: "0.6rem" }}>
          Fence Frames Community Partners
        </span>
        <h2 style={{ ...rowdies(700), fontSize: "3rem", color: "#FAF6EE", lineHeight: 1.12, marginBottom: "1.8rem", letterSpacing: "-0.01em" }}>
          The blueprint your community actually wants to see
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "1.8rem" }}>
          {bullets.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "0.9rem" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--gold-sun)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.85rem", fontWeight: 700, marginTop: 2 }}>
                &#10003;
              </div>
              <p style={{ ...rowdies(400), fontSize: "1.02rem", lineHeight: 1.45, color: "#FAF6EE", margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>

        <div style={{ borderLeft: "3px solid #C2622D", paddingLeft: "1rem", marginTop: "1.2rem" }}>
          <p style={{ ...rowdies(300), fontSize: "0.92rem", lineHeight: 1.45, color: "var(--gold-sun)", margin: 0 }}>
            Unofficial planning summaries &mdash; always confirm requirements with your association before building.
          </p>
        </div>
      </div>

      {/* Right: interactive Fence-Folio widget */}
      <div
        className="card-solid has-outside-corners"
        style={{
          backgroundColor: "#16432D",
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          border: "2.5px solid var(--ink)",
          borderRadius: "var(--radius)",
          padding: "1.8rem",
          boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
          position: "relative",
          overflow: "visible",
        }}
      >
        <span className="corner-mark-out tl c-orange" />
        <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ ...rowdies(700), fontSize: "1.15rem", color: "var(--gold-sun)", letterSpacing: "0.04em" }}>FENCE-FOLIO</span>
          </div>
          <span style={{ ...rowdies(700), fontSize: "0.75rem", background: "#D9B872", color: "var(--ink)", padding: "0.25rem 0.65rem", borderRadius: 3, letterSpacing: "0.04em" }}>
            HOA READY
          </span>
        </div>

        {/* Chapter tabs */}
        <div role="tablist" style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.4rem", marginBottom: "1.2rem", borderBottom: "1px solid rgba(229,184,66,0.25)" }}>
          {folioChapters.map((c, i) => (
            <button
              key={c.tab}
              type="button"
              role="tab"
              aria-selected={chapter === i}
              onClick={() => setChapter(i)}
              style={{
                ...rowdies(400),
                fontSize: "0.82rem",
                padding: "0.4rem 0.8rem",
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                background: chapter === i ? "var(--gold-sun)" : "rgba(20,27,22,0.6)",
                color: chapter === i ? "var(--ink)" : "#DBD0BD",
              }}
            >
              {c.tab}
            </button>
          ))}
        </div>

        {/* Title + price */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem", gap: "1rem" }}>
          <div>
            <h3 style={{ ...rowdies(700), fontSize: "1.35rem", color: "#FFFFFF", marginBottom: "0.25rem" }}>{data.title}</h3>
            <div style={{ ...rowdies(400), fontSize: "0.78rem", color: "#A5D6A7", letterSpacing: "0.06em", textTransform: "uppercase" }}>{data.sheet}</div>
          </div>
          <div style={{ background: "#142B1D", border: "1.5px solid var(--gold-sun)", borderRadius: 4, padding: "0.4rem 0.8rem", textAlign: "right", flexShrink: 0 }}>
            <div style={{ ...rowdies(400), fontSize: "0.65rem", color: "var(--gold-sun)", textTransform: "uppercase", letterSpacing: "0.05em" }}>EST. PRICE</div>
            <div style={{ ...rowdies(700), fontSize: "1.15rem", color: "var(--gold-sun)" }}>
              {data.price} <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#FAF6EE" }}>/ LF</span>
            </div>
          </div>
        </div>

        {/* Viewport with rulers */}
        <div style={{ position: "relative", background: "#1C1713", border: "2px solid var(--ink)", borderRadius: 4, overflow: "hidden", minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 22, borderBottom: "1px solid rgba(229,184,66,0.3)", display: "flex", justifyContent: "space-around", alignItems: "center", ...rowdies(300), fontSize: "0.65rem", color: "rgba(229,184,66,0.7)", background: "rgba(0,0,0,0.3)" }}>
            <span>0&prime;</span><span>2&prime;</span><span>4&prime;</span><span>6&prime;</span><span>8&prime;</span>
          </div>
          <div style={{ position: "absolute", top: 22, left: 0, bottom: 0, width: 20, borderRight: "1px solid rgba(229,184,66,0.3)", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", ...rowdies(300), fontSize: "0.65rem", color: "rgba(229,184,66,0.7)", background: "rgba(0,0,0,0.3)" }}>
            <span>6&prime;</span><span>4&prime;</span><span>2&prime;</span>
          </div>

          <div style={{ marginLeft: 20, marginTop: 22, padding: "1.2rem 1.5rem 0 1.5rem", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.img || "/placeholder.svg"}
              alt={data.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative", zIndex: 2, filter: "brightness(0.9)" }}
            />
          </div>

          <button
            type="button"
            onClick={next}
            style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "var(--gold-sun)", color: "var(--ink)", ...rowdies(700), fontSize: "0.8rem", border: "2px solid var(--ink)", borderRight: "none", borderTopLeftRadius: 6, borderBottomLeftRadius: 6, padding: "0.5rem 0.65rem", cursor: "pointer", boxShadow: "-2px 2px 8px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: "0.2rem" }}
          >
            <span>Page {((chapter + 1) % total) + 1} &gt;</span>
          </button>
        </div>

        {/* Footer nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.2rem" }}>
          <button type="button" onClick={prev} style={{ ...rowdies(400), fontSize: "0.85rem", background: "rgba(20,27,22,0.6)", color: "#8E9A92", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "0.4rem 0.9rem", cursor: "pointer" }}>
            &lt; Prev
          </button>
          <span style={{ ...rowdies(400), fontSize: "0.85rem", color: "#A5D6A7" }}>Page {chapter + 1} of {total}</span>
          <button type="button" onClick={next} style={{ ...rowdies(400), fontSize: "0.85rem", background: "var(--ink)", color: "#FFFFFF", border: "1.5px solid var(--gold-sun)", borderRadius: 3, padding: "0.4rem 0.9rem", cursor: "pointer" }}>
            Next &gt;
          </button>
        </div>
      </div>
    </section>
  )
}
