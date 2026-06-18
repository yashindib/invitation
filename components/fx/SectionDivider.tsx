"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A floral gold divider whose lines draw themselves the first time it scrolls
 * into view (stroke-dashoffset animation).
 */
export default function SectionDivider({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = drawn ? "draw-path is-drawn" : "draw-path";

  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg
        ref={ref}
        viewBox="0 0 320 40"
        className="h-9 w-[min(78vw,300px)]"
        fill="none"
      >
        <line
          x1="20"
          y1="20"
          x2="138"
          y2="20"
          stroke="#C9A24C"
          strokeWidth="1"
          className={cls}
          style={{ ["--len" as string]: 120 }}
        />
        <line
          x1="182"
          y1="20"
          x2="300"
          y2="20"
          stroke="#C9A24C"
          strokeWidth="1"
          className={cls}
          style={{ ["--len" as string]: 120, transitionDelay: "0.1s" }}
        />
        {/* center lotus — minimal, three strokes */}
        <path
          d="M160 8 C 156 14, 156 22, 160 28 C 164 22, 164 14, 160 8 Z"
          stroke="#6E1E1E"
          strokeWidth="1.1"
          className={cls}
          style={{ ["--len" as string]: 70, transitionDelay: "0.2s" }}
        />
        <path
          d="M160 28 C 152 24, 149 18, 150 13 C 156 16, 159 22, 160 28 Z"
          stroke="#C9A24C"
          strokeWidth="1"
          className={cls}
          style={{ ["--len" as string]: 70, transitionDelay: "0.3s" }}
        />
        <path
          d="M160 28 C 168 24, 171 18, 170 13 C 164 16, 161 22, 160 28 Z"
          stroke="#C9A24C"
          strokeWidth="1"
          className={cls}
          style={{ ["--len" as string]: 70, transitionDelay: "0.3s" }}
        />
        <circle cx="138" cy="20" r="1.8" fill="#C9A24C" className={drawn ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.6s ease 0.7s" }} />
        <circle cx="182" cy="20" r="1.8" fill="#C9A24C" className={drawn ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.6s ease 0.7s" }} />
      </svg>
    </div>
  );
}
