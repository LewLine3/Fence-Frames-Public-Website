import { redirect } from "next/navigation"

/** Phase 1 HTML-first: Auth Gate ships as static shell. Phase 2 mounts React into data-interactive-target. */
export default function LogInPage() {
  redirect("/auth-gate.html")
}
