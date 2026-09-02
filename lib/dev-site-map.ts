/** Temporary build-phase sitemap — every routable page for footer navigation. */

export type DevSiteLink = {
  href: string
  label: string
}

export type DevSiteSection = {
  title: string
  color: string
  links: DevSiteLink[]
}

export const DEV_SITE_MAP: DevSiteSection[] = [
  {
    title: "Core & Design",
    color: "#E5B842",
    links: [
      { href: "/", label: "Home" },
      { href: "/frame", label: "Frame Foundry" },
      { href: "/catalog", label: "Catalog" },
      { href: "/designer", label: "Designer" },
      { href: "/wizard", label: "Wizard" },
      { href: "/fence-folio", label: "Fence-Folio" },
    ],
  },
  {
    title: "Account",
    color: "#4ADE80",
    links: [
      { href: "/log-in", label: "Log In / Sign Up" },
      { href: "/fence-folio", label: "Fence-Folio" },
      { href: "/blueprint", label: "Blueprints" },
      { href: "/ledger", label: "Ledgers" },
      { href: "/material-list", label: "Material Lists" },
    ],
  },
  {
    title: "Geo & Local",
    color: "#4ADE80",
    links: [
      { href: "/wa", label: "WA Directory" },
      { href: "/wa/king-county", label: "King County" },
      { href: "/wa/king-county/north-bend", label: "North Bend" },
      { href: "/wa/king-county/north-bend/si-view", label: "Si View" },
    ],
  },
  {
    title: "Legal",
    color: "#94A3B8",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
]
