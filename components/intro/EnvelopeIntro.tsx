"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { config } from "@/lib/wedding-config";
import PetalField from "@/components/fx/PetalField";

/** Custom wax seal stamped with the couple's monogram. */
function WaxSeal({ initials }: { initials: string }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#B85C66" />
          <stop offset="55%" stopColor="#8C4A52" />
          <stop offset="100%" stopColor="#6E343B" />
        </radialGradient>
      </defs>
      {/* irregular wax blob edge */}
      <path
        d="M60 6 C74 6 80 16 92 18 C104 20 112 32 110 46 C108 58 116 66 112 80 C108 94 94 96 86 106 C78 116 64 112 52 114 C40 116 30 108 22 100 C14 92 6 84 8 70 C10 58 4 48 10 36 C16 24 30 24 40 16 C48 10 50 6 60 6 Z"
        fill="url(#wax)"
        stroke="#5C2A30"
        strokeWidth="1"
      />
      {/* embossed inner ring */}
      <circle cx="60" cy="60" r="38" fill="none" stroke="#5C2A30" strokeWidth="1.4" opacity="0.45" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#C97B84" strokeWidth="0.8" opacity="0.4" />
      {/* tiny laurels */}
      <path d="M40 60 q6 -10 0 -20 M44 58 q6 -8 1 -17" fill="none" stroke="#5C2A30" strokeWidth="1" opacity="0.5" />
      <path d="M80 60 q-6 -10 0 -20 M76 58 q-6 -8 -1 -17" fill="none" stroke="#5C2A30" strokeWidth="1" opacity="0.5" />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontFamily="var(--font-display), serif"
        fontSize="30"
        fontWeight="600"
        fill="#F8DCD8"
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

  // lock body scroll while the intro is on screen
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
      // seal presses, then lifts away
      .to(sealRef.current, { scale: 1.12, duration: 0.22, ease: "power2.out" })
      .to(sealRef.current, {
        y: -120,
        scale: 0.7,
        opacity: 0,
        rotate: -18,
        duration: 0.7,
      })
      // flap swings open
      .to(
        flapRef.current,
        { rotateX: -172, duration: 0.9, ease: "power2.inOut" },
        "-=0.35"
      )
      .set(flapRef.current, { zIndex: 1 })
      // letter rises out
      .to(
        letterRef.current,
        { y: "-58%", scale: 1.04, duration: 1.0, ease: "power3.out" },
        "-=0.3"
      )
      // whole scene blooms forward and fades into the site
      .to(
        envRef.current,
        { scale: 1.18, duration: 0.9, ease: "power2.in" },
        "+=0.25"
      )
      .to(
        root.current,
        { opacity: 0, duration: 0.7, ease: "power2.inOut" },
        "<0.1"
      );
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
      <PetalField density={14} />

      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(248,220,216,0.7), transparent 60%)",
        }}
      />

      <p className="mb-2 font-display text-sm uppercase tracking-luxe text-muted">
        You are invited
      </p>
      <p className="mb-8 font-script text-3xl rose-text sm:text-4xl">
        {config.couple.bride} &amp; {config.couple.groom}
      </p>

      {/* Envelope scene */}
      <div
        ref={envRef}
        className="relative"
        style={{ perspective: "1400px" }}
      >
        <div
          className="relative"
          style={{
            width: "min(82vw, 360px)",
            aspectRatio: "3 / 2",
            transformStyle: "preserve-3d",
          }}
        >
          {/* envelope back */}
          <div className="absolute inset-0 rounded-md bg-[#F3D9D2] shadow-rose-lg" />

          {/* letter */}
          <div
            ref={letterRef}
            className="absolute left-[6%] right-[6%] top-[8%] z-10 rounded-sm bg-ivory px-5 py-6 text-center shadow-petal"
            style={{ height: "92%" }}
          >
            <div className="mx-auto mb-3 h-px w-12 bg-gold/60" />
            <p className="font-display text-xs uppercase tracking-luxe text-muted">
              Save the date
            </p>
            <p className="mt-3 font-script text-2xl rose-text">
              {config.couple.bride} &amp; {config.couple.groom}
            </p>
            <p className="mt-2 font-display text-sm text-cocoa">
              {config.dateShort}
            </p>
            <div className="mx-auto mt-3 h-px w-12 bg-gold/60" />
          </div>

          {/* envelope front pocket */}
          <div
            className="absolute inset-0 z-30 overflow-hidden rounded-md"
            style={{
              clipPath: "polygon(0 38%, 50% 100%, 100% 38%, 100% 100%, 0 100%)",
              background: "linear-gradient(155deg,#EFC9C1,#E3ABA4)",
              boxShadow: "inset 0 2px 10px rgba(140,74,82,0.18)",
            }}
          />
          {/* pocket seams */}
          <div
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background:
                "linear-gradient(135deg, transparent 49.6%, rgba(140,74,82,0.18) 50%, transparent 50.4%), linear-gradient(225deg, transparent 49.6%, rgba(140,74,82,0.18) 50%, transparent 50.4%)",
              clipPath: "polygon(0 38%, 50% 100%, 100% 38%, 100% 100%, 0 100%)",
            }}
          />

          {/* flap (opens) */}
          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 z-40"
            style={{
              height: "62%",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(155deg,#F0CEC7,#E0A39B)",
              boxShadow: "0 6px 14px rgba(140,74,82,0.16)",
            }}
          />

          {/* wax seal — the tap target */}
          <button
            ref={sealRef}
            onClick={handleOpen}
            onKeyDown={onKey}
            aria-label="Open the invitation"
            className="group absolute left-1/2 top-[46%] z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full shadow-seal transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            style={{
              width: "clamp(72px, 22vw, 104px)",
              height: "clamp(72px, 22vw, 104px)",
              touchAction: "manipulation",
            }}
          >
            <span className="absolute inset-0 animate-pulse-soft rounded-full" style={{ boxShadow: "0 0 22px rgba(140,74,82,0.4)" }} />
            <WaxSeal initials={config.couple.initials} />
          </button>
        </div>
      </div>

      {!opening && (
        <p className="mt-10 animate-pulse-soft font-display text-sm uppercase tracking-luxe text-rose">
          Tap the seal to open
        </p>
      )}
    </div>
  );
}
