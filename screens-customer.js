// ============================================================
// SCREENS REGISTRY (global)
// ============================================================
const SCREENS = {};

function statusRow(){
  return `<div class="status-row"><span>9:41</span><span style="display:flex;gap:5px;align-items:center;">
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="6" width="3" height="5" rx="0.5"/><rect x="4.3" y="4" width="3" height="7" rx="0.5"/><rect x="8.6" y="2" width="3" height="9" rx="0.5"/><rect x="12.9" y="0" width="3" height="11" rx="0.5"/></svg>
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="1" y="1" width="18" height="9" rx="2.5" stroke="currentColor" stroke-width="1"/><rect x="2.5" y="2.5" width="14" height="6" rx="1.2" fill="currentColor"/><rect x="20" y="3.5" width="1.5" height="4" rx="0.7" fill="currentColor"/></svg>
  </span></div>`;
}

function header(title, opts={}){
  const back = opts.noBack ? '' : `<div class="icon-btn" onclick="goBack()">${ICON.back}</div>`;
  const right = opts.right || '';
  return `<div class="header-row">${back}<div class="header-title">${title}</div><div class="header-spacer"></div>${right}</div>`;
}

function tabbar(activeKey, flow){
  if (flow === 'designer'){
    return `<div class="tabbar">
      <button class="tab-item" data-tab="dashboard" onclick="goTo('d-dashboard')">${ICON.layout}<span>Dashboard</span></button>
      <button class="tab-item" data-tab="clients" onclick="goTo('d-clients')">${ICON.users}<span>Clients</span></button>
      <button class="tab-item" data-tab="collab" onclick="goTo('d-collab')"><div class="fab">${ICON.plus}</div></button>
      <button class="tab-item" data-tab="portfolio" onclick="goTo('d-portfolio')">${ICON.briefcase}<span>Portfolio</span></button>
      <button class="tab-item" data-tab="account" onclick="goTo('d-account')">${ICON.user}<span>Account</span></button>
    </div>`;
  }
  return `<div class="tabbar">
    <button class="tab-item" data-tab="home" onclick="goTo('home')">${ICON.home}<span>Home</span></button>
    <button class="tab-item" data-tab="saved" onclick="goTo('saved')">${ICON.heart}<span>Saved</span></button>
    <button class="tab-item" data-tab="scan" onclick="goTo('ar-scan-launch')"><div class="fab">${ICON.camera}</div></button>
    <button class="tab-item" data-tab="explore" onclick="goTo('browse')">${ICON.compass}<span>Explore</span></button>
    <button class="tab-item" data-tab="services" onclick="goTo('services')">${ICON.layout}<span>Services</span></button>
  </div>`;
}

// ---------------------------------------------------------------
// 1. SPLASH
// ---------------------------------------------------------------
SCREENS['splash'] = {
  flow:'customer', tabbar:false, crumbs:['Onboarding','Splash'],
  note:'This is the launch screen. Tap the logo card to continue to onboarding.',
  render(){
    return `
    <div class="col grow" style="background:linear-gradient(160deg,#F3E6C8,#D9B97C 70%,#C49A5C); align-items:center; justify-content:center; height:100%; cursor:pointer;" onclick="goTo('onboarding')">
      <div class="col center-text" style="align-items:center; gap:18px;">
        <div style="width:108px;height:108px;border-radius:28px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 18px 40px rgba(70,54,24,0.3);">
          <span style="font-family:'Fraunces',serif; font-size:40px; font-weight:700; color:#B6863F;">AR</span>
        </div>
        <div>
          <div style="font-family:'Fraunces',serif; font-size:26px; font-weight:600; color:#3a2c18;">AR Home</div>
          <div style="font-size:12.5px; letter-spacing:0.18em; text-transform:uppercase; color:#6b5736; margin-top:2px;">Where vision meets the reality</div>
        </div>
        <div class="hint-pill" style="margin-top:30px; background:rgba(58,44,24,0.85);">Tap to begin →</div>
      </div>
    </div>`;
  }
};

