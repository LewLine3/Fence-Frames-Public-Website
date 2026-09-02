import { redirect } from "next/navigation"

export const metadata = {
  title: "Log In / Sign Up | Fence Frames",
  description: "Sign in or create a Fence Frames account to save designs, export Fence-Folios, and track contractor bids.",
}

/** Single entry for login and registration — handled by the auth gate OTP flow. */
export default function LogInPage() {
  redirect("/auth-gate")
}
