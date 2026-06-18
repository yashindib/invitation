"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/wedding-config";
import { media } from "@/lib/media";
import FlyingBirds from "@/components/fx/FlyingBirds";
import PetalField from "@/components/fx/PetalField";
import IllustratedScene from "@/components/fx/IllustratedScene";
import { Motif } from "@/components/fx/Motif";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = [media.heroVideo, media.heroVideoAlt];

  const handleError = () => {
    if (srcIndex < sources.length - 1) setSrcIndex((i) => i + 1);
  };

  return (
    <section className="relative h-screen-safe w-full overflow-hidden">
      {/* animated illustrated backdrop (also the fallback if the video is blocked) */}
      <IllustratedScene variant="poruwa" />
      <video
        key={srcIndex}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={handleError}
      >
        <source src={sources[srcIndex]} type="video/mp4" />
      </video>

      {/* legibility gradient — warm maroon wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(61,26,20,0.42) 0%, rgba(110,30,30,0.22) 38%, rgba(40,18,14,0.62) 100%)",
        }}
      />

      <FlyingBirds count={3} color="#E6CB7A" />
      <PetalField density={9} />

      {/* thin gold frame with corner ticks — modern editorial */}
      <div className="pointer-events-none absolute inset-4 z-10 border border-gold-light/30 sm:inset-6">
        {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map((p) => (
          <span
            key={p}
            className={`absolute ${p} h-5 w-5 border-gold-light/70`}
            style={{
              borderTopWidth: p.includes("top") ? 1 : 0,
              borderBottomWidth: p.includes("bottom") ? 1 : 0,
              borderLeftWidth: p.includes("left") ? 1 : 0,
              borderRightWidth: p.includes("right") ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <Motif name="lotus" className="mb-3 w-14 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] sm:w-16" float />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sinhala text-lg text-gold-light sm:text-xl"
        >
          {config.invitationSi}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-2 font-display text-[0.7rem] uppercase tracking-luxe text-ivory/80 sm:text-xs"
        >
          Together with our families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display font-light leading-[0.95] drop-shadow-[0_4px_24px_rgba(40,18,14,0.6)]"
          style={{ fontSize: "clamp(2.6rem, 11vw, 6.5rem)" }}
        >
          {config.couple.bride.split(" ")[0]}
          <span className="mx-3 font-script text-gold-light">&amp;</span>
          {config.couple.groom.split(" ")[0]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-3 font-sinhala text-xl text-ivory/90 sm:text-2xl"
        >
          {config.couple.brideSi} &amp; {config.couple.groomSi}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-7 flex items-center gap-4 font-display text-sm tracking-[0.3em] text-ivory/90 sm:text-base"
        >
          <span className="h-px w-8 bg-gold-light/60" />
          {config.dateShort}
          <span className="h-px w-8 bg-gold-light/60" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-2 font-display text-xs uppercase tracking-luxe text-gold-light/90"
        >
          Poruwa at {config.nekath.poruwa}
        </motion.p>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-ivory/80"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[0.65rem] uppercase tracking-luxe">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-ivory/60 pt-1.5">
            <span className="h-2 w-[3px] animate-pulse-soft rounded-full bg-ivory/80" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
