"use client";

import { useEffect, useMemo, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/** Soft glowing bokeh / firefly drift for darker, dreamy sections. */
export default function Fireflies({
  density = 14,
  color = "#E2C87E",
  className = "",
}: {
  density?: number;
  color?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const factor = window.innerWidth < 600 ? 0.5 : 1;
    setCount(Math.round(density * factor));
  }, [density]);

  const flies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 6,
      })),
    [count]
  );

  if (count === 0) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {flies.map((f) => (
        <span
          key={f.id}
          className="firefly absolute rounded-full"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            background: color,
            boxShadow: `0 0 ${f.size * 2.5}px ${color}`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
          }}
        />
      ))}
      <style jsx>{`
        .firefly {
          will-change: transform, opacity;
          animation-name: drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0;
        }
        @keyframes drift {
          0%,
          100% {
            opacity: 0;
            transform: translate(0, 0) scale(0.7);
          }
          25% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
            transform: translate(18px, -22px) scale(1.1);
          }
          75% {
            opacity: 1;
            transform: translate(-14px, -10px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
