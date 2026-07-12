"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  bg: string;
  image: string;
  textColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "تخفيضات الموسم الكبرى",
    subtitle: "حتى 70% خصم على آلاف المنتجات",
    cta: "تسوّق الآن",
    href: "/category/all",
    bg: "linear-gradient(135deg, #ee296d 0%, #ff5a8a 100%)",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop&q=80&auto=format",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "تشكيلة السهرة الجديدة",
    subtitle: "فساتين أنيقة لإطلالة لا تُنسى",
    cta: "اكتشف المجموعة",
    href: "/category/women",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #2d2d2d 100%)",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop&q=80&auto=format",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "عالم الرجل العصري",
    subtitle: "أحدث صيحات الموضة الرجالية",
    cta: "تسوّق رجالي",
    href: "/category/men",
    bg: "linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 100%)",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&h=600&fit=crop&q=80&auto=format",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "جمالكِ يبدأ من هنا",
    subtitle: "تشكيلة التجميل والعطور الفاخرة",
    cta: "اكتشف الجمال",
    href: "/category/beauty",
    bg: "linear-gradient(135deg, #d4af37 0%, #f1c40f 100%)",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop&q=80&auto=format",
    textColor: "text-white",
  },
];

export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (i: number) => setIdx((i + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="container-app py-3">
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${idx * 100}%)` }}
        >
          {slides.map((s) => (
            <div
              key={s.id}
              className="relative h-[200px] w-full shrink-0 sm:h-[320px] lg:h-[400px]"
              style={{ background: s.bg }}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={s.id === 1}
                sizes="100vw"
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5 sm:gap-4 sm:p-12">
                <div
                  className={cn(
                    "max-w-md text-2xl font-black leading-tight sm:text-4xl lg:text-5xl",
                    s.textColor
                  )}
                >
                  {s.title}
                </div>
                <div
                  className={cn(
                    "max-w-md text-sm font-medium opacity-90 sm:text-lg",
                    s.textColor
                  )}
                >
                  {s.subtitle}
                </div>
                <Link
                  href={s.href}
                  className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black shadow-lg transition hover:scale-105 sm:text-sm"
                >
                  {s.cta}
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(idx - 1)}
          className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-black shadow hover:bg-white sm:grid"
          aria-label="السابق"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(idx + 1)}
          className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-black shadow hover:bg-white sm:grid"
          aria-label="التالي"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full bg-white/60 transition-all",
                i === idx ? "w-6 bg-white" : "w-1.5"
              )}
              aria-label={`شريحة ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
