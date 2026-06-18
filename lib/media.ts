/**
 * All external media lives here so it is easy to verify and swap.
 * Sourced from free CDNs (Pexels) and therefore REQUIRES AN INTERNET CONNECTION.
 *
 * Photos are real Sri Lankan wedding photography (Pexels "sri lankan wedding").
 * The hero videos are royalty-free traditional South-Asian wedding footage
 * (lotus garlands / ceremonial items) — the closest free-licensed match to a
 * Sinhala poruwa mood; swap the URL if you have your own clip.
 *
 * Every <video> has a `poster` image fallback so the hero still looks good if a
 * clip is blocked or slow.
 */

const pexels = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const media = {
  // --- Hero background video (traditional wedding, floral / ceremonial) ---
  heroVideo:
    "https://videos.pexels.com/video-files/35011747/14832037_1920_1080_50fps.mp4", // lotus garlands
  heroVideoAlt:
    "https://videos.pexels.com/video-files/35011906/14832179_1920_1080_50fps.mp4", // ceremonial items
  heroPoster: pexels(9812684, 1600),

  // --- Ambient music (royalty-free, off by default) ---
  music: "https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749cb7c.mp3",

  // --- Our Story photos (a Sri Lankan wedding couple shoot) ---
  story: [pexels(9812641), pexels(9812723), pexels(9812684)],

  // --- Gallery grid (Sri Lankan wedding moments) ---
  gallery: [
    pexels(11563688, 900),
    pexels(6490259, 900),
    pexels(11518708, 900),
    pexels(11743131, 900),
    pexels(11207445, 900),
    pexels(13325048, 900),
  ],

  // --- Location / venue still ---
  venue: pexels(17312932, 1200),

  // --- Dress code accent (traditional attire) ---
  dressCode: pexels(9511858, 1000),
} as const;
