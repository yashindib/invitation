"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/wedding-config";
import { getTimeLeft, type TimeLeft } from "@/lib/utils";
import { CalligraphyReveal } from "@/components/fx/Reveal";
import Fireflies from "@/components/fx/Fireflies";
import SectionDivider from "@/components/fx/SectionDivider";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-20 w-16 items-center justify-center rounded-xl glass-blush shadow-petal sm:h-28 sm:w-24">
        <span className="font-display text-3xl font-medium text-wine sm:text-5xl tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 font-display text-xs uppercase tracking-luxe text-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setT(getTimeLeft(config.dateISO));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#5C343B] px-6 py-24 text-ivory sm:py-32">
      <Fireflies density={16} />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="font-display text-sm uppercase tracking-luxe text-gold-light">
          Counting down
        </p>
        <h2 className="text-section mt-3 font-display font-light">
          <CalligraphyReveal text="Until we say I do" />
        </h2>
        <SectionDivider className="mt-6" />

        <div className="mt-12 flex items-start justify-center gap-3 sm:gap-6">
          {t?.done ? (
            <p className="font-script text-4xl text-gold-light">
              Today is the day!
            </p>
          ) : (
            <>
              <Unit value={t?.days ?? 0} label="Days" />
              <Unit value={t?.hours ?? 0} label="Hours" />
              <Unit value={t?.minutes ?? 0} label="Minutes" />
              <Unit value={t?.seconds ?? 0} label="Seconds" />
            </>
          )}
        </div>

        <p className="mt-10 font-script text-3xl text-blush">{config.hashtag}</p>
      </div>
    </section>
  );
}
