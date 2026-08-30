const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const columns = [
  { heading: "Product", links: ["How it works", "Design catalog", "Community", "Pricing"] },
  { heading: "Company", links: ["About", "For contractors", "Coverage area", "Contact"] },
  { heading: "Legal", links: ["Privacy", "Terms", "How leads work"] },
]

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "var(--forest-deep)", color: "#FAF6EE", padding: "2.5rem 3rem 1.5rem 3rem", marginTop: "2rem" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", alignItems: "center" }}>
        {/* Branding box */}
        <div
          className="has-outside-corners"
          style={{
            backgroundImage: "url('/images/card-trials/Wood-wet-card-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "2.5px solid var(--ink)",
            borderRadius: "var(--radius)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            position: "relative",
            minHeight: 240,
            overflow: "hidden",
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 5 }} />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 5 }} />

          <div style={{ background: "var(--gold-sun)", color: "var(--ink)", ...rowdies(700), fontSize: "0.9rem", padding: "0.5rem 1rem", borderBottom: "2px solid var(--ink)", zIndex: 2, position: "relative", letterSpacing: "0.02em" }}>
            Fence Frames
          </div>

          <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
            <div style={{ background: "#141B16", padding: "1.8rem 2rem", boxShadow: "0 8px 24px rgba(0,0,0,0.5)", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ ...rowdies(700), fontSize: "0.75rem", color: "var(--ink)", background: "var(--gold-sun)", padding: "0.2rem 0.6rem", borderRadius: 3, marginBottom: "0.8rem", letterSpacing: "0.05em", display: "inline-block" }}>
                BRANDING &middot; MARK
              </div>
              <h2 style={{ ...rowdies(700), fontSize: "3rem", color: "var(--gold-sun)", margin: 0, lineHeight: 1, letterSpacing: "0.02em" }}>Fence Frames</h2>
              <p style={{ ...rowdies(400), fontSize: "0.85rem", color: "#FAF6EE", margin: "0.6rem 0 0 0" }}>
                Washington State&rsquo;s finest custom blueprinting and introduction service.
              </p>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 style={{ ...rowdies(700), fontSize: "1.05rem", color: "#FAF6EE", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.2rem" }}>{col.heading}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ color: "#A0B2A6", textDecoration: "none", ...rowdies(300), fontSize: "0.95rem" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Sub footer */}
      <div style={{ maxWidth: 1440, margin: "2.5rem auto 0 auto", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ ...rowdies(300), fontSize: "0.85rem", color: "#A0B2A6", lineHeight: 1.5 }}>
          <p style={{ margin: "0 0 0.4rem 0" }}>Frame your vision, find your fence. Design tools and honest local pricing for Washington homeowners.</p>
          <p style={{ margin: 0 }}>&copy; 2026 Fence Frames. Piloting at Si View, North Bend, WA.</p>
        </div>
        <div style={{ ...rowdies(300), fontSize: "0.85rem", color: "#A0B2A6" }}>
          Fence Frames is a design &amp; introduction service, not a contractor.
        </div>
      </div>
    </footer>
  )
}
