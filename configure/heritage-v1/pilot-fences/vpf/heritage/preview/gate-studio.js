/**
 * Gate Studio — mini-configurator overlay for single-swing man gates.
 * Panel qty selectors (man / mower / vehicle) live on #design-gate-panel.
 * Depends on: FFManGateCatalog
 */
(function initFFGateStudio(global) {
  const Cat = () => global.FFManGateCatalog;

  const FRAME_SRC = {
    'MG-Z': '../../../../components/additional/gates/sym-gate-frame-z-cedar.svg',
    'MG-X': '../../../../components/additional/gates/sym-gate-frame-x-cedar.svg',
    'MG-STL': '../../../../components/additional/gates/sym-gate-frame-stl-cedar.svg',
  };
  const HW_SRC = {
    good: '../../../../components/additional/gates/sym-gate-hardware-good.svg',
    better: '../../../../components/additional/gates/sym-gate-hardware-better.svg',
    best: '../../../../components/additional/gates/sym-gate-hardware-best.svg',
  };
  const CABLE_SRC = '../../../../components/additional/gates/sym-gate-cable-overlay.svg';
  const ARCH_SRC = '../../../../components/additional/gates/sym-gate-arch-crown.svg';

  function clampCount(n) {
    return Math.max(0, Math.min(3, Number(n) || 0));
  }

  function defaultState() {
    const d = Cat()?.defaults || {};
    return {
      gateManCount: 0,
      gateMowerCount: 0,
      gateVehicleCount: 0,
      gateFrame: d.frame || 'MG-Z',
      gateOpening: d.opening || 36,
      gatePicketTop: d.picketTop || 'flat',
      gateCable: d.cable || 'none',
      gateTrim: d.trim || 'none',
      gateSwing: d.swing || 'out',
      gateHand: d.hand || 'RH',
      gateHardware: d.hardware || 'better',
    };
  }

  let live = defaultState();
  let draft = null;
  let onChange = null;
  let lastFocus = null;

  function clone(s) {
    return { ...s };
  }

  function getState() {
    return clone(live);
  }

  function setState(partial) {
    live = { ...live, ...partial };
    if (partial.gateManCount != null) live.gateManCount = clampCount(partial.gateManCount);
    if (partial.gateMowerCount != null) live.gateMowerCount = clampCount(partial.gateMowerCount);
    if (partial.gateVehicleCount != null) live.gateVehicleCount = clampCount(partial.gateVehicleCount);
    if (typeof onChange === 'function') onChange(getState());
    syncQtyDom();
    syncCta();
  }

  function totalGateCount() {
    return live.gateManCount + live.gateMowerCount + live.gateVehicleCount;
  }

  function syncQtyDom() {
    const man = document.getElementById('gate-qty-man');
    const mower = document.getElementById('gate-qty-mower');
    const vehicle = document.getElementById('gate-qty-vehicle');
    if (man) man.value = String(live.gateManCount);
    if (mower) mower.value = String(live.gateMowerCount);
    if (vehicle) vehicle.value = String(live.gateVehicleCount);
  }

  function syncCta() {
    const summaryEl = document.getElementById('gate-cta-summary');
    const btn = document.getElementById('gate-studio-open');
    const cat = Cat();
    if (summaryEl && cat) {
      summaryEl.textContent = cat.formatSummary(live);
    }
    if (btn) {
      btn.textContent = live.gateManCount > 0 ? 'Edit man gate' : 'Design man gate';
    }
    const condensed = document.getElementById('specs-condensed-summary');
    if (condensed) {
      const base = condensed.dataset.gateBaseSummary
        || condensed.textContent.replace(/\s*·\s*.*\bgate.*$/i, '').trim();
      condensed.dataset.gateBaseSummary = base;
      const n = totalGateCount();
      if (n > 0) {
        const bits = [];
        if (live.gateManCount) bits.push(`${live.gateManCount} man`);
        if (live.gateMowerCount) bits.push(`${live.gateMowerCount} mower`);
        if (live.gateVehicleCount) bits.push(`${live.gateVehicleCount} vehicle`);
        condensed.textContent = base
          ? `${base} · ${bits.join(', ')}`
          : bits.join(', ');
      } else if (base) {
        condensed.textContent = base;
      }
    }
  }

  function fillSelect(el, options, value) {
    if (!el) return;
    el.innerHTML = '';
    options.forEach((opt) => {
      const o = document.createElement('option');
      if (typeof opt === 'object') {
        o.value = opt.value;
        o.textContent = opt.label;
      } else {
        o.value = String(opt);
        o.textContent = String(opt);
      }
      el.appendChild(o);
    });
    el.value = String(value);
  }

  function readDraftFromDom() {
    const root = document.getElementById('gate-studio');
    if (!root) return draft;
    return {
      gateManCount: clampCount(root.querySelector('#gs-count')?.value),
      gateMowerCount: live.gateMowerCount,
      gateVehicleCount: live.gateVehicleCount,
      gateFrame: root.querySelector('#gs-frame')?.value || 'MG-Z',
      gateOpening: Number(root.querySelector('#gs-opening')?.value) || 36,
      gatePicketTop: root.querySelector('#gs-picket-top')?.value || 'flat',
      gateCable: root.querySelector('#gs-cable')?.value || 'none',
      gateTrim: root.querySelector('#gs-trim')?.value || 'none',
      gateSwing: root.querySelector('#gs-swing')?.value || 'out',
      gateHand: root.querySelector('#gs-hand')?.value || 'RH',
      gateHardware: root.querySelector('#gs-hardware')?.value || 'better',
    };
  }

  function writeDraftToDom(s) {
    const root = document.getElementById('gate-studio');
    if (!root) return;
    const cat = Cat();
    fillSelect(
      root.querySelector('#gs-count'),
      [
        { value: '0', label: 'None' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
      ],
      s.gateManCount
    );
    fillSelect(
      root.querySelector('#gs-frame'),
      (cat?.FRAMES || []).map((f) => ({
        value: f,
        label: cat.FRAME_LABEL?.[f] || f,
      })),
      s.gateFrame
    );
    fillSelect(root.querySelector('#gs-opening'), cat?.WIDTHS || [36, 42, 48], s.gateOpening);
    fillSelect(
      root.querySelector('#gs-picket-top'),
      [
        { value: 'flat', label: 'Flat (match fence)' },
        { value: 'arched', label: 'Arched (gate only)' },
      ],
      s.gatePicketTop
    );
    fillSelect(
      root.querySelector('#gs-cable'),
      [
        { value: 'none', label: 'None' },
        { value: 'kit', label: 'Cable + turnbuckle' },
      ],
      s.gateCable
    );
    fillSelect(
      root.querySelector('#gs-trim'),
      [
        { value: 'none', label: 'None' },
        { value: 'match', label: 'Match fence trim' },
      ],
      s.gateTrim
    );
    fillSelect(
      root.querySelector('#gs-swing'),
      [
        { value: 'out', label: 'Out' },
        { value: 'in', label: 'In' },
      ],
      s.gateSwing
    );
    fillSelect(
      root.querySelector('#gs-hand'),
      [
        { value: 'RH', label: 'Right (from outside)' },
        { value: 'LH', label: 'Left (from outside)' },
      ],
      s.gateHand
    );
    fillSelect(
      root.querySelector('#gs-hardware'),
      Object.keys(cat?.HARDWARE || { good: 1, better: 1, best: 1 }).map((k) => ({
        value: k,
        label: cat.HARDWARE[k]?.label || k,
      })),
      s.gateHardware
    );
    const hint = root.querySelector('#gs-hardware-hint');
    if (hint && cat?.HARDWARE?.[s.gateHardware]) {
      hint.textContent = cat.HARDWARE[s.gateHardware].notes || '';
    }
  }

  function renderPreview(s) {
    const host = document.getElementById('gate-studio-preview');
    if (!host) return;
    if (!s.gateManCount) {
      host.innerHTML = '<p class="gate-studio__empty">Set quantity to 1+ to preview</p>';
      return;
    }
    const leafW = Cat()?.leafWidth(s.gateOpening) || s.gateOpening - 2;
    const scaleX = leafW / 34;
    const mirror = s.gateHand === 'LH' ? `scale(-1,1) translate(${-leafW},0)` : '';
    const arch = s.gatePicketTop === 'arched'
      ? `<image href="${ARCH_SRC}" x="0" y="-6" width="${leafW}" height="${7.5 * scaleX}" preserveAspectRatio="none"/>`
      : '';
    const cable = s.gateCable === 'kit'
      ? `<image href="${CABLE_SRC}" x="0" y="0" width="${leafW}" height="70" preserveAspectRatio="none"/>`
      : '';
    const hw = HW_SRC[s.gateHardware] || HW_SRC.better;
    host.innerHTML = `
      <svg viewBox="-2 -8 ${leafW + 12} 80" class="gate-studio__svg" aria-hidden="true">
        <g transform="${mirror}">
          ${arch}
          <image href="${FRAME_SRC[s.gateFrame] || FRAME_SRC['MG-Z']}" x="0" y="0" width="${leafW}" height="70" preserveAspectRatio="none"/>
          ${cable}
          <image href="${hw}" x="${leafW - 2}" y="28" width="8" height="14"/>
        </g>
      </svg>`;
  }

  function refreshDraftUi() {
    draft = readDraftFromDom();
    writeDraftToDom(draft);
    renderPreview(draft);
    const hint = document.getElementById('gs-hardware-hint');
    const cat = Cat();
    if (hint && cat?.HARDWARE?.[draft.gateHardware]) {
      hint.textContent = cat.HARDWARE[draft.gateHardware].notes || '';
    }
  }

  function open() {
    const root = document.getElementById('gate-studio');
    if (!root) return;
    lastFocus = document.activeElement;
    draft = clone(live);
    if (draft.gateManCount < 1) draft.gateManCount = 1;
    writeDraftToDom(draft);
    renderPreview(draft);
    root.hidden = false;
    document.body.classList.add('gate-studio-open');
    root.querySelector('#gs-count')?.focus();
  }

  function close(save) {
    const root = document.getElementById('gate-studio');
    if (!root) return;
    if (save) {
      live = readDraftFromDom();
      if (typeof onChange === 'function') onChange(getState());
      syncQtyDom();
      syncCta();
    }
    draft = null;
    root.hidden = true;
    document.body.classList.remove('gate-studio-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function onPanelQtyChange(e) {
    const sel = e.target.closest('[data-gate-qty]');
    if (!sel) return;
    const kind = sel.getAttribute('data-gate-qty');
    const n = clampCount(sel.value);
    if (kind === 'man') setState({ gateManCount: n });
    else if (kind === 'mower') setState({ gateMowerCount: n });
    else if (kind === 'vehicle') setState({ gateVehicleCount: n });
  }

  function wire() {
    const openBtn = document.getElementById('gate-studio-open');
    const doneBtn = document.getElementById('gate-studio-done');
    const cancelBtn = document.getElementById('gate-studio-cancel');
    const root = document.getElementById('gate-studio');
    const gatePanel = document.getElementById('design-gate-panel');
    if (openBtn) openBtn.addEventListener('click', open);
    if (doneBtn) doneBtn.addEventListener('click', () => close(true));
    if (cancelBtn) cancelBtn.addEventListener('click', () => close(false));
    if (root) {
      root.addEventListener('change', (e) => {
        if (!e.target.closest('.gate-studio__controls')) return;
        refreshDraftUi();
      });
    }
    if (gatePanel) {
      gatePanel.addEventListener('change', onPanelQtyChange);
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root && !root.hidden) {
        e.preventDefault();
        close(false);
      }
    });
    syncQtyDom();
    syncCta();
  }

  global.FFGateStudio = {
    getState,
    setState,
    open,
    close,
    syncCta,
    syncQtyDom,
    wire,
    setOnChange(fn) {
      onChange = fn;
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
