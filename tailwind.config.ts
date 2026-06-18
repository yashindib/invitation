import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sinhala traditional — gold & temple-flower cream palette
        ivory:    "#FFFBF0",   // warm cream base (main bg)
        cream:    "#FAF1DC",   // light gold cream surface
        petal:    "#F5E6C4",   // soft saffron panel
        blush:    "#EFD9A8",   // light gold accent
        rose:     "#A33C2E",   // temple terracotta-maroon (accent)
        wine:     "#6E1E1E",   // deep maroon (strong accent)
        sage:     "#7A8B4F",   // areca / betel green
        "sage-deep": "#5E6E3C",
        gold:     "#C9A24C",   // brass / gold foil
        "gold-light": "#E6CB7A",
        // Text
        ink:      "#3D2A14",   // dark brown (primary text)
        cocoa:    "#6B5230",   // body text
        muted:    "#978049",   // captions
        rim:      "#E8D7AE",   // soft gold borders
      },
      fontFamily: {
        script:  ["var(--font-script)", "cursive"],
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        sinhala: ["var(--font-sinhala)", "serif"],
      },
      animation: {
        "float-slow":   "float 9s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "pulse-soft":   "pulseSoft 2.6s ease-in-out infinite",
        shimmer:        "shimmer 3.5s linear infinite",
        bloom:          "bloom 1.1s cubic-bezier(0.22,1,0.36,1) forwards",
        flicker:        "flicker 3.4s ease-in-out infinite",
        "spin-slow":    "spin 22s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-18px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%":      { opacity: "1", transform: "scale(1.04)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        bloom: {
          "0%":   { opacity: "0", transform: "scale(0.6) rotate(-8deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.85" },
          "45%":      { opacity: "1" },
          "55%":      { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "gold-foil":     "linear-gradient(135deg,#C9A24C 0%,#E6CB7A 45%,#C9A24C 100%)",
        "blush-grad":    "linear-gradient(180deg,#FFFBF0 0%,#FAF1DC 100%)",
        "romantic-grad": "linear-gradient(135deg,#FAF1DC 0%,#F5E6C4 50%,#FAF1DC 100%)",
      },
      boxShadow: {
        rose:     "0 0 36px rgba(201,162,76,0.28)",
        "rose-lg":"0 24px 70px rgba(110,30,30,0.16)",
        petal:    "0 10px 40px rgba(110,30,30,0.10),inset 0 1px 0 rgba(255,255,255,0.7)",
        seal:     "0 6px 22px rgba(110,30,30,0.45),inset 0 2px 6px rgba(255,255,255,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
