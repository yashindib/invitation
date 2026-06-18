"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

/** A small SVG bird with gently flapping wings. */
export function Bird({
  size = 34,
  color = "#6E5258",
  carryLetter = false,
}: {
  size?: number;
  color?: string;
  carryLetter?: boolean;
}) {
  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g className="bird-wings" style={{ transformOrigin: "32px 24px" }}>
          <path
            d="M4 24 C 16 8, 28 8, 32 22 C 36 8, 48 8, 60 24"
            fill="none"
            stroke={color}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        </g>
        <circle cx="32" cy="23" r="2.1" fill={color} />
      </svg>
      {carryLetter && (
        <svg
          viewBox="0 0 24 18"
          width={size * 0.5}
          height={size * 0.5}
          className="absolute left-1/2 top-full -translate-x-1/2"
          aria-hidden="true"
        >
          <rect x="1" y="1" width="22" height="16" rx="2" fill="#FFF8F5" stroke="#C9A24C" strokeWidth="1" />
          <path d="M1 3 L12 10 L23 3" fill="none" stroke="#C97B84" strokeWidth="1" />
          <circle cx="12" cy="11" r="2" fill="#8C4A52" />
        </svg>
      )}
      <style jsx>{`
        .bird-wings {
          animation: flap 0.42s ease-in-out infinite alternate;
        }
        @keyframes flap {
          0% {
            transform: scaleY(0.55) translateY(2px);
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
 * Ambient birds that drift across the container along a gentle arc.
 */
export default function FlyingBirds({
  count = 3,
  color = "#8A6F73",
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
          .to(
            b,
            {
              x: "112vw",
              duration: 16 + Math.random() * 8,
              ease: "none",
            },
            0
          )
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
          <Bird size={26 + (i % 3) * 8} color={color} />
        </div>
      ))}
    </div>
  );
}
