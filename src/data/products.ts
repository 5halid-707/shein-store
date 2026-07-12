import type { Category, Product } from "@/types";

export const CATEGORIES: Category[] = [
  { slug: "women", name: "نسائي", nameEn: "Women", icon: "👗" },
  { slug: "men", name: "رجالي", nameEn: "Men", icon: "👔" },
  { slug: "kids", name: "أطفال", nameEn: "Kids", icon: "🧸" },
  { slug: "beauty", name: "تجميل", nameEn: "Beauty", icon: "💄" },
  { slug: "home", name: "منزل", nameEn: "Home", icon: "🏠" },
  { slug: "accessories", name: "إكسسوارات", nameEn: "Accessories", icon: "⌚" },
];

export const TRENDING_CATEGORIES = [
  { slug: "women", name: "فساتين", icon: "👗", count: 320 },
  { slug: "men", name: "قمصان", icon: "👔", count: 180 },
  { slug: "women", name: "أحذية", icon: "👠", count: 250 },
  { slug: "accessories", name: "حقائب", icon: "👜", count: 145 },
  { slug: "beauty", name: "مكياج", icon: "💄", count: 210 },
  { slug: "accessories", name: "ساعات", icon: "⌚", count: 95 },
  { slug: "accessories", name: "نظارات", icon: "🕶️", count: 70 },
  { slug: "women", name: "إكسسوارات", icon: "💍", count: 160 },
];

const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/750`;
const gallery = (seed: string) => [
  `https://picsum.photos/seed/${seed}-1/600/750`,
  `https://picsum.photos/seed/${seed}-2/600/750`,
  `https://picsum.photos/seed/${seed}-3/600/750`,
  `https://picsum.photos/seed/${seed}-4/600/750`,
  `https://picsum.photos/seed/${seed}-5/600/750`,
];

const mk = (p: Partial<Product> & { id: string; title: string; category: any; price: number }): Product => {
  const price = p.price;
  const oldPrice = p.oldPrice ?? Math.round(price * (1 + (p.discount ?? 30) / 100));
  const discount = p.discount ?? Math.round(((oldPrice - price) / oldPrice) * 100);
  return {
    subcategory: "",
    image: img(p.id),
    images: gallery(p.id),
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "أبيض", hex: "#ffffff" },
      { name: "وردي", hex: "#ee296d" },
    ],
    description:
      "منتج عصري ذو جودة عالية ومصنوع من أجود الخامات. تصميم أنيق يناسب جميع المناسبات ويمنحك إطلالة مميزة. ماركة KMH Fashion.",
    rating: 4.5,
    reviewsCount: 120,
    reviews: [
      {
        id: "r1",
        user: "أحمد م.",
        rating: 5,
        date: "2025-05-12",
        comment: "منتج رائع وجودة ممتازة! التوصيل كان سريع جداً.",
      },
      {
        id: "r2",
        user: "نورة س.",
        rating: 4,
        date: "2025-04-28",
        comment: "السلمة كما هي موصوفة والمقاس مظبوط. أنصح به.",
      },
      {
        id: "r3",
        user: "خالد ع.",
        rating: 5,
        date: "2025-04-15",
        comment: "أفضل تجربة تسوق! تعامل محترم وجودة عالية.",
      },
    ],
    stock: 50,
    brand: "KMH Fashion",
    tags: [],
    oldPrice,
    discount,
    ...p,
  } as Product;
};

