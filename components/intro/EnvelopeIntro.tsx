"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { config } from "@/lib/wedding-config";
import PetalField from "@/components/fx/PetalField";

/** A modern gold lotus medallion (punkalasa-inspired) — the tap target. */
function SealMedallion({ initials }: { initials: string }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="foil" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#F0DCA0" />
          <stop offset="55%" stopColor="#C9A24C" />
          <stop offset="100%" stopColor="#9A7A2E" />
        </radialGradient>
      </defs>
      {/* foil disc */}
      <circle cx="60" cy="60" r="54" fill="url(#foil)" stroke="#6E1E1E" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="#6E1E1E" strokeWidth="1" opacity="0.4" />
      {/* eight lotus petals around the rim (punkalasa rays) */}
      <g stroke="#6E1E1E" strokeWidth="1" opacity="0.45" fill="none">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          const x = 60 + Math.cos(a) * 40;
          const y = 60 + Math.sin(a) * 40;
          const x2 = 60 + Math.cos(a) * 47;
          const y2 = 60 + Math.sin(a) * 47;
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
        })}
      </g>
      {/* minimal lotus above the monogram */}
      <path d="M60 30 C 56 38, 56 46, 60 52 C 64 46, 64 38, 60 30 Z" fill="none" stroke="#6E1E1E" strokeWidth="1.4" opacity="0.7" />
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontFamily="var(--font-display), serif"
        fontSize="24"
        fontWeight="600"
        fill="#6E1E1E"
        style={{ letterSpacing: "1px" }}
      >
        {initials}
      </text>
    </svg>
  );
}

export default function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: onOpen,
    });

    tl
      .to(sealRef.current, { scale: 1.12, duration: 0.22, ease: "power2.out" })
      .to(sealRef.current, {
        y: -120,
        scale: 0.7,
        opacity: 0,
        rotate: -18,
        duration: 0.7,
      })
      .to(flapRef.current, { rotateX: -172, duration: 0.9, ease: "power2.inOut" }, "-=0.35")
      .set(flapRef.current, { zIndex: 1 })
      .to(letterRef.current, { y: "-58%", scale: 1.04, duration: 1.0, ease: "power3.out" }, "-=0.3")
      .to(envRef.current, { scale: 1.18, duration: 0.9, ease: "power2.in" }, "+=0.25")
      .to(root.current, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "<0.1");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-romantic-grad"
    >
      <PetalField density={12} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(245,230,196,0.75), transparent 62%)",
        }}
      />

      <p className="mb-1 font-sinhala text-2xl text-wine sm:text-3xl">
        {config.greetingSi}
      </p>
      <p className="mb-7 font-display text-xs uppercase tracking-luxe text-muted">
        {config.invitationSi} &middot; Wedding Invitation
      </p>

      {/* Envelope scene */}
      <div ref={envRef} className="relative" style={{ perspective: "1400px" }}>
        <div
          className="relative"
          style={{ width: "min(82vw, 360px)", aspectRatio: "3 / 2", transformStyle: "preserve-3d" }}
        >
          {/* envelope back */}
          <div className="absolute inset-0 rounded-md bg-petal shadow-rose-lg" />

          {/* letter */}
          <div
            ref={letterRef}
            className="absolute left-[6%] right-[6%] top-[8%] z-10 rounded-sm bg-ivory px-5 py-6 text-center shadow-petal"
            style={{ height: "92%" }}
          >
            <div className="mx-auto mb-3 h-px w-12 bg-gold/60" />
            <p className="font-display text-xs uppercase tracking-luxe text-muted">
              Save the Date
            </p>
            <p className="mt-3 font-script text-2xl rose-text">
              {config.couple.bride.split(" ")[0]} &amp; {config.couple.groom.split(" ")[0]}
            </p>
            <p className="mt-2 font-sinhala text-sm text-wine">
              {config.couple.brideSi} &amp; {config.couple.groomSi}
            </p>
            <p className="mt-2 font-display text-sm text-cocoa">{config.dateShort}</p>
            <div className="mx-auto mt-3 h-px w-12 bg-gold/60" />
          </div>

          {/* envelope front pocket — cream with gold seam */}
          <div
            className="absolute inset-0 z-30 overflow-hidden rounded-md"
            style={{
              clipPath: "polygon(0 38%, 50% 100%, 100% 38%, 100% 100%, 0 100%)",
              background: "linear-gradient(155deg,#F7E7BE,#EAD7A6)",
              boxShadow: "inset 0 2px 10px rgba(110,30,30,0.14)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background:
                "linear-gradient(135deg, transparent 49.6%, rgba(201,162,76,0.5) 50%, transparent 50.4%), linear-gradient(225deg, transparent 49.6%, rgba(201,162,76,0.5) 50%, transparent 50.4%)",
              clipPath: "polygon(0 38%, 50% 100%, 100% 38%, 100% 100%, 0 100%)",
            }}
          />

          {/* flap */}
          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 z-40"
            style={{
              height: "62%",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(155deg,#F4E2B4,#E6CB7A)",
              boxShadow: "0 6px 14px rgba(110,30,30,0.14)",
            }}
          />

          {/* seal medallion — tap target */}
          <button
            ref={sealRef}
            onClick={handleOpen}
            onKeyDown={onKey}
            aria-label="Open the invitation"
            className="group absolute left-1/2 top-[46%] z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full shadow-seal transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
            style={{
              width: "clamp(72px, 22vw, 104px)",
              height: "clamp(72px, 22vw, 104px)",
              touchAction: "manipulation",
            }}
          >
            <span
              className="absolute inset-0 animate-pulse-soft rounded-full"
              style={{ boxShadow: "0 0 22px rgba(201,162,76,0.5)" }}
            />
            <SealMedallion initials={config.couple.initials} />
          </button>
        </div>
      </div>

      {!opening && (
        <p className="mt-10 animate-pulse-soft font-display text-sm uppercase tracking-luxe text-wine">
          Tap the seal to open
        </p>
      )}
    </div>
  );
}
