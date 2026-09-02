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
      { href: "/frame", label: "Frame Hub" },
      { href: "/catalog", label: "Catalog" },
      { href: "/designer", label: "Designer" },
      { href: "/wizard", label: "Wizard" },
      { href: "/fence-folio", label: "Fence-Folio" },
    ],
  },
  {
    title: "Auth & Output",
    color: "#3B82F6",
    links: [
      { href: "/auth-gate", label: "Auth Gate" },
      { href: "/log-in", label: "Log In" },
      { href: "/homeowner", label: "Homeowner" },
      { href: "/blueprint", label: "Blueprint" },
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
    title: "Contractors & Admin",
    color: "#F27A22",
    links: [
      { href: "/contractors/projects", label: "Job Board" },
      { href: "/contractors/onboarding", label: "Onboarding" },
      { href: "/contractor/match", label: "SMS Scramble" },
      { href: "/admin", label: "Admin" },
      { href: "/preflight", label: "Preflight (dev)" },
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
