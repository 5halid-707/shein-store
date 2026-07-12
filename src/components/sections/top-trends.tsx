"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getTrendingProducts } from "@/data/products";

export function TopTrends() {
  const products = getTrendingProducts().slice(0, 6);
  if (products.length === 0) return null;
  return (
    <section className="container-app py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-black sm:text-xl">
          <TrendingUp className="h-5 w-5 text-shein-pink" />
          أهم الترندات
        </h2>
        <Link
          href="/category/all?filter=new"
          className="text-xs font-bold text-shein-pink hover:underline"
        >
          عرض الكل ←
        </Link>
      </div>

      {/* Trending hashtags row */}
      <div className="mb-3 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          "#فستان_سهرة",
          "#طقم_مجوهرات_ذهبي",
          "#تيشيرت_رجالي",
          "#كلاتش_سهرة",
          "#سماعات_لاسلكية",
          "#طقم_يوغا",
          "#فستان_صيفي",
          "#ألعاب_تعليمية",
        ].map((tag) => (
          <Link
            key={tag}
            href={`/category/all?q=${encodeURIComponent(tag.replace("#", ""))}`}
            className="whitespace-nowrap rounded-full border border-shein-border bg-white px-3 py-1.5 text-xs font-bold text-shein-pink transition hover:bg-shein-pink hover:text-white"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-3 lg:grid-cols-6">
        {products.map((p) => (
          <div key={p.id} className="flex flex-col">
            <ProductCard product={p} />
            {p.trendingTag && (
              <div className="px-1 pt-1 text-[10px] font-bold text-shein-pink sm:text-[11px]">
                {p.trendingTag}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
