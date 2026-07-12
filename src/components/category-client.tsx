"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown, Grid2x2, Grid3x3 } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import type { Product, CategoryName } from "@/types";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { id: "popular", label: "الأكثر رواجاً" },
  { id: "newest", label: "الأحدث" },
  { id: "price-asc", label: "السعر: من الأقل للأعلى" },
  { id: "price-desc", label: "السعر: من الأعلى للأقل" },
  { id: "discount", label: "أعلى خصم" },
  { id: "rating", label: "الأعلى تقييماً" },
];

const ALL_SIZES = ["S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const ALL_COLORS = [
  { name: "أسود", hex: "#000000" },
  { name: "أبيض", hex: "#ffffff" },
  { name: "وردي", hex: "#ee296d" },
  { name: "أحمر", hex: "#c0392b" },
  { name: "كحلي", hex: "#1e3a8a" },
  { name: "أخضر", hex: "#27ae60" },
  { name: "بني", hex: "#8b5e3c" },
  { name: "بيج", hex: "#e8d8c4" },
  { name: "ذهبي", hex: "#d4af37" },
  { name: "رمادي", hex: "#7f8c8d" },
];

const PRICE_RANGES = [
  { id: "0-50", label: "أقل من 50 ر.س", min: 0, max: 50 },
  { id: "50-100", label: "50 - 100 ر.س", min: 50, max: 100 },
  { id: "100-200", label: "100 - 200 ر.س", min: 100, max: 200 },
  { id: "200+", label: "أكثر من 200 ر.س", min: 200, max: Infinity },
];

