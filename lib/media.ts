/**
 * All external media lives here so it is easy to verify and swap.
 * Media is served from free CDNs (Unsplash photos, Mixkit/Coverr video) and
 * therefore REQUIRES AN INTERNET CONNECTION to display.
 *
 * If any clip or image 404s, just replace the URL below — nothing else changes.
 * Every <video> has a `poster` image fallback so the hero still looks good if a
 * clip is blocked or slow.
 */

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  // --- Hero background video (romantic florals / soft focus) ---
  heroVideo:
    "https://assets.mixkit.co/videos/preview/mixkit-pink-flowers-moving-in-the-wind-1164-large.mp4",
  heroVideoAlt:
    "https://assets.mixkit.co/videos/preview/mixkit-white-flowers-on-a-tree-branch-1219-large.mp4",
  heroPoster: unsplash("1457089328109-e5d9bd499191", 1600),

  // --- Ambient music (royalty-free, off by default) ---
  music:
    "https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749cb7c.mp3",

  // --- Our Story photos ---
  story: [
    unsplash("1511285560929-80b456fea0bc"), // couple
    unsplash("1519225421980-715cb0215aed"), // wedding embrace
    unsplash("1583939003579-730e3918a45a"), // proposal / rings
  ],

  // --- Gallery grid ---
  gallery: [
    unsplash("1606800052052-a08af7148866", 900), // rings on flowers
    unsplash("1522673607200-164d1b6ce486", 900), // bouquet
    unsplash("1464366400600-7168b8af9bc3", 900), // table setting
    unsplash("1490750967868-88aa4486c946", 900), // pink flowers
    unsplash("1519741497674-611481863552", 900), // wedding details
    unsplash("1469371670807-013ccf25f16a", 900), // couple silhouette
  ],

  // --- Location / venue still ---
  venue: unsplash("1519167758481-83f550bb49b3", 1200),

  // --- Dress code accent ---
  dressCode: unsplash("1525258946800-98cfd641d0de", 1000),
} as const;
