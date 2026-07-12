"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function FlashSaleTimer({ targetHours = 12 }: { targetHours?: number }) {
  const [target, setTarget] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target on client to avoid hydration mismatch
    const t = Date.now() + targetHours * 60 * 60 * 1000;
    setTarget(t);
  }, [targetHours]);

  useEffect(() => {
    if (!target) return;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [target]);

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-black text-sm font-black text-white tabular-nums sm:h-11 sm:w-11 sm:text-base">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-[9px] font-medium text-shein-muted sm:text-[10px]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-1.5 sm:gap-2" dir="ltr">
      <Box value={timeLeft.hours} label="ساعة" />
      <span className="text-lg font-black text-black">:</span>
      <Box value={timeLeft.minutes} label="دقيقة" />
      <span className="text-lg font-black text-black">:</span>
      <Box value={timeLeft.seconds} label="ثانية" />
    </div>
  );
}
