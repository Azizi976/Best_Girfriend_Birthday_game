import type { Achievement } from "@/lib/types";

/**
 * Achievement catalogue. `id` values are referenced by missions and
 * easter-egg triggers. Secret achievements stay hidden until unlocked.
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "blanket-criminal",
    title: "פושעת השמיכות",
    description: "הודית בגניבת שמיכה מדרגה ראשונה.",
    emoji: "🛏️",
  },
  {
    id: "chips-investigator",
    title: "חוקרת צ'יפס",
    description: "מיינת נכון את כל הקינוחים שעדי באמת רוצה.",
    emoji: "🍟",
  },
  {
    id: "friends-survivor",
    title: "שורדת חברים",
    description: "ראית את 'חברים' אינסוף פעמים ושרדת.",
    emoji: "☕",
  },
  {
    id: "memory-master",
    title: "מומחית לשחזור זכרונות",
    description: "הבסת את הבינה המלאכותית בדו-קרב ידע.",
    emoji: "🧠",
  },
  {
    id: "bed-queen",
    title: "מלכת המיטה",
    description: "כיבשת 97% מהמיטה באופן רשמי.",
    emoji: "👑",
  },
  {
    id: "legendary-shili",
    title: "שילי האגדית",
    description: "שחזרת את כל הזיכרונות ופתחת את הכספת.",
    emoji: "💎",
  },
  // ── Secret / easter-egg achievements ──
  {
    id: "fbi-snoop",
    title: "סוכנת חשאית",
    description: "מצאת את תיק ה-FBI הסודי.",
    emoji: "🕵️",
    secret: true,
  },
  {
    id: "konami",
    title: "קוד עתיק",
    description: "הקלדת את הקוד שאף אחד לא היה אמור לזכור.",
    emoji: "🎮",
    secret: true,
  },
  {
    id: "ministry",
    title: "עובדת משרד השילי",
    description: "נכנסת למשרד הסודי של שילי.",
    emoji: "🏛️",
    secret: true,
  },
  {
    id: "hugger",
    title: "מחבקת מקצועית",
    description: "הפעלת את כפתור החירום לחיבוק.",
    emoji: "🫂",
    secret: true,
  },
  {
    id: "lovenote",
    title: "פותחת לבבות",
    description: "מצאת את הפתק הסודי מאחורי התמונה.",
    emoji: "💌",
    secret: true,
  },
  {
    id: "devroom",
    title: "האקרית",
    description: "פרצת לחדר המפתחים.",
    emoji: "👩‍💻",
    secret: true,
  },
  {
    id: "crystal-hoarder",
    title: "אספנית קריסטלים",
    description: "אספת את כל חמשת הקריסטלים.",
    emoji: "🔮",
    secret: true,
  },
  {
    id: "curious-cat",
    title: "סקרנית כרונית",
    description: "מצאת 10 ביצי פסחא. מי את, בלשית?",
    emoji: "🐱",
    secret: true,
  },
];

export const ACHIEVEMENT_BY_ID: Record<string, Achievement> = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a]),
);
