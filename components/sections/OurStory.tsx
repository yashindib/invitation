"use client";

import Image from "next/image";
import { config } from "@/lib/wedding-config";
import { media } from "@/lib/media";
import { Reveal, CalligraphyReveal } from "@/components/fx/Reveal";
import SectionDivider from "@/components/fx/SectionDivider";
import PetalField from "@/components/fx/PetalField";

export default function OurStory() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <PetalField density={10} />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-luxe text-rose">
            How it all began
          </p>
          <h2 className="text-section mt-3 font-display font-light text-ink">
            <CalligraphyReveal text="Our Story" />
          </h2>
          <SectionDivider className="mt-6" />
        </div>

        <div className="mt-14 space-y-16 sm:space-y-24">
          {config.story.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={s.year}
                className={`flex flex-col items-center gap-8 sm:gap-12 ${
                  flip ? "sm:flex-row-reverse" : "sm:flex-row"
                }`}
              >
                <Reveal className="w-full sm:w-1/2" y={50}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-rose-lg">
                    <Image
                      src={media.story[i % media.story.length]}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 90vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full glass-blush px-4 py-1 font-display text-sm tracking-widest text-wine">
                      {s.year}
                    </span>
                  </div>
                </Reveal>

                <Reveal className="w-full sm:w-1/2" delay={0.15}>
                  <div className={`text-center ${flip ? "sm:text-right" : "sm:text-left"}`}>
                    <h3 className="font-display text-2xl font-medium text-wine sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 font-body text-base leading-relaxed text-cocoa sm:text-lg">
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
