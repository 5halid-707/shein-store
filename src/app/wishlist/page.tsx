"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/wishlist-context";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/data/products";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="container-app py-4">
      <div className="mb-4">
        <h1 className="flex items-center gap-2 text-xl font-black sm:text-2xl">
          <Heart className="h-6 w-6 text-shein-pink" />
          المفضلة ({products.length})
        </h1>
        <p className="text-xs text-shein-muted">
          المنتجات التي أضفتها لقائمة المفضلة
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-shein-gray">
            <Heart className="h-12 w-12 text-shein-muted" />
          </div>
          <div>
            <h2 className="text-lg font-bold">قائمة المفضلة فارغة</h2>
            <p className="text-sm text-shein-muted">
              ابدأ بإضافة المنتجات التي تعجبك بالنقر على ❤
            </p>
          </div>
          <Link href="/category/all" className="btn-primary">
            <ShoppingBag className="h-4 w-4" />
            تصفّح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
