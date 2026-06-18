"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { config } from "@/lib/wedding-config";
import { media } from "@/lib/media";
import FlyingBirds from "@/components/fx/FlyingBirds";
import PetalField from "@/components/fx/PetalField";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = [media.heroVideo, media.heroVideoAlt];

  // if a clip fails, try the alternate; the poster image always shows underneath
  const handleError = () => {
    if (srcIndex < sources.length - 1) setSrcIndex((i) => i + 1);
  };

  return (
    <section className="relative h-screen-safe w-full overflow-hidden">
      {/* poster fallback layer (always visible behind the video) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${media.heroPoster})` }}
        aria-hidden="true"
      />
      <video
        key={srcIndex}
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={media.heroPoster}
        onError={handleError}
      >
        <source src={sources[srcIndex]} type="video/mp4" />
      </video>

      {/* legibility gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(74,51,56,0.35) 0%, rgba(140,74,82,0.18) 40%, rgba(74,51,56,0.55) 100%)",
        }}
      />

      <FlyingBirds count={3} color="#FFF8F5" />
      <PetalField density={10} />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-sm uppercase tracking-luxe text-ivory/85 sm:text-base"
        >
          We&apos;re getting married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-names mt-2 font-script leading-none drop-shadow-[0_4px_24px_rgba(74,51,56,0.5)]"
        >
          {config.couple.bride}
        </motion.h1>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="my-1 font-script text-3xl text-gold-light sm:text-4xl"
        >
          &amp;
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-names font-script leading-none drop-shadow-[0_4px_24px_rgba(74,51,56,0.5)]"
        >
          {config.couple.groom}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-6 font-display text-lg tracking-[0.3em] text-ivory/90 sm:text-xl"
        >
          {config.dateShort}
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
          <span className="font-display text-xs uppercase tracking-luxe">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-ivory/60 pt-1.5">
            <span className="h-2 w-[3px] animate-pulse-soft rounded-full bg-ivory/80" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
