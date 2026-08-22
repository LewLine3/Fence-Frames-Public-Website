"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

type ModalId = "modal-hoa" | "modal-blueprint" | "modal-contractor" | "modal-signin"

type ModalContextValue = {
  openModal: (id: ModalId) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error("useModal must be used within ModalProvider")
  return ctx
}

/* Convenience bridge: open("hoa" | "blueprint" | "contractor" | "signin") */
type ShortId = "hoa" | "blueprint" | "contractor" | "signin"
export function useModals() {
  const { openModal, closeModal } = useModal()
  return {
    open: (id: ShortId) => openModal(`modal-${id}` as ModalId),
    close: closeModal,
  }
}

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ModalId | null>(null)

  const openModal = useCallback((id: ModalId) => setActive(id), [])
  const closeModal = useCallback(() => setActive(null), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <HoaModal active={active === "modal-hoa"} onClose={closeModal} />
      <BlueprintModal active={active === "modal-blueprint"} onClose={closeModal} />
      <ContractorModal active={active === "modal-contractor"} onClose={closeModal} />
      <SignInModal active={active === "modal-signin"} onClose={closeModal} />
    </ModalContext.Provider>
  )
}

function Backdrop({
  active,
  onClose,
  children,
}: {
  active: boolean
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div
      className={`ff-modal-backdrop${active ? " active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  )
}

function HoaModal({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [details, setDetails] = useState(
    "Active Profile: Si View HOA (North Bend, WA) · Max 6ft height · Western Red Cedar · ARC Form Checklist included in Fence-Folio.",
  )
  const communities: [string, string, string][] = [
    ["Si View (North Bend, WA)", "6 FT Cedar", "Natural/Semi-transparent"],
    ["Snoqualmie Ridge (Snoqualmie)", "6 FT Privacy / 4 FT Raked", "Cedar Gold / Tan"],
    ["Issaquah Highlands (Issaquah)", "6 FT Board-on-Board", "Clear Oil / Amber"],
    ["Meridian Heights (Kent)", "6 FT Framed Cedar Screen", "Redwood / Natural"],
  ]
  return (
    <Backdrop active={active} onClose={onClose}>
      <div className="ff-modal-box has-outside-corners">
        <span className="corner-mark-out tl c-gold" />
        <span className="corner-mark-out br c-forest" />
        <div className="ff-modal-header">
          <h3 style={{ ...rowdies(700), fontSize: "1.2rem", color: "var(--gold)" }}>
            Washington HOA Bylaw Directory (140+ Communities)
          </h3>
          <button className="ff-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="ff-modal-body">
          <p style={{ ...rowdies(300), fontSize: "0.9rem", marginBottom: "1rem" }}>
            Select your verified community or enter a ZIP code to load exact ARC height limits, picket spacing rules,
            and pre-approved stain formulas:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.2rem" }}>
            {communities.map(([name, height, stain]) => (
              <button
                key={name}
                className="ff-btn btn-forest"
                style={{ textAlign: "left", justifyContent: "flex-start", padding: "0.6rem" }}
                onClick={() =>
                  setDetails(`Selected: ${name} · ${height} · Stain: ${stain} · ARC Form auto-filled.`)
                }
              >
                {name.split(" (")[0]}
              </button>
            ))}
          </div>
          <div
            style={{
              background: "#E8DCC8",
              border: "1.5px solid var(--ink)",
              borderRadius: "var(--radius)",
              padding: "1rem",
              fontSize: "0.88rem",
              ...rowdies(300),
            }}
          >
            {details}
          </div>
          <div style={{ marginTop: "1.2rem", textAlign: "right" }}>
            <button className="ff-btn btn-gold btn-ticket" onClick={onClose}>
              Confirm &amp; Load Rules
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}

function BlueprintModal({ active, onClose }: { active: boolean; onClose: () => void }) {
  return (
    <Backdrop active={active} onClose={onClose}>
      <div className="ff-modal-box has-outside-corners" style={{ maxWidth: "760px" }}>
        <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
        <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />
        <div className="ff-modal-header">
          <h3 style={{ ...rowdies(700), fontSize: "1.2rem", color: "var(--gold)" }}>
            Architectural Blueprint Sheet (ARC Ready · 1:24 Scale)
          </h3>
          <button className="ff-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="ff-modal-body">
          <div
            style={{
              background: "#FAF6EE",
              border: "2px solid var(--ink)",
              borderRadius: "var(--radius)",
              padding: "1.2rem",
              marginBottom: "1rem",
              position: "relative",
              backgroundImage:
                "linear-gradient(rgba(22,67,45,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(22,67,45,0.2) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <svg width="100%" height="220" viewBox="0 0 500 200">
              <rect x="5" y="5" width="490" height="190" fill="none" stroke="#1A1A1A" strokeWidth="2" />
              <rect x="340" y="145" width="155" height="50" fill="#FAF6EE" stroke="#1A1A1A" strokeWidth="1.5" />
              <text x="350" y="162" fontFamily="'Rowdies',sans-serif" fontSize="10" fill="#16432D">
                FENCE FRAMES MASTER SPEC
              </text>
              <text x="350" y="176" fontFamily="'Rowdies',sans-serif" fontSize="8" fill="#1A1A1A">
                SHEET: A-101 (ELEVATION)
              </text>
              <text x="350" y="188" fontFamily="'Rowdies',sans-serif" fontSize="8" fill="#1A1A1A">
                SCALE: 1:24 (1/2&quot; = 1&apos;-0&quot;)
              </text>
              <rect x="40" y="30" width="16" height="130" fill="#9E8A68" stroke="#1A1A1A" strokeWidth="1.5" />
              <rect x="200" y="30" width="16" height="130" fill="#9E8A68" stroke="#1A1A1A" strokeWidth="1.5" />
              <rect x="360" y="30" width="16" height="130" fill="#9E8A68" stroke="#1A1A1A" strokeWidth="1.5" />
              <rect x="40" y="45" width="336" height="10" fill="#C4B294" stroke="#1A1A1A" strokeWidth="1.2" />
              <rect x="40" y="90" width="336" height="10" fill="#C4B294" stroke="#1A1A1A" strokeWidth="1.2" />
              <rect x="40" y="135" width="336" height="10" fill="#C4B294" stroke="#1A1A1A" strokeWidth="1.2" />
              <line x1="56" y1="175" x2="200" y2="175" stroke="#C2622D" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="128" y="170" fontFamily="'Rowdies',sans-serif" fontSize="10" fill="#C2622D" textAnchor="middle">
                8&apos;-0&quot; O.C. SPAN
              </text>
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ ...rowdies(700), fontSize: "0.85rem", color: "var(--forest-deep)" }}>
              Includes Materials Takeoff + Fastener Schedule
            </span>
            <button
              className="ff-btn btn-forest btn-chamfer"
              onClick={() => {
                alert("Downloading ARC Architectural Blueprint Sheet (PDF)...")
                onClose()
              }}
            >
              Download PDF Package &darr;
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}

function ContractorModal({ active, onClose }: { active: boolean; onClose: () => void }) {
  const seats: [string, string][] = [
    ["1. Cascade Fence & Deck LLC", "Licensed WA · 48 Projects in King County · ARC Certified"],
    ["2. Snoqualmie Valley Craftsmen", "Licensed WA · Red Cedar Specialist · 5.0 Rating"],
    ["3. Eastside Perimeter Pros", "Licensed WA · Steel & Cedar Systems · ARC Ready"],
  ]
  return (
    <Backdrop active={active} onClose={onClose}>
      <div className="ff-modal-box has-outside-corners">
        <span className="corner-mark-out tl c-orange" />
        <span className="corner-mark-out br c-gold" />
        <div className="ff-modal-header">
          <h3 style={{ ...rowdies(700), fontSize: "1.2rem", color: "var(--gold)" }}>
            Capped 3-Seat Contractor Dispatch
          </h3>
          <button className="ff-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="ff-modal-body">
          <p style={{ ...rowdies(300), fontSize: "0.88rem", marginBottom: "1rem" }}>
            Your fence blueprint and takeoff quantities are dispatched to exactly 3 vetted local builders. Bids lock
            within 72 hours with transparent ±15% ledger guarantees:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem" }}>
            {seats.map(([name, meta], i) => (
              <div
                key={name}
                style={{
                  background: "#FAF6EE",
                  border: "1.5px solid var(--ink)",
                  borderRadius: "var(--radius)",
                  padding: "0.8rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.8rem",
                }}
              >
                <div>
                  <strong style={rowdies(700)}>{name}</strong>
                  <div style={{ ...rowdies(300), fontSize: "0.78rem", color: "var(--forest-deep)" }}>{meta}</div>
                </div>
                <span className="seat-badge" style={rowdies(400)}>
                  Seat {i + 1} · Verified
                </span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              className="ff-btn btn-ember btn-lip"
              onClick={() => {
                alert("Takeoff dispatched to 3 vetted builders. 72h timer active.")
                onClose()
              }}
            >
              Dispatch 3 Bids (Free) &rarr;
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}

function SignInModal({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [accountType, setAccountType] = useState<"Homeowner" | "Contractor" | "HOA Board">("Homeowner")
  const types: ("Homeowner" | "Contractor" | "HOA Board")[] = ["Homeowner", "Contractor", "HOA Board"]
  return (
    <Backdrop active={active} onClose={onClose}>
      <div className="ff-modal-box has-outside-corners" style={{ maxWidth: "440px" }}>
        <span className="corner-mark-out tl c-gold" />
        <span className="corner-mark-out br c-forest" />
        <div className="ff-modal-header">
          <h3 style={{ ...rowdies(700), fontSize: "1.15rem", color: "var(--gold)" }}>Sign In to Fence Frames</h3>
          <button className="ff-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="ff-modal-body">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <div>
              <label style={{ ...rowdies(700), fontSize: "0.82rem" }}>Account Type:</label>
              <div className="btn-dual-wrap" style={{ width: "100%", marginTop: "0.3rem" }}>
                {types.map((t) => (
                  <button
                    key={t}
                    style={{
                      flex: 1,
                      background: accountType === t ? "var(--forest-deep)" : "#FAF6EE",
                      color: accountType === t ? "#FAF6EE" : "var(--ink)",
                    }}
                    onClick={() => setAccountType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ ...rowdies(700), fontSize: "0.82rem" }}>Email Address:</label>
              <input
                type="email"
                placeholder="name@domain.com"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1.5px solid var(--ink)",
                  borderRadius: "var(--radius)",
                  marginTop: "0.3rem",
                  fontFamily: "'Rowdies', sans-serif",
                }}
              />
            </div>
            <button
              className="ff-btn btn-gold btn-ticket"
              style={{ width: "100%", marginTop: "0.5rem" }}
              onClick={onClose}
            >
              Access Dashboard &rarr;
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}