export function CategoryClient({
  category,
}: {
  category: string;
}) {
  const search = useSearchParams();
  const queryParam = search.get("q") || "";
  const filterParam = search.get("filter") || "";

  const [search2] = useState(queryParam);

  const [sort, setSort] = useState("popular");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [grid, setGrid] = useState<2 | 5>(2);
  const [visible, setVisible] = useState(12);

  // reset visible when filters change
  useEffect(() => setVisible(12), [category, sort, selectedSizes, selectedColors, selectedPrices]);

  const catName =
    category === "all"
      ? "كل المنتجات"
      : CATEGORIES.find((c) => c.slug === category)?.name || category;

  const filtered = useMemo(() => {
    let list: Product[] = [...PRODUCTS];

    // category filter
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // search query
    if (search2) {
      const q = search2.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // filter param
    if (filterParam === "new") list = list.filter((p) => p.isNewArrival);
    if (filterParam === "best") list = list.filter((p) => p.isBestSeller);

    // sizes
    if (selectedSizes.length) {
      list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // colors
    if (selectedColors.length) {
      list = list.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // prices
    if (selectedPrices.length) {
      list = list.filter((p) =>
        selectedPrices.some((id) => {
          const r = PRICE_RANGES.find((x) => x.id === id);
          if (!r) return false;
          return p.price >= r.min && p.price < r.max;
        })
      );
    }

    // sort
    switch (sort) {
      case "newest":
        list = list.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival));
        break;
      case "price-asc":
        list = list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = list.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list = list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "rating":
        list = list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = list.sort(
          (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller)
        );
    }

    return list;
  }, [category, search2, filterParam, selectedSizes, selectedColors, selectedPrices, sort]);

  const toggleArr = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPrices([]);
  };

  const activeFilters =
    selectedSizes.length + selectedColors.length + selectedPrices.length;

  const FilterPanel = (
    <div className="space-y-5">
      {/* Sizes */}
      <div>
        <h3 className="mb-2 text-sm font-bold">المقاس</h3>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSizes((a) => toggleArr(a, s))}
              className={cn(
                "min-w-9 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition",
                selectedSizes.includes(s)
                  ? "border-shein-pink bg-shein-pink text-white"
                  : "border-shein-border hover:border-shein-pink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="mb-2 text-sm font-bold">اللون</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColors((a) => toggleArr(a, c.name))}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs transition",
                selectedColors.includes(c.name)
                  ? "border-shein-pink bg-shein-pink/5"
                  : "border-shein-border"
              )}
            >
              <span
                className="h-3 w-3 rounded-full border border-shein-border"
                style={{ background: c.hex }}
              />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-2 text-sm font-bold">السعر</h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((r) => (
            <label
              key={r.id}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedPrices.includes(r.id)}
                onChange={() => setSelectedPrices((a) => toggleArr(a, r.id))}
                className="h-4 w-4 accent-shein-pink"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      {activeFilters > 0 && (
        <button
          onClick={clearAll}
          className="w-full rounded-full border border-shein-border py-2 text-xs font-bold text-shein-pink hover:bg-shein-pink/5"
        >
          مسح كل الفلاتر ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <div className="container-app py-4">
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-xl font-black sm:text-2xl">{catName}</h1>
        <p className="text-xs text-shein-muted">
          {filtered.length} منتج متوفر
          {search2 && <span> • نتائج البحث عن: "{search2}"</span>}
        </p>
      </div>

      {/* Category chips */}
      {category !== "all" && (
        <div className="mb-3 flex gap-1.5 overflow-x-auto no-scrollbar">
          <a
            href="/category/all"
            className={cn(
              "whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold",
              "border-shein-border text-shein-muted hover:border-shein-pink"
            )}
          >
            الكل
          </a>
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`/category/${c.slug}`}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold",
                c.slug === category
                  ? "border-shein-pink bg-shein-pink text-white"
                  : "border-shein-border text-shein-text hover:border-shein-pink"
              )}
            >
              {c.icon} {c.name}
            </a>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => setShowFilters(true)}
          className="relative flex items-center gap-1.5 rounded-full border border-shein-border px-3 py-2 text-xs font-bold lg:hidden"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          فلترة
          {activeFilters > 0 && (
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-shein-pink px-1 text-[9px] text-white">
              {activeFilters}
            </span>
          )}
        </button>

        <div className="relative ml-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none rounded-full border border-shein-border bg-white py-2 pl-8 pr-3 text-xs font-bold outline-none focus:border-shein-pink"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-shein-muted" />
        </div>

        <div className="hidden gap-1 sm:flex">
          <button
            onClick={() => setGrid(2)}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border",
              grid === 2
                ? "border-shein-pink bg-shein-pink text-white"
                : "border-shein-border"
            )}
            aria-label="شبكة 2"
          >
            <Grid2x2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setGrid(5)}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border",
              grid === 5
                ? "border-shein-pink bg-shein-pink text-white"
                : "border-shein-border"
            )}
            aria-label="شبكة 5"
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Sidebar - desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20 rounded-2xl border border-shein-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-black">الفلاتر</h2>
              {activeFilters > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[10px] font-bold text-shein-pink"
                >
                  مسح ({activeFilters})
                </button>
              )}
            </div>
            {FilterPanel}
          </div>
        </aside>

        {/* Products */}
        <div className="min-w-0 flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="text-4xl">🔍</div>
              <h3 className="text-lg font-bold">لا توجد منتجات مطابقة</h3>
              <p className="text-sm text-shein-muted">
                جرّب تعديل الفلاتر أو البحث بكلمات أخرى
              </p>
              {activeFilters > 0 && (
                <button
                  onClick={clearAll}
                  className="btn-outline text-xs"
                >
                  مسح الفلاتر
                </button>
              )}
            </div>
          ) : (
            <>
              <div
                className={cn(
                  "grid gap-2 sm:gap-3",
                  grid === 2
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                )}
              >
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {visible < filtered.length && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setVisible((v) => v + 12)}
                    className="btn-outline"
                  >
                    عرض المزيد ({filtered.length - visible})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-black">الفلاتر</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-shein-gray"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setShowFilters(false)}
              className="btn-primary mt-5 w-full"
            >
              عرض {filtered.length} منتج
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
