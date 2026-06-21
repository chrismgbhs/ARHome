// ============================================================
// AR SCAN MODE FLOW
// ============================================================

SCREENS['ar-scan-launch'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Step 1 · Browse'],
  note:'Entry point into AR. Pick a piece of furniture to take into your room.',
  render(){
    return `
    ${statusRow()}
    ${header('AR Home', {right:`<div class="avatar sm" style="background-image:url('${IMG.person1}')"></div>`})}
    <div class="content" style="padding-top:6px;">
      <div class="ar-chip" style="background:var(--cream-deep); color:var(--tan-deep); margin-bottom:14px;">${ICON.camera} STEP 1 — Browse Furniture</div>
      <div class="muted small" style="margin-bottom:16px; line-height:1.6;">Pick the piece you want to visualize, then we'll guide you through scanning your room.</div>
      <div class="product-grid">
        ${arPickCard('Room Sofa', IMG.sofa1)}
        ${arPickCard('Curve Armchair', IMG.chair1)}
        ${arPickCard('Oak Coffee Table', IMG.table1)}
        ${arPickCard('Aalto Floor Lamp', IMG.lamp1)}
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-dark btn-block" onclick="goTo('ar-scan-room')">Continue with Room Sofa</button>
    </div>
    `;
  }
};
function arPickCard(name,img){
  return `<div class="product-card" onclick="goTo('ar-scan-room')">
    <div class="img" style="background-image:url('${img}')"></div>
    <div class="pinfo"><div class="pname">${name}</div></div>
  </div>`;
}

SCREENS['ar-scan-room'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Step 2 · Scan'],
  note:'Static mock-up of the camera scanning screen (no live feed in this prototype). Tap the shutter to simulate detecting the floor.',
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">AR SCAN MODE</div>
        <div class="header-spacer"></div>
        <div class="icon-btn" style="background:rgba(255,255,255,0.85);">${ICON.flash}</div>
      </div>
      <div class="grow" style="position:relative;">
        <div style="position:absolute; top:30%; left:50%; transform:translate(-50%,-50%); width:170px; height:170px; border:2.5px dashed rgba(255,255,255,0.8); border-radius:16px; display:flex; align-items:center; justify-content:center;">
          <div class="hint-pill" style="position:static;">Move your phone to scan the floor</div>
        </div>
      </div>
      <div class="ar-shutter-row" style="position:relative; z-index:2; bottom:0; padding-bottom:28px;">
        <div class="ar-side-btn">${ICON.layers}</div>
        <div class="ar-shutter" onclick="goTo('ar-scan-detected')"></div>
        <div class="ar-side-btn">${ICON.flip}</div>
      </div>
    </div>
    `;
  }
};

SCREENS['ar-scan-detected'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Step 3 · Surface Found'],
  note:'Surface detected. Tap anywhere on the floor to place the furniture.',
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip" style="background:#E5F1E6; color:var(--green);">${ICON.check} Surface found</div>
      </div>
      <div class="grow" style="position:relative; cursor:pointer;" onclick="goTo('ar-placement')">
        <div style="position:absolute; bottom:18%; left:50%; transform:translateX(-50%); width:200px; height:60px; border:2px solid rgba(255,255,255,0.9); border-radius:50%; opacity:0.8;"></div>
        <div class="hint-pill" style="position:absolute; top:14px; left:50%; transform:translateX(-50%);">Tap the floor to place furniture</div>
      </div>
      <div class="ar-shutter-row" style="position:relative; z-index:2; bottom:0; padding-bottom:28px;">
        <div class="ar-side-btn">${ICON.layers}</div>
        <div class="ar-shutter" onclick="goTo('ar-placement')"></div>
        <div class="ar-side-btn">${ICON.flip}</div>
      </div>
    </div>
    `;
  }
};

SCREENS['ar-placement'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Step 4 · Place'],
  note:'Furniture placed to scale. Drag to reposition (static here), rotate, swap materials, or capture the result.',
  render(){
    return `
    <div class="ar-bg">
      <div class="ar-floor"></div>
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.85);">${ICON.back}</div>
        <div class="header-spacer"></div>
        <div class="ar-chip">Room Sofa · 84" W</div>
      </div>
      <div class="grow" style="position:relative;">
        <img src="${IMG.sofa2}" class="ar-object" style="width:220px; bottom:90px; border-radius:14px;">
        <div class="row gap10" style="position:absolute; top:10px; right:14px; flex-direction:column;">
          <div class="ar-side-btn" onclick="goTo('ar-materials')">${ICON.paint}</div>
          <div class="ar-side-btn">${ICON.rotate}</div>
          <div class="ar-side-btn">${ICON.trash}</div>
        </div>
      </div>
      <div class="ar-shutter-row" style="position:relative; z-index:2; bottom:0; padding-bottom:28px;">
        <div class="ar-side-btn" onclick="goTo('ar-materials')">${ICON.layers}</div>
        <div class="ar-shutter" onclick="goTo('ar-capture-result')"></div>
        <div class="ar-side-btn">${ICON.flip}</div>
      </div>
    </div>
    `;
  }
};

SCREENS['ar-materials'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Materials'],
  note:'Swap the upholstery / finish on the placed item in real time.',
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
        <img src="${IMG.sofa2}" class="ar-object" style="width:230px; bottom:130px; border-radius:14px;">
      </div>
      <div style="position:relative; z-index:2; background:rgba(255,255,255,0.95); border-radius:22px 22px 0 0; padding:16px 16px 26px;">
        <div class="small" style="font-weight:800; margin-bottom:10px;">Choose upholstery</div>
        <div class="row gap10">
          ${['#E3D6B8','#8C7B5E','#4A4439','#C9A24B','#D9C9A8'].map((c,i)=>`<div onclick="event.stopPropagation()" style="width:38px;height:38px;border-radius:50%;background:${c}; border:${i===0?'3px solid var(--gold)':'2px solid #fff'}; box-shadow:0 2px 6px rgba(0,0,0,0.15); cursor:pointer;"></div>`).join('')}
        </div>
        <div class="row gap10" style="margin-top:14px; overflow-x:auto;">
          <img src="${IMG.fabric_tex}" style="width:54px;height:54px;border-radius:10px;object-fit:cover; flex-shrink:0; border:2px solid var(--gold);">
          <img src="${IMG.wood_tex}" style="width:54px;height:54px;border-radius:10px;object-fit:cover; flex-shrink:0;">
          <img src="${IMG.sofa1}" style="width:54px;height:54px;border-radius:10px;object-fit:cover; flex-shrink:0;">
        </div>
        <button class="btn btn-dark btn-block" style="margin-top:16px;" onclick="goTo('ar-placement')">Apply</button>
      </div>
    </div>
    `;
  }
};

SCREENS['ar-capture-result'] = {
  flow:'customer', tabbar:false, crumbs:['AR Scan Mode','Result'],
  note:'Captured snapshot of the placed furniture. From here, add to cart or share to the community.',
  render(){
    return `
    <div style="position:relative; height:100%;">
      <img src="${IMG.floor_room}" style="width:100%;height:100%;object-fit:cover; position:absolute; inset:0;">
      <img src="${IMG.sofa2}" style="position:absolute; bottom:160px; left:50%; transform:translateX(-50%); width:230px; border-radius:14px; filter:drop-shadow(0 18px 14px rgba(0,0,0,0.35));">
      <div style="position:relative; z-index:2;">${statusRow()}</div>
      <div style="position:relative; z-index:2;" class="header-row">
        <div class="icon-btn" onclick="goBack()" style="background:rgba(255,255,255,0.9);">${ICON.close}</div>
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
