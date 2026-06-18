"use client";

import { CalligraphyReveal } from "@/components/fx/Reveal";
import SectionDivider from "@/components/fx/SectionDivider";

/**
 * Modern, editorial section heading: a section index, a Sinhala + English
 * kicker, a large serif title, and a minimal lotus divider.
 */
export default function SectionHeading({
  index,
  kicker,
  kickerSi,
  title,
  align = "center",
  divider = true,
}: {
  index: number;
  kicker: string;
  kickerSi?: string;
  title: string;
  align?: "center" | "left";
  divider?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <div
        className={`flex items-center gap-3 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <span className="font-display text-sm tabular-nums text-gold">
          {String(index).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-gold/50" />
        <span className="font-display text-xs uppercase tracking-luxe text-rose">
          {kicker}
        </span>
      </div>

      {kickerSi && (
        <p className="mt-3 font-sinhala text-xl text-wine sm:text-2xl">{kickerSi}</p>
      )}

      <h2 className="text-section mt-2 font-display font-light text-ink">
        <CalligraphyReveal text={title} />
      </h2>

      {divider && <SectionDivider className={`mt-6 ${isCenter ? "" : "!justify-start"}`} />}
    </div>
  );
}
