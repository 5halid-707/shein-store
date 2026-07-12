"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Send,
  Users,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { CATEGORIES } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-shein-black text-white">
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="container-app grid grid-cols-2 gap-4 py-6 md:grid-cols-4">
          {[
            { icon: Truck, title: "شحن سريع", sub: "توصيل لكل السعودية" },
            { icon: RotateCcw, title: "إرجاع مجاني", sub: "خلال 35 يوم" },
            { icon: ShieldCheck, title: "دفع آمن", sub: "حماية 100%" },
            { icon: CreditCard, title: "الدفع عند الاستلام", sub: "متاح" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <f.icon className="h-5 w-5 text-shein-pink" />
              </div>
              <div>
                <div className="text-sm font-bold">{f.title}</div>
                <div className="text-xs text-white/60">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="container-app grid grid-cols-2 gap-8 py-10 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <div className="mb-3">
            <Image
              src="/shein-logo-white.svg"
              alt="SHEIN"
              width={140}
              height={40}
              className="h-9 w-auto"
            />
          </div>
          <p className="mb-4 text-sm leading-6 text-white/70">
            SHEIN — وجهتك الأولى للتسوق في المملكة العربية السعودية. نوفّر أحدث
            صيحات الموضة للجنسين والأطفال بأفضل الأسعار مع شحن سريع وإرجاع مجاني
            خلال 35 يوم.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-shein-pink" />
              <a
                href="mailto:khalid-alharbi@zohomail.sa"
                className="hover:text-shein-pink"
              >
                khalid-alharbi@zohomail.sa
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-shein-pink" />
              <a
                href="https://wa.me/966575015019"
                target="_blank"
                rel="noreferrer"
                className="hover:text-shein-pink"
              >
                +966 57 501 5019 (واتساب)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-shein-pink" />
              المملكة العربية السعودية
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {[Camera, Send, Users, PlayCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-shein-pink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">التسوق</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="hover:text-shein-pink"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">خدمة العملاء</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/track" className="hover:text-shein-pink">
                تتبع الطلب
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-shein-pink">
                الشحن والتوصيل
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-shein-pink">
                الإرجاع والاستبدال
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-shein-pink">
                الأسئلة الشائعة
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-shein-pink">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">عن المتجر</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/about" className="hover:text-shein-pink">
                من نحن
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-shein-pink">
                سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-shein-pink">
                الشروط والأحكام
              </Link>
            </li>
            <li>المالك: خالد الحربي</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer note */}
      <div className="border-t border-white/10">
        <div className="container-app py-3 text-center">
          <p className="text-xs text-white/50">
            ⚠️ هذا الموقع للعرض فقط — تصميم وتطوير خالد الحربي. ليس متجراً
            حقيقياً ولا يقبل الطلبات الفعلية.
          </p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} SHEIN — جميع الحقوق محفوظة. تصميم خالد
            الحربي 🇸🇦
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["mada", "visa", "mc", "apple", "stc", "cod"].map((p) => (
              <div
                key={p}
                className="grid h-7 min-w-12 place-items-center rounded bg-white/90 px-2 text-[10px] font-bold text-black"
              >
                {p === "mada" && "مدى"}
                {p === "visa" && "VISA"}
                {p === "mc" && "MC"}
                {p === "apple" && " Pay"}
                {p === "stc" && "STC"}
                {p === "cod" && "كاش"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
