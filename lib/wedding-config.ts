/**
 * Single source of truth for the whole invitation.
 * Swap the values here to rebrand the site — names, date, venues, story, schedule.
 */

export const config = {
  couple: {
    bride: "Isabella",
    groom: "Liam",
    // Monogram shown on the wax seal
    initials: "I&L",
  },

  // ISO date/time of the ceremony (used by the countdown). Local time.
  dateISO: "2026-10-10T16:00:00",
  dateLong: "Saturday, the tenth of October, two thousand twenty-six",
  dateShort: "10 . 10 . 2026",

  hashtag: "#IsabellaAndLiamForever",

  intro:
    "Together with their families, Isabella and Liam joyfully invite you to share in the celebration of their marriage — a day woven with love, laughter, and the promise of forever.",

  story: [
    {
      year: "2019",
      title: "Where it began",
      text: "A rainy afternoon, a shared umbrella, and a conversation that never quite ended.",
    },
    {
      year: "2022",
      title: "Falling deeper",
      text: "Two cities, countless letters, and a love that only grew stronger across the miles.",
    },
    {
      year: "2025",
      title: "The question",
      text: "Beneath a canopy of fairy lights, Liam knelt — and Isabella said yes through happy tears.",
    },
  ],

  schedule: [
    { time: "3:30 PM", title: "Guests Arrive", icon: "calendar" },
    { time: "4:00 PM", title: "Ceremony", icon: "rings" },
    { time: "5:30 PM", title: "Cocktail Hour", icon: "glass" },
    { time: "7:00 PM", title: "Reception & Dinner", icon: "cake" },
    { time: "9:00 PM", title: "Dancing", icon: "dove" },
  ],

  ceremony: {
    name: "Rosewood Garden Chapel",
    address: "142 Bloomfield Lane, Willowbrook",
    time: "4:00 PM",
    mapUrl: "https://maps.google.com/?q=Rosewood+Garden+Chapel",
  },

  reception: {
    name: "The Lavender Manor",
    address: "8 Orchard Hill Road, Willowbrook",
    time: "7:00 PM onwards",
    mapUrl: "https://maps.google.com/?q=The+Lavender+Manor",
  },

  dressCode: {
    title: "Garden Formal",
    note: "We invite you to dress in soft, romantic tones. Think blush, sage, dusty rose, and champagne — and comfortable shoes for the garden lawn.",
    palette: ["#F4C9C9", "#C97B84", "#8A9A6B", "#C9A24C", "#FDF1EC"],
  },

  rsvp: {
    deadline: "by the 1st of September, 2026",
  },
} as const;

export type WeddingConfig = typeof config;
