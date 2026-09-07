/* ---------------- DATA ---------------- */
const PRODUCTS = [
  { id:'chilli', name:'Chilli Powder', hindi:' মরিচ গুঁড়া', tagline:'Blazing Red Heat', price:8.99, heat:8,
    accent:'#FF2D1A', accent2:'#7A0C0C', icon:'fa-pepper-hot',
    desc:'Sun-dried red chillies stone-ground into a fiery, vibrant powder. Deep color, bold heat, zero shortcuts — perfect for curries, marinades and everything that needs a kick.' },
  { id:'cumin', name:'Cumin Powder', hindi:'জিরা গুঁড়া', tagline:'Earthy Warm Depth', price:7.49, heat:2,
    accent:'#C97C2B', accent2:'#5c3a12', icon:'fa-seedling',
    desc:'Toasted whole cumin seeds ground fresh for maximum aroma. Warm, nutty and earthy — the backbone spice for curries, roasted veggies and spice blends.' },
  { id:'turmeric', name:'Turmeric Powder', hindi:'হলুদ গুঁড়া', tagline:'Golden Glow Root', price:6.99, heat:0,
    accent:'#FFC700', accent2:'#a37c00', icon:'fa-sun',
    desc:'Pure golden turmeric root, sun-cured and finely milled. Earthy, slightly bitter-sweet and packed with color — essential for curries, lattes and wellness shots.' },
];

const REVIEWS = [
  { name:'Amara K.', text:'The chilli powder is unreal — deep color, real heat, no chemical aftertaste. My curries have never tasted better.', stars:5 },
  { name:'Devon P.', text:'Cumin powder smells like it was ground yesterday. So much more aroma than store-bought stuff.', stars:5 },
  { name:'Priya S.', text:'Turmeric is vibrant gold and dissolves so well in my morning latte. Subscribing for life.', stars:5 },
  { name:'Marcus L.', text:'Built my own box with all three — best decision. Fast shipping, gorgeous jars, incredible flavor.', stars:4 },
];

const FAQS = [
  { q:'Are your spices 100% pure with no additives?', a:'Yes — every jar is lab-tested and contains zero anti-caking agents, fillers, or artificial colors. Just pure, single-ingredient spice.' },
  { q:'How hot is the Chilli Powder exactly?', a:'It sits around 8/10 on our heat scale — bold and fiery but still balanced enough to cook with confidently. Start small if you\'re heat-sensitive.' },
  { q:'Do you offer a discount for buying all three?', a:'Yes! Use our Build-a-Box tool to mix quantities of Chilli, Cumin and Turmeric and get an automatic 15% bundle discount.' },
  { q:'What\'s your shipping policy?', a:'Orders over $40 ship free. All orders are dispatched within 1-2 business days from our farm-side packing facility.' },
];

const USAGE = {
  chilli:{ title:'Chilli Powder Missions', text:'Stir into curries, marinades, and hot oil for tadka. A pinch elevates scrambled eggs, roasted potatoes, or homemade hot sauce.' },
  cumin:{ title:'Cumin Powder Missions', text:'Toast lightly before adding to dals, chilis, and taco fillings. Blend into yogurt dips or sprinkle over roasted carrots for an earthy finish.' },
  turmeric:{ title:'Turmeric Powder Missions', text:'Whisk into golden milk lattes, stir into rice while cooking, or add to soups and stews for color, warmth, and wellness benefits.' }
};

let cart = JSON.parse(localStorage.getItem('hotspy_cart') || '[]');
let bundleQty = { chilli:1, cumin:1, turmeric:1 };
let qvCurrent = null, qvQtyVal = 1;
let reviewIndex = 0;

