// ============================================================
// KIYA — App (global: nav, dark mode, modal, animations)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initHeader();
  initMobileNav();
  initScrollAnimations();
  initCartDrawer();
  updateCartBadge();

  // Page-specific inits
  if (document.getElementById('hero-section')) initHomepage();
  if (document.getElementById('cart-page')) initCartPage();
  if (document.getElementById('checkout-section')) initCheckout();
});

// ── Dark Mode ────────────────────────────────────────────────

function initDarkMode() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('kiya_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    root.setAttribute('data-theme', 'dark');
  }

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    updateThemeIcon(btn);
    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('kiya_theme', isDark ? 'light' : 'dark');
      document.querySelectorAll('.theme-toggle').forEach(updateThemeIcon);
    });
  });
}

function updateThemeIcon(btn) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  btn.innerHTML = isDark
    ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// ── Header (scroll shadow) ───────────────────────────────────

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Mobile Nav ───────────────────────────────────────────────

function initMobileNav() {
  const burger = document.querySelector('.burger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', closeMobileNav);
  }

  // Close on link click
  mobileNav && mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileNav);
  });
}

function closeMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Cart Drawer ──────────────────────────────────────────────

function initCartDrawer() {
  const cartBtns = document.querySelectorAll('.cart-btn');
  cartBtns.forEach(btn => btn.addEventListener('click', openCartDrawer));

  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.addEventListener('click', closeCartDrawer);

  const closeBtn = document.querySelector('.cart-drawer-close');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

  renderCartDrawer();
}

// ── Scroll Animations ────────────────────────────────────────

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Product Modal ────────────────────────────────────────────

