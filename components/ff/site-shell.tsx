"use client"

import type { ReactNode } from "react"
import { SiteNav } from "@/components/ff/site-nav"
import { SiteFooter } from "@/components/ff/site-footer"
import styles from "./site-shell.module.css"

export type SiteShellWidth =
  | "catalog"
  | "hub"
  | "wizard"
  | "auth"
  | "dashboard"
  | "folio"
  | "form"
  | "legal"
  | "document"

const WIDTH_CLASS: Record<SiteShellWidth, string> = {
  catalog: styles.widthCatalog,
  hub: styles.widthHub,
  wizard: styles.widthWizard,
  auth: styles.widthAuth,
  dashboard: styles.widthDashboard,
  folio: styles.widthFolio,
  form: styles.widthForm,
  legal: styles.widthLegal,
  document: styles.widthDocument,
}

export interface SiteShellProps {
  children: ReactNode
  /** Max-width preset for the centered content column */
  width?: SiteShellWidth
  /** Full-width slot above main (toolbar, welcome banner) — still edge-guttered */
  bleed?: ReactNode
  /** Match bleed slot max-width to main column */
  bleedWidth?: SiteShellWidth
  /** Wrap page body in bordered green-print canvas panel */
  contained?: boolean
  /** Hide nav/footer when printing */
  printHideChrome?: boolean
  className?: string
  mainClassName?: string
}

export function SiteShell({
  children,
  width = "catalog",
  bleed,
  bleedWidth,
  contained = true,
  printHideChrome = false,
  className,
  mainClassName,
}: SiteShellProps) {
  const widthClass = WIDTH_CLASS[width]
  const bleedWidthClass = WIDTH_CLASS[bleedWidth ?? width]
  const chromeClass = printHideChrome ? styles.printHidden : undefined

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div className={chromeClass}>
        <SiteNav />
      </div>

      {bleed ? (
        <div className={styles.bleedGutter}>
          <div className={[styles.bleedInner, bleedWidthClass].join(" ")}>{bleed}</div>
        </div>
      ) : null}

      <div className={styles.pageGutter}>
        <main className={[styles.main, widthClass, mainClassName].filter(Boolean).join(" ")}>
          {contained ? <div className={styles.canvas}>{children}</div> : children}
        </main>
      </div>

      <div className={chromeClass}>
        <SiteFooter />
      </div>
    </div>
  )
}
