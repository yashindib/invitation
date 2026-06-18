"use client";

import { config } from "@/lib/wedding-config";
import { Reveal, CalligraphyReveal } from "@/components/fx/Reveal";
import AnimatedIcon from "@/components/fx/AnimatedIcon";
import SectionDivider from "@/components/fx/SectionDivider";

export default function DressCode() {
  return (
    <section className="relative overflow-hidden bg-romantic-grad px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm uppercase tracking-luxe text-rose">
          A little note on attire
        </p>
        <h2 className="text-section mt-3 font-display font-light text-ink">
          <CalligraphyReveal text="Dress Code" />
        </h2>
        <SectionDivider className="mt-6" />

        <Reveal className="mt-8">
          <div className="flex justify-center">
            <AnimatedIcon name="heart" size={56} color="#C97B84" />
          </div>
          <p className="mt-5 font-script text-3xl rose-text">
            {config.dressCode.title}
          </p>
          <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-cocoa">
            {config.dressCode.note}
          </p>

          {/* palette swatches */}
          <div className="mt-9 flex justify-center gap-3 sm:gap-4">
            {config.dressCode.palette.map((c, i) => (
              <div
                key={c}
                className="h-12 w-12 rounded-full shadow-petal animate-float-medium sm:h-14 sm:w-14"
                style={{ background: c, animationDelay: `${i * 0.4}s` }}
                aria-hidden="true"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
