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
        className="h-9 w-[min(80vw,320px)]"
        fill="none"
      >
        <line
          x1="20"
          y1="20"
          x2="135"
          y2="20"
          stroke="#C9A24C"
          strokeWidth="1"
          className={cls}
          style={{ ["--len" as string]: 120 }}
        />
        <line
          x1="185"
          y1="20"
          x2="300"
          y2="20"
          stroke="#C9A24C"
          strokeWidth="1"
          className={cls}
          style={{ ["--len" as string]: 120, transitionDelay: "0.1s" }}
        />
        {/* center flourish */}
        <path
          d="M160 8 C 150 14, 150 26, 160 32 C 170 26, 170 14, 160 8 Z"
          stroke="#C97B84"
          strokeWidth="1.2"
          className={cls}
          style={{ ["--len" as string]: 80, transitionDelay: "0.2s" }}
        />
        <path
          d="M160 14 C 155 18, 155 22, 160 26 C 165 22, 165 18, 160 14 Z"
          fill="#F4C9C9"
          className={drawn ? "opacity-100" : "opacity-0"}
          style={{ transition: "opacity 0.8s ease 0.9s" }}
        />
        <circle cx="135" cy="20" r="2" fill="#C9A24C" className={drawn ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.6s ease 0.7s" }} />
        <circle cx="185" cy="20" r="2" fill="#C9A24C" className={drawn ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.6s ease 0.7s" }} />
      </svg>
    </div>
  );
}
