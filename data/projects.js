const asset = (fileName) => `/assets/${encodeURIComponent(fileName)}`;

export const introSections = [
  {
    id: "port1",
    image: asset("Portfolio 1.png"),
    alt: "2026 Portfolio cover for 2D Artist Le Truc Giang on a neon CRT monitor."
  },
  {
    id: "port2",
    image: asset("Portfolio 2.png"),
    alt: "About page for Le Truc Giang with portrait, software, experience, education, and contact information."
  }
];

export const projects = [
  {
    id: "match-buddies",
    title: "Match Buddies",
    studio: "Playard Studio",
    accent: "cyan",
    menuLabel: "MATCH BUDDIES",
    summary:
      "A bright casual matching game with soft character art, playful seasonal props, and polished mobile UI screens.",
    role: "Character design, casual game assets, interface presentation",
    preview: asset("Portfolio 3 Match Buddies.png"),
    slides: [
      "Portfolio 4 Match Buddies.png",
      "Portfolio 5 Match Buddies.png",
      "Portfolio 6 Match Buddies.png",
      "Portfolio 7 Match Buddies.png",
      "Portfolio 8 Match Buddies.png",
      "Portfolio 9 Match Buddies.png",
      "Portfolio 10 Match Buddies.png",
      "Portfolio 11 Match Buddies.png"
    ].map(asset)
  },
  {
    id: "sortile-cluster",
    title: "Sortile Cluster",
    studio: "Playard Studio",
    accent: "gold",
    menuLabel: "SORTILE CLUSTER",
    summary:
      "A cozy sorting puzzle world with cheerful characters, readable gameplay compositions, and mobile-ready UI states.",
    role: "Game visual concept, tile art, screen composition",
    preview: asset("Portfolio 13 Sortile Cluster.png"),
    slides: [
      "Portfolio 14 Sortile Cluster.png",
      "Portfolio 15 Sortile Cluster.png",
      "Portfolio 16 Sortile Cluster.png",
      "Portfolio 17 Sortile Cluster.png",
      "Portfolio 18 Sortile Cluster.png",
      "Portfolio 19 Sortile Cluster.png",
      "Portfolio 20 Sortile Cluster.png"
    ].map(asset)
  },
  {
    id: "vet-nut",
    title: "Vet Nut",
    studio: "Board Game Project",
    accent: "lime",
    menuLabel: "VET NUT",
    summary:
      "A school-bullying board game concept using friendly illustration to communicate conflict, empathy, and teamwork.",
    role: "Educational board game art, visual storytelling, character scenes",
    preview: asset("Portfolio 22  Vết Nứt.png"),
    slides: [
      "Portfolio 26 Vết Nứt.png",
      "Portfolio 27 Vết Nứt.png",
      "Portfolio 28 Vết Nứt.png",
      "Portfolio 29 Vết Nứt.png",
      "Portfolio 30 Vết Nứt.png",
      "Portfolio 31 Vết Nứt.png",
      "Portfolio 32 Vết Nứt.png",
      "Portfolio 33 Vết Nứt.png",
      "Portfolio 34 Vết Nứt.png",
      "Portfolio 35 Vết Nứt.png"
    ].map(asset)
  },
  {
    id: "pirate-squid",
    title: "Pirate Squid",
    studio: "Casual Game UI",
    accent: "pink",
    menuLabel: "PIRATE SQUID",
    summary:
      "A sea-themed puzzle project with expressive mascot art, level screens, reward states, settings, and mobile UI flow.",
    role: "Mascot design, mobile UI screens, screenshot presentation",
    preview: asset("Portfolio 37 Pirate Squid.png"),
    slides: [
      "Portfolio 37 Pirate Squid.png",
      "Portfolio 38 Pirate Squid.png",
      "Portfolio 39 Pirate Squid.png",
      "Portfolio 40 Pirate Squid.png",
      "Portfolio 41 Pirate Squid.png",
      "Portfolio 42 Pirate Squid.png",
      "Portfolio 43 Pirate Squid.png",
      "Portfolio 44 Pirate Squid.png"
    ].map(asset)
  }
];
