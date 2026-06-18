"use client";

import { config } from "@/lib/wedding-config";
import PetalField from "@/components/fx/PetalField";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#4A3338] px-6 py-20 text-center text-ivory">
      <PetalField density={8} />
      <div className="relative z-10">
        <p className="font-script text-5xl text-blush sm:text-6xl">
          {config.couple.bride} &amp; {config.couple.groom}
        </p>
        <p className="mt-4 font-display text-sm uppercase tracking-luxe text-gold-light">
          {config.dateShort}
        </p>
        <div className="mx-auto my-7 h-px w-16 bg-gold/50" />
        <p className="font-body text-sm text-ivory/70">
          With all our love — we can&apos;t wait to celebrate with you.
        </p>
        <p className="mt-6 font-script text-2xl text-rose">{config.hashtag}</p>
      </div>
    </footer>
  );
}
