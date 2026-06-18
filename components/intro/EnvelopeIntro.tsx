"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { config } from "@/lib/wedding-config";

/* ------------------------------------------------------------------ *
 * Full-screen ivory envelope intro.
 * The scene lives in one SVG (viewBox 1000x1500). It scales to fit the
 * viewport with preserveAspectRatio="xMidYMid meet" so nothing is ever
 * cropped; the ivory page background fills any side/top margins, making
 * it read as one continuous sheet of paper.
 * ------------------------------------------------------------------ */

const VB_W = 1000;
const VB_H = 1500;

// Round trig/hypot-derived coordinates so SSR and client emit identical
// attribute strings (avoids React hydration mismatches).
const round = (n: number) => Math.round(n * 1000) / 1000;

// Flap is a downward triangle: top corners -> centre apex.
const APEX = { x: VB_W / 2, y: 858 };
const TL = { x: 0, y: 0 };
const TR = { x: VB_W, y: 0 };
const CENTROID = {
  x: (TL.x + TR.x + APEX.x) / 3,
  y: (TL.y + TR.y + APEX.y) / 3,
};

/**
 * Build a scalloped lace band that runs along the fold edge A→B.
 * Returns a closed, fillable band shape (scalloped frill hanging just
 * past the fold + a straight inner boundary) plus eyelet holes.
 */
