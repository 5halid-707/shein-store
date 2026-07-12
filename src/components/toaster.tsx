"use client";

import { useToast } from "@/context/toast-context";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-20 left-1/2 z-[100] flex w-[92%] max-w-sm -translate-x-1/2 flex-col gap-2 md:bottom-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-lg animate-fade-up",
            t.type === "success" && "border-green-200",
            t.type === "error" && "border-red-200",
            t.type === "info" && "border-blue-200"
          )}
        >
          {t.type === "success" && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
          )}
          {t.type === "error" && (
            <XCircle className="h-5 w-5 shrink-0 text-red-500" />
          )}
          {t.type === "info" && (
            <Info className="h-5 w-5 shrink-0 text-blue-500" />
          )}
          <span className="flex-1 text-sm font-medium">{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="grid h-6 w-6 place-items-center rounded-full hover:bg-shein-gray"
            aria-label="إغلاق"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
