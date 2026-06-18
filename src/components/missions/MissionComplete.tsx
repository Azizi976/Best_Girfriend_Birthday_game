"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Mission } from "@/lib/types";
import { WORLD_BY_ID } from "@/data/worlds";
import { Button } from "@/components/ui/Button";
import { burstConfetti, cannonConfetti, haptic } from "@/lib/effects";
import { useGameStore } from "@/store/useGameStore";

interface Props {
  mission: Mission;
  earnedXp: number;
  successText: string;
  onContinue: () => void;
}

/** Full-screen celebratory mission-complete screen with XP + crystal anim. */
export function MissionComplete({ mission, earnedXp, successText, onContinue }: Props) {
  const completed = useGameStore((s) => s.completed);
  const world = WORLD_BY_ID[mission.worldId];
  // Did finishing this mission also complete its world (→ crystal earned)?
  const worldDone = world.missionIds.every((id) => completed.includes(id));
  const isLastInWorld = world.missionIds[world.missionIds.length - 1] === mission.id;
  const showCrystal = worldDone && isLastInWorld;

  useEffect(() => {
    haptic([10, 30, 10, 30, 20]);
    if (showCrystal) cannonConfetti();
    else burstConfetti();
  }, [showCrystal]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-cream to-blush-50 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="text-7xl"
      >
        {showCrystal ? world.crystal.emoji : "🎉"}
      </motion.div>

      <div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl font-extrabold text-ink"
        >
          משימה הושלמה!
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-2 max-w-xs text-ink-soft"
        >
          {successText}
        </motion.p>
      </div>

      {/* XP counter */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
        className="flex items-center gap-2 rounded-full bg-gold-100 px-6 py-3 text-2xl font-extrabold text-gold-500 shadow-soft"
      >
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          ⭐
        </motion.span>
        <span>+{earnedXp} XP</span>
      </motion.div>

      {showCrystal && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-white/70 px-5 py-3 text-grape-600 shadow ring-1 ring-grape-100"
        >
          <p className="text-sm font-bold">אספת קריסטל!</p>
          <p className="text-lg font-extrabold">
            {world.crystal.emoji} {world.crystal.name}
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-xs"
      >
        <Button size="lg" className="w-full" onClick={onContinue}>
          המשך
        </Button>
      </motion.div>
    </motion.div>
  );
}
