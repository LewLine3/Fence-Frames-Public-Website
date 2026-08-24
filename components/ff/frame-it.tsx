const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

type ShoppingCard = {
  href: string
  ribbon: string
  ribbonBg: string
  ribbonColor: string
  imgBg: string
  img: string
  imgFit: "cover" | "contain"
  imgBordered?: boolean
  tag: string
  tagColor: string
  title: string
  copy: string
  cornerA: string
  cornerB: string
}

const cards: ShoppingCard[] = [
  {
    href: "#frame-pillar",
    ribbon: "Browse Styles",
    ribbonBg: "var(--gold-sun)",
    ribbonColor: "var(--ink)",
    imgBg: "var(--forest-bright)",
    img: "/images/user-uploads/media_1787002208257.png",
    imgFit: "cover",
    tag: "⚡ FASTEST OPTION",
    tagColor: "var(--gold-sun)",
    title: "Catalog",
    copy: "Start from a preset fence line you love, then open it in the designer and make it yours.",
    cornerA: "tl c-forest",
    cornerB: "br c-gold",
  },
  {
    href: "#frame-pillar",
    ribbon: "Build Freely",
    ribbonBg: "var(--ember)",
    ribbonColor: "var(--ink)",
    imgBg: "var(--ink)",
    img: "/images/user-uploads/media_1787002299587.png",
    imgFit: "contain",
    imgBordered: true,
    tag: "🎨 LIVE 3D CANVAS",
    tagColor: "var(--ember)",
    title: "Designer",
    copy: "Open the live canvas and customize materials, styles, and features with real-time cost as you go.",
    cornerA: "tl c-gold",
    cornerB: "br c-orange",
  },
  {
    href: "#frame-pillar",
    ribbon: "Guided Details",
    ribbonBg: "#FAF6EE",
    ribbonColor: "var(--ink)",
    imgBg: "var(--ink)",
    img: "/images/tool-wizard-guided.jpg",
    imgFit: "cover",
    tag: "📝 STEP-BY-STEP",
    tagColor: "#FAF6EE",
    title: "Wizard",
    copy: "Not sure what caps go with what rails? Let our wizard ask you simple questions to build your spec.",
    cornerA: "tl c-forest",
    cornerB: "br c-gold",
  },
]

export function FrameIt() {
  return (
    <section className="step-section" id="frame-pillar" style={{ marginBottom: "0.75rem" }}>
      {/* Top row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "1.5rem", alignItems: "stretch", marginBottom: "0.75rem" }}>
        <div
          className="card-solid has-outside-corners"
          style={{
            backgroundColor: "#26150D",
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(242,122,34,0.18) 0px, rgba(242,122,34,0.18) 2px, transparent 2px, transparent 14px)",
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
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-forest" />
          <h2 style={{ ...rowdies(700), fontSize: "1.75rem", color: "#F27A22", marginBottom: "0.3rem", lineHeight: 1.15, letterSpacing: "0.02em" }}>
            Frame it.
          </h2>
          <p style={{ ...rowdies(300), fontSize: "0.86rem", lineHeight: 1.4, color: "#FAF6EE", margin: 0 }}>
            Our free design tools let you customize your fence while showing real-time cost for every material, style,
            and feature you choose &mdash; surfacing design options, community guidelines, and structural details you
            likely hadn&rsquo;t considered.
          </p>
        </div>

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
          <span className="corner-mark-out tr c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out bl c-orange" style={{ zIndex: 2 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Holographic fence icons/Frame-it-Holographic-Fence-widescreen.png"
            alt="Frame It — timber frame turning holographic"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* 3 shopping mode cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.8rem" }}>
        {cards.map((c) => (
          <a
            key={c.title}
            className="has-outside-corners"
            href={c.href}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              border: "2.5px solid var(--ink)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              background: "#FFFFFF",
              position: "relative",
            }}
          >
            <span className={`corner-mark-out ${c.cornerA}`} style={{ zIndex: 2 }} />
            <span className={`corner-mark-out ${c.cornerB}`} style={{ zIndex: 2 }} />

            <div style={{ background: c.ribbonBg, color: c.ribbonColor, padding: "0.6rem 1rem", borderBottom: "2.5px solid var(--ink)", ...rowdies(700), fontSize: "0.95rem", textTransform: "uppercase" }}>
              <span>{c.ribbon}</span>
            </div>

            <div style={{ height: 220, background: c.imgBg, borderBottom: "2.5px solid var(--ink)", position: "relative", overflow: "hidden", padding: c.imgBordered ? "0.6rem" : undefined }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img || "/placeholder.svg"}
                alt={`${c.title} preview`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: c.imgFit,
                  border: c.imgBordered ? "2px solid var(--ink)" : undefined,
                  borderRadius: c.imgBordered ? 2 : undefined,
                }}
              />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1.2rem" }}>
              <span style={{ display: "inline-block", ...rowdies(400), fontSize: "0.75rem", background: "var(--ink)", color: c.tagColor, padding: "0.3rem 0.6rem", borderRadius: 4, alignSelf: "flex-start", marginBottom: "0.6rem" }}>
                {c.tag}
              </span>
              <h3 style={{ ...rowdies(700), fontSize: "1.4rem", color: "var(--ink)", marginBottom: "0.4rem", lineHeight: 1 }}>{c.title}</h3>
              <p style={{ ...rowdies(300), fontSize: "0.9rem", lineHeight: 1.45, color: "#222", margin: 0 }}>{c.copy}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
