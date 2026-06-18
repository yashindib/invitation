import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Romantic blush & florals palette
        ivory:    "#FFF8F5",   // main background, warm blush white
        cream:    "#FDF1EC",   // section surface
        petal:    "#F8DCD8",   // light blush panel
        blush:    "#F4C9C9",   // blush pink
        rose:     "#C97B84",   // dusty rose (accent)
        wine:     "#8C4A52",   // deep wine (strong accent)
        sage:     "#8A9A6B",   // eucalyptus greenery
        "sage-deep": "#6E7F52",
        gold:     "#C9A24C",   // soft gold foil
        "gold-light": "#E2C87E",
        // Text
        ink:      "#4A3338",   // deep mauve-brown (primary text)
        cocoa:    "#6E5258",   // body text
        muted:    "#8A6F73",   // captions
        rim:      "#EAD3CE",   // soft borders
      },
      fontFamily: {
        script:  ["var(--font-script)", "cursive"],
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
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
        "gold-foil":     "linear-gradient(135deg,#C9A24C 0%,#E2C87E 45%,#C9A24C 100%)",
        "blush-grad":    "linear-gradient(180deg,#FFF8F5 0%,#FDF1EC 100%)",
        "romantic-grad": "linear-gradient(135deg,#FDF1EC 0%,#F8DCD8 50%,#FDF1EC 100%)",
      },
      boxShadow: {
        rose:     "0 0 36px rgba(201,123,132,0.22)",
        "rose-lg":"0 24px 70px rgba(140,74,82,0.18)",
        petal:    "0 10px 40px rgba(140,74,82,0.10),inset 0 1px 0 rgba(255,255,255,0.7)",
        seal:     "0 6px 22px rgba(140,74,82,0.45),inset 0 2px 6px rgba(255,255,255,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
