"use client";

import { useCallback, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { haptic } from "@/lib/effects";

/**
 * Shared wrong-answer handler. After 3 wrong answers in a row it surfaces
 * the "ה-AI חושד בחבלה" easter egg (#4). Returns a flag + dismiss fn.
 */
export function useSabotage() {
  const registerWrong = useGameStore((s) => s.registerWrong);
  const findEgg = useGameStore((s) => s.findEgg);
  const [sabotage, setSabotage] = useState(false);

  const onWrong = useCallback(() => {
    haptic([8, 40, 8]);
    const streak = registerWrong();
    if (streak >= 3) {
      setSabotage(true);
      findEgg("sabotage");
    }
  }, [registerWrong, findEgg]);

  const dismiss = useCallback(() => setSabotage(false), []);

  return { sabotage, onWrong, dismiss };
}
