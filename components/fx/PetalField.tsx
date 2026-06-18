"use client";

import { useEffect, useMemo, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  rotate: number;
  hue: string;
  opacity: number;
}

// frangipani (araliya) — cream/gold temple-flower tones
const HUES = ["#FFF7E6", "#F7E7BE", "#EFD9A8", "#FBEFD0", "#E6CB7A"];

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      {/* a single frangipani petal — rounded tip, tapered base */}
      <path
        d="M12 1.5C8.5 5 6.5 9 7 14c0.4 4 3 8.5 5 8.5s4.6-4.5 5-8.5c0.5-5-1.5-9-5-12.5Z"
        fill={color}
        opacity="0.92"
      />
      {/* warm golden blush at the base, like araliya */}
      <path
        d="M12 22.5C10 22.5 8 19 7.6 15 c 2.6 1.4 6.2 1.4 8.8 0 C 16 19 14 22.5 12 22.5Z"
        fill="#E6B85A"
        opacity="0.35"
      />
    </svg>
  );
}

/**
 * Drifting petals layered behind a section. Petal count scales down on small
 * screens and is disabled entirely for reduced-motion users.
 */
export default function PetalField({
  density = 18,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(0);
      return;
    }
    const w = window.innerWidth;
    const factor = w < 480 ? 0.45 : w < 900 ? 0.7 : 1;
    setCount(Math.round(density * factor));
  }, [density]);

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 9 + Math.random() * 11,
      size: 10 + Math.random() * 16,
      drift: (Math.random() - 0.5) * 160,
      rotate: Math.random() * 360,
      hue: HUES[i % HUES.length],
      opacity: 0.4 + Math.random() * 0.5,
    }));
  }, [count]);

  if (count === 0) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute top-[-8%]"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ["--drift" as string]: `${p.drift}px`,
              ["--spin" as string]: `${p.rotate + 320}deg`,
            } as React.CSSProperties
          }
        >
          <PetalShape color={p.hue} />
        </span>
      ))}

      <style jsx>{`
        .petal {
          will-change: transform, opacity;
          animation-name: petal-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes petal-fall {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          100% {
            transform: translate3d(var(--drift), 115vh, 0) rotate(var(--spin));
          }
        }
      `}</style>
    </div>
  );
}
