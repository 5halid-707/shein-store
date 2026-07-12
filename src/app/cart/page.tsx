"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  Tag,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { formatPrice } from "@/data/products";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [promo, setPromo] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 25;
  const discount = appliedDiscount;
  const total = subtotal + shipping - discount;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "KMH15") {
      setAppliedDiscount(Math.round(subtotal * 0.15));
      showToast("تم تطبيق كود الخصم 15% ✓", "success");
    } else if (promo.trim().toUpperCase() === "WELCOME") {
      setAppliedDiscount(Math.round(subtotal * 0.1));
      showToast("تم تطبيق كود الخصم 10% ✓", "success");
    } else {
      setAppliedDiscount(0);
      showToast("كود الخصم غير صحيح", "error");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-shein-gray">
            <ShoppingCart className="h-12 w-12 text-shein-muted" />
          </div>
          <div>
            <h1 className="text-xl font-black">سلتك فارغة</h1>
            <p className="text-sm text-shein-muted">
              لم تقم بإضافة أي منتجات بعد. ابدأ التسوق الآن!
            </p>
          </div>
          <Link href="/category/all" className="btn-primary">
            <ShoppingBag className="h-4 w-4" />
            ابدأ التسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-4">
      <h1 className="mb-4 text-xl font-black sm:text-2xl">
        سلة التسوق ({items.length} منتج)
      </h1>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((it) => (
            <div
              key={`${it.product.id}-${it.size}-${it.color}`}
              className="flex gap-3 rounded-2xl border border-shein-border p-3"
            >
              <Link
                href={`/product/${it.product.id}`}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-shein-gray sm:h-32 sm:w-28"
              >
                <Image
                  src={it.product.image}
                  alt={it.product.title}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link
                  href={`/product/${it.product.id}`}
                  className="line-clamp-2 text-sm font-semibold hover:text-shein-pink"
                >
                  {it.product.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-shein-muted">
                  <span className="rounded-full bg-shein-gray px-2 py-0.5">
                    المقاس: {it.size}
                  </span>
                  <span className="rounded-full bg-shein-gray px-2 py-0.5">
                    اللون: {it.color}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-shein-pink">
                      {formatPrice(it.product.price)}
                    </span>
                    {it.product.oldPrice && (
                      <span className="text-[11px] text-shein-muted line-through">
                        {formatPrice(it.product.oldPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          it.product.id,
                          it.size,
                          it.color,
                          it.quantity - 1
                        )
                      }
                      className="grid h-7 w-7 place-items-center rounded-full border border-shein-border hover:border-shein-pink"
                      aria-label="إنقاص"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold tabular-nums">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          it.product.id,
                          it.size,
                          it.color,
                          it.quantity + 1
                        )
                      }
                      className="grid h-7 w-7 place-items-center rounded-full border border-shein-border hover:border-shein-pink"
                      aria-label="زيادة"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(it.product.id, it.size, it.color)}
                className="grid h-7 w-7 shrink-0 place-items-center self-start rounded-full text-shein-muted hover:bg-red-50 hover:text-red-500"
                aria-label="حذف"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="flex justify-between">
            <Link
              href="/category/all"
              className="inline-flex items-center gap-1 text-sm font-bold text-shein-pink hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              متابعة التسوق
            </Link>
            <button
              onClick={() => {
                clearCart();
                showToast("تم إفراغ السلة", "info");
              }}
              className="text-xs font-medium text-shein-muted hover:text-red-500"
            >
              إفراغ السلة
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-shein-border p-4">
            <h2 className="mb-3 text-base font-black">ملخص الطلب</h2>

            {/* Promo */}
            <div className="mb-3">
              <div className="mb-1 flex items-center gap-1 text-xs font-bold">
                <Tag className="h-3.5 w-3.5" />
                كود الخصم
              </div>
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="KMH15 أو WELCOME"
                  className="flex-1 rounded-full border border-shein-border bg-shein-gray/50 px-3 py-2 text-xs outline-none focus:border-shein-pink"
                />
                <button
                  onClick={applyPromo}
                  className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white hover:bg-shein-dark"
                >
                  تطبيق
                </button>
              </div>
            </div>

            <div className="space-y-2 border-t border-shein-border pt-3 text-sm">
              <div className="flex justify-between text-shein-muted">
                <span>المجموع الفرعي</span>
                <span className="font-semibold text-shein-text">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-shein-muted">
                <span>الشحن</span>
                <span className="font-semibold text-shein-text">
                  {shipping === 0 ? "مجاني" : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>الخصم</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-shein-border pt-2 text-base font-black">
                <span>الإجمالي</span>
                <span className="text-shein-pink">{formatPrice(total)}</span>
              </div>
            </div>

            {subtotal < 200 && (
              <div className="mt-3 rounded-lg bg-shein-pink/10 p-2 text-center text-[11px] text-shein-pink">
                أضف بـ {formatPrice(200 - subtotal)} للحصول على شحن مجاني! 🚚
              </div>
            )}

            <Link href="/checkout" className="btn-primary mt-4 w-full">
              إتمام الشراء ←
            </Link>

            <div className="mt-3 text-center text-[10px] text-shein-muted">
              🔒 معاملة آمنة ومشفّرة 100%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
