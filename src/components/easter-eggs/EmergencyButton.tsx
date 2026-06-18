"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EMERGENCY } from "@/data/easterEggs";
import { useGameStore } from "@/store/useGameStore";
import { heartConfetti, haptic } from "@/lib/effects";

/**
 * Easter egg #2 — a small, easy-to-miss emergency button floating in the
 * corner. Tapping it demands an immediate hug.
 */
export function EmergencyButton() {
  const [open, setOpen] = useState(false);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const findEgg = useGameStore((s) => s.findEgg);

  const trigger = () => {
    haptic([20, 30, 20]);
    setOpen(true);
    findEgg("emergency-hug");
    unlockAchievement("hugger");
  };

  return (
    <>
      <motion.button
        onClick={trigger}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        aria-label={EMERGENCY.buttonLabel}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] start-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-red-500 text-xl text-white shadow-soft ring-4 ring-red-200"
      >
        🚨
      </motion.button>

      <Modal open={open} onClose={() => setOpen(false)} className="text-center">
        <div className="mb-3 text-6xl">🫂</div>
        <h3 className="mb-2 text-2xl font-extrabold text-red-500">{EMERGENCY.title}</h3>
        <p className="mb-5 text-lg font-bold text-ink">{EMERGENCY.message}</p>
        <Button
          variant="danger"
          className="w-full"
          onClick={() => {
            heartConfetti();
            haptic([10, 30, 10, 30, 40]);
            setOpen(false);
          }}
        >
          {EMERGENCY.confirm}
        </Button>
      </Modal>
    </>
  );
}
