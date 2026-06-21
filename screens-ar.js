// ============================================================
// AR SCAN MODE FLOW — full feature set
// Step 1 Browse -> Step 2 Four Dimension Analysis -> Wall/Ceiling scan
// -> Draw dimension line -> Confirm/Edit dimensions -> Place furniture
// -> Live distance line -> Warning / collision states -> Materials
// -> More Options -> Live capture -> Static result
// ============================================================

function arHeader(title, opts={}){
  const right = opts.right || '';
  return `<div class="header-row" style="background:#fff; flex-shrink:0;">
    <div class="icon-btn" onclick="${opts.backTo ? `goTo('${opts.backTo}')` : 'goBack()'}">${ICON.back}</div>
    <div class="header-title" style="color:var(--tan-deep); font-size:17px;">${title}</div>
    <div class="header-spacer"></div>
    ${right}
  </div>`;
}

function arStepProgress(activeStep){
  // small dot/line progress used across the AR flow
  const steps = ['Browse','Scan','Dimensions','Place','Capture'];
  return `<div class="row gap6" style="padding:10px 18px 0;">
    ${steps.map((s,i)=>`<div style="flex:1;height:4px;border-radius:3px;background:${i<=activeStep?'var(--gold)':'var(--line)'};"></div>`).join('')}
  </div>`;
}

// ---------------------------------------------------------------
// STEP 1 — Browse Furniture (entry)
// ---------------------------------------------------------------
SCREENS['ar-scan-launch'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Step 1 · Browse'],
  note:'Entry point into AR. Pick the piece you want to visualize, then continue into room scanning.',
  render(){
    return `
    ${statusRow()}
    ${arHeader('AR Scan Picture Mode')}
    ${arStepProgress(0)}
    <div class="content" style="padding-top:14px;">
      <div class="col center-text" style="align-items:center; margin-bottom:18px;">
        <div class="badge badge-gold" style="margin-bottom:8px;">STEP 1 OF 5</div>
        <h2 style="font-size:19px;">Browse Furniture</h2>
        <div class="muted small" style="margin-top:4px;">Select furniture from different stores to bring into your room</div>
      </div>
      <div class="product-grid">
        ${arPickCard('Room Sofa', IMG.sofa1, true)}
        ${arPickCard('Curve Armchair', IMG.chair1, false)}
        ${arPickCard('Oak Coffee Table', IMG.table1, false)}
        ${arPickCard('Aalto Floor Lamp', IMG.lamp1, false)}
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-dark btn-block" onclick="goTo('ar-dimension-intro')">Continue with Room Sofa</button>
    </div>
    `;
  }
};
function arPickCard(name,img,selected){
  return `<div class="product-card" style="${selected?'border-color:var(--gold); box-shadow:0 0 0 2px var(--gold-soft);':''}" onclick="goTo('ar-dimension-intro')">
    <div class="img" style="background-image:url('${img}')"></div>
    <div class="pinfo"><div class="pname">${name}</div>${selected?'<div class="badge badge-gold" style="margin-top:4px;">Selected</div>':''}</div>
  </div>`;
}

