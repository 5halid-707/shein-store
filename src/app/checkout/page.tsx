"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CreditCard,
  Banknote,
  Wallet,
  Nfc,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "cod",
    name: "الدفع عند الاستلام",
    desc: "ادفع نقداً عند وصول الطلب",
    icon: Banknote,
  },
  {
    id: "mada",
    name: "مدى",
    desc: "بطاقة مدى السعودية",
    icon: CreditCard,
  },
  {
    id: "visa",
    name: "بطاقة بنكية",
    desc: "Visa / Mastercard",
    icon: CreditCard,
  },
  {
    id: "apple",
    name: "Apple Pay",
    desc: "دفع سريع وآمن",
    icon: Nfc,
  },
  {
    id: "stc",
    name: "STC Pay",
    desc: "محفظة إس تي سي",
    icon: Wallet,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: "",
  });

  const shipping = subtotal >= 200 ? 0 : 25;
  const total = subtotal + shipping;

  const setField = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast("سلتك فارغة", "error");
      return;
    }
    if (!form.name || !form.phone || !form.address || !form.city) {
      showToast("يرجى تعبئة الحقول المطلوبة", "error");
      return;
    }
    setSubmitting(true);
    // simulate order
    setTimeout(() => {
      const orderId = "SHN" + Date.now().toString().slice(-8);
      try {
        sessionStorage.setItem(
          "shein-last-order",
          JSON.stringify({
            id: orderId,
            total,
            items: items.length,
            payment,
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            zip: form.zip,
          })
        );
      } catch {}
      clearCart();
      showToast("تم إنشاء الطلب بنجاح ✓", "success");
      router.push("/order-confirmation");
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-xl font-black">سلتك فارغة</h1>
          <Link href="/category/all" className="btn-primary">
            ابدأ التسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-4">
      <Link
        href="/cart"
        className="mb-3 inline-flex items-center gap-1 text-xs font-bold text-shein-pink hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        العودة للسلة
      </Link>
      <h1 className="mb-4 text-xl font-black sm:text-2xl">إتمام الطلب</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Form */}
        <div className="space-y-4 lg:col-span-2">
          {/* Shipping info */}
          <section className="rounded-2xl border border-shein-border p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-black">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-shein-pink text-xs text-white">
                1
              </span>
              معلومات الشحن
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                label="الاسم الكامل *"
                value={form.name}
                onChange={(v) => setField("name", v)}
                placeholder="مثال: خالد الحربي"
              />
              <Field
                label="رقم الجوال *"
                value={form.phone}
                onChange={(v) => setField("phone", v)}
                placeholder="+966 5XX XXX XXXX"
                type="tel"
              />
              <Field
                label="البريد الإلكتروني"
                value={form.email}
                onChange={(v) => setField("email", v)}
                placeholder="example@email.com"
                type="email"
              />
              <Field
                label="المدينة *"
                value={form.city}
                onChange={(v) => setField("city", v)}
                placeholder="الرياض / جدة / الدمام..."
              />
              <div className="sm:col-span-2">
                <Field
                  label="العنوان التفصيلي *"
                  value={form.address}
                  onChange={(v) => setField("address", v)}
                  placeholder="الحي، الشارع، رقم المبنى..."
                />
              </div>
              <Field
                label="الرمز البريدي"
                value={form.zip}
                onChange={(v) => setField("zip", v)}
                placeholder="12345"
              />
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-bold text-shein-text">
                  ملاحظات إضافية (اختياري)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  placeholder="أي تعليمات خاصة بالتوصيل..."
                  rows={2}
                  className="w-full rounded-xl border border-shein-border bg-shein-gray/40 px-3 py-2 text-sm outline-none focus:border-shein-pink"
                />
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section className="rounded-2xl border border-shein-border p-4">
            <h2 className="mb-3 flex items-center gap-2 text-base font-black">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-shein-pink text-xs text-white">
                2
              </span>
              طريقة الدفع
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {paymentMethods.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-3 text-right transition",
                    payment === m.id
                      ? "border-shein-pink bg-shein-pink/5"
                      : "border-shein-border hover:border-shein-pink/50"
                  )}
                >
                  <div
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full",
                      payment === m.id
                        ? "bg-shein-pink text-white"
                        : "bg-shein-gray"
                    )}
                  >
                    <m.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold">{m.name}</div>
                    <div className="text-[10px] text-shein-muted">{m.desc}</div>
                  </div>
                  {payment === m.id && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-shein-pink" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-shein-gray p-2 text-[11px] text-shein-muted">
              <Lock className="h-3.5 w-3.5" />
              جميع المعاملات مشفّرة ومحمية بأعلى معايير الأمان SSL
            </div>
          </section>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-shein-border p-4">
            <h2 className="mb-3 text-base font-black">ملخص الطلب</h2>
            <ul className="max-h-64 space-y-2 overflow-y-auto no-scrollbar">
              {items.map((it) => (
                <li
                  key={`${it.product.id}-${it.size}-${it.color}`}
                  className="flex gap-2"
                >
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-shein-gray">
                    <Image
                      src={it.product.image}
                      alt={it.product.title}
                      fill
                      sizes="50px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-shein-pink px-1 text-[9px] font-bold text-white">
                      {it.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-[11px] font-semibold">
                      {it.product.title}
                    </div>
                    <div className="text-[10px] text-shein-muted">
                      {it.size} / {it.color}
                    </div>
                    <div className="text-[11px] font-bold text-shein-pink">
                      {formatPrice(it.product.price * it.quantity)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 space-y-1.5 border-t border-shein-border pt-3 text-sm">
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
              <div className="flex justify-between border-t border-shein-border pt-2 text-base font-black">
                <span>الإجمالي</span>
                <span className="text-shein-pink">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-4 w-full"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  جاري المعالجة...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  تأكيد الطلب
                </>
              )}
            </button>

            <p className="mt-2 text-center text-[10px] text-shein-muted">
              بالضغط على "تأكيد الطلب" فإنك توافق على الشروط والأحكام
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold text-shein-text">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-shein-border bg-shein-gray/40 px-3 py-2 text-sm outline-none focus:border-shein-pink"
      />
    </div>
  );
}
