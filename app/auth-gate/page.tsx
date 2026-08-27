import { redirect } from "next/navigation"

/** Alias → Phase 1 static Auth Gate shell */
export default function AuthGateAliasPage() {
  redirect("/auth-gate.html")
}
