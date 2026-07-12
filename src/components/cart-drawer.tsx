"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal, totalCount } =
    useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] transition",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={cn(
          "absolute left-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <header className="flex items-center justify-between border-b border-shein-border p-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-shein-pink" />
            <h3 className="text-base font-bold">
              سلة التسوق ({totalCount})
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-shein-gray"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-shein-gray">
                <ShoppingCart className="h-9 w-9 text-shein-muted" />
              </div>
              <div>
                <p className="text-base font-bold">سلتك فارغة</p>
                <p className="text-sm text-shein-muted">
                  أضف بعض المنتجات الرائعة لتبدأ التسوق
                </p>
              </div>
              <Link
                href="/category/all"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                تصفّح المنتجات
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={`${it.product.id}-${it.size}-${it.color}`}
                  className="flex gap-3 rounded-xl border border-shein-border p-2"
                >
                  <Link
                    href={`/product/${it.product.id}`}
                    onClick={() => setIsOpen(false)}
                    className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-shein-gray"
                  >
                    <Image
                      src={it.product.image}
                      alt={it.product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h4 className="line-clamp-2 text-xs font-semibold">
                      {it.product.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-shein-muted">
                      <span>المقاس: {it.size}</span>
                      <span>•</span>
                      <span>اللون: {it.color}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm font-black text-shein-pink">
                        {formatPrice(it.product.price)}
                      </span>
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
                          className="grid h-6 w-6 place-items-center rounded-full border border-shein-border hover:border-shein-pink"
                          aria-label="إنقاص"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums">
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
                          className="grid h-6 w-6 place-items-center rounded-full border border-shein-border hover:border-shein-pink"
                          aria-label="زيادة"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      removeItem(it.product.id, it.size, it.color)
                    }
                    className="grid h-7 w-7 shrink-0 place-items-center self-start rounded-full text-shein-muted hover:bg-red-50 hover:text-red-500"
                    aria-label="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-shein-border p-4">
            <div className="mb-3 space-y-1 text-sm">
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
              <div className="mt-2 flex justify-between border-t border-shein-border pt-2 text-base font-black">
                <span>الإجمالي</span>
                <span className="text-shein-pink">{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full"
            >
              إتمام الشراء ←
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="mt-2 block w-full text-center text-xs font-medium text-shein-muted hover:text-shein-pink"
            >
              عرض السلة الكاملة
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