/* ---------------- JAR BUILDER ---------------- */
function jarHTML(p){
  return `
  <div class="jar-lid"></div>
  <div class="jar-neck"></div>
  <div class="jar-body" style="--accent:${p.accent};--accent2:${p.accent2}">
    <div class="jar-powder-top"></div>
    <div class="jar-label">
      <div style="font-size:16px;color:${p.accent}"><i class="fa-solid fa-fire"></i></div>
      <div style="font-family:'Anton',sans-serif;font-size:15px;letter-spacing:.02em;margin-top:2px;">Hotspy</div>
      <div style="font-size:6px;letter-spacing:.15em;font-weight:700;margin-top:2px;">PURE SPICES • REAL FLAVOR</div>
      <div class="jar-name" style="font-size:19px;margin-top:6px;">${p.name.split(' ')[0]}<br>${p.name.split(' ')[1]}</div>
      <div style="font-size:20px;color:${p.accent};margin-top:4px;"><i class="fa-solid ${p.icon}"></i></div>
      <div style="font-size:6px;letter-spacing:.1em;font-weight:700;margin-top:4px;">100% PURE &amp; NATURAL</div>
    </div>
    <div class="jar-band">FROM OUR FARMS TO YOUR KITCHEN</div>
  </div>`;
}
function paintJars(){
  document.querySelectorAll('[data-jar]').forEach(el=>{
    const p = PRODUCTS.find(x=>x.id===el.dataset.jar);
    if(p) el.innerHTML = jarHTML(p);
  });
}

/* ---------------- HEAT PIPS ---------------- */
function heatPips(level, size=10){
  let html='';
  for(let i=0;i<size;i++){
    const active = i < Math.round((level/10)*size);
    html += `<div class="heat-pip" style="background:${active? 'linear-gradient(#FF7A00,#FF2D1A)':'rgba(255,255,255,.15)'}"></div>`;
  }
  return `<div class="flex gap-1">${html}</div>`;
}

