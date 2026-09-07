// ============================================================
// KIYA — Product Data Store
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    slug: 'meadow-linen-dress',
    name: 'Meadow Linen Dress',
    price: 2299,
    category: 'Dresses',
    fabric: 'Linen',
    image: 'images/products/meadow-linen-dress.jpg',
    colors: [
      { name: 'Sage', hex: '#8BAF8B' },
      { name: 'Ivory', hex: '#F5F0E8' },
      { name: 'Natural', hex: '#C8B89A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Crafted from 100% breathable linen, the Meadow Dress moves effortlessly with you. Its tiered midi silhouette and gentle V-neckline make it the perfect piece for sunlit mornings and golden evenings alike.',
    sustainability:
      'Made from certified natural linen, biodegradable and naturally temperature-regulating. Dyed with low-impact plant-based pigments.',
    collections: ['Natural Fabrics', 'The Everyday Edit'],
    isNew: true,
    reviews: [
      { author: 'Priya M.', rating: 5, text: 'Absolutely love this dress. The linen is so soft and the fit is perfect. Wore it to a garden party and got so many compliments!' },
      { author: 'Ananya S.', rating: 5, text: 'The fabric quality is exceptional. It keeps you cool even in the heat. Will be ordering in Ivory too.' },
      { author: 'Ritu K.', rating: 4, text: 'Beautiful dress, exactly as shown. The sage colour is gorgeous in person. Sizing runs slightly large.' },
    ],
  },
  {
    id: 2,
    slug: 'saanvi-cotton-dress',
    name: 'Saanvi Cotton Dress',
    price: 1999,
    category: 'Dresses',
    fabric: 'Organic Cotton',
    image: 'images/products/saanvi-cotton-dress.jpg',
    colors: [
      { name: 'Blush', hex: '#E8B4A0' },
      { name: 'Ivory', hex: '#F5F0E8' },
      { name: 'Terracotta', hex: '#C4714F' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'The Saanvi Dress is a celebration of Indian block-print tradition, reimagined in flowing organic cotton. Its relaxed tiered silhouette and delicate hand-printed motifs carry the warmth of artisan hands.',
    sustainability:
      'Crafted from GOTS-certified organic cotton. Block printing uses natural vegetable dyes in a water-conscious process.',
    collections: ['The Artisan Edit', 'The Everyday Edit'],
    isNew: true,
    reviews: [
      { author: 'Meera T.', rating: 5, text: 'The block print is so delicate and beautiful. You can feel the handcrafted quality in every detail.' },
      { author: 'Kavya R.', rating: 5, text: 'Ordered the blush — it is the most flattering shade. Fabric is lightweight and breathable.' },
      { author: 'Divya P.', rating: 4, text: 'Gorgeous dress. The print is even more beautiful in person. Delivery was also very fast.' },
    ],
  },
  {
    id: 3,
    slug: 'bloom-everyday-top',
    name: 'Bloom Everyday Top',
    price: 1299,
    category: 'Tops',
    fabric: 'Cotton',
    image: 'images/products/bloom-everyday-top.jpg',
    colors: [
      { name: 'Sage', hex: '#8BAF8B' },
      { name: 'Blush', hex: '#E8B4A0' },
      { name: 'Natural', hex: '#C8B89A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Your everyday favourite, elevated. The Bloom Top in soft cotton features a delicate embroidered neckline and a relaxed silhouette that pairs beautifully with everything from linen trousers to your favourite skirt.',
    sustainability:
      'Made from soft organic cotton. Embroidery threads are natural-dyed. Designed to last through many seasons of wear.',
    collections: ['The Everyday Edit', 'Natural Fabrics'],
    isNew: true,
    reviews: [
      { author: 'Sneha L.', rating: 5, text: 'Bought this on a whim and it is now my most-worn top. So comfortable and the embroidery is delicate and lovely.' },
      { author: 'Pooja V.', rating: 4, text: 'Nice quality top. The sage colour is exactly as shown. Would love to see more colour options.' },
      { author: 'Aisha B.', rating: 5, text: 'Perfect everyday top. Light, airy, and so well made. The embroidery detail elevates the whole look.' },
    ],
  },
  {
    id: 4,
    slug: 'aira-relaxed-top',
    name: 'Aira Relaxed Top',
    price: 1199,
    category: 'Tops',
    fabric: 'Linen',
    image: 'images/products/aira-relaxed-top.jpg',
    colors: [
      { name: 'Ivory', hex: '#F5F0E8' },
      { name: 'Natural', hex: '#C8B89A' },
      { name: 'Olive', hex: '#7D8C5A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'The Aira Top embodies effortless ease. With its wide neckline, subtle front tucks, and boxy linen construction, it drapes beautifully on every body. Wear it tucked in or loose for a perfectly undone look.',
    sustainability:
      'Pure European linen, grown without pesticides. A naturally durable fabric that only gets softer with each wash.',
    collections: ['Natural Fabrics', 'The Everyday Edit'],
    isNew: false,
    reviews: [
      { author: 'Tara N.', rating: 5, text: 'The most perfect linen top. Washes beautifully and the fabric softens with each wear. Highly recommend.' },
      { author: 'Sonia G.', rating: 4, text: 'Love the relaxed fit. The ivory is a true ivory, not too warm or cool. Great quality.' },
      { author: 'Nandita H.', rating: 5, text: 'Bought this for a holiday and wore it every single day. Packs light and looks amazing.' },
    ],
  },
  {
    id: 5,
    slug: 'terra-midi-skirt',
    name: 'Terra Midi Skirt',
    price: 1699,
    category: 'Skirts',
    fabric: 'Cotton',
    image: 'images/products/terra-midi-skirt.jpg',
    colors: [
      { name: 'Terracotta', hex: '#C4714F' },
      { name: 'Olive', hex: '#7D8C5A' },
      { name: 'Natural', hex: '#C8B89A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Earthy, expressive, and effortlessly beautiful. The Terra Skirt in tiered cotton celebrates warm natural tones with a flowing silhouette that moves like a gentle breeze. A piece that feels like the earth and sky together.',
    sustainability:
      'Woven from organic cotton in traditional handloom techniques. Each piece has subtle natural variation — a mark of genuine craftsmanship.',
    collections: ['The Artisan Edit', 'Natural Fabrics'],
    isNew: false,
    reviews: [
      { author: 'Lalita C.', rating: 5, text: 'This skirt is everything. The terracotta colour is stunning and the tiers give it such beautiful movement.' },
      { author: 'Mira S.', rating: 5, text: 'Fabric feels luxurious. The waist band is comfortable all day. Would definitely buy again.' },
      { author: 'Jaya P.', rating: 4, text: 'Beautiful skirt. Length is perfect for a midi. Pairs well with simple tops and sandals.' },
    ],
  },
  {
    id: 6,
    slug: 'noor-handcrafted-top',
    name: 'Noor Handcrafted Top',
    price: 2499,
    category: 'Handcrafted',
    fabric: 'Handwoven',
    image: 'images/products/noor-handcrafted-top.jpg',
    colors: [
      { name: 'Ivory', hex: '#F5F0E8' },
      { name: 'Natural', hex: '#C8B89A' },
      { name: 'Blush', hex: '#E8B4A0' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'The Noor Top is a labour of love — handwoven on traditional looms and embellished with intricate Indian-inspired embroidery and mirror work. Each piece is unique, carrying the story of the artisan who made it.',
    sustainability:
      'Handwoven by skilled artisans using traditional techniques. Supports fair-wage craft communities. Fabric is naturally processed without chemical treatments.',
    collections: ['The Artisan Edit'],
    isNew: true,
    reviews: [
      { author: 'Asha R.', rating: 5, text: 'Absolutely breathtaking. The embroidery is so intricate and detailed. Worth every rupee.' },
      { author: 'Preeti W.', rating: 5, text: 'I have never received so many compliments on a piece of clothing. The mirror work catches the light beautifully.' },
      { author: 'Kamala D.', rating: 5, text: 'A true artisan piece. You can feel the quality and the care that went into making it. My favourite KIYA piece.' },
    ],
  },
];

// ── Helper functions ────────────────────────────────────────

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

function getNewArrivals(count = 4) {
  return PRODUCTS.filter(p => p.isNew).slice(0, count);
}

function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function filterProducts({ category, size, color, fabric, priceMin, priceMax, search, collection } = {}) {
  return PRODUCTS.filter(p => {
    if (category && p.category !== category) return false;
    if (fabric && p.fabric !== fabric) return false;
    if (collection && !p.collections.includes(collection)) return false;
    if (color && !p.colors.some(c => c.name.toLowerCase() === color.toLowerCase())) return false;
    if (size && !p.sizes.includes(size)) return false;
    if (priceMin !== undefined && p.price < priceMin) return false;
    if (priceMax !== undefined && p.price > priceMax) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q) &&
        !p.fabric.toLowerCase().includes(q) &&
        !p.colors.some(c => c.name.toLowerCase().includes(q)) &&
        !p.description.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });
}

function sortProducts(products, sortBy = 'featured') {
  const arr = [...products];
  switch (sortBy) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'newest':     return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    default:           return arr;
  }
}

function getStarHTML(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star${i < rating ? ' filled' : ''}">★</span>`
  ).join('');
}
