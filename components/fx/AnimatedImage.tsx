"use client";

import Image from "next/image";

/**
 * A "living" photo — applies a slow, continuous Ken Burns zoom/pan so the
 * still image feels animated and cinematic. Four `variant`s give different
 * pan directions so adjacent images don't move in sync. Motion pauses under
 * prefers-reduced-motion.
 */
export default function AnimatedImage({
  src,
  alt,
  sizes,
  variant = 0,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  variant?: number;
  className?: string;
  priority?: boolean;
}) {
  const v = variant % 4;
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden={alt === ""}>
      <div className={`kb kb-${v} absolute inset-0`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      <style jsx>{`
        .kb {
          will-change: transform;
          transform-origin: center;
          animation: var(--kb) 20s ease-in-out infinite alternate;
        }
        .kb-0 {
          --kb: kb0;
        }
        .kb-1 {
          --kb: kb1;
        }
        .kb-2 {
          --kb: kb2;
        }
        .kb-3 {
          --kb: kb3;
        }
        @keyframes kb0 {
          from {
            transform: scale(1.06) translate(0, 0);
          }
          to {
            transform: scale(1.16) translate(-2.5%, -2%);
          }
        }
        @keyframes kb1 {
          from {
            transform: scale(1.14) translate(2.5%, 1.5%);
          }
          to {
            transform: scale(1.04) translate(-1.5%, -1%);
          }
        }
        @keyframes kb2 {
          from {
            transform: scale(1.05) translate(1.5%, -2%);
          }
          to {
            transform: scale(1.15) translate(-2%, 2%);
          }
        }
        @keyframes kb3 {
          from {
            transform: scale(1.12) translate(-2%, 2%);
          }
          to {
            transform: scale(1.05) translate(2%, -1.5%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .kb {
            animation: none;
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}
