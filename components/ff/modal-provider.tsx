"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { ACCOUNT_ROLE_LIST, type AccountRoleKey } from "@/lib/account-roles"

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
            Fence-Folio Preview · Visual · Material · Labor
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
            <svg width="100%" height="220" viewBox="0 0 500 200" aria-label="Visual Blueprint preview">
              <rect x="5" y="5" width="490" height="190" fill="none" stroke="#1A1A1A" strokeWidth="2" />
              <rect x="340" y="145" width="155" height="50" fill="#FAF6EE" stroke="#1A1A1A" strokeWidth="1.5" />
              <text x="350" y="162" fontFamily="'Rowdies',sans-serif" fontSize="10" fill="#16432D">
                FENCE-FOLIO · VISUAL
              </text>
              <text x="350" y="176" fontFamily="'Rowdies',sans-serif" fontSize="8" fill="#1A1A1A">
                FRONT &amp; BACK LOOK
              </text>
              <text x="350" y="188" fontFamily="'Rowdies',sans-serif" fontSize="8" fill="#1A1A1A">
                + MATERIAL · LABOR · TOTAL
              </text>
              <rect x="40" y="30" width="16" height="130" fill="#9E8A68" stroke="#1A1A1A" strokeWidth="1.5" />
              <rect x="200" y="30" width="16" height="130" fill="#9E8A68" stroke="#1A1A1A" strokeWidth="1.5" />
              <rect x="360" y="30" width="16" height="130" fill="#9E8A68" stroke="#1A1A1A" strokeWidth="1.5" />
              <rect x="40" y="45" width="336" height="10" fill="#C4B294" stroke="#1A1A1A" strokeWidth="1.2" />
              <rect x="40" y="90" width="336" height="10" fill="#C4B294" stroke="#1A1A1A" strokeWidth="1.2" />
              <rect x="40" y="135" width="336" height="10" fill="#C4B294" stroke="#1A1A1A" strokeWidth="1.2" />
              <line x1="56" y1="175" x2="200" y2="175" stroke="#C2622D" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="128" y="170" fontFamily="'Rowdies',sans-serif" fontSize="10" fill="#C2622D" textAnchor="middle">
                8&apos;-0&quot; POST SPAN
              </text>
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ ...rowdies(700), fontSize: "0.85rem", color: "var(--forest-deep)" }}>
              Includes Visual Blueprint, Material Cost &amp; Labor Estimate
            </span>
            <a
              className="ff-btn btn-forest btn-chamfer"
              href="/blueprint"
              style={{ textDecoration: "none" }}
              onClick={onClose}
            >
              Open Fence-Folio →
            </a>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}

