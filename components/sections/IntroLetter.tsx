"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { config } from "@/lib/wedding-config";
import { Bird } from "@/components/fx/FlyingBirds";
import { CalligraphyReveal } from "@/components/fx/Reveal";
import SectionDivider from "@/components/fx/SectionDivider";
import { MotifFrame } from "@/components/fx/Motif";
import { prefersReducedMotion } from "@/lib/utils";

export default function IntroLetter() {
  const sectionRef = useRef<HTMLElement>(null);
  const birdRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [delivered, setDelivered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveal = () => setDelivered(true);

    if (prefersReducedMotion()) {
      reveal();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();

        const ctx = gsap.context(() => {
          gsap.set(letterRef.current, { opacity: 0, y: 30, scale: 0.96 });
          gsap.set(birdRef.current, { opacity: 0 });

          gsap
            .timeline({ onComplete: reveal })
            // bird flies in along an arc, carrying the letter
            .fromTo(
              birdRef.current,
              { x: "-40vw", y: "-12vh", opacity: 0, scaleX: 1 },
              { opacity: 1, duration: 0.5 },
              0
            )
            .to(
              birdRef.current,
              {
                x: "0vw",
                y: "0vh",
                duration: 1.5,
                ease: "power2.inOut",
              },
              0
            )
            // pause, then "drop" — bird rises, letter settles in
            .to(birdRef.current, { y: "-6vh", duration: 0.4, ease: "power1.out" }, ">")
            .to(letterRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, "<")
            // bird flies off to the right
            .to(
              birdRef.current,
              { x: "46vw", y: "-16vh", opacity: 0, duration: 1.3, ease: "power1.in" },
              ">-0.1"
            );
        }, el);

        // safety: ensure content shows even if timeline is interrupted
        window.setTimeout(reveal, 4500);
        return () => ctx.revert();
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-blush-grad px-6 py-24 sm:py-32"
    >
      {/* the delivering bird */}
      <div
        ref={birdRef}
        className="pointer-events-none absolute left-1/2 top-10 z-20"
        aria-hidden="true"
      >
        <Bird size={48} color="#8C4A52" carryLetter={!delivered} />
      </div>

      <div
        ref={letterRef}
        className="relative z-10 mx-auto max-w-2xl rounded-lg glass-blush px-7 py-12 text-center shadow-petal sm:px-12 sm:py-16"
      >
        {/* lotus-wreath monogram */}
        <MotifFrame frame="frame1" className="mx-auto aspect-square w-44 sm:w-52" padding="26%">
          <p className="font-script text-3xl rose-text">{config.couple.initials}</p>
          <p className="mt-1 font-display text-[0.6rem] uppercase tracking-luxe text-muted">
            {config.dateShort}
          </p>
        </MotifFrame>

        <p className="mt-6 font-sinhala text-2xl text-wine">{config.greetingSi}</p>
        <h2 className="text-section mt-3 font-display font-light text-ink">
          <CalligraphyReveal text="An Invitation" />
        </h2>
        <SectionDivider className="my-7" />

        {/* parents' invitation */}
        <p className="font-display text-lg text-cocoa">{config.parents.bride}</p>
        <p className="mt-1 font-body text-sm italic text-muted">
          {config.parents.brideNote}
        </p>
        <p className="mt-5 font-script text-3xl rose-text">
          {config.couple.bride}
        </p>
        <p className="my-3 font-display text-sm uppercase tracking-luxe text-gold">to</p>
        <p className="font-script text-3xl rose-text">{config.couple.groom}</p>
        <p className="mt-1 font-body text-sm italic text-muted">
          {config.parents.groomNote} {config.parents.groom}
        </p>

        <div className="mx-auto my-7 h-px w-16 bg-gold/50" />
        <p className="font-body text-base leading-relaxed text-cocoa sm:text-lg">
          {config.intro}
        </p>

        {/* blessing */}
        <p className="mt-8 font-sinhala text-xl text-wine">{config.blessing.si}</p>
        <p className="mt-2 font-body text-sm italic text-muted">{config.blessing.en}</p>
      </div>
    </section>
  );
}
