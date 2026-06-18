"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { media } from "@/lib/media";
import { Reveal } from "@/components/fx/Reveal";
import SectionHeading from "@/components/fx/SectionHeading";
import AnimatedImage from "@/components/fx/AnimatedImage";

export default function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index={4}
          kicker="Moments we treasure"
          kickerSi="සිහිවටන"
          title="Our Gallery"
        />

        <div className="mt-12 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {media.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(src)}
                className="group relative block w-full overflow-hidden rounded-xl shadow-petal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                style={{ aspectRatio: i % 3 === 1 ? "3 / 4" : "4 / 3" }}
                aria-label="Open photo"
              >
                <AnimatedImage
                  src={src}
                  alt=""
                  sizes="(max-width: 640px) 45vw, 30vw"
                  variant={i}
                />
                <span className="absolute inset-0 z-10 bg-wine/0 transition-colors group-hover:bg-wine/15" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox-lite */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-[78vh] w-[90vw] max-w-3xl overflow-hidden rounded-2xl shadow-rose-lg"
            >
              <Image src={active} alt="" fill sizes="90vw" className="object-cover" />
            </motion.div>
            <button
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full glass-blush text-xl text-wine"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