function ContractorModal({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [zip, setZip] = useState('98045')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedProject, setSubmittedProject] = useState<{ id: string; quote: any } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !email) {
      setError('Please provide your name, phone, and email.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      let config: any = null
      const rawDraft = typeof window !== 'undefined' ? (sessionStorage.getItem('ff_active_draft') || sessionStorage.getItem('ff-locked-draft')) : null
      if (rawDraft) {
        const parsed = JSON.parse(rawDraft)
        config = parsed.config || parsed
      }

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeownerName: name,
          homeownerPhone: phone,
          homeownerEmail: email,
          streetAddress: address || 'Address provided on consultation',
          city: 'North Bend',
          county: 'King County',
          zipCode: zip || '98045',
          linearFeet: config?.linearFeet || 120,
          terrain: config?.terrain || 'flat',
          config: config || {},
          communitySlug: 'si-view',
        }),
      })

      const data = await res.json()
      if (data?.success) {
        setSubmittedProject({ id: data.projectId, quote: data.quote })
      } else {
        setError(data?.error || 'Failed to dispatch project')
      }
    } catch (err: any) {
      setError(err?.message || 'Error connecting to service')
    } finally {
      setIsSubmitting(false)
    }
  }

  const seats: [string, string][] = [
    ["1. Cascade Fence & Deck LLC", "Licensed WA · 48 Projects in King County · ARC Certified"],
    ["2. Snoqualmie Valley Craftsmen", "Licensed WA · Red Cedar Specialist · 5.0 Rating"],
    ["3. Eastside Perimeter Pros", "Licensed WA · Steel & Cedar Systems · ARC Ready"],
  ]

  return (
    <Backdrop active={active} onClose={onClose}>
      <div className="ff-modal-box has-outside-corners" style={{ maxWidth: '520px' }}>
        <span className="corner-mark-out tl c-orange" />
        <span className="corner-mark-out br c-gold" />
        <div className="ff-modal-header">
          <h3 style={{ ...rowdies(700), fontSize: "1.2rem", color: "var(--gold)" }}>
            {submittedProject ? '⚡ Lead Dispatched to Marketplace' : 'Capped 3-Seat Contractor Dispatch'}
          </h3>
          <button className="ff-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="ff-modal-body">
          {submittedProject ? (
            <div className="space-y-4">
              <div className="bg-[#0E2417] p-4 rounded border-2 border-[#4ADE80] text-sm text-[#FAF6EE]">
                <div className="font-bold text-[#4ADE80] text-base mb-1">✓ Your Blueprint Has Been Dispatched!</div>
                <p className="text-xs text-[#DBD0BD] mb-2">
                  Project ID: <strong className="font-mono text-white">#{submittedProject.id.slice(0, 8)}</strong>
                </p>
                <div className="text-xs space-y-1">
                  <div><strong>Honest Estimate:</strong> ${submittedProject.quote?.totalMin?.toLocaleString()} – ${submittedProject.quote?.totalMax?.toLocaleString()} (±15%)</div>
                  <div><strong>Status:</strong> Up to 3 vetted local contractors will review your takeoff within 72 hours.</div>
                </div>
              </div>
              <div className="text-right">
                <a
                  href="/contractors/projects"
                  className="ff-btn btn-ember btn-lip inline-block"
                  onClick={onClose}
                >
                  View Marketplace Feed &rarr;
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ ...rowdies(300), fontSize: "0.85rem", marginBottom: "0.8rem", color: "#3D2B1F" }}>
                Your Fence-Folio (blueprint, material takeoff, and labor estimate) goes to exactly 3 vetted local builders in King County:
              </p>

              {/* Verified Builders */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                {seats.map(([name, meta], i) => (
                  <div
                    key={name}
                    style={{
                      background: "#FAF6EE",
                      border: "1.5px solid var(--ink)",
                      borderRadius: "var(--radius)",
                      padding: "0.6rem 0.8rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <div>
                      <strong style={{ ...rowdies(700), fontSize: "0.82rem" }}>{name}</strong>
                      <div style={{ ...rowdies(300), fontSize: "0.72rem", color: "var(--forest-deep)" }}>{meta}</div>
                    </div>
                    <span className="seat-badge" style={{ ...rowdies(400), fontSize: "0.7rem" }}>
                      Seat {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact Fields */}
              <div className="space-y-2 mb-4 text-xs" style={{ ...rowdies(400) }}>
                <div>
                  <label className="block text-[#1C0F08] font-bold mb-0.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full p-2 border border-[#141B16] rounded bg-white text-[#141B16]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#1C0F08] font-bold mb-0.5">Mobile Phone (for bids) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(425) 555-0192"
                      className="w-full p-2 border border-[#141B16] rounded bg-white text-[#141B16]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1C0F08] font-bold mb-0.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full p-2 border border-[#141B16] rounded bg-white text-[#141B16]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[#1C0F08] font-bold mb-0.5">Property Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="1420 Mt Si Blvd"
                      className="w-full p-2 border border-[#141B16] rounded bg-white text-[#141B16]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1C0F08] font-bold mb-0.5">ZIP Code</label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="98045"
                      className="w-full p-2 border border-[#141B16] rounded bg-white text-[#141B16]"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-xs font-bold mb-2">
                  ⚠️ {error}
                </div>
              )}

              <div style={{ textAlign: "right" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ff-btn btn-ember btn-lip"
                  style={{ cursor: isSubmitting ? 'wait' : 'pointer' }}
                >
                  {isSubmitting ? 'Dispatching...' : 'Dispatch 3 Bids (Free) →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Backdrop>
  )
}

function SignInModal({ active, onClose }: { active: boolean; onClose: () => void }) {
  const [accountType, setAccountType] = useState<AccountRoleKey>("founder")
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
              <div className="btn-dual-wrap" style={{ width: "100%", marginTop: "0.3rem", flexWrap: "wrap" }}>
                {ACCOUNT_ROLE_LIST.map((role) => (
                  <button
                    key={role.key}
                    style={{
                      flex: "1 1 100%",
                      background: accountType === role.key ? "var(--forest-deep)" : "#FAF6EE",
                      color: accountType === role.key ? "#FAF6EE" : "var(--ink)",
                      fontSize: "0.72rem",
                      padding: "0.45rem 0.35rem",
                    }}
                    onClick={() => setAccountType(role.key)}
                  >
                    {role.labelWithClarifier}
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