export const PRODUCTS: Product[] = [
  // ===== WOMEN =====
  mk({
    id: "w-dress-01",
    title: "فستان سهرة طويل مطرز بكتف واحد",
    category: "women",
    subcategory: "فساتين",
    price: 249,
    oldPrice: 399,
    discount: 38,
    isFlashSale: true,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "أحمر", hex: "#c0392b" },
      { name: "كحلي", hex: "#1e3a8a" },
    ],
    rating: 4.8,
    reviewsCount: 234,
    tags: ["سهرة", "مطرز", "أنيق"],
  }),
  mk({
    id: "w-dress-02",
    title: "فستان صيفي بنقشة زهرية قصير",
    category: "women",
    subcategory: "فساتين",
    price: 129,
    oldPrice: 199,
    discount: 35,
    isNewArrival: true,
    colors: [
      { name: "وردي", hex: "#ee296d" },
      { name: "أصفر", hex: "#f1c40f" },
    ],
    rating: 4.6,
    reviewsCount: 89,
  }),
  mk({
    id: "w-top-01",
    title: "بلوزة حريرية بأكمام منفوشة",
    category: "women",
    subcategory: "بلوزات",
    price: 89,
    oldPrice: 149,
    discount: 40,
    isFlashSale: true,
    colors: [
      { name: "أبيض", hex: "#ffffff" },
      { name: "بيج", hex: "#e8d8c4" },
      { name: "أسود", hex: "#000000" },
    ],
    rating: 4.4,
    reviewsCount: 156,
  }),
  mk({
    id: "w-pants-01",
    title: "بنطال واسع بقصة عالية الخصر",
    category: "women",
    subcategory: "بناطيل",
    price: 119,
    oldPrice: 179,
    discount: 34,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "بيج", hex: "#e8d8c4" },
      { name: "أسود", hex: "#000000" },
      { name: "كحلي", hex: "#1e3a8a" },
    ],
    rating: 4.7,
    reviewsCount: 201,
  }),
  mk({
    id: "w-shoes-01",
    title: "حذاء كعب عالي جلدي أنيق",
    category: "women",
    subcategory: "أحذية",
    price: 199,
    oldPrice: 299,
    discount: 33,
    isFlashSale: true,
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "أحمر", hex: "#c0392b" },
      { name: "ذهبي", hex: "#d4af37" },
    ],
    rating: 4.5,
    reviewsCount: 178,
  }),
  mk({
    id: "w-bag-01",
    title: "حقيبة يد جلدية فاخرة بكتف",
    category: "women",
    subcategory: "حقائب",
    price: 159,
    oldPrice: 259,
    discount: 39,
    isBestSeller: true,
    isNewArrival: true,
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "بني", hex: "#8b5e3c" },
      { name: "وردي", hex: "#ee296d" },
    ],
    rating: 4.9,
    reviewsCount: 312,
  }),
  mk({
    id: "w-dress-03",
    title: "فستان مكسي قصير بأزرار أمامية",
    category: "women",
    subcategory: "فساتين",
    price: 99,
    oldPrice: 159,
    discount: 38,
    colors: [
      { name: "بيج", hex: "#e8d8c4" },
      { name: "أخضر", hex: "#27ae60" },
    ],
    rating: 4.3,
    reviewsCount: 67,
  }),
  mk({
    id: "w-skirt-01",
    title: "تنورة بليسيه طويلة بطبقات",
    category: "women",
    subcategory: "تنانير",
    price: 109,
    oldPrice: 169,
    discount: 36,
    isNewArrival: true,
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "وردي", hex: "#ee296d" },
    ],
    rating: 4.6,
    reviewsCount: 94,
  }),

  // ===== MEN =====
  mk({
    id: "m-shirt-01",
    title: "قميص قطني كلاسيكي بأكمام طويلة",
    category: "men",
    subcategory: "قمصان",
    price: 119,
    oldPrice: 189,
    discount: 37,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "أبيض", hex: "#ffffff" },
      { name: "أزرق فاتح", hex: "#85c1e9" },
      { name: "أسود", hex: "#000000" },
    ],
    rating: 4.7,
    reviewsCount: 245,
  }),
  mk({
    id: "m-shirt-02",
    title: "قميص بولو رياضي بأكمام قصيرة",
    category: "men",
    subcategory: "قمصان",
    price: 89,
    oldPrice: 139,
    discount: 36,
    isFlashSale: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "كحلي", hex: "#1e3a8a" },
      { name: "أسود", hex: "#000000" },
      { name: "أخضر", hex: "#27ae60" },
    ],
    rating: 4.5,
    reviewsCount: 132,
  }),
  mk({
    id: "m-pants-01",
    title: "بنطال جينز بقصة مستقيمة غامق",
    category: "men",
    subcategory: "بناطيل",
    price: 149,
    oldPrice: 229,
    discount: 35,
    isBestSeller: true,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "كحلي", hex: "#1e3a8a" },
      { name: "أسود", hex: "#000000" },
    ],
    rating: 4.6,
    reviewsCount: 198,
  }),
  mk({
    id: "m-shoes-01",
    title: "حذاء رياضي عصري للجري",
    category: "men",
    subcategory: "أحذية",
    price: 199,
    oldPrice: 329,
    discount: 40,
    isFlashSale: true,
    isNewArrival: true,
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "أبيض", hex: "#ffffff" },
      { name: "رمادي", hex: "#7f8c8d" },
    ],
    rating: 4.8,
    reviewsCount: 287,
  }),
  mk({
    id: "m-jacket-01",
    title: "جاكيت جلدي بتصميم كلاسيكي",
    category: "men",
    subcategory: "جواكيت",
    price: 299,
    oldPrice: 449,
    discount: 33,
    isBestSeller: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "بني", hex: "#8b5e3c" },
      { name: "أسود", hex: "#000000" },
    ],
    rating: 4.7,
    reviewsCount: 154,
  }),
  mk({
    id: "m-tshirt-01",
    title: "تيشيرت قطني برسمة جرافيك",
    category: "men",
    subcategory: "تيشيرتات",
    price: 59,
    oldPrice: 99,
    discount: 40,
    isNewArrival: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "أبيض", hex: "#ffffff" },
      { name: "رمادي", hex: "#7f8c8d" },
    ],
    rating: 4.4,
    reviewsCount: 78,
  }),

  // ===== KIDS =====
  mk({
    id: "k-dress-01",
    title: "فستان بناتي بنقشة زهرية مرن",
    category: "kids",
    subcategory: "ملابس بنات",
    price: 79,
    oldPrice: 129,
    discount: 39,
    isFlashSale: true,
    sizes: ["2-3", "4-5", "6-7", "8-9", "10-11"],
    colors: [
      { name: "وردي", hex: "#ee296d" },
      { name: "بنفسجي", hex: "#8e44ad" },
    ],
    rating: 4.7,
    reviewsCount: 112,
  }),
  mk({
    id: "k-set-01",
    title: "طقم ولادي قطني تيشيرت وشورت",
    category: "kids",
    subcategory: "ملابس أولاد",
    price: 89,
    oldPrice: 139,
    discount: 36,
    isBestSeller: true,
    sizes: ["2-3", "4-5", "6-7", "8-9"],
    colors: [
      { name: "كحلي", hex: "#1e3a8a" },
      { name: "أحمر", hex: "#c0392b" },
    ],
    rating: 4.6,
    reviewsCount: 89,
  }),
  mk({
    id: "k-toy-01",
    title: "لعبة تعليمية مكعبات تركيب",
    category: "kids",
    subcategory: "ألعاب",
    price: 99,
    oldPrice: 159,
    discount: 38,
    isNewArrival: true,
    sizes: ["مقاس واحد"],
    colors: [
      { name: "متعدد", hex: "#f1c40f" },
    ],
    rating: 4.8,
    reviewsCount: 156,
  }),

  // ===== BEAUTY =====
  mk({
    id: "b-lip-01",
    title: "أحمر شفاه مات طويل الثبات",
    category: "beauty",
    subcategory: "مكياج",
    price: 49,
    oldPrice: 89,
    discount: 45,
    isFlashSale: true,
    isBestSeller: true,
    sizes: ["مقاس واحد"],
    colors: [
      { name: "أحمر", hex: "#c0392b" },
      { name: "وردي", hex: "#ee296d" },
      { name: "نود", hex: "#d4a574" },
    ],
    rating: 4.6,
    reviewsCount: 423,
  }),
  mk({
    id: "b-cream-01",
    title: "كريم ترطيب وجه بفيتامين C",
    category: "beauty",
    subcategory: "عناية بالبشرة",
    price: 79,
    oldPrice: 129,
    discount: 39,
    isNewArrival: true,
    sizes: ["50ml"],
    colors: [{ name: "متعدد", hex: "#f1c40f" }],
    rating: 4.7,
    reviewsCount: 234,
  }),
  mk({
    id: "b-perfume-01",
    title: "عطر نسائي زهري فاخر 100مل",
    category: "beauty",
    subcategory: "عطور",
    price: 199,
    oldPrice: 329,
    discount: 39,
    isBestSeller: true,
    sizes: ["100ml", "50ml"],
    colors: [{ name: "متعدد", hex: "#ee296d" }],
    rating: 4.9,
    reviewsCount: 312,
  }),
  mk({
    id: "b-palette-01",
    title: "باليت ظلال عيون 12 لون",
    category: "beauty",
    subcategory: "مكياج",
    price: 69,
    oldPrice: 119,
    discount: 42,
    isFlashSale: true,
    sizes: ["مقاس واحد"],
    colors: [{ name: "متعدد", hex: "#8e44ad" }],
    rating: 4.5,
    reviewsCount: 178,
  }),

  // ===== ACCESSORIES =====
  mk({
    id: "a-watch-01",
    title: "ساعة يد رجالية كلاسيكية جلد",
    category: "accessories",
    subcategory: "ساعات",
    price: 199,
    oldPrice: 349,
    discount: 43,
    isBestSeller: true,
    isNewArrival: true,
    sizes: ["مقاس واحد"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "بني", hex: "#8b5e3c" },
    ],
    rating: 4.7,
    reviewsCount: 198,
  }),
  mk({
    id: "a-glasses-01",
    title: "نظارة شمسية بولارايزد عصرية",
    category: "accessories",
    subcategory: "نظارات",
    price: 89,
    oldPrice: 159,
    discount: 44,
    isFlashSale: true,
    sizes: ["مقاس واحد"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "بني", hex: "#8b5e3c" },
    ],
    rating: 4.5,
    reviewsCount: 134,
  }),
  mk({
    id: "a-necklace-01",
    title: "قلادة ذهبية أنيقة بحجر زركون",
    category: "accessories",
    subcategory: "مجوخات",
    price: 119,
    oldPrice: 199,
    discount: 40,
    isBestSeller: true,
    sizes: ["مقاس واحد"],
    colors: [
      { name: "ذهبي", hex: "#d4af37" },
      { name: "فضي", hex: "#bdc3c7" },
    ],
    rating: 4.8,
    reviewsCount: 245,
  }),

  // ===== HOME =====
  mk({
    id: "h-decor-01",
    title: "مزهرية ديكور سيراميك عصري",
    category: "home",
    subcategory: "ديكور",
    price: 99,
    oldPrice: 169,
    discount: 41,
    isNewArrival: true,
    sizes: ["متوسط"],
    colors: [
      { name: "بيج", hex: "#e8d8c4" },
      { name: "أبيض", hex: "#ffffff" },
      { name: "أخضر", hex: "#27ae60" },
    ],
    rating: 4.6,
    reviewsCount: 87,
  }),
  mk({
    id: "h-kitchen-01",
    title: "طقم 6 أكواب قهوة سيراميك",
    category: "home",
    subcategory: "مطبخ",
    price: 79,
    oldPrice: 129,
    discount: 39,
    isBestSeller: true,
    sizes: ["طقم 6 قطع"],
    colors: [
      { name: "أبيض", hex: "#ffffff" },
      { name: "كحلي", hex: "#1e3a8a" },
    ],
    rating: 4.7,
    reviewsCount: 142,
  }),
  mk({
    id: "h-candle-01",
    title: "شمع معطر فاخر بعودي 200جم",
    category: "home",
    subcategory: "ديكور",
    price: 69,
    oldPrice: 109,
    discount: 37,
    isFlashSale: true,
    sizes: ["200جم"],
    colors: [{ name: "ذهبي", hex: "#d4af37" }],
    rating: 4.5,
    reviewsCount: 76,
  }),
];

// Helper functions
export const getProductById = (id: string) =>
  PRODUCTS.find((p) => p.id === id);

export const getProductsByCategory = (category: string) =>
  PRODUCTS.filter((p) => p.category === category);

export const getFlashSaleProducts = () =>
  PRODUCTS.filter((p) => p.isFlashSale);

export const getNewArrivals = () =>
  PRODUCTS.filter((p) => p.isNewArrival);

export const getBestSellers = () =>
  PRODUCTS.filter((p) => p.isBestSeller);

export const getRelatedProducts = (product: Product, limit = 8) =>
  PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);

export const searchProducts = (query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ar-SA", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " ر.س";
