"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * A Hansa (swan) — a classic Sinhala motif — drawn in a single modern line.
 * `carryLetter` gives it a small betel leaf to deliver.
 */
export function Bird({
  size = 40,
  color = "#C9A24C",
  carryLetter = false,
}: {
  size?: number;
  color?: string;
  carryLetter?: boolean;
}) {
  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg viewBox="0 0 72 56" width="100%" height="100%" aria-hidden="true">
        {/* body + curved neck of the hansa */}
        <path
          d="M8 40 C 10 30, 22 30, 30 34 C 40 38, 50 38, 58 30 C 60 27, 60 22, 56 20 C 53 18, 49 19, 49 23 C 49 26, 52 27, 54 26"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* wing — flaps */}
        <path
          className="bird-wings"
          style={{ transformOrigin: "30px 34px" }}
          d="M22 34 C 30 22, 42 22, 48 30"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="53.5" cy="22.5" r="1.1" fill={color} />
      </svg>
      {carryLetter && (
        <svg
          viewBox="0 0 20 24"
          width={size * 0.34}
          height={size * 0.4}
          className="absolute left-1/2 top-full -translate-x-1/2"
          aria-hidden="true"
        >
          {/* betel leaf */}
          <path
            d="M10 1 C 18 8, 18 18, 10 23 C 2 18, 2 8, 10 1 Z"
            fill="#7A8B4F"
            stroke="#5E6E3C"
            strokeWidth="1"
          />
          <path d="M10 4 V21" stroke="#5E6E3C" strokeWidth="0.8" />
        </svg>
      )}
      <style jsx>{`
        .bird-wings {
          animation: flap 0.5s ease-in-out infinite alternate;
        }
        @keyframes flap {
          0% {
            transform: scaleY(0.5) translateY(3px);
          }
          100% {
            transform: scaleY(1) translateY(-1px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bird-wings {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Ambient hansa gliding across the container along a gentle arc.
 */
export default function FlyingBirds({
  count = 3,
  color = "#C9A24C",
  className = "",
}: {
  count?: number;
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = ref.current;
    if (!root) return;
    const birds = Array.from(root.querySelectorAll<HTMLElement>("[data-bird]"));

    const ctx = gsap.context(() => {
      birds.forEach((b, i) => {
        const startY = 10 + Math.random() * 40;
        gsap.set(b, { x: "-12vw", y: `${startY}vh`, opacity: 0 });
        gsap
          .timeline({ repeat: -1, delay: i * 3.5 })
          .to(b, { opacity: 1, duration: 1 }, 0)
          .to(b, { x: "112vw", duration: 16 + Math.random() * 8, ease: "none" }, 0)
          .to(
            b,
            {
              y: `+=${-14 - Math.random() * 12}vh`,
              duration: 8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: 1,
            },
            0
          )
          .to(b, { opacity: 0, duration: 1.4 }, ">-1.6");
      });
    }, root);

    return () => ctx.revert();
  }, [count]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} data-bird className="absolute left-0 top-0">
          <Bird size={30 + (i % 3) * 10} color={color} />
        </div>
      ))}
    </div>
  );
}
