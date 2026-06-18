"use client";

import { useId } from "react";

export type SceneVariant = "lamp" | "lotus" | "poruwa" | "peacock";

/**
 * A fully drawn, animated Sinhala-wedding scene used in place of a photo.
 * No real images — everything is SVG + CSS motion (flickering oil-lamp flames,
 * drifting frangipani petals, gliding hansa, shimmering peacock, swaying lotus).
 * Fills its positioned parent (absolute inset-0, slice-cropped).
 */
export default function IllustratedScene({
  variant = "lotus",
  className = "",
}: {
  variant?: SceneVariant;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const sky = `sky-${uid}`;
  const glow = `glow-${uid}`;

  const skyStops: Record<SceneVariant, [string, string, string]> = {
    lamp: ["#3A1410", "#6E1E1E", "#A9772E"],
    lotus: ["#FBEFD0", "#F2D6A8", "#E6B98A"],
    poruwa: ["#6E1E1E", "#9A4A2E", "#E6CB7A"],
    peacock: ["#15324A", "#2C5E6E", "#7FA98F"],
  };
  const [s0, s1, s2] = skyStops[variant];
  const petalTone = variant === "lotus" || variant === "poruwa" ? "#FFF7E6" : "#E6CB7A";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 400 520"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s0} />
            <stop offset="55%" stopColor={s1} />
            <stop offset="100%" stopColor={s2} />
          </linearGradient>
          <radialGradient id={glow} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#FFE9B0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFE9B0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* sky */}
        <rect width="400" height="520" fill={`url(#${sky})`} />
        {/* warm glow */}
        <circle className="ill-glow" cx="200" cy="210" r="150" fill={`url(#${glow})`} />

        {variant === "lamp" && <Lamp />}
        {variant === "lotus" && <Lotus />}
        {variant === "poruwa" && <Poruwa />}
        {variant === "peacock" && <Peacock />}

        {/* drifting frangipani petals (shared) */}
        <g>
          {PETALS.map((p, i) => (
            <g
              key={i}
              className="ill-petal"
              style={{
                ["--x" as string]: `${p.x}px`,
                ["--d" as string]: `${p.drift}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              }}
            >
              <Petal x={p.x} scale={p.scale} tone={petalTone} />
            </g>
          ))}
        </g>
      </svg>

      <style jsx>{`
        .ill-glow {
          transform-origin: center;
          animation: illGlow 5s ease-in-out infinite;
        }
        @keyframes illGlow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        :global(.ill-flame) {
          transform-origin: center bottom;
          animation: illFlicker 1.6s ease-in-out infinite;
        }
        :global(.ill-flame.f2) { animation-delay: 0.3s; }
        :global(.ill-flame.f3) { animation-delay: 0.6s; }
        :global(.ill-flame.f4) { animation-delay: 0.15s; }
        :global(.ill-flame.f5) { animation-delay: 0.45s; }
        @keyframes illFlicker {
          0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
          40% { transform: scaleY(1.18) scaleX(0.92); opacity: 0.85; }
          70% { transform: scaleY(0.9) scaleX(1.05); opacity: 1; }
        }
        :global(.ill-hansa) {
          animation: illDrift 16s linear infinite;
        }
        @keyframes illDrift {
          0% { transform: translate(-80px, 14px); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(420px, -22px); opacity: 0; }
        }
        :global(.ill-sway) {
          transform-origin: 200px 470px;
          animation: illSway 6s ease-in-out infinite;
        }
        @keyframes illSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        :global(.ill-eye) {
          animation: illShimmer 2.6s ease-in-out infinite;
        }
        @keyframes illShimmer {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        :global(.ill-ripple) {
          transform-origin: center;
          animation: illRipple 4s ease-out infinite;
        }
        @keyframes illRipple {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .ill-petal {
          animation-name: illFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          transform: translateY(-60px);
        }
        @keyframes illFall {
          0% { transform: translate(0, -60px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translate(var(--d), 560px) rotate(320deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ill-petal, :global(.ill-hansa) { animation: none; opacity: 0.5; }
          .ill-glow, :global(.ill-flame), :global(.ill-sway), :global(.ill-eye), :global(.ill-ripple) { animation: none; }
        }
      `}</style>
    </div>
  );
}

/* ---------- shared petal ---------- */
const PETALS = [
  { x: 40, drift: 30, delay: 0, dur: 9, scale: 1 },
  { x: 120, drift: -40, delay: 2.5, dur: 11, scale: 0.8 },
  { x: 210, drift: 24, delay: 1.2, dur: 8, scale: 1.1 },
  { x: 300, drift: -28, delay: 3.4, dur: 12, scale: 0.9 },
  { x: 360, drift: 18, delay: 0.8, dur: 10, scale: 0.75 },
  { x: 170, drift: 40, delay: 4.2, dur: 13, scale: 1 },
];

function Petal({ x, scale, tone }: { x: number; scale: number; tone: string }) {
  return (
    <path
      transform={`translate(${x} 0) scale(${scale})`}
      d="M0 0 C 7 6, 7 16, 0 22 C -7 16, -7 6, 0 0 Z"
      fill={tone}
      opacity="0.85"
    />
  );
}

/* ---------- scene: brass oil lamp (pahana) ---------- */
function Lamp() {
  const flames = [160, 180, 200, 220, 240];
  return (
    <g>
      <g transform="translate(0 30)">
        {/* rays */}
        <g className="ill-glow" opacity="0.25" stroke="#FFE9B0" strokeWidth="2">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <line key={i} x1={200 + Math.cos(a) * 70} y1={150 + Math.sin(a) * 70} x2={200 + Math.cos(a) * 110} y2={150 + Math.sin(a) * 110} />
            );
          })}
        </g>
        {/* lamp body */}
        <path d="M150 150 C 150 138, 250 138, 250 150 C 250 166, 228 176, 200 176 C 172 176, 150 166, 150 150 Z" fill="#C9A24C" stroke="#9A7A2E" strokeWidth="2" />
        <path d="M200 176 V 300" stroke="#9A7A2E" strokeWidth="8" />
        <ellipse cx="200" cy="300" rx="14" ry="6" fill="#9A7A2E" />
        <path d="M170 300 C 150 360, 250 360, 230 300 Z" fill="#C9A24C" stroke="#9A7A2E" strokeWidth="2" />
        <ellipse cx="200" cy="360" rx="46" ry="12" fill="#B8902F" />
        {/* the hansa finial on top */}
        <path d="M200 122 C 196 130, 196 138, 200 144 C 204 138, 204 130, 200 122 Z" fill="#E6CB7A" />
        {/* flames */}
        {flames.map((fx, i) => (
          <g key={fx} className={`ill-flame f${i + 1}`}>
            <path d={`M${fx} 150 C ${fx - 5} 142, ${fx - 4} 132, ${fx} 124 C ${fx + 4} 132, ${fx + 5} 142, ${fx} 150 Z`} fill="#FFB23E" />
            <path d={`M${fx} 148 C ${fx - 2.5} 143, ${fx - 2} 137, ${fx} 132 C ${fx + 2} 137, ${fx + 2.5} 143, ${fx} 148 Z`} fill="#FFE9B0" />
          </g>
        ))}
      </g>
    </g>
  );
}

/* ---------- scene: lotus pond with hansa ---------- */
function Lotus() {
  return (
    <g>
      {/* water */}
      <rect y="360" width="400" height="160" fill="#CFE0D4" opacity="0.5" />
      <g stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.5">
        <ellipse className="ill-ripple" cx="120" cy="430" rx="30" ry="9" />
        <ellipse className="ill-ripple" cx="280" cy="460" rx="34" ry="10" style={{ animationDelay: "1.6s" }} />
      </g>
      {/* hansa gliding */}
      <g className="ill-hansa">
        <path d="M0 150 C 4 138, 22 138, 30 146 C 40 154, 54 154, 64 144 C 67 140, 67 133, 62 131 C 58 129, 53 131, 53 136 C 53 140, 57 141, 60 139" fill="none" stroke="#FFF7E6" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* lotus blooms */}
      {[
        { x: 110, y: 380, s: 1 },
        { x: 250, y: 410, s: 1.25 },
        { x: 330, y: 372, s: 0.85 },
      ].map((l, i) => (
        <g key={i} className="ill-sway" transform={`translate(${l.x} ${l.y}) scale(${l.s})`} style={{ animationDelay: `${i * 0.7}s`, transformOrigin: `${l.x}px ${l.y + 20}px` }}>
          <g stroke="#C97B5A" strokeWidth="2" fill="#FFE7EC">
            <path d="M0 6 C -6 -2, -6 -14, 0 -22 C 6 -14, 6 -2, 0 6 Z" />
            <path d="M0 6 C -12 0, -16 -8, -16 -16 C -8 -12, -3 -4, 0 6 Z" />
            <path d="M0 6 C 12 0, 16 -8, 16 -16 C 8 -12, 3 -4, 0 6 Z" />
          </g>
          <circle cx="0" cy="-4" r="3" fill="#E6CB7A" />
          {/* pad */}
          <ellipse cx="0" cy="14" rx="26" ry="7" fill="#7A8B4F" opacity="0.7" />
        </g>
      ))}
    </g>
  );
}

/* ---------- scene: decorated poruwa platform ---------- */
function Poruwa() {
  return (
    <g transform="translate(0 20)">
      {/* canopy */}
      <path d="M70 120 Q 200 70 330 120 L 320 140 Q 200 96 80 140 Z" fill="#C9A24C" stroke="#9A7A2E" strokeWidth="2" />
      <line x1="90" y1="130" x2="90" y2="360" stroke="#9A7A2E" strokeWidth="6" />
      <line x1="310" y1="130" x2="310" y2="360" stroke="#9A7A2E" strokeWidth="6" />
      {/* floral garland */}
      <path d="M80 138 Q 200 175 320 138" fill="none" stroke="#7A8B4F" strokeWidth="3" />
      {Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8;
        const x = 80 + t * 240;
        const y = 138 + Math.sin(Math.PI * t) * 36;
        return <circle key={i} cx={x} cy={y} r="4" fill={i % 2 ? "#FFE7EC" : "#E6CB7A"} />;
      })}
      {/* platform */}
      <rect x="110" y="320" width="180" height="40" fill="#C9A24C" stroke="#9A7A2E" strokeWidth="2" />
      <rect x="120" y="360" width="160" height="80" fill="#B8902F" />
      <rect x="120" y="360" width="160" height="80" fill="none" stroke="#9A7A2E" strokeWidth="2" />
      <line x1="160" y1="360" x2="160" y2="440" stroke="#9A7A2E" strokeWidth="2" />
      <line x1="200" y1="360" x2="200" y2="440" stroke="#9A7A2E" strokeWidth="2" />
      <line x1="240" y1="360" x2="240" y2="440" stroke="#9A7A2E" strokeWidth="2" />
      {/* two small flickering lamps */}
      {[150, 250].map((lx, i) => (
        <g key={lx} transform={`translate(${lx} 300)`}>
          <path d="M-14 0 C -14 -6, 14 -6, 14 0 C 14 6, 7 9, 0 9 C -7 9, -14 6, -14 0 Z" fill="#C9A24C" stroke="#9A7A2E" strokeWidth="1.5" />
          <g className={`ill-flame f${i + 2}`}>
            <path d="M0 -4 C -3 -9, -2 -16, 0 -22 C 2 -16, 3 -9, 0 -4 Z" fill="#FFB23E" />
          </g>
        </g>
      ))}
    </g>
  );
}

/* ---------- scene: peacock ---------- */
function Peacock() {
  return (
    <g transform="translate(40 60)">
      {/* fanned tail */}
      <g>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (-60 + i * 15) * (Math.PI / 180);
          const len = 150;
          const ex = 150 + Math.cos(a) * len;
          const ey = 300 + Math.sin(a) * len;
          return (
            <g key={i}>
              <path d={`M150 300 Q ${150 + Math.cos(a) * 70} ${300 + Math.sin(a) * 70 - 10} ${ex} ${ey}`} fill="none" stroke="#2E7D6B" strokeWidth="2" opacity="0.8" />
              <ellipse className="ill-eye" cx={ex} cy={ey} rx="9" ry="13" fill="#1E8AA8" stroke="#E6CB7A" strokeWidth="1.5" style={{ animationDelay: `${i * 0.18}s` }} />
              <circle cx={ex} cy={ey} r="3.5" fill="#6E1E1E" />
            </g>
          );
        })}
      </g>
      {/* body */}
      <path d="M150 300 C 138 280, 138 250, 150 236 C 156 228, 156 214, 150 206" fill="none" stroke="#1E5A8A" strokeWidth="10" strokeLinecap="round" />
      <circle cx="150" cy="200" r="10" fill="#1E5A8A" />
      <path d="M150 192 L150 178" stroke="#1E5A8A" strokeWidth="3" />
      <circle cx="150" cy="176" r="3" fill="#1E5A8A" />
      <circle cx="153" cy="198" r="2" fill="#FFF" />
    </g>
  );
}
