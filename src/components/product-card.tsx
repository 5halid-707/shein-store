"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
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
      className="group relative block overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-lg"
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

        {/* Discount badge — top-left, red (Shein style) */}
        {product.discount && (
          <div className="absolute left-0 top-0 bg-shein-red px-1.5 py-0.5 text-[10px] font-bold text-white sm:text-xs">
            -{product.discount}%
          </div>
        )}

        {/* New badge — top-right (under wishlist) */}
        {product.isNewArrival && (
          <div className="absolute right-2 top-9 rounded-sm bg-black px-1.5 py-0.5 text-[9px] font-bold text-white sm:text-[10px]">
            جديد
          </div>
        )}

        {/* Wishlist heart — top-right */}
        <button
          onClick={handleWish}
          className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110"
          aria-label="إضافة للمفضلة"
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5 transition",
              isWished
                ? "fill-shein-pink text-shein-pink"
                : "text-shein-text"
            )}
          />
        </button>

        {/* ADD TO CART button — hover (desktop) / always (mobile) */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 translate-y-0 transition-transform duration-300 md:translate-y-full md:opacity-0",
            hover && "md:translate-y-0 md:opacity-100"
          )}
        >
          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-1.5 bg-shein-pink py-2.5 text-xs font-bold text-white transition hover:bg-shein-pink-dark"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            أضف للسلة
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-2.5">
        {/* Title — small, gray, 2 lines (Shein style) */}
        <h3 className="line-clamp-2 min-h-[32px] text-[11px] font-normal leading-tight text-shein-muted sm:text-xs">
          {product.title}
        </h3>

        {/* Price — red, bold + original strikethrough */}
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-shein-red sm:text-base">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-shein-muted line-through sm:text-xs">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Rating row */}
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-semibold text-shein-text">
            {product.rating}
          </span>
          <span className="text-[9px] text-shein-muted">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Colors — dots row */}
        <div className="mt-1.5 flex items-center gap-1">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              className="h-3 w-3 rounded-full border border-shein-border"
              style={{ background: c.hex }}
              title={c.name}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[9px] text-shein-muted">
              +{product.colors.length - 5}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
