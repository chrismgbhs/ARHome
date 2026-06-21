// ============================================================
// APP ENGINE
// ============================================================
let currentFlow = 'customer';
let history_stack = [];
let currentScreen = null;

const viewport = document.getElementById('viewport');

function renderAllScreens(){
  viewport.innerHTML = '';
  Object.keys(SCREENS).forEach(id=>{
    const def = SCREENS[id];
    const wrap = document.createElement('div');
    wrap.className = 'screen' + (def.tabbar ? ' has-tabbar' : '');
    wrap.id = 'screen-' + id;
    wrap.innerHTML = def.render();
    restructureScreenScroll(wrap);
    viewport.appendChild(wrap);
    if (def.afterRender) def.afterRender(wrap);
  });
}

// Splits a screen's children into a scrollable region (status row, header,
// content, anything else) and a pinned region (.bottom-cta, .tabbar) so the
// pinned elements never move when the scrollable content overflows.
function restructureScreenScroll(wrap){
  const pinnedSelectors = ['.bottom-cta', '.tabbar'];
  const children = Array.from(wrap.children);
  const pinned = [];
  const scrollable = [];
  children.forEach(child=>{
    const isPinned = pinnedSelectors.some(sel => child.matches(sel));
    (isPinned ? pinned : scrollable).push(child);
  });
  if (pinned.length === 0) return; // nothing to pin, leave as-is (e.g. full-bleed AR/splash screens)
  const scroller = document.createElement('div');
  scroller.className = 'screen-scroll';
  scrollable.forEach(el => scroller.appendChild(el));
  wrap.innerHTML = '';
  wrap.appendChild(scroller);
  pinned.forEach(el => wrap.appendChild(el));
}

function goTo(id, opts={}){
  if (!SCREENS[id]) { console.warn('Missing screen:', id); return; }
  if (!opts.silent) history_stack.push(id);
  showScreen(id);
}

function goBack(){
  if (history_stack.length > 1){
    history_stack.pop();
    const prev = history_stack[history_stack.length-1];
    showScreen(prev, true);
  } else {
    showScreen(currentFlow === 'designer' ? 'd-splash' : 'splash', true);
  }
}

function showScreen(id, silent=false){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
  currentScreen = id;
  // sync flow switch buttons
  const def = SCREENS[id];
  if (def && def.flow) currentFlow = def.flow;
  document.getElementById('switch-customer').classList.toggle('active', currentFlow==='customer');
  document.getElementById('switch-designer').classList.toggle('active', currentFlow==='designer');
  // scroll to top
  const vp = document.getElementById('viewport');
  vp.scrollTop = 0;
  updateSidePanel(id);
  updateTabbarHighlight(id);
}

function updateTabbarHighlight(id){
  const def = SCREENS[id];
  if (!def || !def.tabKey) return;
  document.querySelectorAll('#screen-'+id+' .tab-item').forEach(t=>{
    t.classList.toggle('active', t.dataset.tab === def.tabKey);
  });
}

function updateSidePanel(id){
  const def = SCREENS[id];
  const trail = document.getElementById('crumbTrail');
  const note = document.getElementById('screenNote');
  trail.innerHTML = '';
  (def.crumbs || ['AR Home']).forEach((c,i)=>{
    const span = document.createElement('span');
    span.className = 'crumb';
    span.textContent = c;
    trail.appendChild(span);
  });
  note.textContent = def.note || 'Tap anything that looks tappable to continue exploring.';
  renderQuickLinks();
}

function renderQuickLinks(){
  const box = document.getElementById('quickLinks');
  box.innerHTML = '';
  const links = currentFlow === 'designer' ? QUICKLINKS_DESIGNER : QUICKLINKS_CUSTOMER;
  links.forEach(l=>{
    const b = document.createElement('button');
    b.textContent = l.label;
    b.onclick = ()=> goTo(l.id);
    box.appendChild(b);
  });
}

const QUICKLINKS_CUSTOMER = [
  {label:'① Splash / Onboarding', id:'splash'},
  {label:'② Choose Role', id:'role-select'},
  {label:'③ Login', id:'login'},
  {label:'④ Home Feed', id:'home'},
  {label:'⑤ Browse Furniture', id:'browse'},
  {label:'⑥ Product Detail', id:'product'},
  {label:'⑦ AR · Browse & Select', id:'ar-scan-launch'},
  {label:'⑧ AR · 4D Analysis Intro', id:'ar-dimension-intro'},
  {label:'⑨ AR · Scan Walls', id:'ar-scan-walls'},
  {label:'⑩ AR · Draw Dimension', id:'ar-draw-dimension'},
  {label:'⑪ AR · Confirm Dimension', id:'ar-confirm-dimension'},
  {label:'⑫ AR · Place Furniture', id:'ar-placement'},
  {label:'⑬ AR · Placement Warning', id:'ar-warning'},
  {label:'⑭ AR · Store Materials', id:'ar-materials'},
  {label:'⑮ AR · More Options', id:'ar-more-options'},
  {label:'⑯ AR · Live Capture', id:'ar-live-capture'},
  {label:'⑰ AR · Result', id:'ar-capture-result'},
  {label:'⑱ Cart & Checkout', id:'cart'},
  {label:'⑲ My Account', id:'account'},
  {label:'⑳ Community', id:'community'},
  {label:'㉑ Partner Stores', id:'stores'},
  {label:'㉒ Saved Items', id:'saved'},
  {label:'㉓ Services', id:'services'},
  {label:'㉔ Hire a Designer', id:'designer-directory'},
  {label:'㉕ Designer Profile', id:'designer-profile'},
];

const QUICKLINKS_DESIGNER = [
  {label:'① Designer Login', id:'d-login'},
  {label:'② Pro Hub Dashboard', id:'d-dashboard'},
  {label:'③ Clients & Projects', id:'d-clients'},
  {label:'④ Client Detail', id:'d-client-detail'},
  {label:'⑤ My Portfolio', id:'d-portfolio'},
  {label:'⑥ Collaboration Hub', id:'d-collab'},
  {label:'⑦ Portfolio & Reviews', id:'d-reviews'},
  {label:'⑧ Subscription Plan', id:'d-subscription'},
];

function startFlow(flow){
  currentFlow = flow;
  history_stack = [];
  goTo(flow === 'designer' ? 'd-splash' : 'splash');
}

// init
document.addEventListener('DOMContentLoaded', ()=>{
  renderAllScreens();
  goTo('splash');
});
