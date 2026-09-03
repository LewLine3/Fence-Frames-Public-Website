"use client"

import Link from "next/link"
import { useModals } from "./modal-provider"

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

type ActionItem = {
  label: string
  sub: string
  href?: string
  action?: "contractor" | "blueprint"
  cornerA: string
  cornerB: string
}

const actions: ActionItem[] = [
  {
    label: "Find a Builder",
    sub: "Match with 3 vetted local pros who bid on your finished Fence-Folio.",
    action: "contractor",
    cornerA: "tl c-forest",
    cornerB: "br c-gold",
  },
  {
    label: "Open Fence-Folio",
    sub: "Visual, Material, and Labor in one packet — plus your combined final price.",
    href: "/blueprint",
    cornerA: "tl c-orange",
    cornerB: "br c-forest",
  },
  {
    label: "Visual · Material · Labor",
    sub: "See how it looks, what to buy, and install cost — kept separate on purpose.",
    href: "/blueprint",
    cornerA: "tl c-orange",
    cornerB: "br c-forest",
  },
  {
    label: "Final Price Range",
    sub: "Honest ±15% estimate for your ZIP — not a hard quote.",
    href: "/blueprint?section=total",
    cornerA: "tl c-forest",
    cornerB: "br c-gold",
  },
]

export function FenceIt() {
  const { open } = useModals()

  return (
    <section className="step-section" id="fence-pillar" style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "1.5rem", alignItems: "stretch", marginBottom: "0.75rem" }}>
        <div
          className="has-outside-corners"
          style={{
            border: "2.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            background: "#0E281B",
            position: "relative",
            minHeight: "100%",
            boxSizing: "border-box",
            display: "flex",
            boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
          }}
        >
          <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Holographic fence icons/Fence-It-Holographic-Fence.png"
            alt="Fence It — picket fence turning holographic"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div
          className="card-solid has-outside-corners"
          style={{
            backgroundColor: "#10261A",
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(74,222,128,0.16) 0px, rgba(74,222,128,0.16) 2px, transparent 2px, transparent 14px)",
            border: "2.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            padding: "1.2rem 1.4rem",
            minHeight: 180,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
          }}
        >
          <span className="corner-mark-out tr c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out bl c-gold" />
          <h2 style={{ ...rowdies(700), fontSize: "1.75rem", color: "#4ADE80", marginBottom: "0.3rem", lineHeight: 1.15, letterSpacing: "0.02em" }}>
            Fence it.
          </h2>
          <p style={{ ...rowdies(300), fontSize: "0.86rem", lineHeight: 1.4, color: "#FAF6EE", margin: 0 }}>
            We help you assemble a Fence-Folio: how the fence looks, what to buy (Material Cost), what install
            costs (Labor Estimate), and one combined final price — so you know a fair range before you talk to a
            contractor.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.2rem", marginBottom: "1rem" }}>
        {actions.map((a) => {
          const inner = (
            <>
              <span className={`corner-mark-out ${a.cornerA}`} style={{ zIndex: 2 }} />
              <span className={`corner-mark-out ${a.cornerB}`} />
              <span style={{ ...rowdies(700), fontSize: "1.1rem", color: "var(--forest-deep)" }}>{a.label}</span>
              <span style={{ ...rowdies(300), fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.4 }}>{a.sub}</span>
            </>
          )
          const style = {
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius)",
            padding: "1.2rem 1.4rem",
            background: "#FAF6EE",
            textAlign: "left" as const,
            cursor: "pointer",
            color: "var(--ink)",
            display: "flex",
            flexDirection: "column" as const,
            gap: "0.3rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            position: "relative" as const,
            textDecoration: "none",
          }
          if (a.href) {
            return (
              <Link key={a.label} href={a.href} className="action-btn has-outside-corners" style={style}>
                {inner}
              </Link>
            )
          }
          return (
            <button
              key={a.label}
              type="button"
              className="action-btn has-outside-corners"
              onClick={() => a.action && open(a.action)}
              style={style}
            >
              {inner}
            </button>
          )
        })}
      </div>

      <p style={{ ...rowdies(300), fontSize: "0.82rem", color: "#FAF6EE", textAlign: "center", opacity: 0.8, marginTop: "0.6rem" }}>
        Sample outputs for now &mdash; full Fence-Folio export ships with the live designer.
      </p>
    </section>
  )
}