/* ---------------- RENDER PRODUCTS ---------------- */
function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = PRODUCTS.map(p=>`
    <div class="bg-coal border border-white/10 rounded-3xl p-7 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-glow transition-all">
      <div class="jar-wrap mb-6" data-jar="${p.id}"></div>
      <p class="text-ember text-xs font-bold tracking-widest mb-1">${p.tagline.toUpperCase()}</p>
      <h3 class="font-display text-2xl mb-1">${p.name}</h3>
     <p class="text-cream/50 text-xs mb-3 bangla">${p.hindi}</p>
      <div class="mb-4">${heatPips(p.heat,8)}</div>
      <p class="text-cream/60 text-sm mb-5">${p.desc}</p>
      <div class="flex items-center justify-between w-full mt-auto">
        <span class="font-display text-2xl text-gold">$${p.price.toFixed(2)}</span>
        <div class="flex gap-2">
          <button onclick="openQuickView('${p.id}')" class="border border-white/20 rounded-full px-4 py-2 text-xs font-bold tracking-widest hover:bg-white/10 transition">VIEW</button>
          <button onclick="addToCart('${p.id}',1)" class="btn-fire rounded-full px-4 py-2 text-xs font-bold tracking-widest">ADD</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---------------- BUNDLE ---------------- */
function renderBundle(){
  const grid = document.getElementById('bundleGrid');
  grid.innerHTML = PRODUCTS.map(p=>`
    <div class="bg-coal border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center">
      <div class="jar-wrap mb-4" style="width:120px" data-jar="${p.id}"></div>
      <h4 class="font-display text-lg mb-1">${p.name}</h4>
      <p class="text-gold font-bold mb-3">$${p.price.toFixed(2)}</p>
      <div class="flex items-center gap-3 border-2 border-white/20 rounded-full px-3 py-1">
        <button onclick="changeBundleQty('${p.id}',-1)" class="font-bold text-lg">−</button>
        <span id="bundleQty-${p.id}" class="font-bold w-5 text-center">${bundleQty[p.id]}</span>
        <button onclick="changeBundleQty('${p.id}',1)" class="font-bold text-lg">+</button>
      </div>
    </div>
  `).join('');
  updateBundleSummary();
}
function changeBundleQty(id, delta){
  bundleQty[id] = Math.max(0, bundleQty[id] + delta);
  document.getElementById('bundleQty-'+id).textContent = bundleQty[id];
  updateBundleSummary();
}
function updateBundleSummary(){
  const summary = document.getElementById('bundleSummary');
  let subtotal = 0;
  let rows = '';
  PRODUCTS.forEach(p=>{
    const qty = bundleQty[p.id];
    if(qty>0){
      const line = qty*p.price;
      subtotal += line;
      rows += `<div class="flex justify-between text-cream/70"><span>${p.name} × ${qty}</span><span>$${line.toFixed(2)}</span></div>`;
    }
  });
  summary.innerHTML = rows || `<p class="text-cream/40">Select spices to build your box.</p>`;
  const discount = subtotal * 0.15;
  const total = subtotal - discount;
  document.getElementById('bundleSub').textContent = '$'+subtotal.toFixed(2);
  document.getElementById('bundleDisc').textContent = '-$'+discount.toFixed(2);
  document.getElementById('bundleTotal').textContent = '$'+total.toFixed(2);
}
function addBundleToCart(){
  let any = false;
  PRODUCTS.forEach(p=>{
    if(bundleQty[p.id]>0){ addToCart(p.id, bundleQty[p.id], false); any = true; }
  });
  if(any){
    showToast('Box added to your stash! 🔥');
    toggleCart(true);
  } else {
    showToast('Pick at least one spice first!');
  }
}

/* ---------------- CART ---------------- */
function saveCart(){ localStorage.setItem('hotspy_cart', JSON.stringify(cart)); }
function addToCart(id, qty=1, toast=true){
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty += qty;
  else cart.push({id, qty});
  saveCart();
  renderCart();
  if(toast){ showToast(PRODUCTS.find(p=>p.id===id).name + ' added! 🌶️'); toggleCart(true); }
}
function removeFromCart(id){
  cart = cart.filter(c=>c.id!==id);
  saveCart(); renderCart();
}
function changeCartQty(id, delta){
  const item = cart.find(c=>c.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0) return removeFromCart(id);
  saveCart(); renderCart();
}
function renderCart(){
  const box = document.getElementById('cartItems');
  const countEls = document.getElementById('cartCount');
  const totalQty = cart.reduce((a,c)=>a+c.qty,0);
  countEls.textContent = totalQty;
  if(cart.length===0){
    box.innerHTML = `<div class="text-center text-cream/40 py-16"><i class="fa-solid fa-bag-shopping text-4xl mb-3"></i><p>Your stash is empty.</p></div>`;
  } else {
    box.innerHTML = cart.map(c=>{
      const p = PRODUCTS.find(x=>x.id===c.id);
      return `
      <div class="flex gap-4 items-center bg-ink/40 border border-white/10 rounded-2xl p-3">
        <div class="w-16 h-20 rounded-lg flex items-center justify-center text-2xl" style="background:${p.accent}22;color:${p.accent}"><i class="fa-solid ${p.icon}"></i></div>
        <div class="flex-1">
          <p class="font-semibold text-sm">${p.name}</p>
          <p class="text-cream/50 text-xs mb-2">$${p.price.toFixed(2)} each</p>
          <div class="flex items-center gap-2 border border-white/20 rounded-full px-2 py-0.5 w-fit">
            <button onclick="changeCartQty('${p.id}',-1)" class="font-bold px-1">−</button>
            <span class="text-xs font-bold w-4 text-center">${c.qty}</span>
            <button onclick="changeCartQty('${p.id}',1)" class="font-bold px-1">+</button>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-gold text-sm mb-2">$${(p.price*c.qty).toFixed(2)}</p>
          <button onclick="removeFromCart('${p.id}')" class="text-cream/40 hover:text-ember text-xs"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    }).join('');
  }
  const subtotal = cart.reduce((a,c)=>{
    const p = PRODUCTS.find(x=>x.id===c.id);
    return a + p.price*c.qty;
  },0);
  document.getElementById('cartSubtotal').textContent = '$'+subtotal.toFixed(2);
  const shipPct = Math.min(100, subtotal / 40 * 100);
  document.getElementById('shipBar').style.width = shipPct + '%';
  document.getElementById('shipMsg').innerHTML = subtotal >= 40
    ? '🎉 FREE shipping unlocked!'
    : `Add <b>$${(40 - subtotal).toFixed(2)}</b> more for FREE shipping`;
}
function toggleCart(open){
  const overlay = document.getElementById('cartOverlay');
  const drawer = overlay.querySelector('.drawer');
  if(open){
    overlay.classList.remove('hidden');
    requestAnimationFrame(()=>drawer.style.transform='translateX(0)');
  } else {
    drawer.style.transform='translateX(100%)';
    setTimeout(()=>overlay.classList.add('hidden'),500);
  }
}
function checkout(){
  if(cart.length===0){ showToast('Your stash is empty!'); return; }
  cart = []; saveCart(); renderCart();
  toggleCart(false);
  setTimeout(openOrder, 400);
}

