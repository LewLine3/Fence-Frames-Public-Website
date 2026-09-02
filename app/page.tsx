import { ModalProvider } from "@/components/ff/modal-provider"
import { SiteNav } from "@/components/ff/site-nav"
import { Hero } from "@/components/ff/hero"
import { FrameIt } from "@/components/ff/frame-it"
import { FenceFolio } from "@/components/ff/fence-folio"
import { FinalCta } from "@/components/ff/final-cta"
import { SiteFooter } from "@/components/ff/site-footer"

export default function HomePage() {
  return (
    <ModalProvider>
      <div id="top">
        <SiteNav />
        <main className="wrap home-main">
          <Hero />
          <FrameIt />
          <FenceFolio />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </ModalProvider>
  )
}
