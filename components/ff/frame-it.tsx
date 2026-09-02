const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

type ShoppingCard = {
  href: string
  ribbon: string
  imgBg: string
  img: string
  imgFit: "cover" | "contain"
  imgBordered?: boolean
  bodyBgImage: string
  tag: string
  tagColor: string
  title: string
  titleColor: string
  copy: string
  cornerA: string
  cornerB: string
}

const cards: ShoppingCard[] = [
  {
    href: "/catalog",
    ribbon: "Browse Styles",
    imgBg: "var(--forest-bright)",
    img: "/images/user-uploads/media_1787002208257.png",
    imgFit: "cover",
    bodyBgImage:
      "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/homepage/card-bg-dark-wood-vertical.jpg')",
    tag: "⚡ FASTEST OPTION",
    tagColor: "var(--gold-sun)",
    title: "Catalog",
    titleColor: "#E5B842",
    copy: "Start from a preset fence line you love, then open it in the designer and make it yours.",
    cornerA: "tl c-forest",
    cornerB: "br c-gold",
  },
  {
    href: "/designer",
    ribbon: "Build Freely",
    imgBg: "var(--ink)",
    img: "/images/user-uploads/media_1787002299587.png",
    imgFit: "contain",
    imgBordered: true,
    bodyBgImage:
      "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/images/homepage/card-bg-wood-horizontal.jpg')",
    tag: "🎨 LIVE 3D CANVAS",
    tagColor: "var(--ember)",
    title: "Designer",
    titleColor: "#F27A22",
    copy: "Open the live canvas and customize materials, styles, and features with real-time cost as you go.",
    cornerA: "tl c-gold",
    cornerB: "br c-orange",
  },
  {
    href: "/wizard",
    ribbon: "Guided Details",
    imgBg: "var(--ink)",
    img: "/images/tool-wizard-guided.jpg",
    imgFit: "cover",
    bodyBgImage:
      "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/homepage/card-bg-dark-wood-vertical.jpg')",
    tag: "📝 STEP-BY-STEP",
    tagColor: "#FAF6EE",
    title: "Wizard",
    titleColor: "#E5B842",
    copy: "Not sure what caps go with what rails? Let our wizard ask you simple questions to build your spec.",
    cornerA: "tl c-forest",
    cornerB: "br c-gold",
  },
]

export function FrameIt() {
  return (
    <section className="step-section home-section" id="frame-pillar">
      {/* Containerized banner — aligned with hero / wrap edges */}
      <div
        className="has-outside-corners frame-it-banner-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          border: "2.5px solid var(--ink)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.14)",
          minHeight: 220,
        }}
      >
        <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
        <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

        <div
          style={{
            backgroundColor: "#26150D",
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(242,122,34,0.18) 0px, rgba(242,122,34,0.18) 2px, transparent 2px, transparent 14px)",
            padding: "2rem 2.4rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: "2.5px solid var(--ink)",
          }}
        >
          <h2
            style={{
              ...rowdies(700),
              fontSize: "2.2rem",
              color: "#F27A22",
              marginBottom: "0.4rem",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
            }}
          >
            Frame it.
          </h2>
          <p style={{ ...rowdies(300), fontSize: "0.95rem", lineHeight: 1.45, color: "#FAF6EE", margin: 0 }}>
            Our free design tools let you customize your fence while showing real-time cost for every material, style,
            and feature you choose &mdash; surfacing design options, community guidelines, and structural details you
            likely hadn&rsquo;t considered.
          </p>
        </div>

        <div
          style={{
            background: "#0E281B",
            position: "relative",
            minHeight: 200,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/homepage/frame-it-banner-fence-digital-twin.jpg"
            alt="Frame It — physical fence transitioning to holographic blueprint"
            style={{
              position: "absolute",
              inset: 0,
              width: "115%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "left center",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* 3 shopping mode cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.25rem",
          marginTop: "1.25rem",
        }}
      >
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
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              backgroundColor: "#1C140E",
              backgroundImage: c.bodyBgImage,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <span className={`corner-mark-out ${c.cornerA}`} style={{ zIndex: 2 }} />
            <span className={`corner-mark-out ${c.cornerB}`} style={{ zIndex: 2 }} />

            <div
              style={{
                background: "var(--gold-sun)",
                color: "var(--ink)",
                padding: "0.6rem 1rem",
                borderBottom: "2.5px solid var(--ink)",
                ...rowdies(700),
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              <span>{c.ribbon}</span>
            </div>

            <div
              style={{
                height: 220,
                background: c.imgBg,
                borderBottom: "2.5px solid var(--ink)",
                position: "relative",
                overflow: "hidden",
                padding: c.imgBordered ? "0.6rem" : undefined,
              }}
            >
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
              <span
                style={{
                  display: "inline-block",
                  ...rowdies(700),
                  fontSize: "0.72rem",
                  background: "var(--ink)",
                  color: c.tagColor,
                  padding: "0.3rem 0.6rem",
                  borderRadius: 3,
                  alignSelf: "flex-start",
                  marginBottom: "0.6rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  letterSpacing: "0.04em",
                }}
              >
                {c.tag}
              </span>
              <h3
                style={{
                  ...rowdies(700),
                  fontSize: "1.5rem",
                  color: c.titleColor,
                  marginBottom: "0.4rem",
                  lineHeight: 1.1,
                }}
              >
                {c.title}
              </h3>
              <p style={{ ...rowdies(300), fontSize: "0.88rem", lineHeight: 1.45, color: "#FAF6EE", margin: 0 }}>
                {c.copy}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
