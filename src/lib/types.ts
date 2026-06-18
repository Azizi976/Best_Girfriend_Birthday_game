/**
 * Core domain types for "מבצע שילי".
 *
 * Missions use a discriminated union on `kind` so that the mission renderer
 * can switch on the kind and render the matching interactive component while
 * keeping everything fully type-safe.
 *
 * All user-facing strings live in the data layer (src/data), never in
 * component logic — so the texts can be edited without touching components.
 */

export type WorldId = "w1" | "w2" | "w3" | "w4" | "w5";

export type WorldTheme =
  | "verification" // World 1 — clean agent terminal
  | "timeline" // World 2 — sepia memory archive
  | "court" // World 3 — courtroom
  | "retro" // World 4 — retro hacker green-on-black
  | "boss"; // World 5 — rogue AI

export interface World {
  id: WorldId;
  order: number;
  /** Hebrew world title shown on the banner. */
  title: string;
  /** Short Hebrew subtitle / flavor line. */
  subtitle: string;
  theme: WorldTheme;
  /** Emoji used as the banner glyph. */
  emoji: string;
  /** Crystal awarded for completing the world. */
  crystal: Crystal;
  /** Tailwind gradient class pair for the banner background. */
  gradient: string;
  missionIds: string[];
}

export interface Crystal {
  id: string;
  name: string;
  emoji: string;
  /** hex color used in collection animation */
  color: string;
}

/** A single selectable answer option. */
export interface Choice {
  id: string;
  label: string;
  /** When chosen, mark the mission solved. */
  correct?: boolean;
  /** Optional special feedback shown when this choice is picked. */
  feedback?: string;
  /** Extra XP granted for this specific choice (e.g. "אשמה מאוד"). */
  bonusXp?: number;
  /** Emoji rendered alongside the choice. */
  emoji?: string;
}

export type MissionKind =
  | "codeword"
  | "choice"
  | "map"
  | "courtroom"
  | "dinner"
  | "dragdrop"
  | "aiduel"
  | "faceselect"
  | "restore";

interface MissionBase {
  id: string;
  worldId: WorldId;
  /** Global order on the progression map (1..15). */
  order: number;
  /** Short Hebrew title shown on the node tooltip / mission header. */
  title: string;
  /** English code name (for flavor, shown small). */
  codename: string;
  xp: number;
  kind: MissionKind;
  /** Optional achievement id unlocked when this mission completes. */
  achievementId?: string;
}

/** Mission 1 — text/code-word login. */
export interface CodewordMission extends MissionBase {
  kind: "codeword";
  prompt: string;
  /** Accepted answers (normalized, case/space-insensitive). */
  answers: string[];
  placeholder: string;
  successText: string;
  hint?: string;
}

/** Generic single-choice quiz mission. */
export interface ChoiceMission extends MissionBase {
  kind: "choice";
  question: string;
  /** Optional extra flavor line under the question. */
  subtitle?: string;
  choices: Choice[];
  successText: string;
}

/** Mission 4 — map interaction. */
export interface MapMission extends MissionBase {
  kind: "map";
  question: string;
  city: string;
  place: string;
  /** Pins shown on the stylized map; one is correct. */
  pins: { id: string; label: string; x: number; y: number; correct?: boolean }[];
  successText: string;
}

/** Mission 7 — courtroom. */
export interface CourtroomMission extends MissionBase {
  kind: "courtroom";
  prosecutor: string;
  defendant: string;
  charge: string;
  intro: string;
  choices: Choice[];
  verdictText: string;
}

/** Mission 9 — dinner crisis simulator. */
export interface DinnerMission extends MissionBase {
  kind: "dinner";
  clock: string;
  intro: string;
  /** Each round: a question and player options that all eventually fail. */
  rounds: { question: string; options: string[]; rejection: string }[];
  finalText: string;
}

/** Mission 11 — drag & drop classification. */
export interface DragDropMission extends MissionBase {
  kind: "dragdrop";
  intro: string;
  buckets: { id: string; label: string; emoji: string }[];
  items: { id: string; label: string; emoji: string; correctBucket: string }[];
  successText: string;
}

/** Mission 13 — AI duel (multiple questions). */
export interface AiDuelMission extends MissionBase {
  kind: "aiduel";
  intro: string;
  questions: { question: string; choices: Choice[]; aiTaunt: string }[];
  successText: string;
}

/** Mission 14 — choose the face. */
export interface FaceSelectMission extends MissionBase {
  kind: "faceselect";
  question: string;
  faces: { id: string; emoji: string; label: string; correct?: boolean }[];
  successText: string;
}

/** Mission 15 — restore cutscene. */
export interface RestoreMission extends MissionBase {
  kind: "restore";
  intro: string;
  steps: number[];
  successText: string;
}

export type Mission =
  | CodewordMission
  | ChoiceMission
  | MapMission
  | CourtroomMission
  | DinnerMission
  | DragDropMission
  | AiDuelMission
  | FaceSelectMission
  | RestoreMission;

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  /** Hidden achievements are not shown until unlocked. */
  secret?: boolean;
}

export interface Rank {
  level: number;
  title: string;
}
