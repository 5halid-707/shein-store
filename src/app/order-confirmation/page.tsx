"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Package, Truck, Home, Mail, Phone } from "lucide-react";
import { formatPrice } from "@/data/products";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("shein-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="container-app py-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-black sm:text-3xl">تم استلام طلبك! 🎉</h1>
        <p className="mt-2 text-sm text-shein-muted">
          شكراً لتسوقك من متجر SHEIN. سنرسل لك بريداً إلكترونياً بتفاصيل الطلب
          وملخص الشحنة.
        </p>

        {order && (
          <div className="mt-6 rounded-2xl border border-shein-border p-5 text-right">
            <div className="mb-4 flex items-center justify-between border-b border-shein-border pb-3">
              <div>
                <div className="text-[11px] text-shein-muted">رقم الطلب</div>
                <div className="text-base font-black text-shein-pink">
                  #{order.id}
                </div>
              </div>
              <div className="text-left">
                <div className="text-[11px] text-shein-muted">الإجمالي</div>
                <div className="text-base font-black">
                  {formatPrice(order.total)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <Info icon={Package} label="عدد المنتجات" value={`${order.items} قطعة`} />
              <Info icon={Home} label="المدينة" value={order.city} />
              <Info icon={Mail} label="البريد" value={order.email || "—"} />
              <Info icon={Phone} label="الجوال" value={order.phone} />
            </div>

            <div className="mt-4 rounded-xl bg-shein-gray p-3 text-xs">
              <div className="mb-2 font-bold">حالة الطلب</div>
              <div className="flex items-center justify-between">
                <Step icon={CheckCircle2} label="تم الطلب" active />
                <Line />
                <Step icon={Package} label="قيد التجهيز" active />
                <Line />
                <Step icon={Truck} label="الشحن" />
                <Line />
                <Step icon={Home} label="التوصيل" />
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/category/all" className="btn-primary">
            متابعة التسوق
          </Link>
          <Link
            href="/"
            className="btn-outline"
          >
            العودة للرئيسية
          </Link>
        </div>

        <p className="mt-6 text-xs text-shein-muted">
          لأي استفسار عن طلبك، تواصل معنا:
          <br />
          <a
            href="mailto:khalid-alharbi@zohomail.sa"
            className="font-bold text-shein-pink"
          >
            khalid-alharbi@zohomail.sa
          </a>{" "}
          •{" "}
          <a
            href="https://wa.me/966575015019"
            className="font-bold text-shein-pink"
          >
            +966 57 501 5019
          </a>
        </p>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-shein-gray p-2">
      <Icon className="h-4 w-4 text-shein-pink" />
      <div>
        <div className="text-[10px] text-shein-muted">{label}</div>
        <div className="font-bold">{value}</div>
      </div>
    </div>
  );
}

function Step({
  icon: Icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`grid h-7 w-7 place-items-center rounded-full ${
          active ? "bg-shein-pink text-white" : "bg-white text-shein-muted border border-shein-border"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <span className={`text-[9px] ${active ? "font-bold text-shein-pink" : "text-shein-muted"}`}>
        {label}
      </span>
    </div>
  );
}

function Line() {
  return <div className="h-0.5 flex-1 bg-shein-border" />;
}
