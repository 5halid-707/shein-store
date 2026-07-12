"use client";

import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Mail,
  Phone,
  Settings,
} from "lucide-react";

export default function AccountPage() {
  const menu = [
    { icon: Package, label: "طلباتي", sub: "تتبع وعرض طلباتك السابقة", href: "#" },
    { icon: Heart, label: "المفضلة", sub: "المنتجات المحفوظة", href: "/wishlist" },
    { icon: MapPin, label: "العناوين", sub: "إدارة عناوين الشحن", href: "#" },
    { icon: CreditCard, label: "طرق الدفع", sub: "البطاقات المحفوظة", href: "#" },
    { icon: Bell, label: "الإشعارات", sub: "إعدادات التنبيهات", href: "#" },
    { icon: Settings, label: "الإعدادات", sub: "تخصيص الحساب", href: "#" },
    { icon: HelpCircle, label: "المساعدة والدعم", sub: "تواصل معنا", href: "#" },
  ];

  return (
    <div className="container-app py-4">
      <h1 className="mb-4 text-xl font-black sm:text-2xl">حسابي</h1>

      {/* Profile card */}
      <div className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-l from-shein-pink to-shein-pink-light p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur">
            <User className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-black">ضيف KMH</div>
            <div className="text-xs opacity-90">مرحباً بك في متجر KMH Fashion</div>
          </div>
          <Link
            href="#"
            className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold backdrop-blur hover:bg-white/30"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>

      {/* Contact info */}
      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a
          href="mailto:khalid-alharbi@zohomail.sa"
          className="flex items-center gap-3 rounded-xl border border-shein-border p-3 hover:border-shein-pink"
        >
          <Mail className="h-5 w-5 text-shein-pink" />
          <div className="min-w-0">
            <div className="text-[10px] text-shein-muted">البريد الإلكتروني</div>
            <div className="truncate text-xs font-bold">
              khalid-alharbi@zohomail.sa
            </div>
          </div>
        </a>
        <a
          href="https://wa.me/966575015019"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl border border-shein-border p-3 hover:border-shein-pink"
        >
          <Phone className="h-5 w-5 text-shein-pink" />
          <div>
            <div className="text-[10px] text-shein-muted">واتساب</div>
            <div className="text-xs font-bold" dir="ltr">+966 57 501 5019</div>
          </div>
        </a>
      </div>

      {/* Menu */}
      <div className="overflow-hidden rounded-2xl border border-shein-border">
        {menu.map((m, i) => (
          <Link
            key={m.label}
            href={m.href}
            className={`flex items-center gap-3 p-3 hover:bg-shein-gray ${
              i !== menu.length - 1 ? "border-b border-shein-border" : ""
            }`}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-shein-gray">
              <m.icon className="h-5 w-5 text-shein-pink" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">{m.label}</div>
              <div className="text-[10px] text-shein-muted">{m.sub}</div>
            </div>
            <ChevronLeft className="h-4 w-4 text-shein-muted" />
          </Link>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-shein-border p-3 text-sm font-bold text-red-500 hover:bg-red-50">
        <LogOut className="h-4 w-4" />
        تسجيل الخروج
      </button>

      <p className="mt-6 text-center text-[10px] text-shein-muted">
        متجر KMH Fashion — ملك: خالد الحربي © {new Date().getFullYear()}
      </p>
    </div>
  );
}
