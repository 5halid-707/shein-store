"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const router = useRouter();
  const { totalCount, setIsOpen } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/category/all?q=${encodeURIComponent(query.trim())}`);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-shadow",
        scrolled && "shadow-md"
      )}
    >
      {/* Top row */}
      <div className="container-app flex h-14 items-center gap-3 md:h-16">
        <button
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-shein-gray md:hidden"
          aria-label="القائمة"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="flex shrink-0 items-center" aria-label="SHEIN">
          <Image
            src="/shein-logo.svg"
            alt="SHEIN"
            width={110}
            height={32}
            priority
            className="h-7 w-auto md:h-9"
          />
        </Link>

        <form
          onSubmit={submitSearch}
          className="mx-auto hidden flex-1 max-w-2xl items-center md:flex"
        >
          <div className="flex w-full items-center rounded-full border-2 border-shein-pink bg-white px-2 focus-within:border-shein-pink-dark">
            <Search className="ms-2 h-4 w-4 text-shein-pink" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن المنتجات، الماركات، الفئات..."
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-shein-muted"
            />
            <button
              type="submit"
              className="rounded-full bg-shein-pink px-5 py-1.5 text-xs font-bold text-white transition hover:bg-shein-pink-dark"
            >
              بحث
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0 md:gap-2">
          <Link
            href="/category/all"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-shein-gray md:hidden"
            aria-label="بحث"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/wishlist"
            className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-shein-gray"
            aria-label="المفضلة"
          >
            <Heart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-shein-pink px-1 text-[10px] font-bold text-white">
                {wishCount}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="hidden h-9 w-9 place-items-center rounded-full hover:bg-shein-gray md:grid"
            aria-label="حسابي"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-shein-gray"
            aria-label="السلة"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-shein-pink px-1 text-[10px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="container-app pb-2 md:hidden">
        <form onSubmit={submitSearch} className="flex items-center">
          <div className="flex w-full items-center rounded-full border-2 border-shein-pink bg-white px-2 focus-within:border-shein-pink-dark">
            <Search className="ms-1 h-4 w-4 text-shein-pink" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-shein-muted"
            />
            <button
              type="submit"
              className="rounded-full bg-shein-pink px-4 py-1.5 text-xs font-bold text-white"
            >
              بحث
            </button>
          </div>
        </form>
      </div>

      {/* Category nav (desktop) */}
      <nav className="hidden border-t border-shein-border bg-white md:block">
        <div className="container-app flex h-11 items-center gap-1 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-sm font-medium text-shein-text transition hover:text-shein-pink"
            >
              <span className="text-base">{c.icon}</span>
              {c.name}
            </Link>
          ))}
          <Link
            href="/category/all"
            className="mr-auto whitespace-nowrap px-3 py-1.5 text-sm font-bold text-shein-pink"
          >
            كل المنتجات ←
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[85%] bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Image
                src="/shein-logo.svg"
                alt="SHEIN"
                width={100}
                height={28}
                className="h-7 w-auto"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-shein-gray"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-shein-gray"
                >
                  <span className="text-xl">{c.icon}</span>
                  {c.name}
                  <span className="text-xs text-shein-muted">({c.nameEn})</span>
                </Link>
              ))}
              <Link
                href="/category/all"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-xl bg-shein-pink px-3 py-3 text-center text-sm font-bold text-white"
              >
                كل المنتجات
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
