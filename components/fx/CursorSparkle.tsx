"use client";

import { useEffect } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

/**
 * A trail of tiny gold sparkles following the cursor. Desktop / fine-pointer
 * only — disabled on touch devices and for reduced-motion users.
 */
export default function CursorSparkle() {
  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    let last = 0;
    const colors = ["#C9A24C", "#E2C87E", "#F4C9C9", "#C97B84"];

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;

      const s = document.createElement("span");
      const size = 4 + Math.random() * 5;
      s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;border-radius:50%;pointer-events:none;z-index:9999;background:${
        colors[(Math.random() * colors.length) | 0]
      };box-shadow:0 0 6px currentColor;transform:translate(-50%,-50%);transition:transform .8s ease,opacity .8s ease;opacity:.9`;
      document.body.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translate(-50%,-50%) translateY(${
          12 + Math.random() * 18
        }px) scale(0.2)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 850);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
