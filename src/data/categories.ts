import type { Category } from "@/types";

/**
 * All 25 SHEIN-style top navigation categories.
 * Order matches ar.shein.com main horizontal category bar.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "women",
    name: "نساء",
    nameEn: "Women",
    icon: "👗",
    subcategories: ["فساتين", "ملابس علوية", "ملابس سفلية", "ملابس داخلية وملابس نوم", "ملابس رياضية", "ملابس السباحة"],
  },
  {
    slug: "jewelry-accessories",
    name: "مجوهرات واكسسوارات",
    nameEn: "Jewelry & Accessories",
    icon: "💍",
    subcategories: ["قلائد", "أقراط", "خواتم", "أساور", "إكسسوارات شعر", "نظارات شمسية"],
  },
  {
    slug: "lingerie-sleepwear",
    name: "ملابس النوم وملابس داخلية",
    nameEn: "Lingerie & Sleepwear",
    icon: "🩱",
    subcategories: ["حمالات صدر", "كلسون", "بيجامات", "قمیصان نوم", "كيمونو"],
  },
  {
    slug: "plus-size",
    name: "مقاسات كبيرة",
    nameEn: "Curve + Plus",
    icon: "👚",
    subcategories: ["فساتين مقاسات كبيرة", "بلوزات", "بناطيل", "ملابس رياضية كبيرة"],
  },
  {
    slug: "home-living",
    name: "المنزل والمعيشة",
    nameEn: "Home & Living",
    icon: "🏠",
    subcategories: ["ديكور", "مطبخ", "إضاءة", "تخزين", "أدوات المائدة"],
  },
  {
    slug: "tops",
    name: "ملابس علوية",
    nameEn: "Tops",
    icon: "👕",
    subcategories: ["تيشيرتات", "بلوزات", "قمصان", "سترات", "كارديغان"],
  },
  {
    slug: "kids",
    name: "أطفال",
    nameEn: "Kids",
    icon: "🧸",
    subcategories: ["ملابس بنات", "ملابس أولاد", "أحذية أطفال", "إكسسوارات أطفال"],
  },
  {
    slug: "beauty-health",
    name: "الجمال والصحة",
    nameEn: "Beauty & Health",
    icon: "💄",
    subcategories: ["مكياج", "عناية بالبشرة", "عطور", "العناية بالشعر", "العناية بالأظافر"],
  },
  {
    slug: "shoes",
    name: "أحذية",
    nameEn: "Shoes",
    icon: "👠",
    subcategories: ["كعب عالي", "مسطحة", "رياضية", "صنادل", "بوت"],
  },
  {
    slug: "men",
    name: "رجال",
    nameEn: "Men",
    icon: "👔",
    subcategories: ["قمصان", "تيشيرتات", "بناطيل", "جواكيت", "ملابس داخلية"],
  },
  {
    slug: "baby-maternity",
    name: "الرضع والأمومة",
    nameEn: "Baby & Maternity",
    icon: "🍼",
    subcategories: ["ملابس رضع", "حفاضات", "مستلزمات الرضاعة", "عربات أطفال"],
  },
  {
    slug: "dresses",
    name: "فساتين",
    nameEn: "Dresses",
    icon: "💃",
    subcategories: ["فساتين سهرة", "فساتين صيفية", "فساتين كاجوال", "فساتين طويلة"],
  },
  {
    slug: "bags-luggage",
    name: "حقائب وأمتعة",
    nameEn: "Bags & Luggage",
    icon: "👜",
    subcategories: ["حقائب يد", "حقائب ظهر", "كلاتش", "حقائب سفر", "محافظ"],
  },
  {
    slug: "bottoms",
    name: "ملابس سفلية",
    nameEn: "Bottoms",
    icon: "👖",
    subcategories: ["بناطيل جينز", "بناطيل", "شورتات", "تنانير", "بناطيل رياضية"],
  },
  {
    slug: "sports-outdoor",
    name: "الرياضة والأنشطة الخارجية",
    nameEn: "Sports & Outdoor",
    icon: "⚽",
    subcategories: ["ملابس رياضية", "أحذية رياضية", "معدات رياضية", "تخييم"],
  },
  {
    slug: "phones-accessories",
    name: "الهواتف الخلوية والاكسسوارات",
    nameEn: "Phones & Accessories",
    icon: "📱",
    subcategories: ["إكسسوارات هاتف", "شواحن", "سماعات", "كابلات"],
  },
  {
    slug: "toys-games",
    name: "الألعاب",
    nameEn: "Toys & Games",
    icon: "🎮",
    subcategories: ["ألعاب تعليمية", "ألعاب لوحية", "دمى", "ألعاب فيديو"],
  },
  {
    slug: "automotive",
    name: "السيارات",
    nameEn: "Automotive",
    icon: "🚗",
    subcategories: ["إكسسوارات سيارات", "عناية بالسيارة", "إلكترونيات السيارة"],
  },
  {
    slug: "office-school",
    name: "اللوازم المكتبية والمدرسية",
    nameEn: "Office & School",
    icon: "📚",
    subcategories: ["قرطاسية", "حقائب مدرسية", "أدوات مكتبية", "دفاتر"],
  },
  {
    slug: "pet-supplies",
    name: "مستلزمات الحيوانات الأليفة",
    nameEn: "Pet Supplies",
    icon: "🐾",
    subcategories: ["ملابس حيوانات", "أطعمة", "ألعاب حيوانات", "إكسسوارات"],
  },
  {
    slug: "tools-home-improvement",
    name: "أدوات وتحسين المنزل",
    nameEn: "Tools & Home Improvement",
    icon: "🔧",
    subcategories: ["أدوات يدوية", "أدوات كهربائية", "إصلاحات", "دهانات"],
  },
  {
    slug: "home-textiles",
    name: "منسوجات منزلية",
    nameEn: "Home Textiles",
    icon: "🛏️",
    subcategories: ["أغطية سرير", "ستائر", "سجاد", "مناشف", "وسائد"],
  },
  {
    slug: "electronics",
    name: "إلكترونيات",
    nameEn: "Electronics",
    icon: "💻",
    subcategories: ["سماعات", "سماعات لاسلكية", "كاميرات", "كابلات", "ملحقات"],
  },
  {
    slug: "customization",
    name: "التخصيص",
    nameEn: "Customization",
    icon: "✨",
    subcategories: ["تيشيرتات مخصصة", "هدايا مخصصة", "نقشات"],
  },
  {
    slug: "home-appliances",
    name: "أجهزة المنزل",
    nameEn: "Home Appliances",
    icon: "🔌",
    subcategories: ["مطبخ صغير", "تنظيف", "عناية شخصية", "تهوية وتبريد"],
  },
];

/** Compact shortcut icons used on the homepage quick-access grid. */
export const QUICK_CATEGORIES: { slug: string; name: string; icon: string }[] = [
  { slug: "women", name: "نساء", icon: "👗" },
  { slug: "men", name: "رجال", icon: "👔" },
  { slug: "dresses", name: "فساتين", icon: "💃" },
  { slug: "shoes", name: "أحذية", icon: "👠" },
  { slug: "bags-luggage", name: "حقائب", icon: "👜" },
  { slug: "beauty-health", name: "تجميل", icon: "💄" },
  { slug: "jewelry-accessories", name: "مجوهرات", icon: "💍" },
  { slug: "kids", name: "أطفال", icon: "🧸" },
  { slug: "home-living", name: "المنزل", icon: "🏠" },
  { slug: "electronics", name: "إلكترونيات", icon: "📱" },
  { slug: "sports-outdoor", name: "رياضة", icon: "⚽" },
  { slug: "home-appliances", name: "أجهزة", icon: "🔌" },
];

/** Trending shortcut categories shown on homepage grid. */
export const TRENDING_CATEGORIES = [
  { slug: "women", name: "فساتين", icon: "👗", count: 320 },
  { slug: "men", name: "قمصان", icon: "👔", count: 180 },
  { slug: "shoes", name: "أحذية", icon: "👠", count: 250 },
  { slug: "bags-luggage", name: "حقائب", icon: "👜", count: 145 },
  { slug: "beauty-health", name: "مكياج", icon: "💄", count: 210 },
  { slug: "jewelry-accessories", name: "ساعات", icon: "⌚", count: 95 },
  { slug: "jewelry-accessories", name: "نظارات", icon: "🕶️", count: 70 },
  { slug: "women", name: "إكسسوارات", icon: "💍", count: 160 },
];

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
