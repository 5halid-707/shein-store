"use client";

import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Zap,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/context/toast-context";
import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();
  const router = useRouter();

  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]?.name || "");
  const [qty, setQty] = useState(1);
  const isWished = has(product.id);

  const handleAdd = () => {
    addItem(product, qty, size, color);
    showToast("تمت الإضافة إلى السلة ✓", "success");
  };

  const handleBuyNow = () => {
    addItem(product, qty, size, color);
    router.push("/checkout");
  };

  const handleWish = () => {
    toggle(product.id);
    showToast(
      isWished ? "أُزيل من المفضلة" : "أُضيف إلى المفضلة ♥",
      isWished ? "info" : "success"
    );
  };

  return (
    <div className="space-y-4">
      {/* Brand + title */}
      <div>
        <div className="mb-1 text-xs font-bold text-shein-pink">
          {product.brand}
        </div>
        <h1 className="text-lg font-black leading-tight sm:text-2xl">
          {product.title}
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-0.5">
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
        <span className="font-bold">{product.rating}</span>
        <span className="text-shein-muted">
          ({product.reviewsCount} تقييم)
        </span>
        <span className="mr-auto text-xs text-green-600">متوفر في المخزون</span>
      </div>

      {/* Price */}
      <div className="rounded-xl bg-shein-gray p-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-shein-pink sm:text-3xl">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-base text-shein-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          {product.discount && (
            <span className="rounded-full bg-shein-pink px-2 py-0.5 text-xs font-bold text-white">
              -{product.discount}%
            </span>
          )}
        </div>
        {product.oldPrice && (
          <div className="mt-1 text-xs font-semibold text-green-600">
            توفّر {formatPrice(product.oldPrice - product.price)}
          </div>
        )}
      </div>

      {/* Color */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-bold">
          <span>اللون: <span className="text-shein-muted">{color}</span></span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className={cn(
                "relative h-10 w-10 rounded-full border-2 transition",
                color === c.name
                  ? "border-shein-pink ring-2 ring-shein-pink/30"
                  : "border-shein-border"
              )}
              style={{ background: c.hex }}
              title={c.name}
              aria-label={c.name}
            >
              {color === c.name && (
                <span className="absolute inset-0 grid place-items-center text-white drop-shadow">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-bold">
          <span>المقاس: <span className="text-shein-muted">{size}</span></span>
          <button className="text-xs text-shein-pink hover:underline">
            دليل المقاسات
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "min-w-12 rounded-lg border-2 px-3 py-2 text-sm font-bold transition",
                size === s
                  ? "border-shein-pink bg-shein-pink text-white"
                  : "border-shein-border hover:border-shein-pink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <div className="mb-2 text-sm font-bold">الكمية</div>
        <div className="inline-flex items-center gap-1 rounded-full border border-shein-border p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-shein-gray"
            aria-label="إنقاص"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-bold tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-shein-gray"
            aria-label="زيادة"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-shein-pink bg-white py-3 text-sm font-bold text-shein-pink transition hover:bg-shein-pink/5"
        >
          <ShoppingCart className="h-4 w-4" />
          أضف للسلة
        </button>
        <button
          onClick={handleBuyNow}
          className="flex flex-[1.5] items-center justify-center gap-2 rounded-full bg-shein-pink py-3 text-sm font-bold text-white transition hover:bg-shein-pink-dark active:scale-95"
        >
          <Zap className="h-4 w-4" />
          اشترِ الآن
        </button>
        <button
          onClick={handleWish}
          className="grid h-12 w-12 place-items-center rounded-full border-2 border-shein-border transition hover:border-shein-pink"
          aria-label="المفضلة"
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isWished ? "fill-shein-pink text-shein-pink" : "text-shein-text"
            )}
          />
        </button>
        <button
          onClick={() => {
            navigator.share?.({ title: product.title }).catch(() => {});
          }}
          className="grid h-12 w-12 place-items-center rounded-full border-2 border-shein-border transition hover:border-shein-pink"
          aria-label="مشاركة"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-2 rounded-xl bg-shein-gray p-3 text-center">
        <div className="flex flex-col items-center gap-1">
          <Truck className="h-5 w-5 text-shein-pink" />
          <span className="text-[10px] font-semibold">شحن سريع</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RotateCcw className="h-5 w-5 text-shein-pink" />
          <span className="text-[10px] font-semibold">إرجاع مجاني</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="h-5 w-5 text-shein-pink" />
          <span className="text-[10px] font-semibold">دفع آمن</span>
        </div>
      </div>
    </div>
  );
}
