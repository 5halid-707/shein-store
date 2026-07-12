"use client";

import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getBrandProducts } from "@/data/products";

export function BrandZone() {
  const products = getBrandProducts().slice(0, 8);
  if (products.length === 0) return null;

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <section className="container-app py-4">
      <div className="overflow-hidden rounded-2xl border border-shein-border bg-white">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-shein-border bg-gradient-to-l from-shein-black to-shein-dark p-3 text-white sm:p-4">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-shein-gold" />
            <div>
              <h2 className="text-base font-black sm:text-xl">
                منطقة العلامة التجارية
              </h2>
              <p className="hidden text-xs text-white/70 sm:block">
                أحدث المنتجات من أفضل الماركات العالمية
              </p>
            </div>
          </div>
          <Link
            href="/category/electronics"
            className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-shein-black transition hover:bg-shein-gold"
          >
            عرض الكل <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Brand chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-shein-border p-3">
          {brands.map((b) => (
            <span
              key={b}
              className="grid h-9 min-w-20 place-items-center rounded-md border border-shein-border bg-shein-gray px-3 text-xs font-black text-shein-text"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 xl:grid-cols-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
