import type { Category, Product } from "@/types";

export const CATEGORIES: Category[] = [
  { slug: "women", name: "نسائي", nameEn: "Women", icon: "👗" },
  { slug: "men", name: "رجالي", nameEn: "Men", icon: "👔" },
  { slug: "kids", name: "أطفال", nameEn: "Kids", icon: "🧸" },
  { slug: "beauty", name: "تجميل", nameEn: "Beauty", icon: "💄" },
  { slug: "home", name: "المنزل", nameEn: "Home", icon: "🏠" },
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

// Real Unsplash fashion product photos.
// Format: https://images.unsplash.com/photo-{ID}?w=600&h=750&fit=crop&q=80
const u = (id: string) => `https://images.unsplash.com/${id}?w=600&h=750&fit=crop&q=80&auto=format`;

// Helper to build a 5-image gallery from a primary image + 4 related ones
const gallery = (primary: string, related: string[]) => {
  const g = [primary, ...related];
  while (g.length < 5) g.push(related[g.length % related.length] ?? primary);
  return g.slice(0, 5);
};

// Curated Unsplash photo IDs per category (real fashion photos)
const PHOTOS = {
  // Women's dresses / clothing
  womenDress1: "photo-1572804013309-59a88b7e92f1",
  womenDress2: "photo-1595777457583-95e059d581b8",
  womenDress3: "photo-1539109136881-3be0616acf4b",
  womenDress4: "photo-1490481651871-ab68de25d43d",
  womenTop1: "photo-1581044777550-4cfa60707c03",
  womenTop2: "photo-1485518882345-15568b007407",
  womenPants1: "photo-1594633312681-425c7b97ccd1",
  womenPants2: "photo-1551803091-e20673f15770",
  womenSkirt1: "photo-1583496661160-fb5886a13d77",
  womenCoat1: "photo-1515886657613-9f3515b0c78f",
  womenCoat2: "photo-1483985988355-763728e1935b",

  // Women shoes & bags
  womenHeels: "photo-1543163521-1bf539c55dd2",
  womenHeels2: "photo-1518049362265-d5b2a6b00b37",
  womenBag1: "photo-1584917865442-de89df76afd3",
  womenBag2: "photo-1548036328-c9fa89d128fa",
  womenBag3: "photo-1591561954557-26941169b49e",

  // Men
  menShirt1: "photo-1620799140408-edc6dcb6d633",
  menShirt2: "photo-1602810318383-e386cc2a3ccf",
  menPolo: "photo-1620012253295-c15cc3e65df4",
  menJeans: "photo-1542272604-787c3835535d",
  menTshirt: "photo-1521572163474-6864f9cf17ab",
  menJacket1: "photo-1596755094514-f87e34085b2c",
  menJacket2: "photo-1516257984-b1b4d707412e",
  menShoes1: "photo-1549298916-b41d501d3772",
  menShoes2: "photo-1606107557195-0e29a4b5b4aa",

  // Kids
  kidsDress: "photo-1622290291468-a28f7a7dc4a8",
  kidsBoy: "photo-1519278409-1f56fdda7fe5",
  kidsToy: "photo-1503944583220-79d8926ad5e2",
  kidsShoes: "photo-1514989940723-e8e51635b782",

  // Beauty
  beautyLipstick: "photo-1522335789203-aabd1fc54bc9",
  beautyCream: "photo-1556228720-195a672e8a03",
  beautyPerfume: "photo-1541643600914-78b084683601",
  beautyPalette: "photo-1596462502278-27bfdc403348",
  beautySet: "photo-1571781926291-c477ebfd024b",

  // Accessories
  accWatch1: "photo-1611652022419-a9419f74343d",
  accWatch2: "photo-1524805444758-089113d48a6d",
  accGlasses1: "photo-1572635196237-14b3f281503f",
  accGlasses2: "photo-1577803645773-f96470509666",
  accNecklace1: "photo-1599643477877-530eb83abc8e",
  accNecklace2: "photo-1611591437281-460bfbe1220a",
  accEarrings: "photo-1535632066927-ab7c9ab60908",

  // Home
  homeVase: "photo-1513519245088-0e12902e5a38",
  homeCups: "photo-1493663284031-b7e3aefcae8e",
  homeCandle: "photo-1582058091505-f87a2e55a40f",
  homeDecor: "photo-1513519245088-0e12902e5a38",
} as const;

const mk = (p: Partial<Product> & { id: string; title: string; category: any; price: number; image: string; images?: string[] }): Product => {
  const price = p.price;
  const oldPrice = p.oldPrice ?? Math.round(price * (1 + (p.discount ?? 30) / 100));
  const discount = p.discount ?? Math.round(((oldPrice - price) / oldPrice) * 100);
  const images = p.images ?? gallery(p.image, [p.image]);
  return {
    subcategory: "",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "أسود", hex: "#000000" },
      { name: "أبيض", hex: "#ffffff" },
      { name: "وردي", hex: "#ee296d" },
    ],
    description:
      "قطعة عصرية بجودة عالية مصنوعة من أجود الخامات. تصميم أنيق يناسب جميع المناسبات ويمنحك إطلالة مميزة. متوفر بألوان ومقاسات متعددة.",
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
        comment: "السلعة كما هي موصوفة والمقاس مظبوط. أنصح به.",
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
    brand: "SHEIN",
    tags: [],
    oldPrice,
    discount,
    ...p,
    images,
  } as Product;
};

