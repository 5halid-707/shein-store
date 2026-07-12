"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { useToast } from "@/context/toast-context";
import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();
  const isWished = has(product.id);
  const [hover, setHover] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    showToast("تمت الإضافة إلى السلة ✓", "success");
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    showToast(
      isWished ? "أُزيل من المفضلة" : "أُضيف إلى المفضلة ♥",
      isWished ? "info" : "success"
    );
  };

  return (
    <Link
      href={`/product/${product.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative block overflow-hidden rounded-2xl border border-shein-border bg-white transition-all hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-shein-gray">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount badge */}
        {product.discount && (
          <div className="absolute right-2 top-2 rounded-full bg-shein-pink px-2 py-0.5 text-[10px] font-bold text-white shadow">
            -{product.discount}%
          </div>
        )}

        {/* New badge */}
        {product.isNewArrival && (
          <div className="absolute left-2 top-2 rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">
            جديد
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWish}
          className={cn(
            "absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110",
            product.isNewArrival && "top-9"
          )}
          aria-label="إضافة للمفضلة"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition",
              isWished
                ? "fill-shein-pink text-shein-pink"
                : "text-shein-text"
            )}
          />
        </button>

        {/* Quick view (hover) */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-black/70 p-2 backdrop-blur transition-transform duration-300",
            hover && "translate-y-0"
          )}
        >
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-white">
            <Eye className="h-3.5 w-3.5" /> عرض سريع
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-3">
        <div className="mb-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[11px] font-semibold text-shein-text">
            {product.rating}
          </span>
          <span className="text-[10px] text-shein-muted">
            ({product.reviewsCount})
          </span>
          <span className="mr-auto text-[10px] text-shein-muted">
            {product.subcategory}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[34px] text-xs font-medium leading-tight text-shein-text sm:text-sm">
          {product.title}
        </h3>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-sm font-black text-shein-pink sm:text-base">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-shein-muted line-through sm:text-xs">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Colors */}
        <div className="mt-2 flex items-center gap-1">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c.name}
              className="h-3 w-3 rounded-full border border-shein-border"
              style={{ background: c.hex }}
              title={c.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[9px] text-shein-muted">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-full bg-shein-pink py-1.5 text-xs font-bold text-white transition hover:bg-shein-pink-dark active:scale-95"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          أضف للسلة
        </button>
      </div>
    </Link>
  );
}
