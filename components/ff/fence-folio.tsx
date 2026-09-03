"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useModals } from "./modal-provider"
import { HERITAGE_8LF_DEMO, folioMaterialQuantities } from "@/lib/folio-demo-config"
import { calculateBaselineFenceQuote } from "@/lib/pricing-engine"

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const greenPrintGrid = {
  backgroundImage:
    "linear-gradient(rgba(22,67,45,0.35) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(22,67,45,0.35) 1px, transparent 1px)," +
    "linear-gradient(#16432D 2px, transparent 2px)," +
    "linear-gradient(90deg, #16432D 2px, transparent 2px)," +
    "linear-gradient(90deg, rgba(10,9,8,0.92) 0%, rgba(26,20,8,0.88) 40%, rgba(229,184,66,0.35) 78%, rgba(201,152,42,0.55) 100%)",
  backgroundSize: "25px 25px, 25px 25px, 100px 100px, 100px 100px, 100% 100%",
  backgroundPosition: "0 0, 0 0, 0 0, 0 0, center",
} as const

const fmt = (n: number) => `$${n.toLocaleString()}`
const fmtRange = (min: number, max: number) => `${fmt(min)} – ${fmt(max)}`

export function FenceFolio() {
  const [chapter, setChapter] = useState(0)
  const { open } = useModals()

  const config = HERITAGE_8LF_DEMO
  const pricing = useMemo(() => calculateBaselineFenceQuote(config), [config])
  const qty = useMemo(() => folioMaterialQuantities(config), [config])

  const materialMid = Math.round((pricing.materialsCostMin + pricing.materialsCostMax) / 2)
  const laborMid = Math.round((pricing.laborCostMin + pricing.laborCostMax) / 2)
  const materialRows = pricing.itemizedMetrics.filter(
    (m) => m.category === "Materials" || m.category === "Gates",
  )

  const materialLines = [
    {
      label: "Posts & concrete",
      qty: `${qty.postCount} posts · ${qty.concreteBags} bags`,
      est: materialRows[1]?.totalEst,
    },
    {
      label: "Rails & top cap",
      qty: `${qty.total2x4Rails}× 2x4×${qty.railLengthEach}'`,
      est: materialRows[2]?.totalEst,
    },
    {
      label: "Pickets",
      qty: `${Math.round(qty.picketCount)}× 1x6×6' cedar`,
      est: materialRows[3]?.totalEst,
    },
    {
      label: "Stain & hardware",
      qty: "Cedar natural · black ties",
      est: (materialRows[4]?.totalEst ?? 0) + (materialRows[6]?.totalEst ?? 0),
    },
  ]

  const folioChapters = [
    {
      tab: "Visual",
      tabFull: "Visual Blueprint",
      title: "Heritage Cedar — how your fence looks",
      sheet: `${config.linearFeet} LF panel · ${config.heightFt}' tall · front & back`,
      price: "PREVIEW",
      priceNote: "",
      img: "/images/ai-generated-fences/Rancher Fence Illustration.jpg",
    },
    {
      tab: "Material",
      tabFull: "Material Cost",
      title: "What to buy for this 8 LF section",
      sheet: `${qty.postCount} posts · ${Math.round(qty.picketCount)} pickets · live takeoff`,
      price: fmtRange(pricing.materialsCostMin, pricing.materialsCostMax),
      priceNote: "",
      img: "/images/real-fences-structures/2508-Redwood-Stained-Heritage-Picket-Fence-Maple-Valley-Wa (9)-Compress.jpg",
    },
    {
      tab: "Labor",
      tabFull: "Labor Estimate",
      title: "Install for this section",
      sheet: "Site prep, posts, framing & hang — separate from materials",
      price: fmtRange(pricing.laborCostMin, pricing.laborCostMax),
      priceNote: "",
      img: "/images/real-fences-structures/2411B-Legacy-Fence-Chestnut-Brown-Skyway-Renton-Wa (8).jpg",
    },
    {
      tab: "Total",
      tabFull: "Final Price",
      title: "Fence-Folio combined estimate",
      sheet: `Material ~${fmt(materialMid)} + labor ~${fmt(laborMid)} · ±15%`,
      price: fmtRange(pricing.totalMin, pricing.totalMax),
      priceNote: "",
      img: "/images/catalog-vpf-natural.svg",
    },
  ]

  const data = folioChapters[chapter]
  const total = folioChapters.length

  const next = () => setChapter((c) => (c + 1) % total)
  const prev = () => setChapter((c) => (c - 1 + total) % total)

  return (
    <section className="step-section home-section" id="fence-pillar">
      <div
        className="has-outside-corners fence-folio-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "1.5rem",
          alignItems: "stretch",
          padding: "1.75rem",
          backgroundColor: "#0A0908",
          ...greenPrintGrid,
          border: "2.5px solid var(--ink)",
          borderRadius: "var(--radius)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
        <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                marginBottom: "1rem",
              }}
            >
              The Fence-Folio your community and builders can actually use.
            </p>

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
                {[
                  {
                    title: "Code Compliant",
                    copy: "Community and local rules built in and listed to give you or your builder all the information in one place.",
                  },
                  {
                    title: "Fence Documents",
                    copy: "One Fence-Folio package with three clear parts, then a combined final price:",
                    bullets: [
                      "Visual — How your fence looks from the street and the yard.",
                      "Material — What to buy, with material cost.",
                      "Labor — Install estimate, kept separate from materials.",
                      "Final price — Material + labor rolled into one ±15% range.",
                    ],
                  },
                  {
                    title: "Live sample",
                    copy: `Widget shows real numbers for a ${config.linearFeet} LF · ${config.heightFt}' Heritage panel (same as the designer default).`,
                  },
                  {
                    title: "PDF Export",
                    copy: "One-click PDF export, ready to download or attach to your ARC application.",
                  },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
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
                        {item.title}
                      </h4>
                      <p style={{ ...rowdies(300), fontSize: "0.82rem", color: "#B5C2BA", lineHeight: 1.4, margin: item.bullets ? "0 0 0.5rem 0" : 0 }}>
                        {item.copy}
                      </p>
                      {item.bullets && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", paddingLeft: "0.5rem" }}>
                          {item.bullets.map((b) => (
                            <div key={b} style={{ ...rowdies(300), fontSize: "0.8rem", color: "#FAF6EE", display: "flex", gap: "0.4rem" }}>
                              <span style={{ color: "#4ADE80", fontWeight: 700 }}>✓</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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

        <div
          className="card-solid has-outside-corners"
          style={{
            backgroundColor: "#16432D",
            backgroundImage:
              "linear-gradient(rgba(74,222,128,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.14) 1px, transparent 1px)",
            backgroundSize: "25px 25px, 25px 25px",
            border: "2.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            padding: "1.4rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ ...rowdies(700), fontSize: "1.1rem", color: "#E5B842", letterSpacing: "0.04em" }}>
              FENCE-FOLIO
            </span>
            <span
              style={{
                ...rowdies(400),
                fontSize: "0.65rem",
                color: "#A5D6A7",
              }}
            >
              Live · {config.linearFeet} LF · {config.heightFt}&apos; Heritage
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
                title={c.tabFull}
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
                maxWidth: "48%",
              }}
            >
              <div style={{ ...rowdies(400), fontSize: "0.6rem", color: "#E5B842", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {data.tabFull}
              </div>
              <div style={{ ...rowdies(700), fontSize: chapter === 0 ? "0.85rem" : "0.95rem", color: "#E5B842", lineHeight: 1.2 }}>
                {data.price}
                {chapter === 3 && (
                  <span style={{ display: "block", fontSize: "0.65rem", fontWeight: 400, color: "#FAF6EE", marginTop: 2 }}>
                    ${pricing.pricePerLfMin}–${pricing.pricePerLfMax} / LF
                  </span>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              background: "#161B17",
              border: "2px solid #141B16",
              borderRadius: 4,
              overflow: "hidden",
              flex: "1 1 auto",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.7)",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                overflowY: "auto",
              }}
            >
              {chapter === 0 && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.img}
                    alt={data.title}
                    style={{ width: "100%", height: "auto", maxHeight: 160, objectFit: "contain", filter: "brightness(0.95)" }}
                  />
                  <p style={{ ...rowdies(300), fontSize: "0.75rem", color: "#A5D6A7", margin: 0, textAlign: "center" }}>
                    One {config.postSpacingFt}&apos; bay · board-on-board cedar
                  </p>
                </>
              )}

              {chapter === 1 && (
                <table style={{ width: "100%", ...rowdies(300), fontSize: "0.72rem", color: "#DBD0BD", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ color: "#E5B842", textAlign: "left" }}>
                      <th style={{ paddingBottom: 6 }}>Item</th>
                      <th style={{ paddingBottom: 6 }}>Qty</th>
                      <th style={{ paddingBottom: 6, textAlign: "right" }}>Est.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialLines.map((line) => (
                      <tr key={line.label} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                        <td style={{ padding: "6px 4px 6px 0", color: "#FAF6EE", fontWeight: 700 }}>{line.label}</td>
                        <td style={{ padding: "6px 4px", fontFamily: "monospace", fontSize: "0.68rem" }}>{line.qty}</td>
                        <td style={{ padding: "6px 0 6px 4px", textAlign: "right", color: "#4ADE80", fontWeight: 700 }}>
                          {line.est != null ? fmt(line.est) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop: "1px solid rgba(229,184,66,0.35)" }}>
                      <td colSpan={2} style={{ paddingTop: 8, color: "#E5B842", fontWeight: 700 }}>
                        Material subtotal
                      </td>
                      <td style={{ paddingTop: 8, textAlign: "right", color: "#E5B842", fontWeight: 700 }}>
                        ~{fmt(materialMid)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}

              {chapter === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 4, padding: "0.65rem" }}>
                    <strong style={{ ...rowdies(700), fontSize: "0.78rem", color: "#4ADE80", display: "block", marginBottom: 4 }}>
                      Site prep & posts
                    </strong>
                    <span style={{ ...rowdies(300), fontSize: "0.72rem", color: "#DBD0BD" }}>
                      Dig & set {qty.postCount} posts for {config.linearFeet} LF
                    </span>
                  </div>
                  <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 4, padding: "0.65rem" }}>
                    <strong style={{ ...rowdies(700), fontSize: "0.78rem", color: "#4ADE80", display: "block", marginBottom: 4 }}>
                      Framing & hang
                    </strong>
                    <span style={{ ...rowdies(300), fontSize: "0.72rem", color: "#DBD0BD" }}>
                      {config.railCount}-rail frame + {Math.round(qty.picketCount)} pickets
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(229,184,66,0.25)" }}>
                    <span style={{ ...rowdies(700), fontSize: "0.72rem", color: "#E5B842" }}>Labor subtotal</span>
                    <span style={{ ...rowdies(700), fontSize: "0.85rem", color: "#FAF6EE" }}>~{fmt(laborMid)}</span>
                  </div>
                </div>
              )}

              {chapter === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", ...rowdies(400), fontSize: "0.78rem", color: "#DBD0BD" }}>
                    <span>Material</span>
                    <span style={{ color: "#FAF6EE", fontWeight: 700 }}>~{fmt(materialMid)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", ...rowdies(400), fontSize: "0.78rem", color: "#DBD0BD" }}>
                    <span>Labor</span>
                    <span style={{ color: "#FAF6EE", fontWeight: 700 }}>~{fmt(laborMid)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", ...rowdies(400), fontSize: "0.78rem", color: "#DBD0BD" }}>
                    <span>Admin / overhead</span>
                    <span style={{ color: "#FAF6EE", fontWeight: 700 }}>~{fmt(pricing.adminPermitCost)}</span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      paddingTop: 8,
                      borderTop: "1px solid rgba(229,184,66,0.35)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span style={{ ...rowdies(700), fontSize: "0.8rem", color: "#4ADE80" }}>Final price</span>
                    <span style={{ ...rowdies(700), fontSize: "1rem", color: "#4ADE80" }}>
                      {fmtRange(pricing.totalMin, pricing.totalMax)}
                    </span>
                  </div>
                  <p style={{ ...rowdies(300), fontSize: "0.68rem", color: "#8E9A92", margin: 0, textAlign: "center" }}>
                    Scales with LF in the designer — this sample is one {config.linearFeet} LF panel
                  </p>
                </div>
              )}
            </div>

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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.9rem", gap: "0.5rem", flexWrap: "wrap" }}>
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
              {data.tabFull} · {chapter + 1} of {total}
            </span>
            <Link
              href="/blueprint"
              style={{
                ...rowdies(700),
                fontSize: "0.75rem",
                background: "#4ADE80",
                color: "#141B16",
                border: "1.5px solid #141B16",
                borderRadius: 3,
                padding: "0.35rem 0.8rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Open full Fence-Folio →
            </Link>
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
      </div>
    </section>
  )
}