// ---------------------------------------------------------------
// STEP 2 — Four Dimension Analysis intro card
// ---------------------------------------------------------------
SCREENS['ar-dimension-intro'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Step 2 · 4D Analysis'],
  note:'Explains the AI 4D scan before the camera opens — sets expectations for wall, ceiling, and floor detection.',
  render(){
    return `
    ${statusRow()}
    ${arHeader('AR Scan Picture Mode')}
    ${arStepProgress(1)}
    <div class="content" style="padding-top:14px;">
      <div class="row gap10" style="margin-bottom:18px;">
        <div class="card grow" style="padding:12px; text-align:center; border-color:var(--green);">
          <div style="color:var(--green); margin-bottom:4px;">${ICON.check}</div>
          <div class="small" style="font-weight:800;">Selected Furniture</div>
          <img src="${IMG.chair1}" style="width:60px;height:46px;object-fit:cover;border-radius:8px;margin:6px auto 4px;">
          <div class="muted" style="font-size:10.5px;">From Urban Concepts Store</div>
        </div>
        <div class="card grow" style="padding:12px; text-align:center; border-color:var(--gold);">
          <div style="color:var(--tan-deep); margin-bottom:4px;">${ICON.layers}</div>
          <div class="small" style="font-weight:800;">Four Dimension Analysis</div>
          <div style="width:60px;height:46px;border-radius:8px;margin:6px auto 4px;background:linear-gradient(135deg,#b9a9e0,#7fd0c4);"></div>
          <div class="muted" style="font-size:10.5px;">AI 4D Scan: total spatial awareness for perfect placement</div>
        </div>
      </div>
      <div class="card" style="padding:16px; text-align:center;">
        ${ICON.compass}
        <div style="font-weight:800; margin-top:8px;">Ready to scan your room</div>
        <div class="muted small" style="margin-top:4px; line-height:1.6;">We'll map your walls, ceiling, and floor so Room Sofa appears true to scale. Hold your phone steady and slowly pan across the room.</div>
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-dark btn-block" onclick="goTo('ar-scan-walls')">Start Scanning</button>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// STEP 2b — Wall / Ceiling scanning (wireframe mesh visualization)
// ---------------------------------------------------------------
SCREENS['ar-scan-walls'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Scanning Walls'],
  note:'Live 4D scan: the app labels detected surfaces as it maps the room. Tap Done once enough surfaces are mapped, or Skip to use defaults.',
  render(){
    return `
    <div class="ar-bg" style="background:linear-gradient(160deg,#cfe0db,#9fb6c4 50%,#7a93a8);">
      <div class="ar-floor" style="opacity:0.35;"></div>
      <svg viewBox="0 0 375 500" style="position:absolute; inset:0; width:100%; height:100%; opacity:0.55;">
        ${Array.from({length:8}).map((_,i)=>`<line x1="${i*50}" y1="0" x2="${i*50-90}" y2="500" stroke="#fff" stroke-width="1"/>`).join('')}
        ${Array.from({length:10}).map((_,i)=>`<line x1="0" y1="${i*55}" x2="375" y2="${i*55-40}" stroke="#fff" stroke-width="1"/>`).join('')}
      </svg>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">AR SCAN PICTURE MODE</div>
        <div class="header-spacer"></div>
        <button class="filter-pill" style="background:rgba(28,26,23,0.6); color:#fff; border:none; padding:7px 14px;" onclick="goTo('ar-draw-dimension')">Skip</button>
      </div>
      <div class="grow" style="position:relative;">
        <div class="ar-chip" style="position:absolute; top:14px; left:50%; transform:translateX(-50%); background:rgba(255,255,255,0.9);">CEILING ANALYSIS</div>
        <div class="ar-chip" style="position:absolute; top:35%; left:20px; background:rgba(28,26,23,0.75); color:#fff;">FIRST DIMENSION<br><span style="font-weight:600; font-size:10px;">Vertical Walls</span></div>
        <div class="ar-chip" style="position:absolute; bottom:32%; right:18px; background:rgba(28,26,23,0.75); color:#fff;">THIRD DIMENSION<br><span style="font-weight:600; font-size:10px;">Furniture Ground</span></div>
      </div>
      <div style="position:relative; z-index:2; padding:14px 18px 30px;">
        <button class="btn btn-primary btn-block" onclick="goTo('ar-draw-dimension')">${ICON.check} Done Scanning</button>
      </div>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// STEP 3 — Draw dimension line on a wall
// ---------------------------------------------------------------
SCREENS['ar-draw-dimension'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Draw Dimension'],
  note:'Drag along a wall edge to draw a measurement line. The app reads the AR-tracked length live as you draw.',
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">AR SCAN PICTURE MODE</div>
      </div>
      <div class="grow" style="position:relative; cursor:crosshair;" onclick="goTo('ar-confirm-dimension')">
        <div class="hint-pill" style="position:absolute; top:14px; left:50%; transform:translateX(-50%);">Drag along the wall to measure</div>
        <svg viewBox="0 0 375 420" style="position:absolute; inset:0; width:100%; height:100%;">
          <line x1="70" y1="90" x2="70" y2="330" stroke="#E4CD93" stroke-width="2.5" stroke-dasharray="6 4"/>
          <circle cx="70" cy="90" r="7" fill="#fff" stroke="#C9A24B" stroke-width="3"/>
          <circle cx="70" cy="330" r="7" fill="#fff" stroke="#C9A24B" stroke-width="3"/>
        </svg>
        <div class="ar-chip" style="position:absolute; top:200px; left:90px;">130 cm</div>
      </div>
      <div style="position:relative; z-index:2; padding:14px 18px 30px;">
        <button class="btn btn-primary btn-block">${ICON.check} Confirm Wall Dimension</button>
      </div>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// STEP 3b — Confirm + edit dimensions
// ---------------------------------------------------------------
SCREENS['ar-confirm-dimension'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Confirm Dimensions'],
  note:'Review the measured wall. Tap a value to type a precise number instead of trusting the AR estimate.',
  afterRender(wrap){
    const w = wrap.querySelector('#dimW');
    const h = wrap.querySelector('#dimH');
    if (w) w.addEventListener('click', (e)=>e.stopPropagation());
    if (h) h.addEventListener('click', (e)=>e.stopPropagation());
  },
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">AR SCAN PICTURE MODE</div>
      </div>
      <div class="grow" style="position:relative;">
        <svg viewBox="0 0 375 420" style="position:absolute; inset:0; width:100%; height:100%;">
          <line x1="70" y1="60" x2="70" y2="300" stroke="#7FD0C4" stroke-width="2.5"/>
          <line x1="70" y1="300" x2="260" y2="300" stroke="#7FD0C4" stroke-width="2.5"/>
          <circle cx="70" cy="60" r="6" fill="#7FD0C4"/>
          <circle cx="70" cy="300" r="6" fill="#7FD0C4"/>
          <circle cx="260" cy="300" r="6" fill="#7FD0C4"/>
        </svg>
        <div class="ar-chip" id="dimH" style="position:absolute; top:170px; left:18px; cursor:text;" onclick="this.querySelector('input').focus()">
          <input id="dimH_input" value="250" style="width:34px; border:none; background:transparent; font-weight:800; font-size:11.5px; color:inherit; outline:none;"> cm H
        </div>
        <div class="ar-chip" id="dimW" style="position:absolute; top:312px; left:140px; cursor:text;" onclick="this.querySelector('input').focus()">
          <input id="dimW_input" value="130" style="width:34px; border:none; background:transparent; font-weight:800; font-size:11.5px; color:inherit; outline:none;"> cm W
        </div>
      </div>
      <div style="position:relative; z-index:2; background:rgba(255,255,255,0.95); border-radius:20px 20px 0 0; padding:16px 18px 26px;">
        <div class="row between" style="margin-bottom:4px;"><span class="small muted">Wall Dimension</span><span class="small" style="font-weight:800;">130 cm W × 250 cm H</span></div>
        <div class="muted small" style="margin-bottom:14px;">Tap a measurement above to fine-tune it manually.</div>
        <div class="row gap10">
          <button class="btn btn-outline grow" onclick="goTo('ar-draw-dimension')">Redraw Line</button>
          <button class="btn btn-dark grow" onclick="goTo('ar-placement')">Looks Good</button>
        </div>
      </div>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// STEP 4 — Place furniture, with live distance-to-wall line
// ---------------------------------------------------------------
SCREENS['ar-placement'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Step 4 · Place'],
  note:'Furniture placed to scale with a live distance line to the nearest wall. Drag to reposition (static here), rotate, swap materials, or open More Options.',
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">Room Sofa · 84" W</div>
        <div class="header-spacer"></div>
        <div class="icon-btn" onclick="goTo('ar-more-options')" style="background:rgba(255,255,255,0.85);">${ICON.dots}</div>
      </div>
      <div class="grow" style="position:relative;">
        <div class="ar-object-photo" style="width:220px; bottom:90px;"><img src="${IMG.sofa_ar_cutout}" alt="Room Sofa"></div>
        <svg viewBox="0 0 375 420" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;">
          <line x1="40" y1="270" x2="155" y2="270" stroke="#fff" stroke-width="2" stroke-dasharray="5 4"/>
          <circle cx="40" cy="270" r="4" fill="#fff"/>
          <circle cx="155" cy="270" r="4" fill="#fff"/>
        </svg>
        <div class="ar-chip" style="position:absolute; top:255px; left:55px;">120 cm</div>
        <div class="row gap10" style="position:absolute; top:10px; right:14px; flex-direction:column;">
          <div class="ar-side-btn" onclick="goTo('ar-materials')">${ICON.paint}</div>
          <div class="ar-side-btn">${ICON.rotate}</div>
          <div class="ar-side-btn" onclick="goTo('ar-warning')">${ICON.trash}</div>
        </div>
      </div>
      <div class="ar-shutter-row" style="position:relative; z-index:2; bottom:0; padding-bottom:28px;">
        <div class="ar-side-btn" onclick="goTo('ar-materials')">${ICON.layers}</div>
        <div class="ar-shutter" onclick="goTo('ar-live-capture')"></div>
        <div class="ar-side-btn" onclick="goTo('ar-more-options')">${ICON.settings}</div>
      </div>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// STEP 4b — Warning state (too close to wall)
// ---------------------------------------------------------------
SCREENS['ar-warning'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Placement Warning'],
  note:'If a piece is placed too close to a wall or another object, the app flags it before you can capture. Drag to reposition and the warning clears.',
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goTo('ar-placement')" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">Room Sofa</div>
      </div>
      <div class="grow" style="position:relative;">
        <div class="card" style="position:absolute; top:14px; left:14px; right:14px; padding:10px 12px; border-color:#E8B84B; background:#FFF8E8; display:flex; gap:10px; align-items:flex-start;">
          <div style="color:#C98E1C; flex-shrink:0; margin-top:1px;">${ICON.help}</div>
          <div>
            <div class="small" style="font-weight:800; color:#9A6B14;">Furniture too close to wall (0.5m)</div>
            <div class="muted small" style="margin-top:1px;">Recommended: 1.0m minimum clearance</div>
          </div>
        </div>
        <div class="ar-object-photo" style="width:220px; bottom:90px; outline:3px solid rgba(217,90,90,0.85); outline-offset:8px; border-radius:12px;"><img src="${IMG.sofa_ar_cutout}" alt="Room Sofa"></div>
      </div>
      <div style="position:relative; z-index:2; padding:14px 18px 30px;">
        <button class="btn btn-primary btn-block" onclick="goTo('ar-placement')">Reposition Furniture</button>
      </div>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// STORE MATERIALS swap
// ---------------------------------------------------------------
SCREENS['ar-materials'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Store Materials'],
  note:'Swap the upholstery / finish on the placed item in real time, browsing materials sold by the store.',
  afterRender(wrap){
    const preview = wrap.querySelector('#materialSofaPreview');
    wrap.querySelectorAll('.material-dot').forEach(dot=>{
      dot.addEventListener('click', (e)=>{
        e.stopPropagation();
        wrap.querySelectorAll('.material-dot').forEach(d=>d.style.border = '2px solid #fff');
        dot.style.border = '3px solid var(--gold)';
        if (preview) preview.style.filter = dot.dataset.filter + ' drop-shadow(0 16px 14px rgba(0,0,0,0.4))';
      });
    });
  },
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">Store Materials</div>
      </div>
      <div class="grow" style="position:relative;">
        <div class="ar-object-photo" id="materialSofaPreview" style="width:230px; bottom:130px;"><img src="${IMG.sofa_ar_cutout}" alt="Room Sofa"></div>
      </div>
      <div style="position:relative; z-index:2; background:rgba(255,255,255,0.97); border-radius:22px 22px 0 0; padding:16px 16px 26px;">
        <div class="search-bar" style="margin:0 0 12px;">${ICON.search}<input placeholder="Search materials..."></div>
        <div class="small" style="font-weight:800; margin-bottom:10px;">Browse Materials</div>
        <div class="row gap10" style="margin-bottom:14px; overflow-x:auto;">
          ${materialSwatch(IMG.fabric_tex,'Boucle Cream', true)}
          ${materialSwatch(IMG.wood_tex,'Midnight Velvet', false)}
          ${materialSwatch(IMG.sofa1,'White Fur', false)}
        </div>
        <div class="row gap10" id="materialColorDots">
          ${[
            {c:'#E3D6B8', f:'none', label:'Boucle Cream (original)'},
            {c:'#8C7B5E', f:'sepia(0.5) saturate(1.4) brightness(0.85) hue-rotate(-8deg)', label:'Walnut Tan'},
            {c:'#4A4439', f:'sepia(0.7) saturate(1.2) brightness(0.42) hue-rotate(-6deg)', label:'Charcoal'},
            {c:'#C9A24B', f:'sepia(0.9) saturate(2.4) brightness(0.95) hue-rotate(-12deg)', label:'Gold Mustard'},
            {c:'#7A8B85', f:'sepia(0.4) saturate(1.1) brightness(0.8) hue-rotate(70deg)', label:'Sage Green'},
          ].map((m,i)=>`<div data-filter="${m.f}" class="material-dot" style="width:34px;height:34px;border-radius:50%;background:${m.c}; border:${i===0?'3px solid var(--gold)':'2px solid #fff'}; box-shadow:0 2px 6px rgba(0,0,0,0.15); cursor:pointer;"></div>`).join('')}
        </div>
        <button class="btn btn-dark btn-block" style="margin-top:16px;" onclick="goTo('ar-placement')">Apply Material</button>
      </div>
    </div>
    `;
  }
};
function materialSwatch(img,label,selected){
  return `<div class="col" style="align-items:center; gap:5px; flex-shrink:0; width:64px;">
    <img src="${img}" style="width:54px;height:54px;border-radius:10px;object-fit:cover; border:${selected?'2px solid var(--gold)':'2px solid var(--line)'};">
    <div style="font-size:9.5px; font-weight:700; text-align:center; line-height:1.2;">${label}</div>
  </div>`;
}

// ---------------------------------------------------------------
// MORE OPTIONS — Capture + AR settings
// ---------------------------------------------------------------
SCREENS['ar-more-options'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','More Options'],
  note:'Capture quality and AR overlay settings. Toggles are illustrative — tap to flip them.',
  afterRender(wrap){
    wrap.querySelectorAll('.toggle-row').forEach(row=>{
      row.addEventListener('click', ()=>{
        const sw = row.querySelector('.toggle-sw');
        const knob = sw.querySelector('div');
        const isOn = sw.classList.toggle('on');
        sw.style.background = isOn ? 'var(--gold)' : 'var(--line)';
        knob.style.left = isOn ? '21px' : '3px';
      });
    });
  },
  render(){
    return `
    ${statusRow()}
    ${arHeader('More Options', {backTo:'ar-placement'})}
    <div class="content" style="padding-top:14px;">
      <div class="section-label" style="margin-top:0;">Capture</div>
      <div class="card" style="padding:4px 16px; margin-bottom:18px;">
        ${optionRow('Resolution','4032 × 3024 (12MP)')}
        ${optionRow('Frame Rate','30 fps')}
        ${toggleRow('Flash', false)}
        ${toggleRow('Grid Overlay', true)}
      </div>
      <div class="section-label">AR Options</div>
      <div class="card" style="padding:4px 16px;">
        ${toggleRow('Show Price Tags', true)}
        ${toggleRow('Show Dimension Lines', true)}
        ${toggleRow('Surface Snap', true)}
        ${toggleRow('Collision Warnings', true)}
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-dark btn-block" onclick="goTo('ar-placement')">Done</button>
    </div>
    `;
  }
};
function optionRow(label,value){
  return `<div class="list-row" style="cursor:pointer;">
    <div class="txt"><div class="t1">${label}</div></div>
    <div class="small muted" style="font-weight:700;">${value}</div>
    <div class="chev">${ICON.chevR}</div>
  </div>`;
}
function toggleRow(label,on){
  return `<div class="list-row toggle-row" style="cursor:pointer;">
    <div class="txt"><div class="t1">${label}</div></div>
    <div class="toggle-sw ${on?'on':''}" style="width:42px;height:24px;border-radius:999px;background:${on?'var(--gold)':'var(--line)'};position:relative;transition:.2s;flex-shrink:0;">
      <div style="width:18px;height:18px;border-radius:50%;background:#fff;position:absolute;top:3px;left:${on?'21px':'3px'};transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>
    </div>
  </div>`;
}

// ---------------------------------------------------------------
// LIVE CAMERA / CAPTURE
// ---------------------------------------------------------------
SCREENS['ar-live-capture'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Live Camera'],
  note:'Live camera pass-through before the shutter is pressed — background stays live until the shot is taken.',
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goTo('ar-placement')" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">Live Camera</div>
      </div>
      <div class="grow" style="position:relative;">
        <div class="col center-text" style="position:absolute; top:18%; left:50%; transform:translateX(-50%); align-items:center; color:#fff;">
          <div style="font-weight:800; font-size:15px; text-shadow:0 2px 6px rgba(0,0,0,0.4);">LIVE BACKGROUND</div>
          <div class="small" style="opacity:0.9; text-shadow:0 2px 6px rgba(0,0,0,0.4);">Unless shot and saved</div>
        </div>
        <div class="card" style="position:absolute; bottom:170px; left:14px; right:14px; padding:10px 12px; border-color:#E8B84B; background:#FFF8E8; display:flex; gap:10px;">
          <div style="color:#C98E1C; flex-shrink:0;">${ICON.help}</div>
          <div>
            <div class="small" style="font-weight:800; color:#9A6B14;">Warning (Blurry)</div>
            <div class="muted small">Furniture too close to wall (0.5m). Recommended: 1.0m minimum.</div>
          </div>
        </div>
        <div class="ar-object-photo" style="width:210px; bottom:90px;"><img src="${IMG.sofa_ar_cutout}" alt="Room Sofa"></div>
      </div>
      <div class="ar-shutter-row" style="position:relative; z-index:2; bottom:0; padding-bottom:28px;">
        <div class="ar-side-btn" onclick="goTo('ar-more-options')">${ICON.settings}</div>
        <div class="ar-shutter" onclick="goTo('ar-capture-result')"></div>
        <div class="ar-side-btn">${ICON.flip}</div>
      </div>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// CAPTURE RESULT — now static background, furniture still editable
// ---------------------------------------------------------------
SCREENS['ar-capture-result'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Result'],
  note:'Captured snapshot: background is now static/fixed while the furniture stays in motion (still adjustable) until you confirm. From here, add to cart or share to the community.',
  render(){
    return `
    <div style="position:relative; height:100%;">
      <img src="${IMG.floor_room}" style="width:100%;height:100%;object-fit:cover; position:absolute; inset:0;">
      <div class="ar-object-photo" style="bottom:160px; width:230px;"><img src="${IMG.sofa_ar_cutout}" alt="Room Sofa"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goTo('ar-placement')" style="background:rgba(255,255,255,0.9);">${ICON.close}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">NOW STATIC FIXED BACKGROUND</div>
        <div class="header-spacer"></div>
        <div class="icon-btn" style="background:rgba(255,255,255,0.9);">${ICON.share}</div>
      </div>
      <div style="position:absolute; bottom:0; left:0; right:0; z-index:2; background:linear-gradient(0deg, rgba(20,15,5,0.75), transparent); padding:22px 18px;">
        <div class="row gap10">
          <button class="btn btn-outline grow" style="background:rgba(255,255,255,0.92);" onclick="goTo('post-create')">${ICON.share} Share to Community</button>
        </div>
        <button class="btn btn-primary btn-block" style="margin-top:10px;" onclick="goTo('cart')">${ICON.cart} Add to Cart — ₱600.20</button>
      </div>
    </div>
    `;
  }
};