// ---------------------------------------------------------------
// 2. ONBOARDING
// ---------------------------------------------------------------
SCREENS['onboarding'] = {
  flow:'customer', tabbar:false, crumbs:['Onboarding'],
  note:'A quick value-prop slide before login. Continue to sign in.',
  render(){
    return `
    <div class="col grow" style="height:100%;">
      <div style="height:46%; background-image:url('${IMG.room_modern}'); background-size:cover; background-position:center;"></div>
      <div class="col grow" style="padding:28px 24px; justify-content:space-between;">
        <div>
          <div style="font-family:'Fraunces',serif; font-size:24px; font-weight:600; line-height:1.25; margin-bottom:10px;">See furniture in your space before you buy.</div>
          <div class="muted small" style="line-height:1.6;">Scan your room, place real-to-scale pieces from trusted partner stores, and shop with confidence.</div>
        </div>
        <div class="col gap10">
          <div class="row gap6" style="justify-content:center; margin-bottom:6px;">
            <div style="width:18px;height:6px;border-radius:4px;background:var(--gold);"></div>
            <div style="width:6px;height:6px;border-radius:4px;background:var(--line);"></div>
            <div style="width:6px;height:6px;border-radius:4px;background:var(--line);"></div>
          </div>
          <button class="btn btn-primary btn-block" onclick="goTo('login')">Get Started</button>
          <button class="btn btn-outline btn-block" onclick="goTo('login')">I already have an account</button>
        </div>
      </div>
    </div>`;
  }
};

// ---------------------------------------------------------------
// 3. LOGIN
// ---------------------------------------------------------------
SCREENS['login'] = {
  flow:'customer', tabbar:false, crumbs:['Onboarding','Login'],
  note:'Standard auth screen. Logging in routes to role selection first time, or straight Home after.',
  render(){
    return `
    ${statusRow()}
    ${header('', {right:''})}
    <div class="content" style="padding-top:18px;">
      <div class="col" style="align-items:center; margin-bottom:26px;">
        <div style="width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#F3E6C8,#D9B97C); display:flex;align-items:center;justify-content:center; margin-bottom:12px;">
          <span style="font-family:'Fraunces',serif; font-size:24px; font-weight:700; color:#8C6B3D;">AR</span>
        </div>
        <h2 style="font-size:21px;">AR Home Login</h2>
        <div class="muted small" style="margin-top:4px;">Welcome back — sign in to continue</div>
      </div>
      <div class="field"><label>Email address</label><input type="email" placeholder="you@email.com" value="yuan.mendoza@email.com"></div>
      <div class="field"><label>Password</label><input type="password" placeholder="••••••••" value="••••••••"></div>
      <div class="row between small" style="margin:-4px 0 20px;">
        <label class="row gap6" style="font-size:12px; color:var(--ink-soft);"><input type="checkbox" checked style="accent-color:var(--gold);"> Remember me</label>
        <span class="small" style="color:var(--tan-deep); font-weight:700; cursor:pointer;">Forgot Password?</span>
      </div>
      <button class="btn btn-primary btn-block" onclick="goTo('role-select')">Login</button>
      <div class="center-text small muted" style="margin:18px 0;">or continue with</div>
      <div class="row gap10">
        <button class="btn btn-outline" style="flex:1;">Google</button>
        <button class="btn btn-outline" style="flex:1;">Facebook</button>
      </div>
      <div class="center-text small" style="margin-top:22px; color:var(--ink-soft);">Don't have an account? <span style="color:var(--tan-deep); font-weight:800; cursor:pointer;" onclick="goTo('role-select')">Sign up</span></div>
    </div>`;
  }
};

// ---------------------------------------------------------------
// 4. ROLE SELECT
// ---------------------------------------------------------------
SCREENS['role-select'] = {
  flow:'customer', tabbar:false, crumbs:['Onboarding','Choose Role'],
  note:'New accounts pick a role. Customer goes to the shopping Home feed; Interior Designer jumps to the Pro Hub flow.',
  render(){
    return `
    ${statusRow()}
    ${header('Choose your Role')}
    <div class="content" style="padding-top:14px;">
      <div class="muted small" style="margin-bottom:20px;">Tell us how you'll use AR Home so we can tailor your experience.</div>
      <div class="role-card selected" onclick="goTo('home')">
        <div class="ric">${ICON.user}</div>
        <div class="grow">
          <div style="font-weight:800; font-size:14.5px;">Customer</div>
          <div class="muted small">Shop for furniture, place pieces in your room, and order</div>
        </div>
        <div class="chev">${ICON.chevR}</div>
      </div>
      <div class="role-card" onclick="goTo('d-login')">
        <div class="ric">${ICON.briefcase}</div>
        <div class="grow">
          <div style="font-weight:800; font-size:14.5px;">Interior Designer</div>
          <div class="muted small">Manage clients, build mood boards, and grow your practice</div>
        </div>
        <div class="chev">${ICON.chevR}</div>
      </div>
      <div class="bottom-cta" style="position:static; padding:22px 0 0;">
        <button class="btn btn-primary btn-block" onclick="goTo('home')">Continue</button>
      </div>
    </div>`;
  }
};

