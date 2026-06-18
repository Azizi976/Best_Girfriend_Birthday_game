"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useGameStore, progressPercent, currentLevel } from "@/store/useGameStore";
import { rankFromLevel, levelProgress } from "@/data/levels";
import { WORLDS } from "@/data/worlds";
import { Progress } from "@/components/ui/Progress";

interface Props {
  onOpenAchievements: () => void;
}

/** Sticky top HUD: level, XP, crystals, progress. */
export function StatsBar({ onOpenAchievements }: Props) {
  const xp = useGameStore((s) => s.xp);
  const completed = useGameStore((s) => s.completed);
  const crystals = useGameStore((s) => s.crystals);

  const level = currentLevel(xp);
  const rank = rankFromLevel(level);
  const percent = progressPercent(completed);

  return (
    <div className="sticky top-0 z-30 bg-cream/85 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.6rem)] backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2">
        {/* Level badge */}
        <div className="flex items-center gap-2">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-grape-400 to-blush-500 text-lg font-extrabold text-white shadow-soft"
          >
            {level}
          </motion.div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
              דרגה
            </p>
            <p className="text-sm font-extrabold text-ink">{rank.title}</p>
          </div>
        </div>

        {/* XP + crystals + trophies */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-gold-100 px-2.5 py-1 text-sm font-bold text-gold-500">
            <span>⭐</span>
            <span className="tabular-nums">{xp}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-grape-50 px-2.5 py-1 text-sm font-bold text-grape-500">
            <span>🔮</span>
            <span className="tabular-nums">
              {crystals.length}/{WORLDS.length}
            </span>
          </div>
          <button
            onClick={onOpenAchievements}
            aria-label="הישגים"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-gold-500 shadow ring-1 ring-gold-200 transition active:scale-90"
          >
            <Trophy size={18} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-auto mt-2 flex max-w-md items-center gap-2">
        <Progress value={percent / 100} className="h-2.5" />
        <span className="w-10 text-end text-xs font-bold tabular-nums text-ink-soft">
          {percent}%
        </span>
      </div>

      {/* Crystal tray */}
      <div className="mx-auto mt-2 flex max-w-md items-center justify-center gap-1.5">
        {WORLDS.map((w) => {
          const got = crystals.includes(w.crystal.id);
          return (
            <motion.span
              key={w.crystal.id}
              animate={got ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5 }}
              title={w.crystal.name}
              className={got ? "text-lg" : "text-lg opacity-25 grayscale"}
            >
              {w.crystal.emoji}
            </motion.span>
          );
        })}
        <span
          className="ms-1 text-lg opacity-20"
          title="Level 1 — חברה חדשה · level progress hidden egg"
        >
          {/* tiny level-progress dot */}
        </span>
        <div className="ms-1 h-1.5 w-10 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-blush-400"
            style={{ width: `${levelProgress(xp) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
