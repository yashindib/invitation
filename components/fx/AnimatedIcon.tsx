"use client";

import { useEffect, useRef, useState } from "react";

export type IconName =
  | "rings"
  | "glass"
  | "cake"
  | "dove"
  | "calendar"
  | "heart"
  | "lamp"
  | "poruwa"
  | "lotus"
  | "betel"
  | "peacock";

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
  // traditional brass oil lamp (pahana) with flame
  lamp: (
    <>
      <path d="M28 8 C 26 12, 26 14, 28 16 C 30 14, 30 12, 28 8 Z" />
      <path d="M28 16 V24" />
      <path d="M14 30 C 14 26, 42 26, 42 30 C 42 34, 36 36, 28 36 C 20 36, 14 34, 14 30 Z" />
      <path d="M28 36 V42 M20 42 H36" />
      <path d="M12 30 C 9 30, 9 33, 12 33" />
      <path d="M44 30 C 47 30, 47 33, 44 33" />
    </>
  ),
  // poruwa — the decorated wedding platform
  poruwa: (
    <>
      <path d="M10 22 H46 L42 28 H14 Z" />
      <path d="M14 28 V44 M42 28 V44 M14 44 H42" />
      <path d="M20 28 V44 M28 28 V44 M36 28 V44" />
      <path d="M16 22 C 20 14, 36 14, 40 22" />
      <circle cx="28" cy="17" r="1.4" />
    </>
  ),
  // lotus (nelum)
  lotus: (
    <>
      <path d="M28 40 C 22 34, 22 24, 28 16 C 34 24, 34 34, 28 40 Z" />
      <path d="M28 40 C 20 38, 14 32, 13 24 C 21 26, 26 32, 28 40 Z" />
      <path d="M28 40 C 36 38, 42 32, 43 24 C 35 26, 30 32, 28 40 Z" />
      <path d="M12 40 H44" />
    </>
  ),
  // betel leaf (bulath)
  betel: (
    <>
      <path d="M28 8 C 44 20, 44 36, 28 46 C 12 36, 12 20, 28 8 Z" />
      <path d="M28 14 V42" />
      <path d="M28 24 L20 20 M28 24 L36 20 M28 32 L19 30 M28 32 L37 30" />
    </>
  ),
  // peacock
  peacock: (
    <>
      <path d="M22 44 C 18 36, 18 26, 24 22 C 26 20, 26 16, 24 14 C 22 12, 19 13, 19 16 C 19 18, 21 19, 23 18" />
      <path d="M26 24 C 34 18, 44 20, 46 30 C 38 30, 32 34, 26 40" />
      <path d="M30 26 C 36 23, 42 25, 43 30" />
      <circle cx="42" cy="29" r="1.5" />
      <circle cx="24" cy="15.5" r="1" />
    </>
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