// ---------------------------------------------------------------
// 5. HOME FEED
// ---------------------------------------------------------------
SCREENS['home'] = {
  flow:'customer', tabbar:true, tabKey:'home', crumbs:['Main UI','Home'],
  note:'The customer home feed. Tap the avatar for Account, the bell for alerts, a category icon to browse, or any product card to view details.',
  render(){
    return `
    ${statusRow()}
    <div class="content" style="padding-top:8px;">
      <div class="row between" style="padding:6px 0 16px;">
        <div class="row gap10">
          <div class="avatar" style="background-image:url('${IMG.person1}')" onclick="goTo('account')" style="cursor:pointer;"></div>
          <div>
            <div class="muted small" style="font-size:11px;">Welcome back,</div>
            <div style="font-weight:800; font-size:15px;">Yuan Mendoza</div>
          </div>
        </div>
        <div class="row gap8">
          <div class="icon-btn" onclick="goTo('saved')">${ICON.heart}</div>
          <div class="icon-btn" onclick="goTo('cart')">${ICON.cart}</div>
        </div>
      </div>

      <div class="search-bar" onclick="goTo('browse')">${ICON.search}<input placeholder="Search sofas, tables, decor…" readonly></div>

      <div style="border-radius:20px; overflow:hidden; position:relative; height:150px; margin-bottom:18px; cursor:pointer;" onclick="goTo('product')">
        <img src="${IMG.hero1}" style="width:100%;height:100%;object-fit:cover;">
        <div style="position:absolute; inset:0; background:linear-gradient(0deg, rgba(20,15,5,0.55), transparent 60%); display:flex; flex-direction:column; justify-content:flex-end; padding:14px;">
          <div class="badge badge-gold" style="width:fit-content; margin-bottom:6px;">NEW ARRIVAL</div>
          <div style="color:#fff; font-family:'Fraunces',serif; font-weight:600; font-size:17px;">Evette Convertible Sofa</div>
        </div>
      </div>

      <div class="row between" style="align-items:baseline;">
        <div class="section-label" style="margin:0;">Shop by category</div>
      </div>
      <div class="row gap10" style="margin:10px 0 6px; overflow-x:auto;">
        ${['Living Room','Bedroom','Office','Decor'].map((c,i)=>`
          <div class="col" style="align-items:center; gap:6px; cursor:pointer; flex-shrink:0; width:72px;" onclick="goTo('browse')">
            <div style="width:60px;height:60px;border-radius:16px;background:var(--cream-deep); display:flex; align-items:center; justify-content:center;">
              <img src="${[IMG.sofa1,IMG.bedroom1,IMG.table1,IMG.lamp1][i]}" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">
            </div>
            <div class="small" style="font-size:10.5px; font-weight:700; text-align:center;">${c}</div>
          </div>`).join('')}
      </div>

      <div class="row between" style="align-items:baseline; margin-top:10px;">
        <div class="section-label" style="margin:0;">Trending Furniture</div>
        <div class="small" style="color:var(--tan-deep); font-weight:700; cursor:pointer;" onclick="goTo('browse')">See all</div>
      </div>
      <div class="product-grid">
        ${productCard('Room Sofa','₱600.20', IMG.sofa1)}
        ${productCard('Curve Armchair','₱4,250.00', IMG.chair1)}
        ${productCard('Oak Coffee Table','₱5,076.00', IMG.table1)}
        ${productCard('Aalto Floor Lamp','₱1,800.00', IMG.lamp1)}
      </div>

      <div class="row between" style="align-items:baseline; margin-top:18px;">
        <div class="section-label" style="margin:0;">From your community</div>
        <div class="small" style="color:var(--tan-deep); font-weight:700; cursor:pointer;" onclick="goTo('community')">See all</div>
      </div>
      <div class="card" style="padding:12px; cursor:pointer;" onclick="goTo('community')">
        <img src="${IMG.community1}" style="width:100%;height:90px;object-fit:cover;border-radius:12px; margin-bottom:8px;">
        <div class="small" style="font-weight:700;">"Finally found the perfect rug for my reading nook 🤍"</div>
        <div class="muted small" style="margin-top:2px;">Posted by @ChrisGoes Rev · 24 likes</div>
      </div>
    </div>
    ${tabbar('home','customer')}
    `;
  }
};

