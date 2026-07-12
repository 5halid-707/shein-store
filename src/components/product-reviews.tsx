"use client";

import { Star } from "lucide-react";
import type { Product } from "@/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductReviews({ product }: { product: Product }) {
  const [showAll, setShowAll] = useState(false);
  const reviews = showAll ? product.reviews : product.reviews.slice(0, 2);

  // rating distribution mock
  const dist = [
    { stars: 5, pct: 70 },
    { stars: 4, pct: 20 },
    { stars: 3, pct: 6 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 2 },
  ];

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-base font-black sm:text-lg">
        التقييمات ({product.reviewsCount})
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Summary */}
        <div className="rounded-2xl border border-shein-border p-4 text-center">
          <div className="text-4xl font-black text-shein-pink">
            {product.rating}
          </div>
          <div className="mt-1 flex justify-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-shein-border text-shein-border"
                )}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-shein-muted">
            {product.reviewsCount} تقييم
          </div>
          <div className="mt-3 space-y-1">
            {dist.map((d) => (
              <div key={d.stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-shein-muted">{d.stars}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-shein-gray">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="w-8 text-shein-muted">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        <div className="md:col-span-2 space-y-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-shein-border p-3"
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-shein-pink text-xs font-bold text-white">
                    {r.user.charAt(0)}
                  </div>
                  <span className="text-sm font-bold">{r.user}</span>
                </div>
                <span className="text-[10px] text-shein-muted">{r.date}</span>
              </div>
              <div className="mb-1 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < r.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-shein-border text-shein-border"
                    )}
                  />
                ))}
              </div>
              <p className="text-xs leading-5 text-shein-text">{r.comment}</p>
            </div>
          ))}
          {product.reviews.length > 2 && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="w-full rounded-full border border-shein-border py-2 text-xs font-bold text-shein-pink hover:bg-shein-pink/5"
            >
              {showAll ? "عرض أقل" : `عرض كل التقييمات (${product.reviews.length})`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
