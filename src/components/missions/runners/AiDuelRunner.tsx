"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AiDuelMission, Choice } from "@/lib/types";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/effects";
import { useGameStore } from "@/store/useGameStore";

interface Props {
  mission: AiDuelMission;
  onComplete: (xp: number) => void;
}

/** Mission 13 — duel a smug AI across several questions. */
export function AiDuelRunner({ mission, onComplete }: Props) {
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [defeated, setDefeated] = useState(false);
  const findEgg = useGameStore((s) => s.findEgg);

  const current = mission.questions[q];

  const choose = (c: Choice) => {
    if (picked) return;
    setPicked(c.id);
    if (c.correct) {
      haptic([10, 20, 10]);
      setTimeout(() => {
        if (q + 1 >= mission.questions.length) {
          setDefeated(true);
          findEgg("ai-cries");
          setTimeout(() => onComplete(mission.xp), 1600);
        } else {
          setQ((n) => n + 1);
          setPicked(null);
        }
      }, 650);
    } else {
      haptic([8, 30, 8]);
      setTimeout(() => setPicked(null), 800);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* AI avatar */}
      <motion.div
        animate={defeated ? { rotate: [0, -10, 10, 0], y: [0, 8, 0] } : { y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: defeated ? 0 : Infinity }}
        className="mx-auto flex flex-col items-center"
      >
        <div className="text-6xl">{defeated ? "🤖💧" : "🤖"}</div>
      </motion.div>

      {defeated ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl bg-grape-600 p-5 text-center text-lg font-extrabold text-white"
        >
          “לא... לא יכול להיות... את באמת מכירה אותו הכי טוב.” 😭
        </motion.p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={q}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="flex flex-col gap-4"
          >
            <p className="rounded-2xl bg-grape-700 px-4 py-2 text-center text-sm font-semibold italic text-grape-100">
              🤖 “{current.aiTaunt}”
            </p>
            <p className="text-center text-xl font-extrabold">{current.question}</p>
            <div className="flex flex-col gap-3">
              {current.choices.map((c) => {
                const isPicked = picked === c.id;
                const state = isPicked ? (c.correct ? "correct" : "wrong") : "idle";
                return (
                  <motion.button
                    key={c.id}
                    onClick={() => choose(c)}
                    whileTap={{ scale: 0.97 }}
                    animate={state === "wrong" ? { x: [0, -8, 8, 0] } : {}}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-start text-lg font-bold transition",
                      state === "idle" && "border-grape-300 bg-white/10 text-white",
                      state === "correct" && "border-emerald-400 bg-emerald-500 text-white",
                      state === "wrong" && "border-red-400 bg-red-500/30 text-white",
                    )}
                  >
                    {c.emoji && <span className="text-2xl">{c.emoji}</span>}
                    <span>{c.label}</span>
                  </motion.button>
                );
              })}
            </div>
            <p className="text-center text-xs text-grape-200">
              שאלה {q + 1} מתוך {mission.questions.length}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
