/**
 * Single source of truth for the whole invitation.
 * Swap the values here to rebrand the site — names, parents, dates, the
 * auspicious time (subha nekatha), venues, ceremony schedule and blessings.
 *
 * Names carry an English (en) and a Sinhala (si) form. Sinhala accents render
 * in Noto Serif Sinhala (font-sinhala).
 */

export const config = {
  couple: {
    // English forms are used across the layout; Sinhala forms appear as accents.
    bride: "Nethmi Sandunika",
    brideSi: "නෙත්මි සඳුනිකා",
    groom: "Sahan Perera",
    groomSi: "සහන් පෙරේරා",
    // Monogram shown on the punkalasa / lotus seal
    initials: "N & S",
  },

  // The bride's and groom's parents — central to a Sri Lankan invitation.
  parents: {
    bride: "Mr. & Mrs. Wijesinghe Bandara",
    brideNote: "request the honour of your presence at the marriage of their daughter",
    groom: "Mr. & Mrs. Nimal Perera",
    groomNote: "to the son of",
  },

  // Sinhala greetings used as decorative accents
  greetingSi: "ආයුබෝවන්", // Ayubowan — "may you live long" (welcome)
  invitationSi: "මංගල ආරාධනා", // Mangala Aradhana — "wedding invitation"

  // ISO date/time of the auspicious moment (used by the countdown). Local time.
  dateISO: "2026-10-10T09:15:00",
  dateLong: "Saturday, the tenth of October, two thousand twenty-six",
  dateShort: "10 . 10 . 2026",

  // Subha nekatha — the auspicious time for the poruwa ceremony.
  nekath: {
    poruwa: "9:15 a.m.",
    label: "Auspicious Time",
    labelSi: "සුභ නැකත",
    note: "The couple will step onto the poruwa at the auspicious hour of",
  },

  hashtag: "#NethmiWedsSahan",

  // Traditional invitation wording (from the families).
  intro:
    "With hearts full of joy and the blessings of our parents, we invite you to grace the poruwa ceremony of Nethmi & Sahan — a sacred union blessed by tradition, family, and the light of the oil lamp.",

  // A line of blessing in the spirit of the Jayamangala Gatha.
  blessing: {
    si: "ජය මංගල ගාථා",
    en: "May the blessings of the noble verses bring this union lifelong joy, prosperity, and harmony.",
  },

  story: [
    {
      year: "2019",
      title: "Where it began",
      text: "Introduced through family, a shy first conversation grew into a friendship neither of them expected.",
    },
    {
      year: "2022",
      title: "Falling deeper",
      text: "Temple visits, home-cooked meals, and quiet evenings — a love rooted in shared traditions and values.",
    },
    {
      year: "2025",
      title: "The blessing",
      text: "With both families' blessings and an auspicious nekath, the date was set beneath the glow of the oil lamp.",
    },
  ],

  // Ceremony schedule (icons map to AnimatedIcon names).
  schedule: [
    { time: "8:45 AM", title: "Lighting of the Oil Lamp", icon: "lamp" },
    { time: "9:15 AM", title: "Poruwa Ceremony", icon: "poruwa" },
    { time: "9:30 AM", title: "Jayamangala Gatha", icon: "lotus" },
    { time: "10:00 AM", title: "Exchange of Betel", icon: "betel" },
    { time: "12:00 PM", title: "Wedding Luncheon", icon: "peacock" },
  ],

  ceremony: {
    name: "Poruwa Ceremony — Mangala Madama",
    address: "Water's Edge, Battaramulla",
    time: "9:15 AM (Subha Nekatha)",
    mapUrl: "https://maps.google.com/?q=Water%27s+Edge+Battaramulla",
  },

  reception: {
    name: "Wedding Homecoming & Reception",
    address: "Hotel Galadari, Colombo 01",
    time: "7:00 PM onwards",
    mapUrl: "https://maps.google.com/?q=Galadari+Hotel+Colombo",
  },

  dressCode: {
    title: "Traditional Sri Lankan Attire",
    note: "We warmly invite our ladies in the Kandyan osariya or saree, and our gentlemen in the national dress or formal wear — in the rich tones of gold, maroon, and temple-flower cream.",
    palette: ["#C9A24C", "#6E1E1E", "#A33C2E", "#7A8B4F", "#FAF1DC"],
  },

  rsvp: {
    deadline: "by the 1st of September, 2026",
  },
} as const;

export type WeddingConfig = typeof config;
