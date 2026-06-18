/**
 * External media. The photo galleries were replaced by fully drawn, animated
 * SVG scenes (see components/fx/IllustratedScene.tsx) — so there are no real
 * images anywhere in the site.
 *
 * What remains are the optional hero background video (royalty-free traditional
 * wedding footage from Pexels) and the ambient music track. Both need an
 * internet connection; if the video is blocked, the animated illustrated scene
 * behind it shows instead. Swap the URLs freely.
 */

export const media = {
  // --- Hero background video (traditional wedding, floral / ceremonial) ---
  heroVideo:
    "https://videos.pexels.com/video-files/35011747/14832037_1920_1080_50fps.mp4", // lotus garlands
  heroVideoAlt:
    "https://videos.pexels.com/video-files/35011906/14832179_1920_1080_50fps.mp4", // ceremonial items

  // --- Ambient music (royalty-free, off by default) ---
  music: "https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749cb7c.mp3",
} as const;
