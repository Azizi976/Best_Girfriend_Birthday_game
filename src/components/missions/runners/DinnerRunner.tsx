"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DinnerMission } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { haptic } from "@/lib/effects";

interface Props {
  mission: DinnerMission;
  onComplete: (xp: number) => void;
}

/** Mission 9 — dinner crisis simulator. Every answer eventually fails. */
export function DinnerRunner({ mission, onComplete }: Props) {
  const [round, setRound] = useState(0);
  const [rejection, setRejection] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const pick = () => {
    haptic([6, 20, 6]);
    setRejection(mission.rounds[round].rejection);
    setTimeout(() => {
      setRejection(null);
      if (round + 1 >= mission.rounds.length) {
        setDone(true);
      } else {
        setRound((r) => r + 1);
      }
    }, 900);
  };

  const current = mission.rounds[round];

  return (
    <div className="flex flex-col gap-5">
      {/* Clock */}
      <div className="mx-auto rounded-2xl bg-ink px-6 py-3 text-center font-mono text-3xl font-bold text-blush-300 shadow-soft">
        {mission.clock}
      </div>

      {!done ? (
        <>
          <p className="text-center text-ink-soft">{mission.intro}</p>

          <AnimatePresence mode="wait">
            {rejection ? (
              <motion.div
                key="reject"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-blush-100 p-5 text-center text-lg font-bold text-blush-700"
              >
                {rejection}
              </motion.div>
            ) : (
              <motion.div
                key={`round-${round}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="flex flex-col gap-4"
              >
                <p className="text-center text-xl font-extrabold text-ink">
                  💬 {current.question}
                </p>
                <div className="flex flex-col gap-3">
                  {current.options.map((o, i) => (
                    <Button key={i} variant="secondary" size="lg" onClick={pick}>
                      {o}
                    </Button>
                  ))}
                </div>
                <p className="text-center text-xs text-ink-soft">
                  סבב {round + 1} מתוך {mission.rounds.length} · רעב גובר 🍽️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 rounded-3xl bg-ink p-6 text-center text-white"
        >
          <div className="text-5xl">🍽️</div>
          <p className="whitespace-pre-line text-lg font-extrabold leading-relaxed">
            {mission.finalText}
          </p>
          <Button size="lg" className="w-full" onClick={() => onComplete(mission.xp)}>
            (להזמין מחר)
          </Button>
        </motion.div>
      )}
    </div>
  );
}
