"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getBigDeals } from "@/data/products";

export function BigDeals() {
  const products = getBigDeals().slice(0, 6);
  if (products.length === 0) return null;
  return (
    <section className="container-app py-4">
      <div className="overflow-hidden rounded-2xl border border-shein-border bg-white">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-shein-border bg-gradient-to-l from-shein-red/10 to-white p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-shein-red text-white">
              <span className="text-lg font-black">%</span>
            </span>
            <div>
              <h2 className="text-base font-black sm:text-xl">عروض كبرى</h2>
              <p className="hidden text-xs text-shein-muted sm:block">
                وفّر أكثر مع أقوى التخفيضات لهذا الأسبوع
              </p>
            </div>
          </div>
          <Link
            href="/category/all?filter=best"
            className="flex items-center gap-1 rounded-full bg-shein-red px-4 py-2 text-xs font-bold text-white transition hover:bg-shein-red-dark"
          >
            عرض الكل <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
        {/* Grid */}
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
