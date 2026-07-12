"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar md:flex-col md:overflow-visible">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition md:h-20 md:w-20",
              active === i
                ? "border-shein-pink"
                : "border-shein-border opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl border border-shein-border bg-shein-gray">
        <Image
          src={images[active]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
