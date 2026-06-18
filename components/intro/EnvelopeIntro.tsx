"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { config } from "@/lib/wedding-config";

/* ------------------------------------------------------------------ *
 * Full-screen ivory envelope intro.
 * The whole scene lives in one responsive SVG (viewBox 1000x1500) and
 * covers the viewport with preserveAspectRatio="xMidYMid slice", so the
 * flap, lace, seal and lettering always stay aligned and centred.
 * ------------------------------------------------------------------ */

const VB_W = 1000;
const VB_H = 1500;

// Flap is a downward triangle: top corners -> centre apex.
const APEX = { x: VB_W / 2, y: 832 };
const TL = { x: 0, y: 0 };
const TR = { x: VB_W, y: 0 };

/**
 * Build a scalloped lace hem along the segment A→B.
 * Scallops bulge to the outer side (away from the flap's interior),
 * and small eyelet holes sit between them — broderie-anglaise style.
 */
function buildLace(
  a: { x: number; y: number },
  b: { x: number; y: number },
  interior: { x: number; y: number },
  scallopR: number,
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len; // along-edge unit
  const uy = dy / len;

  // Perpendicular candidates; pick the one pointing away from interior.
  let nx = -uy;
  let ny = ux;
  const midx = (a.x + b.x) / 2;
  const midy = (a.y + b.y) / 2;
  if ((midx - interior.x) * nx + (midy - interior.y) * ny < 0) {
    nx = -nx;
    ny = -ny;
  }

  const count = Math.max(4, Math.round(len / (scallopR * 2)));
  const step = len / count;
  const r = step / 2;

  let scallops = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)}`;
  const eyelets: { x: number; y: number; r: number }[] = [];

  for (let i = 0; i < count; i++) {
    const sx = a.x + ux * step * i;
    const sy = a.y + uy * step * i;
    const ex = a.x + ux * step * (i + 1);
    const ey = a.y + uy * step * (i + 1);
    // Control point pushed outward to make a round scallop bump.
    const mx = (sx + ex) / 2 + nx * r * 1.28;
    const my = (sy + ey) / 2 + ny * r * 1.28;
    scallops += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;

    // eyelet inside each scallop bump
    eyelets.push({
      x: (sx + ex) / 2 + nx * r * 0.5,
      y: (sy + ey) / 2 + ny * r * 0.5,
      r: r * 0.16,
    });
  }

  // Inner picot row: a tighter dotted line just inside the edge.
  const inset = 9;
  const dots: { x: number; y: number }[] = [];
  const dotCount = count * 2;
  for (let i = 0; i <= dotCount; i++) {
    const t = i / dotCount;
    dots.push({
      x: a.x + ux * len * t + nx * inset,
      y: a.y + uy * len * t + ny * inset,
    });
  }

  return { scallops, eyelets, dots };
}

const CENTROID = {
  x: (TL.x + TR.x + APEX.x) / 3,
  y: (TL.y + TR.y + APEX.y) / 3,
};

const laceLeft = buildLace(TL, APEX, CENTROID, 46);
const laceRight = buildLace(TR, APEX, CENTROID, 46);

function Sprig() {
  // A slender engraved botanical sprig — single bloom with leaves.
  return (
    <g
      stroke="#B79A63"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.85"
    >
      <path d="M500 728 C 500 760, 500 786, 500 806" />
      {/* bloom */}
      <path d="M500 728 C 488 716, 486 700, 494 690 C 499 698, 500 712, 500 720" />
      <path d="M500 728 C 512 716, 514 700, 506 690 C 501 698, 500 712, 500 720" />
      <path d="M500 720 C 495 706, 495 694, 500 686 C 505 694, 505 706, 500 720" />
      {/* leaves */}
      <path d="M500 760 C 486 754, 476 758, 472 770 C 484 772, 495 770, 500 762" />
      <path d="M500 778 C 514 772, 524 776, 528 788 C 516 790, 505 788, 500 780" />
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
    // gentle idle breathing on the seal
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
        y: -300,
        scale: 0.68,
        rotate: -14,
        opacity: 0,
        duration: 0.75,
        transformOrigin: "50% 50%",
      })
      .to(
        flapRef.current,
        { y: -980, opacity: 0, duration: 0.95, ease: "power2.inOut" },
        "-=0.5",
      )
      .to(
        topTextRef.current,
        { y: -220, opacity: 0, duration: 0.6 },
        "<",
      )
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

  const brideFirst = config.couple.bride.split(" ")[0];

  return (
    <div
      ref={root}
      className="fixed inset-0 z-50 overflow-hidden bg-ivory"
      style={{ touchAction: "manipulation" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label="Wedding invitation envelope"
      >
        <defs>
          <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFDF6" />
            <stop offset="55%" stopColor="#FBF4E3" />
            <stop offset="100%" stopColor="#F3E7CC" />
          </linearGradient>
          <linearGradient id="flap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFEFA" />
            <stop offset="100%" stopColor="#F6EAD2" />
          </linearGradient>
          <radialGradient id="wax" cx="40%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#FCF6E8" />
            <stop offset="60%" stopColor="#EFE0C2" />
            <stop offset="100%" stopColor="#DBC79C" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* envelope body / inner paper */}
        <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#paper)" />
        {/* soft centre glow */}
        <ellipse cx="500" cy="700" rx="520" ry="560" fill="#FFFDF4" opacity="0.5" filter="url(#soft)" />

        {/* shadow cast by the flap onto the body */}
        <path
          d={`M${TL.x} ${TL.y} L${TR.x} ${TR.y} L${APEX.x} ${APEX.y + 18} Z`}
          fill="#C9B488"
          opacity="0.28"
          filter="url(#soft)"
        />

        {/* bottom lettering (on the lower body, behind the seal) */}
        <g ref={bottomTextRef}>
          <line x1="430" y1="1118" x2="570" y2="1118" stroke="#C9A24C" strokeWidth="1.5" opacity="0.6" />
          <text
            x="500"
            y="1170"
            textAnchor="middle"
            fontFamily="var(--font-display), serif"
            fontSize="34"
            letterSpacing="9"
            fill="#6B5230"
          >
            OPEN THE INVITATION
          </text>
        </g>

        {/* ---- THE FLAP (animated open) ---- */}
        <g ref={flapRef} style={{ transformBox: "fill-box", transformOrigin: "center top" }}>
          {/* flap fill */}
          <path
            d={`M${TL.x} ${TL.y} L${TR.x} ${TR.y} L${APEX.x} ${APEX.y} Z`}
            fill="url(#flap)"
          />

          {/* lace hems along both edges */}
          {[laceLeft, laceRight].map((lace, i) => (
            <g key={i}>
              {/* scallop band fill */}
              <path d={`${lace.scallops}`} fill="#FFFDF7" stroke="#E4D5B4" strokeWidth="1.5" />
              {/* picot dotted row */}
              {lace.dots.map((d, j) => (
                <circle key={`d${j}`} cx={d.x} cy={d.y} r="2.4" fill="#E4D5B4" opacity="0.8" />
              ))}
              {/* eyelet holes */}
              {lace.eyelets.map((e, j) => (
                <circle
                  key={`e${j}`}
                  cx={e.x}
                  cy={e.y}
                  r={e.r}
                  fill="#EFE2C6"
                  stroke="#D9C7A0"
                  strokeWidth="1"
                />
              ))}
            </g>
          ))}

          {/* crisp fold line down the flap edges */}
          <path
            d={`M${TL.x} ${TL.y} L${APEX.x} ${APEX.y} L${TR.x} ${TR.y}`}
            fill="none"
            stroke="#E7D8B6"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* top lettering on the flap */}
          <g ref={topTextRef}>
            <text
              x="500"
              y="498"
              textAnchor="middle"
              fontFamily="var(--font-display), serif"
              fontSize="33"
              letterSpacing="8"
              fill="#6B5230"
            >
              A LOVE LETTER FROM
            </text>
            <text
              x="500"
              y="608"
              textAnchor="middle"
              fontFamily="var(--font-script), cursive"
              fontSize="118"
              fill="#5E4422"
            >
              {brideFirst}
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
          {/* generous invisible hit area */}
          <rect x="350" y="680" width="300" height="320" fill="transparent" />
          {/* glow */}
          <ellipse cx="500" cy="832" rx="150" ry="178" fill="#E9D7AC" opacity="0.5" filter="url(#soft)" />
          {/* scalloped oval rim */}
          <g>
            {Array.from({ length: 30 }).map((_, i) => {
              const a = (i / 30) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={500 + Math.cos(a) * 122}
                  cy={832 + Math.sin(a) * 148}
                  r="13"
                  fill="url(#wax)"
                />
              );
            })}
          </g>
          {/* seal body */}
          <ellipse cx="500" cy="832" rx="122" ry="148" fill="url(#wax)" />
          <ellipse
            cx="500"
            cy="832"
            rx="104"
            ry="128"
            fill="none"
            stroke="#CBB585"
            strokeWidth="2"
            opacity="0.7"
          />
          {/* highlight */}
          <ellipse cx="465" cy="780" rx="40" ry="30" fill="#FFFDF6" opacity="0.45" filter="url(#soft)" />

          <Sprig />

          <text
            x="500"
            y="900"
            textAnchor="middle"
            fontFamily="var(--font-display), serif"
            fontSize="44"
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
