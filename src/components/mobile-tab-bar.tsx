"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", icon: Home, label: "الرئيسية" },
  { href: "/category/all", icon: Grid3x3, label: "الأقسام" },
  { href: "/cart", icon: ShoppingCart, label: "السلة", badge: "cart" },
  { href: "/wishlist", icon: Heart, label: "المفضلة", badge: "wish" },
  { href: "/account", icon: User, label: "حسابي" },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { count: wishCount } = useWishlist();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid h-16 grid-cols-5 border-t border-shein-border bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden">
      {items.map((it) => {
        const active =
          it.href === "/"
            ? pathname === "/"
            : pathname.startsWith(it.href.split("?")[0]);
        const badge =
          it.badge === "cart"
            ? totalCount
            : it.badge === "wish"
            ? wishCount
            : 0;
        return (
          <Link
            key={it.href}
            href={it.href}
            className="relative flex flex-col items-center justify-center gap-1"
          >
            <div
              className={cn(
                "relative grid h-7 w-7 place-items-center transition",
                active ? "text-shein-pink" : "text-shein-muted"
              )}
            >
              <it.icon className="h-[22px] w-[22px]" />
              {badge > 0 && (
                <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-shein-pink px-1 text-[9px] font-bold text-white">
                  {badge}
                </span>
              )}
            </div>
            <span
              className={cn(
                "text-[10px] font-medium",
                active ? "text-shein-pink" : "text-shein-muted"
              )}
            >
              {it.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
