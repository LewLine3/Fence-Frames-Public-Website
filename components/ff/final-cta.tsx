"use client"

import { useModals } from "./modal-provider"
import { ACCOUNT_ROLES } from "@/lib/account-roles"

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export function FinalCta() {
  const { open } = useModals()

  return (
    <section
      className="final-cta-section home-section"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        marginBottom: 0,
        border: "2.5px solid var(--ink)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
      }}
    >
      {/* Homeowners */}
      <div style={{ position: "relative", backgroundImage: "url('/images/card-trials/grey-lumber-with-fern.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(250,246,238,0.6) 0%, rgba(250,246,238,0.2) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          <span style={{ ...rowdies(700), fontSize: "1.1rem", color: "var(--forest-deep)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>{ACCOUNT_ROLES.founder.labelWithClarifier}</span>
          <h2 style={{ ...rowdies(700), fontSize: "2.6rem", color: "var(--forest-deep)", lineHeight: 1.15, marginBottom: "1.2rem" }}>Free to design. Free to decide.</h2>
          <p style={{ ...rowdies(300), fontSize: "1.05rem", lineHeight: 1.5, color: "var(--ink)", marginBottom: "2rem", maxWidth: "90%" }}>
            Build your plan, see real pricing, and only share your details when you&rsquo;re ready for bids. No spam, no
            pressure.
          </p>
          <div>
            <a href="#frame-pillar" className="ff-btn btn-forest" style={{ textDecoration: "none", display: "inline-block", fontSize: "1.1rem", padding: "0.8rem 1.6rem", border: "2px solid var(--ink)" }}>
              Start Designing
            </a>
          </div>
        </div>
      </div>

      {/* Contractors */}
      <div style={{ position: "relative", backgroundImage: "url('/images/ai-generated-fences/Cast iron black yard fence _edited.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(20,27,22,0.92) 0%, rgba(20,27,22,0.65) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "4rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          <span style={{ ...rowdies(700), fontSize: "1.1rem", color: "var(--gold-sun)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>{ACCOUNT_ROLES.fabricator.labelWithClarifier}</span>
          <h2 style={{ ...rowdies(700), fontSize: "2.6rem", color: "#FAF6EE", lineHeight: 1.15, marginBottom: "1.2rem" }}>Real plans. Real budgets. Ready to build.</h2>
          <p style={{ ...rowdies(300), fontSize: "1.05rem", lineHeight: 1.5, color: "#FAF6EE", marginBottom: "2rem", maxWidth: "90%" }}>
            Every project arrives with a finished design, a location, and a homeowner who already knows their price
            range. Claim your territory and bid.
          </p>
          <div>
            <button
              type="button"
              onClick={() => open("contractor")}
              className="ff-btn btn-ink"
              style={{ display: "inline-block", fontSize: "1.1rem", padding: "0.8rem 1.6rem", border: "2px solid #FAF6EE", background: "transparent", color: "#FAF6EE", cursor: "pointer" }}
            >
              Join as {ACCOUNT_ROLES.fabricator.labelWithClarifier}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
