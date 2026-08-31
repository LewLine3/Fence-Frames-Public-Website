# `CORE-02`: 🔐 Auth & Backcheck Gate Specification

> **Page ID**: `CORE-02`  
> **Route**: `/log-in` & `/sign-up` (`app/log-in/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🔵 Portals & Membership Security (Royal Blue `#3B82F6`)  
> **Status**: 🟠 **In Progress**

---

## 1. Purpose & Business Engine
- **Primary Goal**: Intercepts unauthenticated users when they attempt to save a customized fence configuration, view an unmasked Bill of Materials (BOM), or download an official 8.5x11 ARC Blueprint.
- **The Value-Lock Mechanism**: Protects Fence Frames' proprietary parametric takeoffs and engineering IP. Converts casual design sessions into verified homeowner accounts using frictionless, passwordless SMS OTP authentication.
- **The Single Post-Auth Action**: Upon successful OTP verification, the draft configuration from The Designer is compiled into a permanent **Static Portrait Fence-Folio**, stored in the homeowner's account, and the user is redirected into **`HOME-01` (Homeowner Showcase)**.

---

## 2. Design System & Homepage Theme Alignment
Strictly inherits the homepage aesthetic and design rules:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Modal header (*"LOCK IN YOUR FENCE-FOLIO"*), 6-digit OTP code text, primary submit button.
  - `Rowdies Regular (400)`: Field labels (Full Name, Phone, ZIP), timer readouts, resend links.
  - `Rowdies Light (300)`: Value-lock explanations, privacy pledge, spam-free guarantee.
- **Color Palette & Theme Tokens**:
  - Modal Header & Accent: Royal Blue (`#3B82F6`) with Ember Orange (`#F27A22`) highlights.
  - Background Backdrop: Blurred dark ink veil (`rgba(20, 27, 22, 0.85)` with `backdrop-filter: blur(8px)`) over the drafting grid.
  - Modal Surface: Dark Charcoal Solid (`#242220`) with 2px solid `#141B16` border and 50% outside corner markers.
  - Inputs: Ivory Fill (`#FAF6EE`), solid 2px ink borders, focus ring in Sun Gold (`#E5B842`).
- **Graduated Elements**:
  - Docked Security Explainer Plate at the bottom of the modal reassuring zero spam and contractor privacy.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Modal Container & Header
- **Dismiss / Close Button**: Top-right `✕` (returns user to their unauthenticated session without losing state).
- **Header Lock Icon & Title**: `🔒 SAVE FENCE-FOLIO & UNLOCK BLUEPRINT` (Rowdies 700, 1.4rem).
- **Value Proposition Callout**: "Verify your mobile number to unlock your official 8.5\" x 11\" ARC submittal drawing, itemized BOM, and verified local contractor pricing."

### B. Step 1: Homeowner Information Form
- **Full Name Input**: `placeholder="John Smith"`, required.
- **Email Address Input**: `type="email"`, `placeholder="john@example.com"`, required.
- **Mobile Phone Number Input**: `type="tel"`, `placeholder="(425) 555-0199"`, auto-formats US numbers.
- **Property ZIP Code Input**: `type="text"`, `placeholder="98045"`, 5-digit validation (pre-filled from Designer state if present).
- **CTA Submit Button**: `SEND VERIFICATION CODE →` (Rowdies 700, Ember Orange background, 2px ink border).

### C. Step 2: 6-Digit SMS OTP Verification (Triggered upon Step 1 Submit)
- **Phone Readout & Edit Link**: "Sent 6-digit code to (425) ***-0199 [✏️ Edit]".
- **6 Individual OTP Input Boxes**: Single-digit inputs with auto-focus advance, paste-handling, and backspace retreat.
- **Countdown Resend Timer**: `Resend Code in 0:48` (disables button until timer reaches 0:00).
- **CTA Verification Button**: `VERIFY & COMPILE FENCE-FOLIO ➔` (Rowdies 700, Bright Green `#4ADE80` background).

### D. Partner & Contractor Role Switcher (Footer)
- **B2B Navigation Link**: "Are you a licensed contractor or HOA administrator? **Switch to Partner Portal →**" (Routes to `/partners` or `/admin`).

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - modal:
      title: "🔒 SAVE FENCE-FOLIO & UNLOCK BLUEPRINT"
  - text: "Verify your mobile number to unlock your official 8.5x11 ARC Blueprint & itemized materials takeoff."
  - spacer: { size: "small" }
  - form:
      items:
        - input: { label: "Full Name", placeholder: "John Smith" }
        - input: { label: "Mobile Phone Number", placeholder: "(425) 555-0199" }
        - input: { label: "Property ZIP Code", placeholder: "98045" }
        - button: { label: "SEND 6-DIGIT VERIFICATION CODE →", variant: "primary" }
  - spacer: { size: "small" }
  - alert: { text: "100% Privacy • No Spam Guarantee • Licensed Contractor Verification", type: "success" }
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Trigger Action | Passed Payload |
| :--- | :--- | :--- | :--- |
| **The Designer** | `DSGN-03` | Clicking *"Save Fence-Folio & Get Blueprint"* | Full draft JSON (style, LF, height, stains, gates, BOM) |
| **Master Homepage** | `CORE-01` | Clicking *"Log In / Sign Up"* in Header | `?redirect=/` |
| **Pre-Built Catalog** | `DSGN-02` | Clicking *"Save Pre-Built to My Account"* | Selected pre-built SKU |
| **Portrait Blueprint** | `CORE-03` | Clicking *"Unlock Official PDF"* in guest mode | Blueprint project ID |

### Outbound Links (Destinations):
| Destination Page | Page ID | Trigger Action | Passed State / Result |
| :--- | :--- | :--- | :--- |
| **Homeowner Showcase** | `HOME-01` | Successful OTP Verification | New Fence-Folio ID compiled into user account |
| **Portrait Blueprint** | `CORE-03` | Direct PDF Request post-auth | Unlocks clean unmasked 8.5x11 PDF export |
| **Partner Portal Hub** | `PRO-01` | Clicking *"Switch to Partner Hub"* | Switches session to Pro Auth mode |
| **Global Admin** | `ADM-01` | Admin user login | Redirects to operations dashboard |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the high-converting Auth & Backcheck Gate (CORE-02) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for modal title, OTP boxes, and submit button. Rowdies Regular (400) for input labels and timer. Rowdies Light (300) for value pledge.
- COLOR PALETTE:
  - Header Accent: Royal Blue (#3B82F6) and Ember Orange (#F27A22)
  - Action CTA: Bright Forest Green (#4ADE80) with 2px solid #141B16 border
  - Background Ground: Dark ink modal backdrop (#141B16) with 50% perimeter outside corner markers
  - Inputs: Ivory (#FAF6EE) with solid 2px ink borders and Sun Gold focus ring

### PAGE / MODAL LAYOUT:
1. MODAL HEADER: Title "🔒 SAVE FENCE-FOLIO & UNLOCK BLUEPRINT", close button [✕], and subtext explaining instant access to 8.5x11 architectural blueprint and itemized BOM.
2. STEP 1 (Details Form): Full Name, Email Address, Mobile Phone (auto-formatted), and Property ZIP inputs + Ember Orange "SEND VERIFICATION CODE →" button.
3. STEP 2 (SMS OTP): 6 single-digit square input boxes with autofocus and backspace handling + 60s countdown timer + Bright Green "VERIFY & UNLOCK BLUEPRINT ➔" button.
4. FOOTER: Docked explainer security plate with 1.5px green border + Link to switch to Partner Portal (/partners).

Output full, modern, production-ready React / Tailwind JSX code with interactive state switching.
```