function openProductModal(productId) {
  const product = getProduct(productId);
  if (!product) return;

  let modal = document.getElementById('product-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content product-modal-inner" role="dialog" aria-modal="true">
        <button class="modal-close" onclick="closeProductModal()" aria-label="Close">&times;</button>
        <div class="modal-body"></div>
      </div>`;
    modal.addEventListener('click', e => {
      if (e.target === modal) closeProductModal();
    });
    document.body.appendChild(modal);
  }

  const selectedColor = { name: product.colors[0].name, hex: product.colors[0].hex };
  let selectedSize = product.sizes[0];

  function renderModalBody() {
    const colorSwatches = product.colors.map(c => `
      <button class="color-swatch-btn ${c.name === selectedColor.name ? 'active' : ''}"
        style="--swatch-color:${c.hex}"
        title="${c.name}"
        onclick="selectModalColor('${product.id}','${c.name}','${c.hex}')">
        <span class="swatch-dot" style="background:${c.hex}"></span>
      </button>`).join('');

    const sizeButtons = product.sizes.map(s => `
      <button class="size-btn ${s === selectedSize ? 'active' : ''}"
        onclick="selectModalSize('${product.id}','${s}')">
        ${s}
      </button>`).join('');

    const reviewsHTML = product.reviews.map(r => `
      <div class="review-item">
        <div class="review-stars">${getStarHTML(r.rating)}</div>
        <p class="review-text">"${r.text}"</p>
        <p class="review-author">— ${r.author}</p>
      </div>`).join('');

    modal.querySelector('.modal-body').innerHTML = `
      <div class="modal-grid">
        <div class="modal-image-col">
          <img src="${product.image}" alt="${product.name}" class="modal-product-img">
        </div>
        <div class="modal-info-col">
          <p class="modal-category">${product.category} · ${product.fabric}</p>
          <h2 class="modal-product-name">${product.name}</h2>
          <p class="modal-product-price">${formatPrice(product.price)}</p>
          <p class="modal-description">${product.description}</p>

          <div class="modal-section">
            <p class="modal-label">Color — <span id="modal-color-name">${selectedColor.name}</span></p>
            <div class="color-swatches" id="modal-color-swatches">${colorSwatches}</div>
          </div>

          <div class="modal-section">
            <p class="modal-label">Size</p>
            <div class="size-buttons" id="modal-size-buttons">${sizeButtons}</div>
          </div>

          <div class="modal-section sustainability-note">
            <span class="leaf-icon">🌿</span>
            <p>${product.sustainability}</p>
          </div>

          <button class="btn btn-primary btn-full modal-add-btn" id="modal-add-btn"
            onclick="modalAddToCart(${product.id})">
            Add to Bag
          </button>

          <div class="modal-reviews">
            <h4 class="reviews-title">What our customers say</h4>
            ${reviewsHTML}
          </div>
        </div>
      </div>`;
  }

  window.selectModalColor = function (pid, name, hex) {
    if (pid != product.id) return;
    selectedColor.name = name;
    selectedColor.hex = hex;
    document.getElementById('modal-color-name').textContent = name;
    document.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.classList.toggle('active', btn.title === name);
    });
  };

  window.selectModalSize = function (pid, size) {
    if (pid != product.id) return;
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim() === size);
    });
  };

  window.modalAddToCart = function (pid) {
    addToCart(pid, selectedSize, selectedColor.name);
    const addBtn = document.getElementById('modal-add-btn');
    flyToCart(addBtn);
    addBtn.textContent = '✓ Added to Bag';
    addBtn.classList.add('added');
    setTimeout(() => {
      addBtn.textContent = 'Add to Bag';
      addBtn.classList.remove('added');
    }, 2000);
  };

  renderModalBody();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Keyboard close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProductModal();
    closeCartDrawer();
    closeMobileNav();
  }
});

// ── Homepage ─────────────────────────────────────────────────

function initHomepage() {
  renderNewArrivals();
}

function renderNewArrivals() {
  const grid = document.getElementById('new-arrivals-grid');
  if (!grid) return;

  const products = getNewArrivals(4);
  grid.innerHTML = products.map(p => {
    const colorDots = p.colors.map(c =>
      `<span class="color-dot" style="background:${c.hex}" title="${c.name}"></span>`
    ).join('');

    return `
      <div class="product-card reveal">
        <span class="badge-new">New</span>
        <div class="product-card-img-wrap" onclick="openProductModal(${p.id})">
          <img src="${p.image}" alt="${p.name}" class="product-card-img" loading="lazy">
          <div class="product-card-overlay">
            <button class="btn btn-outline-light btn-sm" onclick="event.stopPropagation(); openProductModal(${p.id})">Quick View</button>
          </div>
        </div>
        <div class="product-card-body">
          <h3 class="product-card-name" onclick="openProductModal(${p.id})">${p.name}</h3>
          <p class="product-card-price">${formatPrice(p.price)}</p>
          <div class="product-card-colors">${colorDots}</div>
          <button class="btn btn-primary btn-sm" onclick="handleAddToCartHome(event, ${p.id})">Add to Bag</button>
        </div>
      </div>`;
  }).join('');

  // Trigger reveal animations
  setTimeout(() => initScrollAnimations(), 50);
}

window.handleAddToCartHome = function (event, productId) {
  const product = getProduct(productId);
  if (!product) return;
  addToCart(productId, product.sizes[0], product.colors[0].name);
  flyToCart(event.currentTarget);
};

// ── Cart Page ────────────────────────────────────────────────

function initCartPage() {
  renderCartPageFull();
}

function renderCartPageFull() {
  const container = document.getElementById('cart-items-container');
  const summary = document.getElementById('cart-summary');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-page">
        <div class="cart-empty-icon-lg">🛍</div>
        <h2>Your bag is empty</h2>
        <p>Discover beautiful pieces made with nature in mind.</p>
        <a href="shop.html" class="btn btn-primary">Explore Collection</a>
      </div>`;
    if (summary) summary.style.display = 'none';
    return;
  }

  if (summary) summary.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-page-item" data-key="${item.key}">
      <img src="${item.image}" alt="${item.name}" class="cart-page-img">
      <div class="cart-page-details">
        <h3>${item.name}</h3>
        <p class="cart-page-meta">${item.size} · ${item.color}</p>
        <div class="qty-control">
          <button onclick="updateQtyPage('${item.key}', ${item.qty - 1})">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQtyPage('${item.key}', ${item.qty + 1})">+</button>
        </div>
      </div>
      <div class="cart-page-right">
        <p class="cart-page-price">${formatPrice(item.price * item.qty)}</p>
        <button class="remove-btn" onclick="removeFromCartPage('${item.key}')">Remove</button>
      </div>
    </div>`).join('');

  const totalEl = document.getElementById('cart-page-total');
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

window.updateQtyPage = function (key, qty) {
  updateQty(key, qty);
  renderCartPageFull();
};

window.removeFromCartPage = function (key) {
  removeFromCart(key);
  renderCartPageFull();
};

// ── Checkout ─────────────────────────────────────────────────

function initCheckout() {
  let currentStep = 1;
  const steps = document.querySelectorAll('.checkout-step');
  const stepIndicators = document.querySelectorAll('.step-indicator');

  function showStep(n) {
    currentStep = n;
    steps.forEach((s, i) => s.classList.toggle('active', i + 1 === n));
    stepIndicators.forEach((s, i) => {
      s.classList.toggle('active', i + 1 === n);
      s.classList.toggle('done', i + 1 < n);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.checkoutNext = function () { if (currentStep < 4) showStep(currentStep + 1); };
  window.checkoutBack = function () { if (currentStep > 1) showStep(currentStep - 1); };

  window.placeOrder = function () {
    const orderNum = 'KY' + Math.floor(100000 + Math.random() * 900000);
    const confirmSection = document.getElementById('order-confirm');
    if (confirmSection) {
      confirmSection.querySelector('.order-number').textContent = orderNum;
    }
    clearCart();
    showStep(4);
  };

  // Render order summary in checkout
  const summaryContainer = document.getElementById('checkout-cart-summary');
  if (summaryContainer) {
    const cart = getCart();
    summaryContainer.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}" class="checkout-item-img">
        <div>
          <p class="checkout-item-name">${item.name}</p>
          <p class="checkout-item-meta">${item.size} · ${item.color} × ${item.qty}</p>
        </div>
        <p class="checkout-item-price">${formatPrice(item.price * item.qty)}</p>
      </div>`).join('');

    const total = document.getElementById('checkout-total');
    if (total) total.textContent = formatPrice(getCartTotal());
  }

  showStep(1);
}
