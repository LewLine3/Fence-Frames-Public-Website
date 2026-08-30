/**
 * Fence Frames — universal HTML site header (ELEM-01)
 * Self-contained: injects CSS + markup so Tailwind-only HTML pages still match React.
 * Mount: <div id="ff-universal-header"></div><script src="/js/ff-site-header.js" defer></script>
 */
(function () {
  var CSS =
    "#ff-site-header-root, #ff-site-header-root * { box-sizing: border-box; }" +
    "#ff-site-header-root {" +
    "  --ff-gold: #E5B842; --ff-ember: #F27A22; --ff-forest: #4ADE80; --ff-ink: #141B16;" +
    "  --ff-nav-mid: #1a3d2a; --ff-nav: #0f281c; --ff-nav-edge: #0a1a12;" +
    "  font-family: 'Rowdies', sans-serif;" +
    "}" +
    "#ff-site-header-root header.ff-nav {" +
    "  position: sticky; top: 0; z-index: 50;" +
    "  background: linear-gradient(165deg, var(--ff-nav-mid) 0%, var(--ff-nav) 55%, var(--ff-nav-edge) 100%);" +
    "  border-bottom: none; overflow: visible;" +
    "  box-shadow: 0 4px 20px rgba(0,0,0,0.25);" +
    "}" +
    "#ff-site-header-root header.ff-nav::before {" +
    "  content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 0;" +
    "  background-image: linear-gradient(rgba(196,173,152,0.1) 1px, transparent 1px)," +
    "    linear-gradient(90deg, rgba(196,173,152,0.1) 1px, transparent 1px);" +
    "  background-size: 20px 20px;" +
    "}" +
    "#ff-site-header-root header.ff-nav::after {" +
    "  content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 5px;" +
    "  pointer-events: none; z-index: 2;" +
    "  background: linear-gradient(to bottom, #000 0, #000 1px, var(--ff-ember) 1px, var(--ff-ember) 4px, #000 4px, #000 5px);" +
    "}" +
    "#ff-site-header-root .ff-nav-inner {" +
    "  position: relative; z-index: 1; max-width: 1440px; margin: 0 auto; padding: 0 1rem;" +
    "  display: flex; align-items: center; justify-content: space-between; min-height: 68px; gap: 12px;" +
    "}" +
    "#ff-site-header-root .ff-nav-left { display: flex; align-items: center; gap: 16px; flex: none; }" +
    "#ff-site-header-root .ff-brand {" +
    "  position: relative; display: flex; align-items: center; gap: 10px; flex: none;" +
    "  height: 100%; min-height: 68px; padding: 0 18px 0 4px; text-decoration: none;" +
    "}" +
    "#ff-site-header-root .ff-brand::before {" +
    "  content: ''; position: absolute; top: 0; bottom: 5px; right: 0; left: -100vw;" +
    "  background-color: #0a0a0a;" +
    "  background-image: linear-gradient(180deg, rgba(0,0,0,0.12), transparent 45%, rgba(0,0,0,0.22))," +
    "    url('/images/graduated/backgrounds/trial-black-sand.png');" +
    "  background-size: auto, 280px auto; background-position: center, center right; background-repeat: no-repeat, repeat;" +
    "  border-right: 3px solid var(--ff-ember); z-index: 0;" +
    "  box-shadow: inset -1px 0 0 #000, 1px 0 0 0 #000, 5px 0 0 rgba(0,0,0,0.18);" +
    "}" +
    "#ff-site-header-root .ff-brand > * { position: relative; z-index: 1; }" +
    "#ff-site-header-root .ff-brand-name { font-size: 22px; font-weight: 700; letter-spacing: 0.01em; white-space: nowrap; }" +
    "#ff-site-header-root .ff-pillars { display: flex; align-items: center; gap: 8px; }" +
    "@media (max-width: 640px) { #ff-site-header-root .ff-pillars { display: none; } }" +
    "#ff-site-header-root .ff-pillar {" +
    "  background: #141B16; border: 2px solid; border-radius: 4px; padding: 6px 12px;" +
    "  box-shadow: 2px 2px 0 #000; display: inline-flex; align-items: center; gap: 6px;" +
    "  text-decoration: none; font-family: 'Rowdies', sans-serif; cursor: pointer;" +
    "}" +
    "#ff-site-header-root .ff-pillar-find { border-color: var(--ff-gold); color: var(--ff-gold); }" +
    "#ff-site-header-root .ff-pillar-frame { border-color: var(--ff-ember); color: var(--ff-ember); }" +
    "#ff-site-header-root .ff-pillar-fence { border-color: var(--ff-forest); color: var(--ff-forest); }" +
    "#ff-site-header-root .ff-pillar-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }" +
    "#ff-site-header-root .ff-pillar-label { font-size: 13px; font-weight: 700; }" +
    "#ff-site-header-root .ff-pillar-sub { font-size: 11px; opacity: 0.7; font-weight: 400; }" +
    "#ff-site-header-root .ff-nav-end { display: flex; align-items: center; gap: 10px; }" +
    "#ff-site-header-root .ff-accounts { position: relative; }" +
    "#ff-site-header-root .ff-accounts-btn {" +
    "  background: #141B16; border: 2px solid var(--ff-gold); color: var(--ff-gold);" +
    "  border-radius: 4px; padding: 7px 14px; font-family: 'Rowdies', sans-serif;" +
    "  font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;" +
    "  box-shadow: 2px 2px 0 #000;" +
    "}" +
    "#ff-site-header-root .ff-accounts-btn:hover { background: #1f2e23; }" +
    "#ff-site-header-root .ff-accounts-menu {" +
    "  display: none; position: absolute; top: calc(100% + 6px); right: 0; min-width: 260px;" +
    "  background: #141B16; border: 2px solid var(--ff-gold); border-radius: 6px;" +
    "  box-shadow: 0 10px 30px rgba(0,0,0,0.6); z-index: 100; padding: 6px; flex-direction: column; gap: 2px;" +
    "}" +
    "#ff-site-header-root .ff-accounts-menu.open, #ff-site-header-root .ff-accounts-menu.is-open { display: flex; }" +
    "#ff-site-header-root .ff-account-item {" +
    "  display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 4px;" +
    "  text-decoration: none; color: #FAF6EE; transition: background 0.15s ease;" +
    "}" +
    "#ff-site-header-root .ff-account-item:hover { background: rgba(229,184,66,0.12); }" +
    "#ff-site-header-root .ff-account-title { font-size: 12px; font-weight: 700; display: block; }" +
    "#ff-site-header-root .ff-account-sub { font-size: 10px; color: rgba(250,246,238,0.6); font-family: sans-serif; display: block; }" +
    "#ff-site-header-root .ff-new-build {" +
    "  background: var(--ff-ember); color: #FAF6EE; border: 2px solid #000;" +
    "  border-radius: 4px; padding: 7px 16px; font-family: 'Rowdies', sans-serif;" +
    "  font-size: 13px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center;" +
    "  box-shadow: 2px 2px 0 #000; transition: transform 0.1s ease;" +
    "}" +
    "#ff-site-header-root .ff-new-build:hover { transform: translateY(-1px); }" +
    "#ff-site-header-root .ff-corner-chamfer {" +
    "  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);" +
    "}"

  var HTML =
    '<div id="ff-site-header-root">' +
    '<header class="ff-nav">' +
    '  <div class="ff-nav-inner">' +
    '    <div class="ff-nav-left">' +
    '      <a class="ff-brand" href="/" aria-label="Fence Frames home">' +
    '        <img src="/images/fence-frames-logo-icon.svg" alt="" width="46" height="46" style="width:46px;height:46px;object-fit:contain;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.6));flex-shrink:0;" />' +
    '        <span class="ff-brand-name"><span style="color:#4ADE80;">Fence</span>&nbsp;<span style="color:#E5B842;">Frames</span></span>' +
    "      </a>" +
    '      <nav class="ff-pillars" aria-label="Three pillars">' +
    '        <a href="/geo-city.html" class="ff-pillar ff-pillar-find" title="Step 1 · Code & HOA Matcher">' +
    '          <span class="ff-pillar-dot"></span><span class="ff-pillar-label">Find It</span><span class="ff-pillar-sub">(Location)</span>' +
    "        </a>" +
    '        <a href="/catalog-hub.html" class="ff-pillar ff-pillar-frame" title="Step 2 · Catalog & Designer">' +
    '          <span class="ff-pillar-dot"></span><span class="ff-pillar-label">Frame It</span><span class="ff-pillar-sub">(Design)</span>' +
    "        </a>" +
    '        <a href="/blueprint" class="ff-pillar ff-pillar-fence" title="Step 3 · Blueprints & Takeoff">' +
    '          <span class="ff-pillar-dot"></span><span class="ff-pillar-label">Fence It</span><span class="ff-pillar-sub">(Build)</span>' +
    "        </a>" +
    "      </nav>" +
    "    </div>" +
    '    <div class="ff-nav-end">' +
    '      <div class="ff-accounts">' +
    '        <button type="button" class="ff-accounts-btn" aria-expanded="false" aria-haspopup="true">' +
    "          <span>👤</span><span>Accounts</span><span style=\"font-size:9px;opacity:0.8\">▼</span>" +
    "        </button>" +
    '        <div class="ff-accounts-menu" role="menu">' +
    '          <div style="padding:4px 8px 6px;border-bottom:1px solid rgba(255,255,255,0.1);font-size:10px;color:#E5B842;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Select Account Portal</div>' +
    '          <a href="/homeowner" class="ff-account-item"><span>🏡</span><div><span class="ff-account-title" style="color:#4ADE80;">Homeowner Account</span><span class="ff-account-sub">Saved Fence-Folios &amp; 3-Bid Tracker</span></div></a>' +
    '          <a href="/contractors-hub.html" class="ff-account-item"><span>🔨</span><div><span class="ff-account-title" style="color:#F27A22;">Contractor Account</span><span class="ff-account-sub">72-Hr Job Feed &amp; Live SMS Bids</span></div></a>' +
    '          <a href="/geo-community.html" class="ff-account-item"><span>🏛️</span><div><span class="ff-account-title" style="color:#E5B842;">HOA Official Account</span><span class="ff-account-sub">ARC Committee Portal &amp; Bylaw Standards</span></div></a>' +
    '          <div style="height:1px;background:rgba(255,255,255,0.1);margin:2px 0;"></div>' +
    '          <a href="/log-in" class="ff-account-item"><span>🔑</span><div><span class="ff-account-title" style="color:#FAF6EE;">Sign In / Switch Role</span><span class="ff-account-sub">Zero-Data-Loss Phone OTP Auth</span></div></a>' +
    "        </div>" +
    "      </div>" +
    '      <a href="/designer" class="ff-new-build">+ New Build</a>' +
    "    </div>" +
    "  </div>" +
    "</header>" +
    "</div>"

  function mount() {
    if (!document.getElementById("ff-site-header-css")) {
      var style = document.createElement("style")
      style.id = "ff-site-header-css"
      style.textContent = CSS
      document.head.appendChild(style)
    }

    var slot = document.getElementById("ff-universal-header")
    var target = slot || document.querySelector("[data-ff-header]")
    if (!target) return

    var wrap = document.createElement("div")
    wrap.innerHTML = HTML
    var root = wrap.firstChild
    target.replaceWith(root)

    var btn = root.querySelector(".ff-accounts-btn")
    var menu = root.querySelector(".ff-accounts-menu")
    if (btn && menu) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation()
        var open = menu.classList.toggle("is-open")
        btn.setAttribute("aria-expanded", open ? "true" : "false")
      })
      document.addEventListener("click", function () {
        menu.classList.remove("is-open")
        btn.setAttribute("aria-expanded", "false")
      })
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount)
  } else {
    mount()
  }
})()
