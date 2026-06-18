import type { Rank } from "@/lib/types";

/** XP needed per level step. Level = floor(xp / XP_PER_LEVEL) + 1. */
export const XP_PER_LEVEL = 100;

/** Named ranks unlocked at level thresholds (Hebrew flavor). */
export const RANKS: Rank[] = [
  { level: 1, title: "בלמז''ית" },
  { level: 3, title: "שותפה שילי" },
  { level: 6, title: "אהפה שילי" },
  { level: 9, title: "ניסיכה שילי" },
  { level: 12, title: "חיים שילי" },
  { level: 15, title: "אישה שילי 👑" },
];

export function levelFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function rankFromLevel(level: number): Rank {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.level) current = r;
  }
  return current;
}

/** Progress (0..1) toward the next level. */
export function levelProgress(xp: number): number {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
}
