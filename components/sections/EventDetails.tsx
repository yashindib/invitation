"use client";

import { config } from "@/lib/wedding-config";
import { Reveal, CalligraphyReveal } from "@/components/fx/Reveal";
import AnimatedIcon, { IconName } from "@/components/fx/AnimatedIcon";
import SectionDivider from "@/components/fx/SectionDivider";

function VenueCard({
  label,
  name,
  address,
  time,
  mapUrl,
}: {
  label: string;
  name: string;
  address: string;
  time: string;
  mapUrl: string;
}) {
  return (
    <div className="flex-1 rounded-2xl glass-blush p-8 text-center shadow-petal">
      <p className="font-display text-xs uppercase tracking-luxe text-rose">{label}</p>
      <h3 className="mt-3 font-display text-2xl font-medium text-ink sm:text-3xl">
        {name}
      </h3>
      <p className="mt-3 font-body text-sm text-cocoa">{address}</p>
      <p className="mt-1 font-display text-lg text-wine">{time}</p>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block rounded-full border border-gold px-6 py-2 font-display text-sm uppercase tracking-widest text-wine transition-colors hover:bg-gold hover:text-ivory"
      >
        View Map
      </a>
    </div>
  );
}

export default function EventDetails() {
  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-display text-sm uppercase tracking-luxe text-rose">
            Join us to celebrate
          </p>
          <h2 className="text-section mt-3 font-display font-light text-ink">
            <CalligraphyReveal text="The Celebration" />
          </h2>
          <p className="mt-4 font-body text-cocoa">{config.dateLong}</p>
          <SectionDivider className="mt-6" />
        </div>

        {/* schedule with self-drawing icons */}
        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {config.schedule.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center">
                <AnimatedIcon name={item.icon as IconName} size={52} />
              </div>
              <p className="mt-3 font-display text-lg text-wine">{item.time}</p>
              <p className="font-body text-sm text-cocoa">{item.title}</p>
            </Reveal>
          ))}
        </div>

        {/* venue cards */}
        <div className="mt-16 flex flex-col gap-8 sm:flex-row">
          <Reveal className="flex flex-1">
            <VenueCard label="Ceremony" {...config.ceremony} />
          </Reveal>
          <Reveal delay={0.12} className="flex flex-1">
            <VenueCard label="Reception" {...config.reception} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
