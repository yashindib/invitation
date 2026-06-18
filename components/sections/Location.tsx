"use client";

import Image from "next/image";
import { config } from "@/lib/wedding-config";
import { media } from "@/lib/media";
import { Reveal, CalligraphyReveal } from "@/components/fx/Reveal";
import SectionDivider from "@/components/fx/SectionDivider";

export default function Location() {
  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-luxe text-rose">
            Find your way
          </p>
          <h2 className="text-section mt-3 font-display font-light text-ink">
            <CalligraphyReveal text="The Venue" />
          </h2>
          <SectionDivider className="mt-6" />
        </div>

        <div className="mt-12 grid items-center gap-8 sm:grid-cols-2">
          <Reveal y={50}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-rose-lg">
              <Image
                src={media.venue}
                alt={config.reception.name}
                fill
                sizes="(max-width: 640px) 90vw, 45vw"
                className="object-cover"
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
