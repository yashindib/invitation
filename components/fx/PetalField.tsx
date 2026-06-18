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

const HUES = ["#F4C9C9", "#F8DCD8", "#C97B84", "#E2C87E", "#FBE3DE"];

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
      {/* a soft rounded petal */}
      <path
        d="M12 1C7 5 4 9 4 14c0 5 4 9 8 9s8-4 8-9c0-5-3-9-8-13Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M12 1C12 7 12 16 12 23"
        stroke="rgba(140,74,82,0.18)"
        strokeWidth="0.6"
        fill="none"
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
