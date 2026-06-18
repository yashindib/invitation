"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@/lib/wedding-config";
import SectionHeading from "@/components/fx/SectionHeading";

const COLORS = ["#F4C9C9", "#C97B84", "#8C4A52", "#E2C87E", "#8A9A6B"];

function burstConfetti(host: HTMLElement) {
  for (let i = 0; i < 36; i++) {
    const s = document.createElement("span");
    const size = 8 + Math.random() * 10;
    const isHeart = Math.random() > 0.5;
    s.textContent = isHeart ? "♥" : "❀";
    s.style.cssText = `position:absolute;left:50%;top:40%;font-size:${size}px;color:${
      COLORS[(Math.random() * COLORS.length) | 0]
    };pointer-events:none;transform:translate(-50%,-50%);will-change:transform,opacity;z-index:30`;
    host.appendChild(s);
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 220;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 60;
    s.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${
            Math.random() * 540 - 270
          }deg)`,
          opacity: 0,
        },
      ],
      { duration: 1400 + Math.random() * 700, easing: "cubic-bezier(0.16,1,0.3,1)" }
    ).onfinish = () => s.remove();
  }
}

export default function RSVP() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: there is no backend. Capture locally / log.
    console.log("RSVP submitted:", form);
    if (hostRef.current) burstConfetti(hostRef.current);
    setSent(true);
  };

  const field =
    "w-full rounded-lg border border-rim bg-ivory/80 px-4 py-3 font-body text-ink outline-none transition-colors focus:border-rose";

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-24 sm:py-32">
      <div ref={hostRef} className="relative mx-auto max-w-xl">
        <SectionHeading
          index={6}
          kicker="We hope you can come"
          kickerSi="පැමිණෙන්න"
          title="RSVP"
        />
        <p className="mt-4 text-center font-body text-sm text-muted">
          Kindly respond {config.rsvp.deadline}
        </p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 rounded-2xl glass-blush p-10 text-center shadow-petal"
            >
              <p className="font-script text-4xl rose-text">Thank you!</p>
              <p className="mt-4 font-body text-cocoa">
                Your response has been noted. We can&apos;t wait to celebrate with you.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 font-display text-sm uppercase tracking-widest text-rose underline-offset-4 hover:underline"
              >
                Edit response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={submit}
              className="mt-12 space-y-4 rounded-2xl glass-blush p-7 shadow-petal sm:p-9"
            >
              <input
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.attending}
                  onChange={(e) => setForm({ ...form, attending: e.target.value })}
                  className={field}
                >
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className={field}
                >
                  {["1", "2", "3", "4"].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === "1" ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="A note for the couple (optional)"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${field} resize-none`}
              />
              <button
                type="submit"
                className="w-full rounded-full bg-gold-foil py-3.5 font-display text-sm uppercase tracking-widest text-ink shadow-rose transition-transform hover:scale-[1.02] active:scale-95"
              >
                Send RSVP
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
