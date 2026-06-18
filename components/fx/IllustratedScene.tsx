"use client";

import { useId } from "react";

export type SceneVariant = "lamp" | "lotus" | "poruwa" | "peacock" | "couple";

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
    couple: ["#FBEFD0", "#F4D9C2", "#E2B58A"],
  };
  const [s0, s1, s2] = skyStops[variant];
  const petalTone =
    variant === "lotus" || variant === "poruwa" || variant === "couple"
      ? "#FFF7E6"
      : "#E6CB7A";

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
        {variant === "couple" && <Couple />}

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
        :global(.ill-heart) {
          transform-origin: center;
          animation: illHeart 3.6s ease-in-out infinite;
        }
        @keyframes illHeart {
          0% { transform: translateY(0) scale(0.7); opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { transform: translateY(-70px) scale(1.1); opacity: 0; }
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
          .ill-glow, :global(.ill-flame), :global(.ill-sway), :global(.ill-eye), :global(.ill-ripple), :global(.ill-heart) { animation: none; }
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

/* ---------- scene: bride & groom ---------- */
function Couple() {
  const SKIN = "#C8895E";
  const HAIR = "#2B1B12";
  const RED = "#8C1F2A";
  const GOLD = "#C9A24C";
  const GOLDL = "#E6CB7A";
  const SUIT = "#2C2A36";

  return (
    <g>
      {/* floral arch */}
      <path d="M60 200 Q 200 70 340 200" fill="none" stroke="#7A8B4F" strokeWidth="4" />
      {Array.from({ length: 13 }).map((_, i) => {
        const t = i / 12;
        const x = 60 + t * 280;
        const y = 200 - Math.sin(Math.PI * t) * 130;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={i % 2 ? 6 : 4.5} fill={i % 3 === 0 ? RED : i % 3 === 1 ? "#FFE7EC" : GOLDL} />
            <circle cx={x} cy={y} r="1.6" fill={GOLD} />
          </g>
        );
      })}

      {/* ground shadows */}
      <ellipse cx="158" cy="474" rx="48" ry="9" fill="#000" opacity="0.10" />
      <ellipse cx="250" cy="474" rx="42" ry="9" fill="#000" opacity="0.10" />

      <g className="ill-sway" style={{ transformOrigin: "204px 470px" }}>
        {/* ---------------- BRIDE (osariya) ---------------- */}
        <g>
          {/* skirt with gold hem */}
          <path d="M126 470 L150 306 Q158 298 166 306 L192 470 Z" fill={RED} />
          <path d="M126 470 L192 470 L189 456 L129 456 Z" fill={GOLDL} />
          {/* osariya fan pleat at hip */}
          <path d="M150 322 Q132 360 130 410 Q146 392 152 330 Z" fill={GOLD} opacity="0.85" />
          <path d="M150 322 Q132 360 130 410" fill="none" stroke={GOLDL} strokeWidth="1.5" />
          {/* blouse */}
          <path d="M142 262 Q158 254 174 262 L168 308 Q158 312 148 308 Z" fill={GOLD} />
          {/* neck + head */}
          <rect x="153" y="246" width="10" height="14" fill={SKIN} />
          <circle cx="158" cy="234" r="20" fill={SKIN} />
          {/* hair + bun + flowers */}
          <path d="M138 232 Q140 210 158 208 Q176 210 178 232 Q172 222 158 222 Q144 222 138 232 Z" fill={HAIR} />
          <circle cx="176" cy="222" r="9" fill={HAIR} />
          <circle cx="180" cy="216" r="3" fill="#FFE7EC" />
          <circle cx="184" cy="223" r="3" fill={GOLDL} />
          {/* headpiece (nalalpata) */}
          <path d="M150 218 Q158 212 166 218" fill="none" stroke={GOLDL} strokeWidth="2.5" />
          <circle cx="158" cy="214" r="2.4" fill={GOLD} />
          {/* face */}
          <circle cx="152" cy="234" r="1.6" fill="#3A2A1A" />
          <circle cx="164" cy="234" r="1.6" fill="#3A2A1A" />
          <path d="M154 242 Q158 245 162 242" fill="none" stroke="#7A3B33" strokeWidth="1.4" />
          {/* necklace */}
          <path d="M150 258 Q158 266 166 258" fill="none" stroke={GOLDL} strokeWidth="2" />
          <circle cx="158" cy="264" r="2" fill={GOLD} />
          {/* bouquet held at front */}
          <g>
            <path d="M150 318 L150 340" stroke="#7A8B4F" strokeWidth="2" />
            <circle cx="146" cy="338" r="6" fill="#FFE7EC" />
            <circle cx="155" cy="340" r="6" fill={RED} />
            <circle cx="150" cy="346" r="6" fill={GOLDL} />
            <circle cx="150" cy="341" r="2" fill={GOLD} />
          </g>
        </g>

        {/* ---------------- GROOM (suit) ---------------- */}
        <g>
          {/* legs */}
          <rect x="236" y="372" width="11" height="100" rx="3" fill={SUIT} />
          <rect x="253" y="372" width="11" height="100" rx="3" fill={SUIT} />
          {/* shoes */}
          <ellipse cx="241" cy="472" rx="9" ry="5" fill="#1A1820" />
          <ellipse cx="259" cy="472" rx="9" ry="5" fill="#1A1820" />
          {/* jacket / torso */}
          <path d="M230 380 L234 270 Q250 258 266 270 L270 380 Q250 388 230 380 Z" fill={SUIT} />
          {/* white shirt + gold tie */}
          <path d="M244 272 L250 330 L256 272 Q250 268 244 272 Z" fill="#FBF4E3" />
          <path d="M250 276 L246 300 L250 322 L254 300 Z" fill={GOLD} />
          {/* lapels */}
          <path d="M244 272 L238 312 L246 286 Z" fill="#23212C" />
          <path d="M256 272 L262 312 L254 286 Z" fill="#23212C" />
          {/* pocket flower */}
          <circle cx="262" cy="300" r="3.5" fill={RED} />
          {/* neck + head */}
          <rect x="245" y="248" width="10" height="14" fill={SKIN} />
          <circle cx="250" cy="236" r="20" fill={SKIN} />
          {/* hair */}
          <path d="M230 234 Q232 212 250 210 Q268 212 270 234 Q264 222 250 222 Q236 222 230 234 Z" fill={HAIR} />
          {/* face */}
          <circle cx="244" cy="236" r="1.6" fill="#3A2A1A" />
          <circle cx="256" cy="236" r="1.6" fill="#3A2A1A" />
          <path d="M246 244 Q250 247 254 244" fill="none" stroke="#7A3B33" strokeWidth="1.4" />
        </g>

        {/* clasped hands between them */}
        <path d="M192 350 Q204 344 218 352" fill="none" stroke={SKIN} strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* floating hearts between the couple */}
      {[
        { x: 204, y: 300, s: 1, d: 0 },
        { x: 188, y: 320, s: 0.7, d: 1.2 },
        { x: 220, y: 312, s: 0.8, d: 2.1 },
      ].map((h, i) => (
        <g key={i} className="ill-heart" style={{ animationDelay: `${h.d}s` }}>
          <path
            transform={`translate(${h.x} ${h.y}) scale(${h.s})`}
            d="M0 0 C -5 -6, -13 -1, 0 9 C 13 -1, 5 -6, 0 0 Z"
            fill="#C2415A"
            opacity="0.9"
          />
        </g>
      ))}
    </g>
  );
}
