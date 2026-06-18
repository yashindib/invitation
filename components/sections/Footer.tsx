"use client";

import { config } from "@/lib/wedding-config";
import PetalField from "@/components/fx/PetalField";
import { Motif, MotifFrame } from "@/components/fx/Motif";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#2E1410] px-6 py-20 text-center text-ivory">
      <PetalField density={8} />
      <div className="relative z-10">
        {/* lotus-wreath monogram */}
        <MotifFrame frame="frame2" className="mx-auto aspect-square w-44 sm:w-52" padding="26%">
          <p className="font-script text-3xl text-gold-light">{config.couple.initials}</p>
        </MotifFrame>

        <p className="mt-6 font-sinhala text-2xl text-gold-light">{config.greetingSi}</p>
        <p className="mt-3 font-script text-5xl text-gold-light sm:text-6xl">
          {config.couple.bride.split(" ")[0]} &amp; {config.couple.groom.split(" ")[0]}
        </p>
        <p className="mt-2 font-sinhala text-lg text-ivory/80">
          {config.couple.brideSi} &amp; {config.couple.groomSi}
        </p>
        <p className="mt-4 font-display text-sm uppercase tracking-luxe text-gold-light">
          {config.dateShort}
        </p>
        <div className="mx-auto my-7 h-px w-16 bg-gold/50" />
        <p className="font-body text-sm text-ivory/70">
          With our families&apos; blessings — we can&apos;t wait to celebrate with you.
        </p>
        <p className="mt-6 font-script text-2xl text-blush">{config.hashtag}</p>

        {/* paired oil lamps */}
        <div className="mt-8 flex items-end justify-center gap-8">
          <Motif name="lamp" className="w-12" float />
          <Motif name="lamp" className="w-12" float />
        </div>
      </div>
    </footer>
  );
}
