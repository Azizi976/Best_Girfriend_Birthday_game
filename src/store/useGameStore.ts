"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MISSIONS, MISSION_BY_ID, TOTAL_MISSIONS } from "@/data/missions";
import { WORLDS } from "@/data/worlds";
import { levelFromXp } from "@/data/levels";

/**
 * Single source of truth for all game progress.
 * Persisted to localStorage so progress survives reloads & works offline.
 */

export interface GameState {
  /** Whether the intro cutscene has been viewed. */
  introSeen: boolean;
  /** Completed mission ids. */
  completed: string[];
  /** Total XP. */
  xp: number;
  /** Collected crystal ids. */
  crystals: string[];
  /** Unlocked achievement ids. */
  achievements: string[];
  /** Discovered easter-egg ids (dedup set as array). */
  eggs: string[];
  /** Consecutive wrong answers (drives the "sabotage" easter egg). */
  wrongStreak: number;
  /** Whether the final vault has been opened. */
  vaultOpened: boolean;

  // ── actions ──
  setIntroSeen: () => void;
  completeMission: (missionId: string, earnedXp: number) => void;
  unlockAchievement: (id: string) => boolean;
  findEgg: (id: string) => boolean;
  addXp: (amount: number) => void;
  registerWrong: () => number;
  resetWrong: () => void;
  openVault: () => void;
  resetAll: () => void;

  // ── selectors (computed via helpers below) ──
}

const FIRST_MISSION = MISSIONS[0].id;

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      introSeen: false,
      completed: [],
      xp: 0,
      crystals: [],
      achievements: [],
      eggs: [],
      wrongStreak: 0,
      vaultOpened: false,

      setIntroSeen: () => set({ introSeen: true }),

      completeMission: (missionId, earnedXp) => {
        const state = get();
        if (state.completed.includes(missionId)) return;

        const mission = MISSION_BY_ID[missionId];
        const completed = [...state.completed, missionId];

        // Award the world crystal if this finishes the world.
        const world = WORLDS.find((w) => w.id === mission.worldId);
        let crystals = state.crystals;
        if (world && world.missionIds.every((id) => completed.includes(id))) {
          if (!crystals.includes(world.crystal.id)) {
            crystals = [...crystals, world.crystal.id];
          }
        }

        // Mission-bound achievement.
        let achievements = state.achievements;
        if (mission.achievementId && !achievements.includes(mission.achievementId)) {
          achievements = [...achievements, mission.achievementId];
        }
        // Crystal hoarder achievement.
        if (crystals.length === WORLDS.length && !achievements.includes("crystal-hoarder")) {
          achievements = [...achievements, "crystal-hoarder"];
        }

        set({
          completed,
          xp: state.xp + earnedXp,
          crystals,
          achievements,
          wrongStreak: 0,
        });
      },

      unlockAchievement: (id) => {
        const state = get();
        if (state.achievements.includes(id)) return false;
        set({ achievements: [...state.achievements, id] });
        return true;
      },

      findEgg: (id) => {
        const state = get();
        if (state.eggs.includes(id)) return false;
        const eggs = [...state.eggs, id];
        const patch: Partial<GameState> = { eggs };
        // Curiosity achievement at 10 eggs.
        if (eggs.length >= 10 && !state.achievements.includes("curious-cat")) {
          patch.achievements = [...state.achievements, "curious-cat"];
        }
        set(patch);
        return true;
      },

      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),

      registerWrong: () => {
        const next = get().wrongStreak + 1;
        set({ wrongStreak: next });
        return next;
      },

      resetWrong: () => set({ wrongStreak: 0 }),

      openVault: () => set({ vaultOpened: true }),

      resetAll: () =>
        set({
          introSeen: false,
          completed: [],
          xp: 0,
          crystals: [],
          achievements: [],
          eggs: [],
          wrongStreak: 0,
          vaultOpened: false,
        }),
    }),
    {
      name: "operation-shili-v1",
      version: 1,
    },
  ),
);

// ───────────────────────── derived selectors ─────────────────────────

/** Is a mission unlocked (previous mission completed or it's the first)? */
export function isMissionUnlocked(missionId: string, completed: string[]): boolean {
  if (missionId === FIRST_MISSION) return true;
  const idx = MISSIONS.findIndex((m) => m.id === missionId);
  if (idx <= 0) return true;
  return completed.includes(MISSIONS[idx - 1].id);
}

export type NodeStatus = "completed" | "current" | "locked";

export function missionStatus(missionId: string, completed: string[]): NodeStatus {
  if (completed.includes(missionId)) return "completed";
  if (isMissionUnlocked(missionId, completed)) return "current";
  return "locked";
}

export function progressPercent(completed: string[]): number {
  return Math.round((completed.length / TOTAL_MISSIONS) * 100);
}

export function allComplete(completed: string[]): boolean {
  return completed.length >= TOTAL_MISSIONS;
}

export function currentLevel(xp: number): number {
  return levelFromXp(xp);
}
