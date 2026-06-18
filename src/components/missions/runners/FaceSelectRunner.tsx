"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FaceSelectMission } from "@/lib/types";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/effects";
import { useSabotage } from "@/components/missions/useSabotage";
import { SabotageOverlay } from "@/components/missions/SabotageOverlay";

interface Props {
  mission: FaceSelectMission;
  onComplete: (xp: number) => void;
}

/** Mission 14 — choose the face that always makes Adi laugh. */
export function FaceSelectRunner({ mission, onComplete }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const { sabotage, onWrong, dismiss } = useSabotage();

  const choose = (id: string, correct?: boolean) => {
    if (picked) return;
    if (correct) {
      haptic([10, 20, 10]);
      setPicked(id);
      setTimeout(() => onComplete(mission.xp), 800);
    } else {
      haptic([8, 30, 8]);
      onWrong();
      setPicked(id);
      setTimeout(() => setPicked(null), 600);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-xl font-bold">{mission.question}</p>

      <div className="grid grid-cols-3 gap-3">
        {mission.faces.map((f) => {
          const isPicked = picked === f.id;
          const state = isPicked ? (f.correct ? "correct" : "wrong") : "idle";
          return (
            <motion.button
              key={f.id}
              onClick={() => choose(f.id, f.correct)}
              whileTap={{ scale: 0.92 }}
              animate={
                state === "correct"
                  ? { scale: [1, 1.25, 1.1] }
                  : state === "wrong"
                    ? { x: [0, -6, 6, 0] }
                    : {}
              }
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-1 rounded-3xl border-2 bg-white transition",
                state === "idle" && "border-grape-200 hover:border-blush-300",
                state === "correct" && "border-emerald-400 bg-emerald-50",
                state === "wrong" && "border-red-300 bg-red-50",
              )}
            >
              <span className="text-4xl">{f.emoji}</span>
              <span className="text-[10px] font-bold text-ink-soft">{f.label}</span>
            </motion.button>
          );
        })}
      </div>

      <p className="text-center text-sm text-ink-soft">רמז: זה הפרצוף שאתה עושה והיא לא יכולה לעצור לצחוק. 🤨</p>

      <SabotageOverlay open={sabotage} onClose={dismiss} />
    </div>
  );
}
