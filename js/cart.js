// ============================================================
// KIYA — Cart Logic (localStorage)
// ============================================================

const CART_KEY = 'kiya_cart';

// ── Core cart operations ────────────────────────────────────

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function addToCart(productId, size, color, qty = 1) {
  const cart = getCart();
  const product = getProduct(productId);
  if (!product) return;

  const key = `${productId}-${size}-${color}`;
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key,
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      qty,
    });
  }

  saveCart(cart);
  showAddedToast(product.name);
}

function removeFromCart(key) {
  const cart = getCart().filter(item => item.key !== key);
  saveCart(cart);
}

function updateQty(key, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  if (newQty <= 0) {
    removeFromCart(key);
    return;
  }
  item.qty = newQty;
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
  renderCartDrawer();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// ── Badge ───────────────────────────────────────────────────

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ── Toast ───────────────────────────────────────────────────

function showAddedToast(name) {
  let toast = document.getElementById('kiya-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'kiya-toast';
    toast.className = 'kiya-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-check">✓</span> <strong>${name}</strong> added to your bag`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Fly-to-cart animation ───────────────────────────────────

function flyToCart(sourceEl) {
  const cartIcon = document.querySelector('.cart-btn');
  if (!cartIcon || !sourceEl) return;

  const srcRect = sourceEl.getBoundingClientRect();
  const tgtRect = cartIcon.getBoundingClientRect();

  const flyer = document.createElement('div');
  flyer.className = 'cart-flyer';
  flyer.style.cssText = `
    position: fixed;
    left: ${srcRect.left + srcRect.width / 2}px;
    top: ${srcRect.top + srcRect.height / 2}px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--sage);
    z-index: 9999;
    pointer-events: none;
    transition: all 0.7s cubic-bezier(0.2, 1, 0.3, 1);
  `;
  document.body.appendChild(flyer);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flyer.style.left = `${tgtRect.left + tgtRect.width / 2}px`;
      flyer.style.top = `${tgtRect.top + tgtRect.height / 2}px`;
      flyer.style.opacity = '0';
      flyer.style.transform = 'scale(0.3)';
    });
  });

  setTimeout(() => flyer.remove(), 800);
}

// ── Cart Drawer ─────────────────────────────────────────────

function renderCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  const cart = getCart();
  const body = drawer.querySelector('.cart-drawer-body');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛍</div>
        <p>Your bag is empty</p>
        <a href="shop.html" class="btn btn-primary btn-sm" onclick="closeCartDrawer()">Explore Collection</a>
      </div>`;
    const footer = drawer.querySelector('.cart-drawer-footer');
    if (footer) footer.style.display = 'none';
    return;
  }

  const footer = drawer.querySelector('.cart-drawer-footer');
  if (footer) footer.style.display = 'block';

  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">${item.size} · ${item.color}</p>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button onclick="updateQty('${item.key}', ${item.qty - 1})" aria-label="Decrease">−</button>
            <span>${item.qty}</span>
            <button onclick="updateQty('${item.key}', ${item.qty + 1})" aria-label="Increase">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.key}')" aria-label="Remove">✕</button>
        </div>
      </div>
      <p class="cart-item-price">${formatPrice(item.price * item.qty)}</p>
    </div>
  `).join('');

  const totalEl = drawer.querySelector('.cart-total-amount');
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';
}