function buildLace(
  a: { x: number; y: number },
  b: { x: number; y: number },
  interior: { x: number; y: number },
  scallopR: number,
  bandW: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;

  // inward normal (toward flap interior) and outward normal (frill side)
  let inx = -uy;
  let iny = ux;
  const midx = (a.x + b.x) / 2;
  const midy = (a.y + b.y) / 2;
  if ((midx - interior.x) * inx + (midy - interior.y) * iny > 0) {
    inx = -inx;
    iny = -iny;
  }
  const outx = -inx;
  const outy = -iny;

  const count = Math.max(5, Math.round(len / (scallopR * 2)));
  const step = len / count;
  const bump = step * 0.62; // how far the frill bulges past the fold

  // outer scalloped edge: endpoints ride the fold line, controls push out
  let d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)}`;
  for (let i = 0; i < count; i++) {
    const ex = a.x + ux * step * (i + 1);
    const ey = a.y + uy * step * (i + 1);
    const cx = a.x + ux * step * (i + 0.5) + outx * bump;
    const cy = a.y + uy * step * (i + 0.5) + outy * bump;
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  // close along inner straight boundary
  d += ` L ${(b.x + inx * bandW).toFixed(1)} ${(b.y + iny * bandW).toFixed(1)}`;
  d += ` L ${(a.x + inx * bandW).toFixed(1)} ${(a.y + iny * bandW).toFixed(1)} Z`;

  // eyelet holes — two rows inside the band
  const eyelets: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) * step;
    eyelets.push({
      x: round(a.x + ux * t + inx * bandW * 0.34),
      y: round(a.y + uy * t + iny * bandW * 0.34),
      r: 6,
    });
    if (i < count - 1) {
      const t2 = (i + 1) * step;
      eyelets.push({
        x: round(a.x + ux * t2 + inx * bandW * 0.66),
        y: round(a.y + uy * t2 + iny * bandW * 0.66),
        r: 4,
      });
    }
  }

  return { d, eyelets };
}

const laceLeft = buildLace(TL, APEX, CENTROID, 40, 96);
const laceRight = buildLace(TR, APEX, CENTROID, 40, 96);

function Sprig() {
  return (
    <g
      stroke="#B79A63"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
      opacity="0.85"
    >
      <path d="M500 762 C 500 790, 500 812, 500 830" />
      <path d="M500 762 C 489 752, 487 738, 494 729 C 499 736, 500 748, 500 756" />
      <path d="M500 762 C 511 752, 513 738, 506 729 C 501 736, 500 748, 500 756" />
      <path d="M500 756 C 496 744, 496 733, 500 726 C 504 733, 504 744, 500 756" />
      <path d="M500 790 C 487 785, 478 788, 474 799 C 485 801, 495 799, 500 792" />
      <path d="M500 806 C 513 801, 522 804, 526 815 C 515 817, 505 815, 500 808" />
    </g>
  );
}

export default function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const flapRef = useRef<SVGGElement>(null);
  const sealRef = useRef<SVGGElement>(null);
  const topTextRef = useRef<SVGGElement>(null);
  const bottomTextRef = useRef<SVGGElement>(null);
  const idleRef = useRef<gsap.core.Tween | null>(null);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    idleRef.current = gsap.to(sealRef.current, {
      scale: 1.03,
      duration: 2.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 50%",
    });
    return () => {
      document.body.style.overflow = prev;
      idleRef.current?.kill();
    };
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    idleRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: onOpen,
    });

    tl.to(sealRef.current, {
      scale: 1.12,
      duration: 0.24,
      ease: "power2.out",
      transformOrigin: "50% 50%",
    })
      .to(sealRef.current, {
        y: -320,
        scale: 0.66,
        rotate: -14,
        opacity: 0,
        duration: 0.75,
        transformOrigin: "50% 50%",
      })
      .to(
        flapRef.current,
        { y: -1000, opacity: 0, duration: 0.95, ease: "power2.inOut" },
        "-=0.5",
      )
      .to(topTextRef.current, { y: -240, opacity: 0, duration: 0.6 }, "<")
      .to(bottomTextRef.current, { opacity: 0, duration: 0.4 }, "<")
      .to(
        svgRef.current,
        { scale: 1.16, duration: 0.9, ease: "power2.in", transformOrigin: "50% 50%" },
        "-=0.55",
      )
      .to(root.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "<0.1");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const coupleNames = `${config.couple.bride.split(" ")[0]} & ${config.couple.groom.split(" ")[0]}`;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-ivory"
      style={{ touchAction: "manipulation" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        role="img"
        aria-label="Wedding invitation envelope"
      >
        <defs>
          <linearGradient id="paper" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#FFFEFA" />
            <stop offset="55%" stopColor="#FBF4E4" />
            <stop offset="100%" stopColor="#F2E6CB" />
          </linearGradient>
          <linearGradient id="flapFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFEFB" />
            <stop offset="100%" stopColor="#F7ECD6" />
          </linearGradient>
          <radialGradient id="wax" cx="40%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#FCF7EA" />
            <stop offset="58%" stopColor="#EFE1C5" />
            <stop offset="100%" stopColor="#D8C399" />
          </radialGradient>
          <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* full-bleed paper */}
        <rect x="-200" y="-200" width={VB_W + 400} height={VB_H + 400} fill="url(#paper)" />
        <ellipse cx="500" cy="720" rx="560" ry="640" fill="#FFFEF7" opacity="0.55" filter="url(#soft)" />

        {/* shadow the flap casts on the body */}
        <path
          d={`M${TL.x} ${TL.y} L${TR.x} ${TR.y} L${APEX.x} ${APEX.y + 26} Z`}
          fill="#CBB68A"
          opacity="0.3"
          filter="url(#soft)"
        />

        {/* bottom caption */}
        <g ref={bottomTextRef}>
          <line x1="438" y1="1138" x2="562" y2="1138" stroke="#C9A24C" strokeWidth="1.5" opacity="0.55" />
          <text
            x="500"
            y="1190"
            textAnchor="middle"
            fontFamily="var(--font-display), serif"
            fontSize="32"
            letterSpacing="9"
            fill="#6B5230"
          >
            OPEN THE INVITATION
          </text>
        </g>

        {/* ---- FLAP (animates open) ---- */}
        <g ref={flapRef} style={{ transformBox: "fill-box", transformOrigin: "center top" }}>
          <path
            d={`M${TL.x} ${TL.y} L${TR.x} ${TR.y} L${APEX.x} ${APEX.y} Z`}
            fill="url(#flapFill)"
          />

          {/* lace bands */}
          {[laceLeft, laceRight].map((lace, i) => (
            <g key={i}>
              <path d={lace.d} fill="#FFFDF8" stroke="#E6D8B8" strokeWidth="1.4" />
              {lace.eyelets.map((e, j) => (
                <circle
                  key={`e${j}`}
                  cx={e.x}
                  cy={e.y}
                  r={e.r}
                  fill="#EFE2C7"
                  stroke="#D8C6A0"
                  strokeWidth="1.2"
                />
              ))}
            </g>
          ))}

          {/* fold lines */}
          <path
            d={`M${TL.x} ${TL.y} L${APEX.x} ${APEX.y} L${TR.x} ${TR.y}`}
            fill="none"
            stroke="#EADCBB"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* flap lettering */}
          <g ref={topTextRef}>
            <text
              x="500"
              y="500"
              textAnchor="middle"
              fontFamily="var(--font-display), serif"
              fontSize="30"
              letterSpacing="7"
              fill="#6B5230"
            >
              TOGETHER WITH THEIR FAMILIES
            </text>
            <text
              x="500"
              y="616"
              textAnchor="middle"
              fontFamily="var(--font-script), cursive"
              fontSize="84"
              fill="#5E4422"
            >
              {coupleNames}
            </text>
            <text
              x="500"
              y="668"
              textAnchor="middle"
              fontFamily="var(--font-display), serif"
              fontSize="26"
              letterSpacing="6"
              fill="#6B5230"
            >
              INVITE YOU TO THEIR WEDDING
            </text>
          </g>
        </g>

        {/* ---- WAX SEAL (tap target) ---- */}
        <g
          ref={sealRef}
          onClick={handleOpen}
          onKeyDown={onKey}
          role="button"
          tabIndex={0}
          aria-label="Open the invitation"
          style={{ cursor: "pointer", transformBox: "fill-box", transformOrigin: "center" }}
        >
          <rect x="372" y="722" width="256" height="290" fill="transparent" />
          <ellipse cx="500" cy="858" rx="132" ry="158" fill="#E8D6AB" opacity="0.5" filter="url(#soft)" />

          {/* fine scalloped rim */}
          {Array.from({ length: 34 }).map((_, i) => {
            const a = (i / 34) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={round(500 + Math.cos(a) * 104)}
                cy={round(858 + Math.sin(a) * 128)}
                r="10"
                fill="url(#wax)"
              />
            );
          })}

          <ellipse cx="500" cy="858" rx="104" ry="128" fill="url(#wax)" />
          <ellipse
            cx="500"
            cy="858"
            rx="88"
            ry="110"
            fill="none"
            stroke="#CBB585"
            strokeWidth="1.8"
            opacity="0.7"
          />
          <ellipse cx="470" cy="812" rx="34" ry="26" fill="#FFFDF6" opacity="0.4" filter="url(#soft)" />

          <Sprig />

          <text
            x="500"
            y="918"
            textAnchor="middle"
            fontFamily="var(--font-display), serif"
            fontSize="40"
            letterSpacing="3"
            fontWeight="600"
            fill="#8C7338"
          >
            {config.couple.initials}
          </text>
        </g>
      </svg>
    </div>
  );
}
