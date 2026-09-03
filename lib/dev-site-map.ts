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
    title: "Core & Account",
    color: "#E5B842",
    links: [
      { href: "/", label: "Home" },
      { href: "/log-in", label: "Log In / Sign Up" },
      { href: "/homeowner", label: "My Folios" },
      { href: "/blueprint", label: "Fence-Folio" },
    ],
  },
  {
    title: "Design",
    color: "#F27A22",
    links: [
      { href: "/frame", label: "Frame Foundry" },
      { href: "/catalog", label: "Catalog" },
      { href: "/designer", label: "Designer" },
      { href: "/wizard", label: "Wizard" },
    ],
  },
  {
    title: "Location",
    color: "#4ADE80",
    links: [
      { href: "/wa", label: "State Directory" },
      { href: "/wa/king-county", label: "County Selection" },
      { href: "/wa/king-county/north-bend", label: "City Code Compliancy" },
      { href: "/wa/king-county/north-bend/si-view", label: "Community / HOA Bylaws" },
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
