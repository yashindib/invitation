"use client";

import { useEffect, useRef, useState } from "react";
import { media } from "@/lib/media";

/**
 * Floating ambient-music toggle. Muted/off by default (browsers block
 * unprompted autoplay anyway); the first tap starts the track.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = new Audio(media.music);
    a.loop = true;
    a.volume = 0.0;
    audioRef.current = a;
    a.addEventListener("canplaythrough", () => setReady(true), { once: true });
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const fade = (to: number) => {
    const a = audioRef.current;
    if (!a) return;
    const step = (to - a.volume) / 16;
    let i = 0;
    const id = setInterval(() => {
      if (!audioRef.current) return clearInterval(id);
      i++;
      a.volume = Math.min(1, Math.max(0, a.volume + step));
      if (i >= 16) {
        a.volume = to;
        clearInterval(id);
      }
    }, 35);
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      fade(0);
      setTimeout(() => a.pause(), 600);
      setPlaying(false);
    } else {
      try {
        await a.play();
        fade(0.55);
        setPlaying(true);
      } catch {
        /* autoplay blocked until a real gesture — ignored */
      }
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full glass-blush shadow-petal transition-transform active:scale-90"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <span className="relative flex items-center gap-[2px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-rose"
            style={{
              height: playing ? 16 : 8,
              animation: playing
                ? `eq 0.7s ease-in-out ${i * 0.15}s infinite alternate`
                : "none",
            }}
          />
        ))}
      </span>
      {!ready && (
        <span className="absolute inset-0 rounded-full border border-rim animate-pulse-soft" />
      )}
      <style jsx>{`
        @keyframes eq {
          0% {
            height: 5px;
          }
          100% {
            height: 18px;
          }
        }
      `}</style>
    </button>
  );
}
