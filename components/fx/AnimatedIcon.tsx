"use client";

import { useEffect, useRef, useState } from "react";

export type IconName = "rings" | "glass" | "cake" | "dove" | "calendar" | "heart";

const PATHS: Record<IconName, React.ReactNode> = {
  rings: (
    <>
      <circle cx="20" cy="34" r="12" />
      <circle cx="34" cy="34" r="12" />
      <path d="M16 14 L20 22 L24 14 Z" />
    </>
  ),
  glass: (
    <>
      <path d="M14 10 H42 L34 28 H22 Z" />
      <path d="M28 28 V44" />
      <path d="M20 44 H36" />
      <circle cx="30" cy="18" r="1.6" />
    </>
  ),
  cake: (
    <>
      <path d="M12 44 V26 H44 V44 Z" />
      <path d="M12 32 H44" />
      <path d="M20 26 V16 M28 26 V14 M36 26 V16" />
      <circle cx="20" cy="13" r="1.4" />
      <circle cx="28" cy="11" r="1.4" />
      <circle cx="36" cy="13" r="1.4" />
    </>
  ),
  dove: (
    <>
      <path d="M10 30 C 20 18, 34 18, 46 14 C 40 26, 30 34, 18 34 C 14 34, 10 32, 10 30 Z" />
      <path d="M22 30 C 24 38, 30 42, 38 42" />
      <circle cx="42" cy="17" r="1.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="10" y="14" width="36" height="32" rx="3" />
      <path d="M10 24 H46 M18 10 V18 M38 10 V18" />
      <path d="M18 32 H24 M30 32 H38 M18 40 H24" />
    </>
  ),
  heart: (
    <path d="M28 44 C 10 32, 8 18, 18 14 C 24 11, 28 16, 28 18 C 28 16, 32 11, 38 14 C 48 18, 46 32, 28 44 Z" />
  ),
};

export default function AnimatedIcon({
  name,
  size = 56,
  color = "#C9A24C",
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 56 56"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`[&_*]:draw-path ${drawn ? "[&_*]:is-drawn" : ""}`}
      style={{ ["--len" as string]: 200 } as React.CSSProperties}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
