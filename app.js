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
    viewport.appendChild(wrap);
    if (def.afterRender) def.afterRender(wrap);
  });
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
  {label:'② Login', id:'login'},
  {label:'③ Home Feed', id:'home'},
  {label:'④ Browse Furniture', id:'browse'},
  {label:'⑤ Product Detail', id:'product'},
  {label:'⑥ AR Scan Mode', id:'ar-scan-launch'},
  {label:'⑦ Cart & Checkout', id:'cart'},
  {label:'⑧ My Account', id:'account'},
  {label:'⑨ Community', id:'community'},
  {label:'⑩ Partner Stores', id:'stores'},
  {label:'⑪ Saved Items', id:'saved'},
  {label:'⑫ Services', id:'services'},
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
