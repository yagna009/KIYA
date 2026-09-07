# KIYA — Fashion Boutique Website

A static women's fashion boutique website built with **HTML5 · CSS3 · Vanilla JavaScript**.

🌿 **Live Demo:** [Deploy on Vercel](#deploy)

---

## Features

- 🛍 **4 pages** — Homepage, Shop, About, Cart + Checkout
- 🔍 **Smart search** — searches name, category, fabric, colour
- 🎛 **5 filters** — Category · Size · Colour · Fabric · Price range
- 🛒 **Persistent cart** — via `localStorage`
- ✨ **Fly-to-cart animation** + toast notifications
- 🌙 **Dark mode** — with system preference detection + localStorage
- 📱 **Fully responsive** — mobile-first design
- 🖼 **AI-generated imagery** — natural fashion photography
- 💳 **Mock checkout** — 4-step flow with order confirmation
- 🎨 **Premium animations** — scroll reveals, hover effects, modal springs

## Tech Stack

- HTML5
- CSS3 (custom properties, animations, responsive)
- Vanilla JavaScript (no libraries, no frameworks)
- `localStorage` for cart + theme persistence

## Products

| Product | Category | Price |
|---------|----------|-------|
| Meadow Linen Dress | Dresses | ₹2,299 |
| Saanvi Cotton Dress | Dresses | ₹1,999 |
| Bloom Everyday Top | Tops | ₹1,299 |
| Aira Relaxed Top | Tops | ₹1,199 |
| Terra Midi Skirt | Skirts | ₹1,699 |
| Noor Handcrafted Top | Handcrafted | ₹2,499 |

## Project Structure

```
kiya/
├── index.html       # Homepage
├── shop.html        # Shop with filters + search
├── about.html       # About + Sustainability
├── cart.html        # Cart + Mock Checkout
├── css/
│   └── style.css    # Complete design system
├── js/
│   ├── products.js  # Product data + helpers
│   ├── app.js       # Global: nav, modal, dark mode
│   ├── cart.js      # Cart logic (localStorage)
│   └── shop.js      # Search + filter + grid
└── images/
    ├── products/    # 6 product images
    ├── hero/        # 3 hero split-screen images
    └── ...          # Collection + about images
```

## Deploy

### Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import from GitHub
4. Framework preset: **Other**
5. Build command: *(leave empty)*
6. Output directory: `.`
7. Click **Deploy** ✓

No build step needed — it's a static site.

---

*KIYA — Made With Nature. This is a demo website.*
