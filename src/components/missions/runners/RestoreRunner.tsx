"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { RestoreMission } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { cannonConfetti, haptic } from "@/lib/effects";

interface Props {
  mission: RestoreMission;
  onComplete: (xp: number) => void;
}

/** Mission 15 — dramatic restore cutscene that ticks 0→100%. */
export function RestoreRunner({ mission, onComplete }: Props) {
  const [started, setStarted] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);

  const percent = mission.steps[stepIdx];

  useEffect(() => {
    if (!started || done) return;
    if (stepIdx >= mission.steps.length - 1) {
      haptic([20, 40, 60]);
      cannonConfetti();
      const t = setTimeout(() => setDone(true), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStepIdx((i) => i + 1);
      haptic(15);
    }, 850);
    return () => clearTimeout(t);
  }, [started, stepIdx, done, mission.steps.length]);

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      {!started ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl"
          >
            💎
          </motion.div>
          <p className="text-lg text-white/90">{mission.intro}</p>
          <Button size="lg" variant="gold" onClick={() => setStarted(true)}>
            התחל שחזור
          </Button>
        </>
      ) : !done ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="text-7xl"
          >
            🌀
          </motion.div>
          <p className="font-mono text-xl text-blush-200">משחזר את שילי...</p>
          <motion.p
            key={percent}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-mono text-6xl font-extrabold text-white"
          >
            {percent}%
          </motion.p>
          <div className="h-3 w-full max-w-xs overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full rounded-full bg-gradient-to-l from-blush-400 to-gold-400"
              animate={{ width: `${percent}%` }}
            />
          </div>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-5"
        >
          <div className="text-7xl">✨💎✨</div>
          <p className="text-2xl font-extrabold text-white">{mission.successText}</p>
          <Button size="lg" variant="gold" onClick={() => onComplete(mission.xp)}>
            פתחי את הכספת
          </Button>
        </motion.div>
      )}
    </div>
  );
}
