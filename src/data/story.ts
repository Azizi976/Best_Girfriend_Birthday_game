/**
 * Global narrative copy + characters.
 * Edit anything here to re-skin the story without touching components.
 */

export const APP = {
  /** Short title (used in HUD / manifest). */
  shortTitle: "מבצע אומולדת",
  /** Full title. */
  title: "מסע אומולדת: מבצע חיים שילי",
  subtitle: "Birthday Quest · Operation Haim Shili",
  heroEmoji: "🎂",
} as const;

export const CHARACTERS = {
  agent: "צ'אפו ליובין",
  partner: "באבו עזיזי",
  realName: "עדי",
} as const;

export const INTRO = {
  badge: "תיק מסווג · רמת סיווג: מסווג אחושר***",
  title: "מבצע אהפה שילי",
  lines: [
    "מערכת הזיכרונות הזוגית של",
    "צ'אפו ליובין ובאבו עזיזי",
    "נפרצה.",
  ],
  body: [
    "זיכרונות חשובים פוזרו על פני ציר הזמן.",
    "בנוסף, הרשויות דיווחו על מבצע גניבה מתמשך וגורף.",
    "החשודה המרכזית: רוחמה מזל תרים.",
    "",
    "הסוכנת עדי נדרשת לשחזר את הזיכרונות האבודים",
    "ולהשיב את מאגר הזוגיות לפעולה — לפני שנגמרת לה האומולדת.",
  ],
  cta: "קבלי את המשימה",
  skip: "כבר ראיתי את זה, קדימה",
} as const;

/** Loading / boot screen tips (cycled). */
export const BOOT_TIPS = [
  "מאתחל את החטיפים...",
  "טוען 97% מהמיטה...",
  "מסנכרן מלאי צ'יפס...",
  "מחמם את השמיכה הגנובה...",
  "סופר כמה פעמים ראית 'חברים'... (אינסוף)",
  "מאתר את המלצר משאטו ד'אור...",
] as const;

export const VAULT = {
  unlockingTitle: "משחזר את אהפה שילי...",
  openedTitle: "הכספת נפתחה",
  message: [
    "חיים שילי,",
    "אני לא צריך להסביר לך כמה אני אוהב אותך",
    "וכמה עברנו ביחד עד לרגע הזה",
    "אל הדירה החדשה שלנו.",
    "דרך כל צחוק וכל זיכרון.",
    "תודה שאת השילי שלי.",
    "יום הולדת שמח ❤️",
  ],
  treasureDetected: "המערכת זיהתה אוצר.",
  treasureHint: "נראה שזה תכשיט.",
  galleryTitle: "גלריית זיכרונות",
  videoTitle: "השיר שלנו",
  giftTitle: "רמז למתנה",
  giftHint: "חפשי משהו קטן, נוצץ, ועוטף את פרק היד שלך. 💍✨",
} as const;
