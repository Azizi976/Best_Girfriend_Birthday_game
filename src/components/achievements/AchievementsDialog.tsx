"use client";

import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { ACHIEVEMENTS } from "@/data/achievements";
import { useGameStore } from "@/store/useGameStore";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Trophy cabinet — shows all achievements, locked ones obscured. */
export function AchievementsDialog({ open, onClose }: Props) {
  const unlocked = useGameStore((s) => s.achievements);
  const count = ACHIEVEMENTS.filter((a) => unlocked.includes(a.id)).length;

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mb-1 text-center text-2xl font-extrabold text-ink">🏆 חדר ההישגים</h2>
      <p className="mb-4 text-center text-sm text-ink-soft">
        {count} / {ACHIEVEMENTS.length} הישגים נפתחו
      </p>
      <div className="grid grid-cols-1 gap-2.5">
        {ACHIEVEMENTS.map((a, i) => {
          const got = unlocked.includes(a.id);
          const hidden = a.secret && !got;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 p-3",
                got
                  ? "border-gold-300 bg-gold-100"
                  : "border-black/5 bg-black/5 opacity-70",
              )}
            >
              <span className={cn("text-3xl", !got && "grayscale")}>
                {hidden ? "❓" : a.emoji}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-ink">{hidden ? "הישג סודי" : a.title}</p>
                <p className="truncate text-xs text-ink-soft">
                  {hidden ? "המשיכי לחקור כדי לגלות..." : a.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Modal>
  );
}
