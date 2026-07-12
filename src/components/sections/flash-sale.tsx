"use client";

import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { FlashSaleTimer } from "@/components/flash-sale-timer";
import { getFlashSaleProducts } from "@/data/products";

export function FlashSale() {
  const products = getFlashSaleProducts().slice(0, 8);
  if (products.length === 0) return null;
  return (
    <section className="container-app py-4">
      <div className="overflow-hidden rounded-2xl border-2 border-shein-pink bg-gradient-to-l from-shein-pink/10 to-white">
        <div className="flex items-center justify-between gap-2 border-b border-shein-pink/20 p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-shein-pink" />
            <div>
              <h2 className="text-base font-black sm:text-xl">تخفيضات سريعة</h2>
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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 xl:grid-cols-8">
            {products.map((p) => (
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
  );
}