/* ---------------- QUICK VIEW ---------------- */
function openQuickView(id){
  qvCurrent = PRODUCTS.find(p=>p.id===id);
  qvQtyVal = 1;
  document.getElementById('qvJar').innerHTML = `<div class="jar-wrap" style="width:150px" data-jar="${qvCurrent.id}"></div>`;
  paintJars();
  document.getElementById('qvTag').textContent = qvCurrent.tagline.toUpperCase();
  document.getElementById('qvName').textContent = qvCurrent.name;
  document.getElementById('qvDesc').textContent = qvCurrent.desc;
  document.getElementById('qvHeat').innerHTML = heatPips(qvCurrent.heat,8) + `<span class="text-xs text-ink/50 ml-1">${qvCurrent.heat}/10 heat</span>`;
  document.getElementById('qvPrice').textContent = '$'+qvCurrent.price.toFixed(2);
  document.getElementById('qvQty').textContent = qvQtyVal;
  const modal = document.getElementById('quickView');
  modal.classList.remove('hidden'); modal.classList.add('flex');
  requestAnimationFrame(()=>{
    modal.style.opacity='1';
    modal.querySelector('.modal-card').style.opacity='1';
    modal.querySelector('.modal-card').style.transform='scale(1)';
  });
}
function closeQuickView(){
  const modal = document.getElementById('quickView');
  modal.querySelector('.modal-card').style.opacity='0';
  modal.querySelector('.modal-card').style.transform='scale(.9)';
  setTimeout(()=>{ modal.classList.add('hidden'); modal.classList.remove('flex'); },300);
}
function qvChangeQty(delta){
  qvQtyVal = Math.max(1, qvQtyVal+delta);
  document.getElementById('qvQty').textContent = qvQtyVal;
}
function qvAddToCart(){
  addToCart(qvCurrent.id, qvQtyVal);
  closeQuickView();
}

/* ---------------- ORDER MODAL ---------------- */
function openOrder(){
  const modal = document.getElementById('orderModal');
  modal.classList.remove('hidden'); modal.classList.add('flex');
  requestAnimationFrame(()=>{
    modal.style.opacity='1';
    modal.querySelector('.modal-card').style.opacity='1';
    modal.querySelector('.modal-card').style.transform='scale(1)';
  });
}
function closeOrder(){
  const modal = document.getElementById('orderModal');
  modal.querySelector('.modal-card').style.opacity='0';
  modal.querySelector('.modal-card').style.transform='scale(.9)';
  setTimeout(()=>{ modal.classList.add('hidden'); modal.classList.remove('flex'); },300);
}

/* ---------------- TOAST ---------------- */
function showToast(msg){
  const box = document.getElementById('toastBox');
  const el = document.createElement('div');
  el.className = 'toast-in bg-ink border border-ember/50 text-cream px-5 py-3 rounded-xl shadow-hard text-sm font-semibold flex items-center gap-2';
  el.innerHTML = `<i class="fa-solid fa-fire text-ember"></i> ${msg}`;
  box.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateY(10px)'; el.style.transition='.4s'; setTimeout(()=>el.remove(),400); },2600);
}
function copyPromo(){
  navigator.clipboard?.writeText('HOTSPY20');
  showToast('Code HOTSPY20 copied!');
}

/* ---------------- HEAT SLIDER ---------------- */
function updateHeat(){
  const val = document.getElementById('heatSlider').value;
  const emojis = ['🧊','🥶','😌','🙂','😊','😅','🥵','🔥','🔥🔥','🔥🔥🔥','☠️'];
  document.getElementById('heatEmoji').textContent = emojis[val];
  const labels = ['NO HEAT','MILD','MILD','LIGHT','LIGHT-MED','MEDIUM','MEDIUM','HOT','HOT','VERY HOT','INSANE'];
  document.getElementById('heatLevelText').textContent = `${labels[val]} — ${val}/10`;
  const descs = [
    'You prefer zero heat — pure earthy warmth and color without any spice, perfect for lattes and gentle dishes.',
    'Just a whisper of warmth — great for building flavor bases without any real bite.',
    'A gentle background warmth that supports other flavors without stealing the show.',
    'A light, friendly spice level suited for everyday cooking and mild palates.',
    'Noticeable warmth with a pleasant, rounded kick — great for weeknight dinners.',
    'A confident kick that wakes up any curry, taco or stir-fry without overwhelming the dish.',
    'A solid, building heat that spice lovers will enjoy across most savory dishes.',
    'Serious heat that demands respect — reserved for those who love a real burn.',
    'Blazing intensity for the fearless — sweat-inducing and unforgettable.',
    'Near the edge of tolerable — for true chiliheads only.',
    'Maximum inferno. Proceed with extreme caution and a glass of milk nearby.'
  ];
  document.getElementById('heatDesc').textContent = descs[val];
  let rec = 'Turmeric Powder';
  if(val>=6) rec = 'Chilli Powder';
  else if(val>=3) rec = 'Cumin Powder';
  document.getElementById('heatRecommend').textContent = rec;
}

