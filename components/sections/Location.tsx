"use client";

import Image from "next/image";
import { config } from "@/lib/wedding-config";
import { Reveal } from "@/components/fx/Reveal";
import SectionHeading from "@/components/fx/SectionHeading";
import PetalField from "@/components/fx/PetalField";

export default function Location() {
  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index={4}
          kicker="Find your way"
          kickerSi="ස්ථානය"
          title="The Venue"
        />

        <div className="mt-12 grid items-center gap-8 sm:grid-cols-2">
          <Reveal y={50}>
            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <PetalField density={6} />
              <Image
                src="/couple-formal.png"
                alt="Illustrated bride in a white gown and groom in a navy suit, holding hands"
                width={1408}
                height={768}
                sizes="(min-width: 640px) 28rem, 90vw"
                className="relative z-10 h-auto w-full object-contain animate-float-medium"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl glass-blush p-8 shadow-petal">
              <h3 className="font-display text-2xl font-medium text-wine">
                {config.reception.name}
              </h3>
              <p className="mt-3 font-body text-cocoa">{config.reception.address}</p>
              <div className="my-5 h-px w-full bg-rim" />
              <p className="font-body text-sm text-muted">
                Parking is available on site. The ceremony begins at{" "}
                {config.ceremony.time}; please arrive a little early to be seated.
              </p>
              <a
                href={config.reception.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-gold-foil px-7 py-3 font-display text-sm uppercase tracking-widest text-ink shadow-rose transition-transform hover:scale-[1.03]"
              >
                Open in Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
