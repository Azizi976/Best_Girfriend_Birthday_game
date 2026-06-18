"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ChoiceMission, Choice } from "@/lib/types";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/effects";
import { useSabotage } from "@/components/missions/useSabotage";
import { SabotageOverlay } from "@/components/missions/SabotageOverlay";

interface Props {
  mission: ChoiceMission;
  onComplete: (xp: number) => void;
}

/** Generic single-choice quiz. Supports per-choice feedback + bonus XP. */
export function ChoiceRunner({ mission, onComplete }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { sabotage, onWrong, dismiss } = useSabotage();

  const choose = (c: Choice) => {
    if (picked) return;
    setPicked(c.id);
    if (c.correct) {
      haptic([10, 20, 10]);
      const xp = mission.xp + (c.bonusXp ?? 0);
      if (c.feedback) {
        setFeedback(c.feedback);
        setTimeout(() => onComplete(xp), 1100);
      } else {
        setTimeout(() => onComplete(xp), 450);
      }
    } else {
      onWrong();
      setFeedback(c.feedback ?? "לא מדויק... נסי שוב.");
      setTimeout(() => {
        setPicked(null);
        setFeedback(null);
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {mission.subtitle && (
        <p className="rounded-2xl bg-black/5 px-4 py-2 text-center text-sm font-semibold text-ink-soft">
          {mission.subtitle}
        </p>
      )}
      <p className="text-center text-xl font-bold">{mission.question}</p>

      <div className="mt-2 flex flex-col gap-3">
        {mission.choices.map((c) => {
          const isPicked = picked === c.id;
          const state = isPicked ? (c.correct ? "correct" : "wrong") : "idle";
          return (
            <motion.button
              key={c.id}
              onClick={() => choose(c)}
              whileTap={{ scale: 0.97 }}
              animate={state === "wrong" ? { x: [0, -8, 8, -4, 0] } : {}}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 bg-white px-4 py-4 text-start text-lg font-bold transition",
                state === "idle" && "border-grape-200 text-ink hover:border-blush-300",
                state === "correct" && "border-emerald-400 bg-emerald-50 text-emerald-700",
                state === "wrong" && "border-red-400 bg-red-50 text-red-600",
              )}
            >
              {c.emoji && <span className="text-2xl">{c.emoji}</span>}
              <span>{c.label}</span>
            </motion.button>
          );
        })}
      </div>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-base font-semibold text-grape-600"
        >
          {feedback}
        </motion.p>
      )}

      <SabotageOverlay open={sabotage} onClose={dismiss} />
    </div>
  );
}