function productCard(name, price, img){
  return `<div class="product-card" onclick="goTo('product')">
    <div class="img" style="background-image:url('${img}')"></div>
    <div class="pinfo">
      <div class="pname">${name}</div>
      <div class="pprice">${price}</div>
    </div>
  </div>`;
}

// ---------------------------------------------------------------
// 6. BROWSE / FURNITURE TRENDS
// ---------------------------------------------------------------
SCREENS['browse'] = {
  flow:'customer', tabbar:true, tabKey:'explore', crumbs:['Main UI','Furniture Trends'],
  note:'Browse and filter the catalog. Tap a product to open its detail page, or the camera FAB to jump into AR Scan Mode.',
  render(){
    return `
    ${statusRow()}
    ${header('Furniture Trends', {right:`<div class="icon-btn" onclick="goTo('cart')">${ICON.cart}</div>`})}
    <div class="content" style="padding-top:6px;">
      <div class="search-bar"><input placeholder="Search furniture..." value="Hot Furniture"></div>
      <div class="pill-row">
        ${['All','Sofas','Chairs','Tables','Storage','Lighting','Decor'].map((p,i)=>`<div class="filter-pill ${i===0?'active':''}">${p}</div>`).join('')}
      </div>
      <div class="section-label" style="margin-top:4px;">Hot Furniture</div>
      <div class="product-grid">
        ${productCard('Table Lamp','₱800.00', IMG.lamp1)}
        ${productCard('Stool Table','₱5,076.00', IMG.table1)}
        ${productCard('Room Sofa','₱600.20', IMG.sofa1)}
        ${productCard('Lounge Chair','₱3,150.00', IMG.chair2)}
        ${productCard('Bed Frame Oak','₱8,200.00', IMG.bedroom2)}
        ${productCard('Accent Chair','₱2,640.00', IMG.chair1)}
      </div>
    </div>
    ${tabbar('explore','customer')}
    `;
  }
};

