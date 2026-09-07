// ============================================================
// KIYA — Shop Page (search, filters, grid)
// ============================================================

(function () {
  // State
  let state = {
    search: '',
    category: '',
    size: '',
    color: '',
    fabric: '',
    priceMin: 999,
    priceMax: 2499,
    sort: 'featured',
  };

  function init() {
    renderGrid();
    bindEvents();
  }

  // ── Render ──────────────────────────────────────────────

  function renderGrid() {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;

    let results = filterProducts(state);
    results = sortProducts(results, state.sort);

    const count = document.getElementById('result-count');
    if (count) count.textContent = `${results.length} product${results.length !== 1 ? 's' : ''}`;

    if (results.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <p>No products match your filters.</p>
          <button class="btn btn-outline btn-sm" onclick="resetFilters()">Clear Filters</button>
        </div>`;
      return;
    }

    grid.innerHTML = results.map(p => renderProductCard(p)).join('');

    // Animate cards in
    requestAnimationFrame(() => {
      grid.querySelectorAll('.product-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 60}ms`;
        card.classList.add('fade-up');
      });
    });
  }

  function renderProductCard(product) {
    const colorDots = product.colors.map(c =>
      `<span class="color-dot" style="background:${c.hex}" title="${c.name}"></span>`
    ).join('');

    return `
      <div class="product-card" data-id="${product.id}">
        ${product.isNew ? '<span class="badge-new">New</span>' : ''}
        <div class="product-card-img-wrap" onclick="openProductModal(${product.id})">
          <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy">
          <div class="product-card-overlay">
            <button class="btn btn-outline-light btn-sm quick-view-btn" onclick="event.stopPropagation(); openProductModal(${product.id})">
              Quick View
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <h3 class="product-card-name" onclick="openProductModal(${product.id})">${product.name}</h3>
          <p class="product-card-price">${formatPrice(product.price)}</p>
          <div class="product-card-colors">${colorDots}</div>
          <button class="btn btn-primary btn-sm add-to-cart-btn" onclick="handleAddToCart(event, ${product.id})">
            Add to Bag
          </button>
        </div>
      </div>`;
  }

  // ── Events ──────────────────────────────────────────────

  function bindEvents() {
    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        state.search = e.target.value.trim();
        renderGrid();
      });
    }

    // Sort
    const sortSel = document.getElementById('sort-select');
    if (sortSel) {
      sortSel.addEventListener('change', e => {
        state.sort = e.target.value;
        renderGrid();
      });
    }

    // Filter chips
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', function () {
        const type = this.dataset.filter;
        const val = this.dataset.value;

        if (state[type] === val) {
          state[type] = '';
          this.classList.remove('active');
        } else {
          document.querySelectorAll(`[data-filter="${type}"]`).forEach(b => b.classList.remove('active'));
          state[type] = val;
          this.classList.add('active');
        }
        renderGrid();
      });
    });

    // Price range
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    if (priceRange) {
      priceRange.addEventListener('input', e => {
        state.priceMax = parseInt(e.target.value);
        if (priceDisplay) priceDisplay.textContent = `₹999 – ${formatPrice(state.priceMax)}`;
        renderGrid();
      });
    }

    // Mobile filter toggle
    const filterToggle = document.getElementById('filter-toggle');
    const filterPanel = document.getElementById('filter-panel');
    if (filterToggle && filterPanel) {
      filterToggle.addEventListener('click', () => {
        filterPanel.classList.toggle('open');
        filterToggle.classList.toggle('active');
      });
    }
  }

  // ── Global expose ────────────────────────────────────────

  window.resetFilters = function () {
    state = { search: '', category: '', size: '', color: '', fabric: '', priceMin: 999, priceMax: 2499, sort: 'featured' };
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    const priceRange = document.getElementById('price-range');
    if (priceRange) priceRange.value = 2499;
    const priceDisplay = document.getElementById('price-display');
    if (priceDisplay) priceDisplay.textContent = '₹999 – ₹2,499';
    renderGrid();
  };

  window.handleAddToCart = function (event, productId) {
    const product = getProduct(productId);
    if (!product) return;
    // Default: first color, first size
    addToCart(productId, product.sizes[0], product.colors[0].name);
    flyToCart(event.currentTarget);
  };

  // ── Init when DOM is ready ───────────────────────────────
  document.addEventListener('DOMContentLoaded', init);
})();
