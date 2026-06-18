"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Intrinsic sizes of the cropped traditional motifs (public/motifs). */
export const MOTIFS = {
  frame1: [499, 457],
  frame2: [362, 456],
  frame3: [475, 456],
  lotus: [258, 253],
  lamp: [175, 252],
  poruwa: [326, 265],
  pot: [169, 259],
  garland: [230, 262],
} as const;

export type MotifName = keyof typeof MOTIFS;
export type FrameName = "frame1" | "frame2" | "frame3";

/**
 * A decorative traditional motif (transparent PNG). Size it with a width class
 * (e.g. `w-16`, `w-40`); height stays auto to preserve the aspect ratio.
 */
export function Motif({
  name,
  className = "",
  float = false,
  priority = false,
}: {
  name: MotifName;
  className?: string;
  float?: boolean;
  priority?: boolean;
}) {
  const [w, h] = MOTIFS[name];
  return (
    <Image
      src={`/motifs/${name}.png`}
      alt=""
      width={w}
      height={h}
      priority={priority}
      aria-hidden="true"
      className={cn("pointer-events-none select-none", float && "animate-float-medium", className)}
      style={{ height: "auto" }}
    />
  );
}

/**
 * A circular lotus-and-peacock wreath frame with content centred in its
 * (empty) middle. Size the box with width/height or aspect classes.
 */
export function MotifFrame({
  frame = "frame1",
  className = "",
  padding = "22%",
  children,
}: {
  frame?: FrameName;
  className?: string;
  padding?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={`/motifs/${frame}.png`}
        alt=""
        fill
        sizes="360px"
        aria-hidden="true"
        className="object-contain drop-shadow-[0_10px_30px_rgba(110,30,30,0.18)]"
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ padding }}
      >
        {children}
      </div>
    </div>
  );
}