// ---------------------------------------------------------------
// 7. PRODUCT DETAIL
// ---------------------------------------------------------------
SCREENS['product'] = {
  flow:'customer', tabbar:false, crumbs:['Main UI','Product Detail'],
  note:'Product detail with the signature "Try in AR Camera" CTA — this is the bridge into AR Scan Mode.',
  render(){
    return `
    <div style="position:relative; height:340px; flex-shrink:0;">
      <img src="${IMG.chair1}" style="width:100%;height:100%;object-fit:cover;">
      <div style="position:absolute; top:0; left:0; right:0;">${statusRow()}</div>
      <div style="position:absolute; top:50px; left:18px;" class="icon-btn" onclick="goBack()">${ICON.back}</div>
      <div style="position:absolute; top:50px; right:18px;" class="icon-btn" onclick="goTo('saved')">${ICON.heart}</div>
      <div style="position:absolute; bottom:14px; left:0; right:0; display:flex; justify-content:center; gap:6px;">
        ${[0,1,2].map(i=>`<div style="width:${i===0?18:6}px;height:6px;border-radius:4px;background:${i===0?'#fff':'rgba(255,255,255,0.5)'};"></div>`).join('')}
      </div>
    </div>
    <div class="content" style="padding-top:18px; border-radius:24px 24px 0 0; background:var(--cream); margin-top:-18px; position:relative;">
      <div class="row between">
        <div class="badge badge-gold">Woodley Furniture Shop</div>
        <div class="stars row gap6">${ICON.star} 4.8 (212)</div>
      </div>
      <h2 style="font-size:21px; margin:10px 0 4px;">Room Sofa</h2>
      <div style="font-size:19px; font-weight:800; color:var(--tan-deep); margin-bottom:14px;">₱600.20</div>
      <div class="muted small" style="line-height:1.6; margin-bottom:16px;">A solid wooden sofa set you can contrast the cushion of any color. The wood right side up to the furniture help us relax for a longer time.</div>

      <div class="section-label">Features</div>
      <div class="row gap10" style="margin-bottom:6px;">
        <div class="card grow" style="padding:10px; text-align:center;"><div class="small" style="font-weight:800;">Solid Wood</div><div class="muted" style="font-size:10.5px;">Frame</div></div>
        <div class="card grow" style="padding:10px; text-align:center;"><div class="small" style="font-weight:800;">Linen</div><div class="muted" style="font-size:10.5px;">Upholstery</div></div>
        <div class="card grow" style="padding:10px; text-align:center;"><div class="small" style="font-weight:800;">3-Seater</div><div class="muted" style="font-size:10.5px;">Capacity</div></div>
      </div>
    </div>
    <div class="bottom-cta row gap10">
      <button class="btn btn-outline" style="width:54px; flex-shrink:0;" onclick="goTo('cart')">${ICON.cart}</button>
      <button class="btn btn-dark grow" onclick="goTo('ar-scan-launch')">${ICON.camera} Try in AR Camera</button>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// 8. CART
// ---------------------------------------------------------------
SCREENS['cart'] = {
  flow:'customer', tabbar:false, crumbs:['Checkout','Cart'],
  note:'Cart summary. Proceed to checkout to choose payment method and place the order.',
  render(){
    return `
    ${statusRow()}
    ${header('Check Out')}
    <div class="content" style="padding-top:10px;">
      <div class="section-label" style="margin-top:0;">1. Order Summary</div>
      <div class="card row gap12" style="padding:12px; margin-bottom:10px;">
        <img src="${IMG.sofa1}" style="width:56px;height:56px;border-radius:10px;object-fit:cover;">
        <div class="grow">
          <div class="small" style="font-weight:800;">Room Sofa</div>
          <div class="muted small">Qty: 1 · Beige</div>
        </div>
        <div class="small" style="font-weight:800;">₱600.20</div>
      </div>
      <div class="card row gap12" style="padding:12px; margin-bottom:18px;">
        <img src="${IMG.lamp1}" style="width:56px;height:56px;border-radius:10px;object-fit:cover;">
        <div class="grow">
          <div class="small" style="font-weight:800;">Table Lamp</div>
          <div class="muted small">Qty: 2 · Natural Oak</div>
        </div>
        <div class="small" style="font-weight:800;">₱1,600.00</div>
      </div>

      <div class="section-label">2. Delivery Address</div>
      <div class="card row gap12" style="padding:14px; margin-bottom:18px; cursor:pointer;">
        <div class="ic">${ICON.truck}</div>
        <div class="grow">
          <div class="small" style="font-weight:800;">Home · Yuan Mendoza</div>
          <div class="muted small">123 Marigold St., Las Piñas City, Metro Manila</div>
        </div>
        <div class="chev">${ICON.chevR}</div>
      </div>

      <div class="section-label">Price Details</div>
      <div class="col gap8 small" style="margin-bottom:16px;">
        <div class="row between"><span class="muted">Subtotal</span><span>₱2,200.20</span></div>
        <div class="row between"><span class="muted">Delivery Fee</span><span>₱150.00</span></div>
        <div class="row between" style="font-weight:800; font-size:14px; padding-top:8px; border-top:1px solid var(--line);"><span>Total</span><span>₱2,350.20</span></div>
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-primary btn-block" onclick="goTo('checkout')">Proceed to Payment</button>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// 9. CHECKOUT / PAYMENT
// ---------------------------------------------------------------
SCREENS['checkout'] = {
  flow:'customer', tabbar:false, crumbs:['Checkout','Payment Method'],
  note:'Select a payment method, then place the order to see the confirmation screen.',
  render(){
    return `
    ${statusRow()}
    ${header('Check Out')}
    <div class="content" style="padding-top:10px;">
      <div class="section-label" style="margin-top:0;">2. Payment Method</div>
      ${paymentRow(ICON.truck,'Cash on Delivery','Pay when your order arrives', true)}
      ${paymentRow(ICON.card,'Credit / Debit Card','Visa ending in 4521', false)}
      ${paymentRow(ICON.bag,'GCash','Linked · yuan****@gmail.com', false)}

      <div class="section-label">Order Summary</div>
      <div class="col gap8 small" style="margin-bottom:6px;">
        <div class="row between"><span class="muted">Items (3)</span><span>₱2,200.20</span></div>
        <div class="row between"><span class="muted">Delivery Fee</span><span>₱150.00</span></div>
        <div class="row between" style="font-weight:800; font-size:15px; padding-top:8px; border-top:1px solid var(--line);"><span>Total</span><span>₱2,350.20</span></div>
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-primary btn-block" onclick="goTo('order-success')">Place Order</button>
    </div>
    `;
  }
};
function paymentRow(icon,title,sub,selected){
  return `<div class="card row gap12" style="padding:14px; margin-bottom:10px; cursor:pointer; ${selected?'border-color:var(--gold); background:#FFFBF0;':''}">
    <div class="ic">${icon}</div>
    <div class="grow"><div class="small" style="font-weight:800;">${title}</div><div class="muted small">${sub}</div></div>
    <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${selected?'var(--gold)':'var(--line)'}; display:flex; align-items:center; justify-content:center;">${selected?'<div style="width:9px;height:9px;border-radius:50%;background:var(--gold);"></div>':''}</div>
  </div>`;
}

// ---------------------------------------------------------------
// 10. ORDER SUCCESS
// ---------------------------------------------------------------
SCREENS['order-success'] = {
  flow:'customer', tabbar:false, crumbs:['Checkout','Order Placed'],
  note:'Confirmation screen. Return to Home or track the order.',
  render(){
    return `
    ${statusRow()}
    <div class="col grow" style="align-items:center; justify-content:center; padding:30px; text-align:center;">
      <div style="width:84px;height:84px;border-radius:50%;background:#E5F1E6; display:flex; align-items:center; justify-content:center; margin-bottom:22px;">
        <div style="width:60px;height:60px;border-radius:50%;background:var(--green); display:flex; align-items:center; justify-content:center; color:#fff;">${ICON.check}</div>
      </div>
      <h2 style="font-size:21px; margin-bottom:8px;">Order placed!</h2>
      <div class="muted small" style="line-height:1.6; margin-bottom:30px;">Your order #AH-20458 has been confirmed. Woodley Furniture Shop is preparing your items for delivery.</div>
      <button class="btn btn-primary btn-block" onclick="goTo('home')">Back to Home</button>
      <button class="btn btn-outline btn-block" style="margin-top:10px;" onclick="goTo('account')">Track My Order</button>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// 11. ACCOUNT
// ---------------------------------------------------------------
SCREENS['account'] = {
  flow:'customer', tabbar:true, tabKey:'', crumbs:['Main UI','My Account'],
  note:'Account settings menu. Each row is tappable; Logout returns to the splash screen.',
  render(){
    return `
    ${statusRow()}
    ${header('My Account', {noBack:true})}
    <div class="content" style="padding-top:6px;">
      <div class="row gap14" style="padding:8px 4px 22px;">
        <div class="avatar lg" style="background-image:url('${IMG.person1}')"></div>
        <div>
          <div style="font-weight:800; font-size:16px;">Yuan Mendoza</div>
          <div class="muted small">yuan.mendoza@email.com</div>
          <div class="badge badge-gold" style="margin-top:6px;">Customer Account</div>
        </div>
      </div>
      <div class="card" style="padding:4px 16px;">
        ${listRow(ICON.edit,'Edit Profile','Name, photo, contact info')}
        ${listRow(ICON.card,'Payment Methods','2 cards linked')}
        ${listRow(ICON.settings,'Settings','Notifications, privacy')}
        ${listRow(ICON.activity,'Activity','Order history')}
      </div>
      <div class="card" style="padding:4px 16px; margin-top:14px;">
        ${listRow(ICON.link,'Linked Accounts','Google, Facebook')}
        ${listRow(ICON.users,'Communities','Your posts & saved threads', ()=>goTo('community'))}
        ${listRow(ICON.layout,'Services','AR tools, stores, designers', ()=>goTo('services'))}
        ${listRow(ICON.help,'Help and Support','FAQs, contact us')}
      </div>
      <div class="card" style="padding:4px 16px; margin-top:14px;" onclick="goTo('splash')">
        ${listRow(ICON.logout,'Logout','Sign out of this device')}
      </div>
    </div>
    ${tabbar('account','customer')}
    `;
  }
};
function listRow(icon,t1,t2,onclick){
  const handler = onclick ? `onclick="(${onclick.toString()})()"` : '';
  return `<div class="list-row" ${handler}><div class="ic">${icon}</div><div class="txt"><div class="t1">${t1}</div><div class="t2">${t2}</div></div><div class="chev">${ICON.chevR}</div></div>`;
}

// ---------------------------------------------------------------
// 12. COMMUNITY
// ---------------------------------------------------------------
SCREENS['community'] = {
  flow:'customer', tabbar:false, crumbs:['Main UI','Community'],
  note:'Community marketplace feed — customers share rooms and tag products. Tap a post or "Post" to simulate sharing.',
  render(){
    return `
    ${statusRow()}
    ${header('Community', {right:`<div class="icon-btn" onclick="goTo('post-create')">${ICON.plus}</div>`})}
    <div class="content" style="padding-top:6px;">
      <div class="search-bar"><input placeholder="Search your space..."></div>
      <button class="btn btn-primary btn-block" style="margin-bottom:16px;" onclick="goTo('post-create')">${ICON.plus} Post your space</button>
      ${communityPost(IMG.community1,'person2','Chris G.','Finally found the perfect rug for my reading nook 🤍','24')}
      ${communityPost(IMG.community2,'person3','Mark R.','Mid-century redo complete! Swipe to see before/after.','58')}
      ${communityPost(IMG.room_cozy,'person4','Lia S.','Small space, big cozy energy. Tagged everything below 👇','19')}
    </div>
    `;
  }
};
function communityPost(img,personKey,name,caption,likes){
  return `<div class="card" style="margin-bottom:16px; overflow:hidden;">
    <div class="row gap10" style="padding:12px;">
      <div class="avatar sm" style="background-image:url('${IMG[personKey]}')"></div>
      <div class="small" style="font-weight:800;">${name}</div>
      <div class="header-spacer"></div>
      <button class="filter-pill" style="padding:5px 12px; font-size:11px;">Follow</button>
    </div>
    <img src="${img}" style="width:100%;height:160px;object-fit:cover;">
    <div style="padding:12px;">
      <div class="row gap10" style="margin-bottom:8px;">
        <div class="row gap6">${ICON.heart}<span class="small muted">${likes}</span></div>
        <div class="row gap6">${ICON.chat}<span class="small muted">8</span></div>
        <div class="header-spacer"></div>
        <div>${ICON.share}</div>
      </div>
      <div class="small">${caption}</div>
      <div class="badge badge-gold" style="margin-top:8px; cursor:pointer;" onclick="goTo('product')">Tagged: Room Sofa</div>
    </div>
  </div>`;
}

SCREENS['post-create'] = {
  flow:'customer', tabbar:false, crumbs:['Community','New Post'],
  note:'Composer for sharing a finished room with the community and tagging products.',
  render(){
    return `
    ${statusRow()}
    ${header('Share your Space', {right:`<button class="filter-pill active" style="padding:7px 16px;" onclick="goTo('community')">Post</button>`})}
    <div class="content" style="padding-top:10px;">
      <div style="height:200px; border-radius:16px; border:2px dashed var(--line); display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px; color:var(--ink-soft); margin-bottom:16px; cursor:pointer;" onclick="goTo('ar-capture-result')">
        ${ICON.camera}
        <div class="small" style="font-weight:700;">Add a photo of your room</div>
      </div>
      <div class="field"><label>Caption</label><input placeholder="Tell the community about your space..."></div>
      <div class="field"><label>Tag products</label>
        <div class="row gap8"><span class="badge badge-gold">Room Sofa</span><span class="badge badge-gold" style="cursor:pointer;" onclick="goTo('browse')">+ Add</span></div>
      </div>
    </div>
    `;
  }
};

// ---------------------------------------------------------------
// 13. PARTNER STORES
// ---------------------------------------------------------------
SCREENS['stores'] = {
  flow:'customer', tabbar:false, crumbs:['Main UI','Partner Stores'],
  note:'Directory of partner furniture stores. Tap a store to view its catalog.',
  render(){
    return `
    ${statusRow()}
    ${header('Partner Stores')}
    <div class="content" style="padding-top:6px;">
      <div class="muted small" style="margin-bottom:16px; line-height:1.6;">Discover our exclusive network of premium partner stores curated for quality furniture across the Philippines.</div>
      <div class="section-label" style="margin-top:0;">Featured Premium Partner</div>
      ${storeRow('Woodley Furniture Shop','4.9 · Quezon City', IMG.storefront)}
      ${storeRow('Casa Aria Living','4.7 · Makati', IMG.room_modern)}
      ${storeRow('Manila Loft Co.','4.8 · Pasig', IMG.room_office)}
      ${storeRow('Terra & Teak','4.6 · Cebu', IMG.room_cozy)}
    </div>
    `;
  }
};
function storeRow(name, sub, img){
  return `<div class="card row gap12" style="padding:10px; margin-bottom:12px; cursor:pointer;" onclick="goTo('browse')">
    <img src="${img}" style="width:54px;height:54px;border-radius:12px;object-fit:cover;">
    <div class="grow">
      <div class="small" style="font-weight:800;">${name}</div>
      <div class="stars small">${sub}</div>
    </div>
    <div class="chev">${ICON.chevR}</div>
  </div>`;
}

// ---------------------------------------------------------------
// 14. SAVED ITEMS
// ---------------------------------------------------------------
SCREENS['saved'] = {
  flow:'customer', tabbar:true, tabKey:'saved', crumbs:['Main UI','Saved'],
  note:'Saved items and history tabs. Tap a saved card to view it, or "Select to Check Out" to start checkout.',
  render(){
    return `
    ${statusRow()}
    ${header('Saved', {noBack:true})}
    <div class="content" style="padding-top:6px;">
      <div class="pill-row">
        <div class="filter-pill active">Saved Items</div>
        <div class="filter-pill" onclick="goTo('order-history')">History</div>
      </div>
      <div class="product-grid">
        ${productCard('Room Sofa','₱600.20', IMG.sofa1)}
        ${productCard('Aalto Floor Lamp','₱1,800.00', IMG.lamp1)}
        ${productCard('Oak Coffee Table','₱5,076.00', IMG.table1)}
        ${productCard('Curve Armchair','₱4,250.00', IMG.chair1)}
      </div>
    </div>
    <div class="bottom-cta">
      <button class="btn btn-primary btn-block" onclick="goTo('cart')">Select to Check Out</button>
    </div>
    ${tabbar('saved','customer')}
    `;
  }
};

SCREENS['order-history'] = {
  flow:'customer', tabbar:false, crumbs:['Saved','History'],
  note:'Past order history.',
  render(){
    return `
    ${statusRow()}
    ${header('Saved')}
    <div class="content" style="padding-top:6px;">
      <div class="pill-row">
        <div class="filter-pill" onclick="goTo('saved')">Saved Items</div>
        <div class="filter-pill active">History</div>
      </div>
      ${orderHistRow('AH-20458','Delivered · Jun 18, 2026','₱2,350.20')}
      ${orderHistRow('AH-20211','Delivered · May 02, 2026','₱890.00')}
      ${orderHistRow('AH-19890','Cancelled · Apr 14, 2026','₱1,250.00')}
    </div>
    `;
  }
};
function orderHistRow(id,status,total){
  const isCancelled = status.includes('Cancelled');
  return `<div class="card row gap12" style="padding:14px; margin-bottom:10px;">
    <div class="ic">${ICON.bag}</div>
    <div class="grow"><div class="small" style="font-weight:800;">Order ${id}</div><div class="muted small" style="color:${isCancelled?'var(--blush)':''}">${status}</div></div>
    <div class="small" style="font-weight:800;">${total}</div>
  </div>`;
}

// ---------------------------------------------------------------
// 15. SERVICES
// ---------------------------------------------------------------
SCREENS['services'] = {
  flow:'customer', tabbar:true, tabKey:'services', crumbs:['Main UI','Services'],
  note:'Services hub linking to AR tools, stores, community, and account.',
  render(){
    return `
    ${statusRow()}
    ${header('Services', {noBack:true})}
    <div class="content" style="padding-top:10px;">
      <div class="product-grid">
        ${serviceTile(ICON.camera,'AR Scan','Place furniture in your room', ()=>goTo('ar-scan-launch'))}
        ${serviceTile(ICON.store,'Partner Stores','Browse curated shops', ()=>goTo('stores'))}
        ${serviceTile(ICON.users,'Community','Get inspired by others', ()=>goTo('community'))}
        ${serviceTile(ICON.briefcase,'Hire a Designer','Work with a pro', ()=>goTo('d-login'))}
      </div>
      <div class="section-label">Account</div>
      <div class="card" style="padding:4px 16px;">
        ${listRow(ICON.user,'My Account','Profile, payments, settings', ()=>goTo('account'))}
        ${listRow(ICON.activity,'Order History','Track past purchases', ()=>goTo('order-history'))}
      </div>
    </div>
    ${tabbar('services','customer')}
    `;
  }
};
function serviceTile(icon,title,sub,onclick){
  return `<div class="product-card" style="padding:18px; cursor:pointer;" onclick="(${onclick.toString()})()">
    <div class="ic" style="width:44px;height:44px; margin-bottom:10px;">${icon}</div>
    <div class="pname" style="font-size:13.5px;">${title}</div>
    <div class="muted small" style="margin-top:4px;">${sub}</div>
  </div>`;
}