const womenImgs = [PHOTOS.womenDress1, PHOTOS.womenDress2, PHOTOS.womenDress3, PHOTOS.womenDress4, PHOTOS.womenTop1];
const menImgs = [PHOTOS.menShirt1, PHOTOS.menShirt2, PHOTOS.menPolo, PHOTOS.menJeans, PHOTOS.menTshirt, PHOTOS.menJacket1];
const kidsImgs = [PHOTOS.kidsDress, PHOTOS.kidsBoy, PHOTOS.kidsToy, PHOTOS.kidsShoes];
const beautyImgs = [PHOTOS.beautyLipstick, PHOTOS.beautyCream, PHOTOS.beautyPerfume, PHOTOS.beautyPalette, PHOTOS.beautySet];
const accImgs = [PHOTOS.accWatch1, PHOTOS.accWatch2, PHOTOS.accGlasses1, PHOTOS.accGlasses2, PHOTOS.accNecklace1, PHOTOS.accNecklace2, PHOTOS.accEarrings];
const homeImgs = [PHOTOS.homeVase, PHOTOS.homeCups, PHOTOS.homeCandle, PHOTOS.homeDecor];

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
    image: u(PHOTOS.womenDress1),
    images: gallery(u(PHOTOS.womenDress1), womenImgs.map(u)),
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
    image: u(PHOTOS.womenDress2),
    images: gallery(u(PHOTOS.womenDress2), womenImgs.map(u)),
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
    image: u(PHOTOS.womenTop1),
    images: gallery(u(PHOTOS.womenTop1), [u(PHOTOS.womenTop2), ...womenImgs.map(u)]),
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
    image: u(PHOTOS.womenPants1),
    images: gallery(u(PHOTOS.womenPants1), [u(PHOTOS.womenPants2), ...womenImgs.map(u)]),
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
    image: u(PHOTOS.womenHeels),
    images: gallery(u(PHOTOS.womenHeels), [u(PHOTOS.womenHeels2), ...womenImgs.map(u)]),
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
    image: u(PHOTOS.womenBag1),
    images: gallery(u(PHOTOS.womenBag1), [u(PHOTOS.womenBag2), u(PHOTOS.womenBag3), ...womenImgs.map(u)]),
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
    image: u(PHOTOS.womenDress3),
    images: gallery(u(PHOTOS.womenDress3), [u(PHOTOS.womenDress4), ...womenImgs.map(u)]),
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
    image: u(PHOTOS.womenSkirt1),
    images: gallery(u(PHOTOS.womenSkirt1), [u(PHOTOS.womenCoat1), ...womenImgs.map(u)]),
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
    image: u(PHOTOS.menShirt1),
    images: gallery(u(PHOTOS.menShirt1), menImgs.map(u)),
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
    image: u(PHOTOS.menPolo),
    images: gallery(u(PHOTOS.menPolo), [u(PHOTOS.menShirt2), ...menImgs.map(u)]),
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
    image: u(PHOTOS.menJeans),
    images: gallery(u(PHOTOS.menJeans), menImgs.map(u)),
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
    image: u(PHOTOS.menShoes1),
    images: gallery(u(PHOTOS.menShoes1), [u(PHOTOS.menShoes2), ...menImgs.map(u)]),
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
    image: u(PHOTOS.menJacket1),
    images: gallery(u(PHOTOS.menJacket1), [u(PHOTOS.menJacket2), ...menImgs.map(u)]),
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
    image: u(PHOTOS.menTshirt),
    images: gallery(u(PHOTOS.menTshirt), menImgs.map(u)),
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
    image: u(PHOTOS.kidsDress),
    images: gallery(u(PHOTOS.kidsDress), kidsImgs.map(u)),
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
    image: u(PHOTOS.kidsBoy),
    images: gallery(u(PHOTOS.kidsBoy), kidsImgs.map(u)),
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
    image: u(PHOTOS.kidsToy),
    images: gallery(u(PHOTOS.kidsToy), kidsImgs.map(u)),
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
    image: u(PHOTOS.beautyLipstick),
    images: gallery(u(PHOTOS.beautyLipstick), beautyImgs.map(u)),
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
    image: u(PHOTOS.beautyCream),
    images: gallery(u(PHOTOS.beautyCream), beautyImgs.map(u)),
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
    image: u(PHOTOS.beautyPerfume),
    images: gallery(u(PHOTOS.beautyPerfume), beautyImgs.map(u)),
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
    image: u(PHOTOS.beautyPalette),
    images: gallery(u(PHOTOS.beautyPalette), beautyImgs.map(u)),
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
    image: u(PHOTOS.accWatch1),
    images: gallery(u(PHOTOS.accWatch1), [u(PHOTOS.accWatch2), ...accImgs.map(u)]),
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
    image: u(PHOTOS.accGlasses1),
    images: gallery(u(PHOTOS.accGlasses1), [u(PHOTOS.accGlasses2), ...accImgs.map(u)]),
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
    image: u(PHOTOS.accNecklace1),
    images: gallery(u(PHOTOS.accNecklace1), [u(PHOTOS.accNecklace2), u(PHOTOS.accEarrings), ...accImgs.map(u)]),
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
    image: u(PHOTOS.homeVase),
    images: gallery(u(PHOTOS.homeVase), homeImgs.map(u)),
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
    image: u(PHOTOS.homeCups),
    images: gallery(u(PHOTOS.homeCups), homeImgs.map(u)),
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
    image: u(PHOTOS.homeCandle),
    images: gallery(u(PHOTOS.homeCandle), homeImgs.map(u)),
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
