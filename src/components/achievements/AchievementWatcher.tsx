"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { ACHIEVEMENT_BY_ID } from "@/data/achievements";
import { burstConfetti, haptic } from "@/lib/effects";

/**
 * Watches the achievements list and plays a celebratory unlock animation
 * whenever a new achievement id appears. Mount once at the root.
 */
export function AchievementWatcher() {
  const achievements = useGameStore((s) => s.achievements);
  const seen = useRef<Set<string> | null>(null);
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    // Initialize baseline on first render so already-earned ones don't replay.
    if (seen.current === null) {
      seen.current = new Set(achievements);
      return;
    }
    const fresh = achievements.filter((a) => !seen.current!.has(a));
    if (fresh.length) {
      fresh.forEach((a) => seen.current!.add(a));
      setQueue((q) => [...q, ...fresh]);
      burstConfetti();
      haptic([10, 40, 10]);
    }
  }, [achievements]);

  const current = queue[0];

  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => setQueue((q) => q.slice(1)), 3400);
    return () => clearTimeout(t);
  }, [current]);

  const ach = current ? ACHIEVEMENT_BY_ID[current] : null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {ach && (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: -30, scale: 0.7, rotate: -6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex items-center gap-3 rounded-3xl border-2 border-gold-400 bg-white px-5 py-3 shadow-soft"
          >
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.25, 1] }}
              transition={{ duration: 0.8, repeat: 1 }}
            >
              {ach.emoji}
            </motion.span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
                הישג חדש!
              </p>
              <p className="text-base font-extrabold text-ink">{ach.title}</p>
              <p className="text-xs text-ink-soft">{ach.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
