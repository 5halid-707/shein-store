import { HeroCarousel } from "@/components/hero-carousel";
import { FlashSaleTimer } from "@/components/flash-sale-timer";
import { ProductCard } from "@/components/product-card";
import {
  CATEGORIES,
  PRODUCTS,
  TRENDING_CATEGORIES,
  getBestSellers,
  getFlashSaleProducts,
  getNewArrivals,
} from "@/data/products";
import Link from "next/link";
import {
  ArrowLeft,
  Flame,
  Sparkles,
  TrendingUp,
  Gift,
  Mail,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

export default function HomePage() {
  const flashSale = getFlashSaleProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <>
      <HeroCarousel />

      {/* Quick categories (mobile + desktop) */}
      <section className="container-app py-4">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 md:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-shein-border bg-white p-2.5 transition hover:border-shein-pink hover:shadow-md sm:p-3"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-shein-gray text-xl sm:h-14 sm:w-14 sm:text-2xl">
                {c.icon}
              </div>
              <span className="text-[11px] font-semibold sm:text-sm">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo banner strip */}
      <section className="container-app py-2">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { icon: Truck, title: "شحن سريع", sub: "لكل السعودية" },
            { icon: RotateCcw, title: "إرجاع مجاني", sub: "خلال 14 يوم" },
            { icon: ShieldCheck, title: "دفع آمن", sub: "حماية 100%" },
            { icon: Headphones, title: "دعم 24/7", sub: "خدمة عملاء" },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-2 rounded-xl bg-shein-gray p-2.5"
            >
              <f.icon className="h-5 w-5 text-shein-pink" />
              <div>
                <div className="text-xs font-bold">{f.title}</div>
                <div className="text-[10px] text-shein-muted">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="container-app py-4">
        <div className="overflow-hidden rounded-2xl border-2 border-shein-pink bg-gradient-to-l from-shein-pink/10 to-white">
          <div className="flex items-center justify-between gap-2 border-b border-shein-pink/20 p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-shein-pink" />
              <div>
                <h2 className="text-base font-black sm:text-xl">
                  عروض اليوم المميزة
                </h2>
                <p className="hidden text-xs text-shein-muted sm:block">
                  خصومات حتى 70% — لفترة محدودة!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <FlashSaleTimer targetHours={12} />
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
              {flashSale.slice(0, 10).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/category/all?sale=true"
                className="inline-flex items-center gap-1 rounded-full bg-shein-pink px-5 py-2.5 text-xs font-bold text-white hover:bg-shein-pink-dark"
              >
                عرض كل العروض <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending categories grid */}
      <section className="container-app py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-black sm:text-xl">
            <TrendingUp className="h-5 w-5 text-shein-pink" />
            الفئات الرائجة
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {TRENDING_CATEGORIES.map((c, i) => (
            <Link
              key={i}
              href={`/category/${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-shein-border p-3 transition hover:border-shein-pink hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-shein-gray text-2xl transition group-hover:bg-shein-pink/10 sm:h-14 sm:w-14">
                {c.icon}
              </div>
              <span className="text-[11px] font-semibold sm:text-xs">
                {c.name}
              </span>
              <span className="text-[9px] text-shein-muted sm:text-[10px]">
                {c.count} منتج
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mid promo banner */}
      <section className="container-app py-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <Link
            href="/category/women"
            className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-l from-shein-pink to-shein-pink-light p-4 sm:h-40"
          >
            <div className="absolute inset-0 opacity-30">
              <img
                src="https://picsum.photos/seed/promo-women/800/400"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative flex h-full flex-col justify-center text-white">
              <div className="text-xs font-bold opacity-90">للنساء</div>
              <div className="text-lg font-black sm:text-2xl">
                تشكيلة الصيف
              </div>
              <div className="text-xs opacity-90">حتى 50% خصم</div>
              <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-shein-pink">
                تسوّقي الآن <ArrowLeft className="h-3 w-3" />
              </span>
            </div>
          </Link>
          <Link
            href="/category/men"
            className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-l from-black to-shein-dark p-4 sm:h-40"
          >
            <div className="absolute inset-0 opacity-30">
              <img
                src="https://picsum.photos/seed/promo-men/800/400"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative flex h-full flex-col justify-center text-white">
              <div className="text-xs font-bold opacity-90">للرجال</div>
              <div className="text-lg font-black sm:text-2xl">
                أناقة الرجل العصري
              </div>
              <div className="text-xs opacity-90">تشكيلة جديدة 2026</div>
              <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-shein-pink px-3 py-1 text-[10px] font-bold text-white">
                تسوّق الآن <ArrowLeft className="h-3 w-3" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-app py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-black sm:text-xl">
            <Sparkles className="h-5 w-5 text-shein-pink" />
            وصل حديثاً
          </h2>
          <Link
            href="/category/all?filter=new"
            className="text-xs font-bold text-shein-pink hover:underline"
          >
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {newArrivals.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-app py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-black sm:text-xl">
            <Flame className="h-5 w-5 text-shein-pink" />
            الأكثر مبيعاً
          </h2>
          <Link
            href="/category/all?filter=best"
            className="text-xs font-bold text-shein-pink hover:underline"
          >
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {bestSellers.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Recommended for you */}
      <section className="container-app py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-black sm:text-xl">موصى به لك</h2>
          <Link
            href="/category/all"
            className="text-xs font-bold text-shein-pink hover:underline"
          >
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {PRODUCTS.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-app py-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-l from-black via-shein-dark to-shein-pink p-6 sm:p-10">
          <div className="mx-auto max-w-xl text-center text-white">
            <Gift className="mx-auto mb-3 h-10 w-10 text-shein-pink" />
            <h2 className="text-xl font-black sm:text-2xl">
              اشترك واحصل على خصم 15% على طلبك الأول
            </h2>
            <p className="mt-2 text-sm text-white/80">
              كن أول من يعرف عن أحدث المنتجات والعروض الحصرية
            </p>
            <form className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center rounded-full bg-white px-4">
                <Mail className="h-4 w-4 text-shein-muted" />
                <input
                  type="email"
                  required
                  placeholder="بريدك الإلكتروني"
                  className="w-full bg-transparent px-3 py-3 text-sm text-black outline-none placeholder:text-shein-muted"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-shein-pink px-6 py-3 text-sm font-bold text-white transition hover:bg-shein-pink-dark"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
