"use client";

import { Megaphone, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  { icon: Truck, text: "شحن مجاني للطلبات فوق 200 ر.س" },
  { icon: RotateCcw, text: "إرجاع مجاني خلال 14 يوم" },
  { icon: ShieldCheck, text: "دفع آمن 100% • الدفع عند الاستلام متاح" },
  { icon: Megaphone, text: "تخفيضات الموسم — حتى 70% خصم" },
];

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(t);
  }, []);

  const Current = messages[idx];

  return (
    <div className="bg-black text-white">
      <div className="container-app flex h-9 items-center justify-center gap-2 text-center text-[11px] font-medium sm:text-xs">
        <Current.icon className="h-3.5 w-3.5 text-shein-pink" />
        <span>{Current.text}</span>
      </div>
    </div>
  );
}
