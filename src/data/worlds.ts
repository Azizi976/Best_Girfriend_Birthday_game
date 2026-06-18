import type { Crystal, World } from "@/lib/types";

export const CRYSTALS: Record<string, Crystal> = {
  c1: { id: "c1", name: "קריסטל הזהות", emoji: "🔐", color: "#FF7EB6" },
  c2: { id: "c2", name: "קריסטל ציר הזמן", emoji: "⏳", color: "#9B6BFF" },
  c3: { id: "c3", name: "קריסטל הצדק", emoji: "⚖️", color: "#FFC857" },
  c4: { id: "c4", name: "קריסטל הזיכרון", emoji: "💾", color: "#3DDC97" },
  c5: { id: "c5", name: "קריסטל האהבה", emoji: "💎", color: "#FF5BA0" },
};

export const WORLDS: World[] = [
  {
    id: "w1",
    order: 1,
    title: "אימות סוכנת",
    subtitle: "מי את בכלל?",
    theme: "verification",
    emoji: "🛂",
    crystal: CRYSTALS.c1,
    gradient: "from-blush-300 to-grape-300",
    missionIds: ["m1", "m2", "m3"],
  },
  {
    id: "w2",
    order: 2,
    title: "ציר זמן מרגש",
    subtitle: "תיזכרי קצת ברגעים יפים",
    theme: "timeline",
    emoji: "🗺️",
    crystal: CRYSTALS.c2,
    gradient: "from-gold-300 to-blush-300",
    missionIds: ["m4", "m5", "m6"],
  },
  {
    id: "w3",
    order: 3,
    title: "חקירה עכשיו",
    subtitle: "החקירה נפתחת",
    theme: "court",
    emoji: "⚖️",
    crystal: CRYSTALS.c3,
    gradient: "from-grape-400 to-grape-600",
    missionIds: ["m7", "m8", "m9"],
  },
  {
    id: "w4",
    order: 4,
    title: "כמה את זוכרת",
    subtitle: "SYSTEM://memories",
    theme: "retro",
    emoji: "💾",
    crystal: CRYSTALS.c4,
    gradient: "from-emerald-500 to-grape-600",
    missionIds: ["m10", "m11", "m12"],
  },
  {
    id: "w5",
    order: 5,
    title: "הבוס האחרון",
    subtitle: "הסוכן הבעייתי",
    theme: "boss",
    emoji: "🤖",
    crystal: CRYSTALS.c5,
    gradient: "from-ink to-grape-600",
    missionIds: ["m13", "m14", "m15"],
  },
];

export const WORLD_BY_ID: Record<string, World> = Object.fromEntries(
  WORLDS.map((w) => [w.id, w]),
);
