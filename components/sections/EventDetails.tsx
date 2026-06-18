"use client";

import { config } from "@/lib/wedding-config";
import { Reveal } from "@/components/fx/Reveal";
import AnimatedIcon, { IconName } from "@/components/fx/AnimatedIcon";
import SectionHeading from "@/components/fx/SectionHeading";
import { Motif } from "@/components/fx/Motif";

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
      <h3 className="mt-3 font-display text-2xl font-medium text-ink sm:text-3xl">{name}</h3>
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
        <SectionHeading
          index={2}
          kicker="Join us to celebrate"
          kickerSi="මංගල උත්සවය"
          title="The Celebration"
        />

        {/* Subha Nekatha — auspicious time highlight */}
        <Reveal className="mt-12">
          <div className="relative mx-auto max-w-lg overflow-hidden rounded-3xl bg-wine px-8 py-10 text-center text-ivory shadow-rose-lg">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, #E6CB7A, transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="flex items-end justify-center gap-5 sm:gap-8">
                <Motif name="lamp" className="w-10 sm:w-12" float />
                <Motif name="lamp" className="w-14 sm:w-20" float priority />
                <Motif name="lamp" className="w-10 sm:w-12" float />
              </div>
              <p className="mt-5 font-sinhala text-2xl text-gold-light">
                {config.nekath.labelSi}
              </p>
              <p className="mt-1 font-display text-xs uppercase tracking-luxe text-ivory/70">
                {config.nekath.label}
              </p>
              <p className="mt-4 font-body text-sm text-ivory/85">{config.nekath.note}</p>
              <p className="mt-2 font-display text-5xl font-light text-gold-light">
                {config.nekath.poruwa}
              </p>
              <p className="mt-3 font-body text-sm text-ivory/80">{config.dateLong}</p>
            </div>
          </div>
        </Reveal>

        {/* schedule with self-drawing icons */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {config.schedule.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-rim bg-cream">
                <AnimatedIcon name={item.icon as IconName} size={40} />
              </div>
              <p className="mt-3 font-display text-lg text-wine">{item.time}</p>
              <p className="font-body text-sm text-cocoa">{item.title}</p>
            </Reveal>
          ))}
        </div>

        {/* venue cards */}
        <div className="mt-16 flex flex-col gap-8 sm:flex-row">
          <Reveal className="flex flex-1">
            <VenueCard label="Poruwa Ceremony" {...config.ceremony} />
          </Reveal>
          <Reveal delay={0.12} className="flex flex-1">
            <VenueCard label="Homecoming & Reception" {...config.reception} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