/* ---------------- USAGE TABS ---------------- */
function renderTabs(){
  const btnBox = document.getElementById('tabButtons');
  btnBox.innerHTML = PRODUCTS.map((p,i)=>`
    <button data-tab="${p.id}" onclick="switchTab('${p.id}')" class="tab-btn ${i===0?'active':''} px-5 py-2 rounded-full border border-white/20 text-sm font-bold tracking-widest transition"><i class="fa-solid ${p.icon} mr-2"></i>${p.name.split(' ')[0]}</button>
  `).join('');
  switchTab('chilli');
}
function switchTab(id){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active', b.dataset.tab===id));
  const u = USAGE[id];
  document.getElementById('tabContent').innerHTML = `<h3 class="font-display text-2xl mb-3">${u.title}</h3><p class="text-cream/70 max-w-xl mx-auto">${u.text}</p>`;
}

/* ---------------- REVIEWS ---------------- */
function renderReviews(){
  const track = document.getElementById('reviewTrack');
  track.innerHTML = REVIEWS.map(r=>`
    <div class="w-full shrink-0 px-2">
      <div class="bg-ink/50 border border-white/10 rounded-3xl p-8 text-center">
        <div class="text-gold text-lg mb-3">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
        <p class="text-cream/80 italic mb-4">"${r.text}"</p>
        <p class="font-bold tracking-widest text-sm">— ${r.name}</p>
      </div>
    </div>
  `).join('');
  const dots = document.getElementById('reviewDots');
  dots.innerHTML = REVIEWS.map((_,i)=>`<button onclick="goReview(${i})" class="rev-dot w-2.5 h-2.5 rounded-full ${i===0?'bg-ember':'bg-white/20'}"></button>`).join('');
}
function goReview(i){
  reviewIndex = i;
  document.getElementById('reviewTrack').style.transform = `translateX(-${i*100}%)`;
  document.querySelectorAll('.rev-dot').forEach((d,idx)=>d.classList.toggle('bg-ember', idx===i));
  document.querySelectorAll('.rev-dot').forEach((d,idx)=>d.classList.toggle('bg-white/20', idx!==i));
}
function reviewNav(delta){
  reviewIndex = (reviewIndex + delta + REVIEWS.length) % REVIEWS.length;
  goReview(reviewIndex);
}

/* ---------------- FAQ ---------------- */
function renderFAQ(){
  const list = document.getElementById('faqList');
  list.innerHTML = FAQS.map((f,i)=>`
    <div class="faq-item bg-coal border border-white/10 rounded-2xl overflow-hidden">
      <button onclick="toggleFAQ(${i})" class="w-full flex items-center justify-between p-5 text-left font-semibold">
        <span>${f.q}</span>
        <span class="faq-icon"><i class="fa-solid fa-plus"></i></span>
      </button>
      <div class="faq-ans px-5" id="faqAns-${i}"><p class="text-cream/60 pb-5">${f.a}</p></div>
    </div>
  `).join('');
}
function toggleFAQ(i){
  const items = document.querySelectorAll('.faq-item');
  const item = items[i];
  const ans = document.getElementById('faqAns-'+i);
  const isOpen = item.classList.contains('faq-open');
  items.forEach((it,idx)=>{
    it.classList.remove('faq-open');
    document.getElementById('faqAns-'+idx).style.maxHeight = '0px';
  });
  if(!isOpen){
    item.classList.add('faq-open');
    ans.style.maxHeight = ans.scrollHeight+'px';
  }
}

