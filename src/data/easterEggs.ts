/**
 * Centralized easter-egg content. 40+ hidden surprises live here.
 * Triggers are wired in components/hooks; the *text* all lives in this file.
 */

/** 1. Tap the logo 10× → secret FBI report. */
export const FBI_REPORT = {
  title: "דו\"ח FBI · מסווג ביותר",
  subject: "נושא: עדי (הידועה גם כ'שילי')",
  crimesTitle: "פשעים מתועדים:",
  crimes: [
    "גניבת שמיכה",
    "התמכרות לחברים",
    "צריכה מוגזמת של קינוחים",
    "כיבוש 97% מהמיטה",
    "גניבת צ'יפס מצלחת לא שלה",
    "אמירת 'עוד חמש דקות' (שקר)",
  ],
  threatTitle: "רמת איום:",
  threatStars: 5,
  recommendationTitle: "המלצה:",
  recommendation: "תן לה חיבוק.",
} as const;

/** 2. Hidden emergency button. */
export const EMERGENCY = {
  buttonLabel: "חירום",
  title: "🚨 מצב חירום 🚨",
  message: "דחוף. לחבק את החבר מיד.",
  confirm: "מחבקת עכשיו",
} as const;

/** 3. Random toasts that appear occasionally. */
export const RANDOM_TOASTS = [
  "עובדה מעניינת: עדי חמודה.",
  "מזכיר לך: את 97% מהמיטה.",
  "המערכת אוהבת אותך. בשקט.",
  "צ'יפס לא נספר אם אכלת אותו מהצלחת של מישהו אחר.",
  "עדכון: עזיזי עדיין מאוהב.",
  "טיפ: כיווץ גבות מצחיק תמיד.",
  "נמצאה שמיכה. שוב בצד שלך.",
  "האם ידעת? 'חברים' לא נגמרת לעולם.",
  "סטטוס מיטה: כבושה.",
  "נא לא להאכיל את ה-AI אחרי חצות.",
] as const;

/** 4. Too many wrong answers in a row. */
export const SABOTAGE = {
  title: "⚠️ אזהרת מערכת",
  message: "ה-AI חושד בחבלה.",
} as const;

/** 5. Long-press profile image → hidden love note. */
export const LOVE_NOTE = {
  title: "פתק סודי 💌",
  lines: [
    "אם הגעת עד לפה,",
    "סימן שאת סקרנית כמו שאני אוהב.",
    "כל פיקסל פה נבנה כי את שווה כל שנייה.",
    "אני אוהב אותך, שילי שלי.",
  ],
} as const;

/** 7 & 8. Konami code → secret level: Ministry of Shili. */
export const MINISTRY = {
  title: "משרד השילי",
  subtitle: "The Ministry Of Shili · מחלקת סטטיסטיקה",
  intro: "נתונים רשמיים (בערך). כל הזכויות שמורות לעדי.",
  stats: [
    { label: "כמות הצ'יפס שנגנב (מוערך)", value: "14,902 חתיכות", emoji: "🍟" },
    { label: "כמות השמיכות שנכבשו", value: "כל השמיכות", emoji: "🛏️" },
    { label: "שעות צפייה ב'חברים'", value: "∞ שעות", emoji: "☕" },
    { label: "אחוז שליטה במיטה", value: "97%", emoji: "👑" },
    { label: "פעמים שנאמר 'עוד חמש דקות'", value: "2,310", emoji: "⏰" },
    { label: "רמת חמידות", value: "מעבר לקנה המידה", emoji: "💗" },
    { label: "חיבוקים שנותרו לחלק", value: "אינסוף מינוס אפס", emoji: "🫂" },
    { label: "קינוחים בהמתנה", value: "תמיד עוד אחד", emoji: "🍰" },
  ],
  footer: "המשרד נסגר לעולם לא. כי שילי לנצח.",
} as const;

/** 9. Fake 404. */
export const NOT_FOUND = {
  code: "404",
  title: "זוהה זיכרון אבוד.",
  body: "הדף הזה פוזר אי שם בציר הזמן. ננסה לשחזר אותו מאוחר יותר.",
  cta: "חזרה למסע",
} as const;

/** 10. Developer room — absurd fake debug logs. */
export const DEV_ROOM = {
  title: "חדר המפתחים",
  subtitle: "// access granted · debug console",
  logs: [
    "[ERROR] זוהתה יותר מדי חמידות.",
    "[WARN] רמת הצ'יפס במלאי קריטית.",
    "[INFO] שמיכה הועברה ל-100% צד שמאל.",
    "[DEBUG] טוען זיכרון: שאטו ד'אור... OK",
    "[ERROR] חיבוק לא נמצא. מנסה שוב...",
    "[INFO] 'חברים' עונה 4 פרק 12 נטען בהצלחה.",
    "[FATAL] לב עלה על גדותיו (overflow).",
    "[WARN] עזיזi מאוהב מדי. ממשיך בכל זאת.",
    "[DEBUG] גיזה: pyramid.load() ... done",
    "[INFO] תאילנד: סנכרון זיכרונות חוף הושלם.",
    "[ERROR] לא ניתן לחשב כמה אני אוהב אותך. NaN.",
    "[OK] מבצע שילי פעיל. סטטוס: לנצח.",
  ],
} as const;

/** Misc one-liners surfaced by smaller eggs. */
export const MICRO_EGGS = {
  shakeToConfetti: "ניענעת את העולם. הנה קונפטי. 🎉",
  tripleTapXp: "מצאת XP נסתר! +20",
  secretCrystal: "קריסטל סקרנות נוסף לאוסף שלך. 🔮",
  footerHeart: "נבנה עם ❤️ בשביל עדי",
  consoleHello: "👀 מה את עושה פה? לכי תשחקי. (אבל יפה שאת סקרנית)",
} as const;

/** Long list powering the "find 40+ eggs" promise & counter. */
export const EGG_IDS = [
  "logo-fbi",
  "emergency-hug",
  "random-toast",
  "sabotage",
  "love-note",
  "konami",
  "ministry",
  "fake-404",
  "dev-room",
  "shake-confetti",
  "triple-tap-xp",
  "secret-crystal",
  "console-hello",
  "footer-heart",
  "waiter-close-enough",
  "fbi-denies",
  "boot-tips",
  "chips-counter",
  "blanket-bonus",
  "ai-cries",
  "97-percent",
  "five-more-minutes",
  "friends-infinite",
  "wardrobe-forever",
  "dinner-nothing",
  "brow-face",
  "hidden-heart-tap",
  "long-press-profile",
  "vault-jewel",
  "treasure-detected",
  "crystal-hoarder",
  "rank-up",
  "level-99-dream",
  "shili-everywhere",
  "matchmaker-shiri",
  "thailand-pin",
  "giza-pin",
  "secret-achievements",
  "curious-cat",
  "double-tap-crystal",
  "dev-konami-combo",
  "midnight-ai",
] as const;

export const TOTAL_EGGS = EGG_IDS.length;
