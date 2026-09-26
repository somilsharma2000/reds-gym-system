/* ============================================================
   OXIGEN FITNESS — CANONICAL CLIENT SYSTEM SCRIPT
   Renders site.config.js content slots, wires WhatsApp deep
   links, class timetable filter, UPI trial link, reviews badge.
   Lead capture + QR + portal links are handled by gym-os-connect.js.
   ============================================================ */
(function () {
  const config = window.REDS_SITE_CONFIG || {};
  const byId = (id) => document.getElementById(id);

  function text(id, value) { const el = byId(id); if (el && value) el.textContent = value; }
  function esc(s) { const d = document.createElement('div'); d.textContent = String(s || ''); return d.innerHTML; }

  function waHref(message) {
    const num = (config.whatsapp || '').replace(/[^\d]/g, '');
    if (!num) return null;
    return 'https://wa.me/' + num + (message ? '?text=' + encodeURIComponent(message) : '');
  }

  /* ---------- Contact wiring ---------- */
  function setContact(key, value) {
    document.querySelectorAll('[data-contact="' + key + '"]').forEach((el) => {
      if (!value) return;
      let href;
      if (key === 'whatsApp') href = waHref(config.whatsappPreFill || 'Hi ' + config.brandName + '!');
      else if (key === 'email') href = 'mailto:' + value;
      else href = value;
      if (!href) return;
      el.setAttribute('href', href);
      el.removeAttribute('hidden');
    });
  }

  /* ---------- Timetable: render + filter ---------- */
  function renderClasses() {
    const grid = byId('class-grid');
    const filters = byId('class-filters');
    if (!grid || !config.classes) return;

    const categories = ['All'].concat([...new Set(config.classes.map((c) => c.category))]);

    categories.forEach((cat, i) => {
      const chip = document.createElement('button');
      chip.className = 'chip' + (i === 0 ? ' active' : '');
      chip.setAttribute('role', 'tab');
      chip.textContent = cat;
      chip.addEventListener('click', () => {
        filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        grid.querySelectorAll('.class-card').forEach((card) => {
          const match = cat === 'All' || card.dataset.category === cat;
          card.classList.toggle('hidden-by-filter', !match);
        });
      });
      filters.appendChild(chip);
    });

    config.classes.forEach((cls) => {
      const card = document.createElement('article');
      card.className = 'class-card';
      card.dataset.category = cls.category;
      card.setAttribute('data-reveal', 'up');
      const bookMsg = 'Hi ' + (config.brandName || '') + '! I want to book a spot in "' + cls.name + '" (' + cls.time + ').';
      const bookHref = waHref(bookMsg) || '#trial';
      card.innerHTML =
        '<div class="class-meta"><span class="class-badge">' + esc(cls.category.toUpperCase()) + '</span>' +
        '<span class="class-time">' + esc(cls.time) + '</span></div>' +
        '<h3>' + esc(cls.name) + '</h3>' +
        '<p>' + esc(cls.desc) + '</p>' +
        '<a class="book-spot" href="' + bookHref + '"' + (bookHref.startsWith('https') ? ' target="_blank" rel="noopener"' : '') + '>Book a spot via WhatsApp →</a>';
      grid.appendChild(card);
    });
  }

  /* ---------- Coaches (config-driven, never invented) ---------- */
  function renderTrainers() {
    const grid = byId('trainers-grid');
    if (!grid) return;
    const list = config.trainers || [];
    if (!list.length) {
      grid.innerHTML =
        '<article class="trainer-card" data-reveal="up">' +
        '<div class="trainer-avatar">☎</div>' +
        '<span class="trainer-role">MEET THE TEAM</span>' +
        '<h3>Our coaching team</h3>' +
        '<p class="trainer-bio">Certified coaches run every session on the floor — strength, conditioning and mobility. Meet them in person on a trial visit.</p>' +
        '<a class="book-spot" href="#trial">Book a trial to meet the coaches →</a></article>';
      return;
    }
    list.forEach((t) => {
      const initials = (t.name || '').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
      const card = document.createElement('article');
      card.className = 'trainer-card';
      card.setAttribute('data-reveal', 'up');
      const chatHref = waHref('Hi ' + (config.brandName || '') + '! I would like to train with ' + t.name + '.');
      card.innerHTML =
        '<div class="trainer-avatar">' + esc(initials || '★') + '</div>' +
        '<span class="trainer-role">' + esc((t.role || '').toUpperCase()) + '</span>' +
        '<h3>' + esc(t.name) + '</h3>' +
        '<p class="trainer-bio">' + esc(t.bio || '') + '</p>' +
        ((t.tags || []).length ? '<div class="trainer-tags">' + t.tags.map((x) => '<span>' + esc(x) + '</span>').join('') + '</div>' : '') +
        (chatHref ? '<a class="book-spot" href="' + chatHref + '" target="_blank" rel="noopener">Chat about training with ' + esc(t.name.split(' ')[0]) + ' →</a>' : '');
      grid.appendChild(card);
    });
  }

  /* ---------- Membership plans (₹, owner-approved only) ---------- */
  function renderPlans() {
    const grid = byId('plans-grid');
    if (!grid) return;
    const plans = config.plans || [];
    if (!plans.length) {
      grid.innerHTML =
        '<article class="membership-card" data-reveal="up">' +
        '<p class="card-kicker">MEMBERSHIPS</p>' +
        '<h3>Plans built around you</h3>' +
        '<p class="plan-desc">Membership options are confirmed on your visit — transparent pricing, no lock-in contracts, UPI accepted.</p>' +
        '<ul class="plan-features"><li>Gym OS member portal included</li><li>Touchless QR check-in</li><li>WhatsApp-first support</li></ul>' +
        '<a class="button button-ghost" href="#trial">Ask about memberships <span>↗</span></a></article>';
      return;
    }
    plans.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'membership-card';
      card.setAttribute('data-reveal', 'up');
      card.innerHTML =
        (p.popular ? '<div class="popular-badge">MOST POPULAR</div>' : '') +
        '<p class="card-kicker">' + esc((p.kicker || '').toUpperCase()) + '</p>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<div class="price-tag"><span class="amount">₹' + esc(p.price) + '</span><span class="period">' + esc(p.period || '/month') + '</span></div>' +
        '<p class="plan-desc">' + esc(p.desc || '') + '</p>' +
        '<ul class="plan-features">' + (p.features || []).map((f) => '<li>' + esc(f) + '</li>').join('') + '</ul>' +
        '<a class="button ' + (p.popular ? 'button-primary' : 'button-ghost') + '" href="#trial">Get this plan <span>↗</span></a>';
      grid.appendChild(card);
    });
  }

  /* ---------- Google reviews badge (honest: only if data exists) ---------- */
  function renderReviews() {
    if (!config.googleRating || config.googleRating <= 0) return;
    const box = byId('reviews-badge');
    if (!box) return;
    byId('reviews-rating').textContent = config.googleRating.toFixed(1);
    byId('reviews-count').textContent = (config.googleReviewCount || 0).toLocaleString('en-IN');
    byId('reviews-stars').textContent = '★★★★★';
    const link = byId('reviews-link');
    if (config.mapsUrl) link.setAttribute('href', config.mapsUrl); else link.removeAttribute('target');
    box.removeAttribute('hidden');
  }

  /* ---------- UPI trial pass (deep link, only if configured) ---------- */
  function renderUpi() {
    if (!config.upiId) return;
    const box = byId('upi-trial');
    if (!box) return;
    const amount = Number(config.trialPass && config.trialPass.price) || 0;
    const link = byId('upi-link');
    const params = new URLSearchParams({ pa: config.upiId, pn: config.whatsappName || config.brandName, cu: 'INR' });
    if (amount > 0) params.set('am', amount);
    params.set('tn', (config.trialPass && config.trialPass.label) || 'Trial Pass');
    link.setAttribute('href', 'upi://pay?' + params.toString());
    byId('upi-label').textContent =
      (config.trialPass && config.trialPass.note ? config.trialPass.note + ' · ' : '') +
      (amount > 0 ? '₹' + amount + ' via any UPI app' : 'Free — just confirm on WhatsApp');
    box.removeAttribute('hidden');
  }

  /* ---------- Floating WhatsApp widget ---------- */
  function renderWidget() {
    const widget = byId('wa-float');
    const href = waHref(config.whatsappPreFill);
    if (widget && href) {
      widget.setAttribute('href', href);
      byId('wa-float-label').textContent = 'Chat with ' + (config.brandName || 'the club');
    } else if (widget) {
      widget.setAttribute('hidden', '');
    }
  }

  /* ---------- Header contact + labels ---------- */
  function applyConfig() {
    text('brand-name', config.brandName);
    text('footer-brand', config.brandName);
    text('location-label', (config.locationLabel || '') + ' · ' + (config.tagline || 'MEMBER-LED TRAINING'));
    text('public-description', config.description);
    setContact('whatsApp', config.whatsapp);
    setContact('instagramUrl', config.instagram);
    setContact('email', config.email);
    text('footer-address', '📍 ' + (config.address || ''));
    text('footer-phone', '📞 ' + (config.phone || ''));
    text('contact-note', [config.address, config.phone].filter(Boolean).join(' · '));
  }

  applyConfig();
  renderClasses();
  renderTrainers();
  renderPlans();
  renderReviews();
  renderUpi();
  renderWidget();
})();
