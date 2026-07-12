"use client";

import { Truck, RotateCcw, ShieldCheck, Tag, Gift, Star } from "lucide-react";

const messages = [
  { icon: Truck, text: "شحن مجاني للطلبات فوق 200 ر.س" },
  { icon: RotateCcw, text: "إرجاع مجاني خلال 35 يوم" },
  { icon: ShieldCheck, text: "دفع آمن 100% • الدفع عند الاستلام متاح" },
  { icon: Tag, text: "تخفيضات الموسم — حتى 70% خصم" },
  { icon: Gift, text: "كود خصم 15% على طلبك الأول: SHEIN15" },
  { icon: Star, text: "أحدث صيحات الموضة بأسعار لا تُقاوم" },
];

export function AnnouncementBar() {
  // Build a duplicated list for seamless marquee loop
  const items = [...messages, ...messages];

  return (
    <div className="overflow-hidden bg-black text-white">
      <div className="flex h-9 items-center">
        <div className="flex animate-marquee-rtl whitespace-nowrap">
          {items.map((m, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2 px-6 text-[11px] font-medium sm:text-xs"
            >
              <m.icon className="h-3.5 w-3.5 text-shein-pink" />
              {m.text}
              <span className="ms-6 text-shein-pink">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
