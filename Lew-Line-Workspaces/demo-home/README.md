# Demo Home — Fence Frames (short daily hub)

**Canonical path (edit here first):**  
`C:\Users\TwoLe\Lew-Line-Workspaces\demo-home\`

**Drive mirror (desktop shortcut often points here):**  
`G:\My Drive\Lew-Line-Workspaces\demo-home\`

After editing on **C:**, copy `index.html`, `pins.json`, and `README.md` to Drive (or re-run the desktop shortcut creator from C:). Drive sync alone can overwrite the wrong copy — prefer C: as source of truth.

## What’s on the page

| Section | Contents |
|---------|----------|
| **Metrics & trackables** | **Ops hub** `:5199/` + Style · Components · HOA · Contractors · Leads (hub demos / Interface slots) |
| **Design** | Configurator · Blueprint · Gate catalog |
| **HOA pitch** | 01–04 Si View packet + layout mocks |
| **Wix site** | Home · County · City · Community (`:5198`) |
| **Cursor pins** | Top 10 from `pins.json` (permanent vs rotating) |

Full old card wall: **`index.full-backup.html`** (do not make this the shortcut target).

## Servers

```powershell
.\start-servers.ps1
```

| Port | Need for |
|------|----------|
| **5199** | Configurator / Blueprint |
| **5198** | Wix prototypes |

## Pins

Edit `pins.json`. Prepend new important docs. Set `"permanent": true` to keep. Non-permanent fall off when over `maxPins` (10).

## Desktop shortcut

```powershell
cd "C:\Users\TwoLe\Lew-Line-Workspaces\demo-home"
.\Create-Desktop-Shortcut.ps1
```

Point **Fence Frames Demos** at the **C:** `index.html` so Drive cannot silently replace your daily hub.

## Browser (layout / public judgment)

Demos open in **Chrome Canary** signed in as **owner@fenceframes.com** (Default profile).  
**Regular Chrome** stays for personal / other accounts. Do not use Edge Dev for FF demos.

1. Run `.\Create-Desktop-Shortcut.ps1` once to refresh desktop shortcuts.
2. In Canary: **Settings → Appearance → Font size = Medium**, zoom **Ctrl+0**.
3. Keep regular Chrome on Large if you want.

Launch helper: `.\open-ff-chrome.ps1 [url]` (also `FenceBook\scripts\open-ff-chrome.ps1`).

**Not Bruno.** Bruno is an API client (like Postman) for testing HTTP APIs — it does not render Demo Home or the configurator.