/* ---------------- SEARCH ---------------- */
function toggleSearch(open){
  const overlay = document.getElementById('searchOverlay');
  if(open){ overlay.classList.remove('hidden'); document.getElementById('searchInput').focus(); doSearch(); }
  else overlay.classList.add('hidden');
}
function doSearch(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  const results = PRODUCTS.filter(p=>p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q));
  document.getElementById('searchResults').innerHTML = results.map(p=>`
    <button onclick="jumpToProduct('${p.id}')" class="w-full flex items-center gap-4 text-left p-3 rounded-xl hover:bg-white/5 transition">
      <span class="w-12 h-14 rounded-lg flex items-center justify-center text-xl" style="background:${p.accent}22;color:${p.accent}"><i class="fa-solid ${p.icon}"></i></span>
      <span>
        <span class="block font-semibold">${p.name}</span>
        <span class="block text-cream/50 text-xs">$${p.price.toFixed(2)} • ${p.tagline}</span>
      </span>
    </button>
  `).join('') || `<p class="text-cream/40">No spices found.</p>`;
}
function jumpToProduct(id){
  toggleSearch(false);
  document.getElementById('shop').scrollIntoView({behavior:'smooth'});
  setTimeout(()=>openQuickView(id), 500);
}

/* ---------------- MOBILE NAV ---------------- */
function toggleMobileNav(open){
  const overlay = document.getElementById('mobileNav');
  const drawer = overlay.querySelector('.drawer');
  if(open){
    overlay.classList.remove('hidden');
    requestAnimationFrame(()=>drawer.style.transform='translateX(0)');
  } else {
    drawer.style.transform='translateX(100%)';
    setTimeout(()=>overlay.classList.add('hidden'),500);
  }
}

/* ---------------- NEWSLETTER ---------------- */
function subscribeNews(e){
  e.preventDefault();
  const email = document.getElementById('newsEmail').value;
  const msg = document.getElementById('newsMsg');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(re.test(email)){
    msg.textContent = 'Welcome to the file, agent. Check your inbox! 🔥';
    msg.className = 'mt-3 text-sm font-semibold text-ink';
    document.getElementById('newsletterForm').reset();
  } else {
    msg.textContent = 'Please enter a valid email address.';
    msg.className = 'mt-3 text-sm font-semibold text-ink/90';
  }
  return false;
}

/* ---------------- MARQUEE ---------------- */
function fillMarquee(){
  const text = PRODUCTS.map(p=>`<i class="fa-solid ${p.icon}"></i> ${p.name.toUpperCase()} &nbsp;•&nbsp; `).join('').repeat(3);
  document.getElementById('mqA').innerHTML = text;
  document.getElementById('mqB').innerHTML = text;
}

/* ---------------- SCROLL EFFECTS ---------------- */
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';
  const backTop = document.getElementById('backTop');
  if(h.scrollTop > 500){ backTop.style.opacity='1'; backTop.style.pointerEvents='auto'; }
  else { backTop.style.opacity='0'; backTop.style.pointerEvents='none'; }
});

/* ---------------- SCROLLSPY ---------------- */
const sections = ['shop','heat','bundle','story','reviews','faq'];
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.classList.remove('text-ember'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if(active) active.classList.add('text-ember');
    }
  });
},{ rootMargin:'-40% 0px -50% 0px' });
sections.forEach(id=>{ const el = document.getElementById(id); if(el) observer.observe(el); });

/* ---------------- LOADER ---------------- */
let pct = 0;
const loaderBar = document.getElementById('loaderBar');
const loaderPct = document.getElementById('loaderPct');
const loaderInterval = setInterval(()=>{
  pct += Math.random()*18;
  if(pct>=100){ pct=100; clearInterval(loaderInterval); }
  loaderBar.style.width = pct+'%';
  loaderPct.textContent = Math.floor(pct)+'%';
  if(pct===100){
    setTimeout(()=>document.getElementById('loader').classList.add('done'), 300);
  }
},180);

/* ---------------- INIT ---------------- */
paintJars();
renderProducts();
renderBundle();
renderTabs();
renderReviews();
renderFAQ();
renderCart();
fillMarquee();
updateHeat();
