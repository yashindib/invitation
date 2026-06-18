"use client";

import { config } from "@/lib/wedding-config";
import { Reveal } from "@/components/fx/Reveal";
import SectionHeading from "@/components/fx/SectionHeading";
import { Motif, MotifFrame } from "@/components/fx/Motif";

export default function DressCode() {
  return (
    <section className="relative overflow-hidden bg-romantic-grad px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          index={5}
          kicker="A little note on attire"
          kickerSi="ඇඳුම් රටාව"
          title="Dress Code"
        />

        <Reveal className="mt-8">
          <MotifFrame frame="frame3" className="mx-auto aspect-square w-40 sm:w-48" padding="30%">
            <Motif name="lotus" className="w-14" float />
          </MotifFrame>
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

          {/* paired garlands */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <Motif name="garland" className="w-20 opacity-90" float />
            <Motif name="pot" className="w-12 opacity-90" float />
            <Motif name="garland" className="w-20 opacity-90" float />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
