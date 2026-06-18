"use client";

import Image from "next/image";
import { config } from "@/lib/wedding-config";
import { Reveal } from "@/components/fx/Reveal";
import SectionHeading from "@/components/fx/SectionHeading";
import AnimatedIcon, { IconName } from "@/components/fx/AnimatedIcon";
import PetalField from "@/components/fx/PetalField";
import { Motif, type MotifName } from "@/components/fx/Motif";

// ritual icons that have a matching cropped motif image
const ICON_MOTIF: Record<string, MotifName | undefined> = {
  lamp: "lamp",
  poruwa: "poruwa",
  lotus: "lotus",
};

export default function Customs() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <PetalField density={10} />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          index={1}
          kicker="The rituals we cherish"
          kickerSi="චාරිත්‍ර වාරිත්‍ර"
          title="Our Customs"
        />

        {/* featured: bride & groom + heritage note */}
        <div className="mt-12 grid items-center gap-10 sm:grid-cols-2">
          <Reveal y={50}>
            <div className="relative mx-auto w-full max-w-sm">
              {/* draped garland above the portrait */}
              <Motif
                name="garland"
                className="absolute -top-8 left-1/2 z-10 w-28 -translate-x-1/2"
                float
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ivory shadow-rose-lg ring-1 ring-rim">
                <Image
                  src="/couple-heritage.png"
                  alt="Illustrated bride in a red-and-gold osariya and groom in traditional Kandyan attire, holding hands"
                  fill
                  sizes="(min-width: 640px) 42vw, 88vw"
                  className="object-contain p-5"
                  priority
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="text-center sm:text-left">
              <Motif name="pot" className="mx-auto mb-4 w-16 sm:mx-0" float />
              <p className="font-sinhala text-2xl text-wine">සම්ප්‍රදාය</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
                A celebration steeped in heritage
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-cocoa sm:text-lg">
                Our wedding follows the cherished customs of a traditional Sinhala
                ceremony — each ritual a thread that binds two families together in
                light, blessing and love. We would be honoured for you to share in
                these sacred moments with us.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ritual cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {config.customs.map((c, i) => {
            const motif = ICON_MOTIF[c.icon];
            return (
              <Reveal key={c.name} delay={(i % 2) * 0.1}>
                <div className="flex h-full items-start gap-5 rounded-2xl glass-blush p-6 shadow-petal sm:p-7">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-rim bg-ivory">
                    {motif ? (
                      <Motif name={motif} className="w-9" />
                    ) : (
                      <AnimatedIcon name={c.icon as IconName} size={38} />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="flex items-baseline gap-3">
                      <h4 className="font-display text-xl font-medium text-wine">{c.name}</h4>
                      <span className="font-sinhala text-base text-rose">{c.nameSi}</span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-cocoa">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
