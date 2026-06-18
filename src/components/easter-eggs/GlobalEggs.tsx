"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKonami, useShake } from "@/lib/hooks";
import { useGameStore } from "@/store/useGameStore";
import { toast } from "@/components/ui/Toaster";
import { burstConfetti } from "@/lib/effects";
import { RANDOM_TOASTS, MICRO_EGGS } from "@/data/easterEggs";
import { sample } from "@/lib/utils";

/**
 * Globally-active easter eggs (mounted once in the root layout):
 *  - Konami code → unlocks & navigates to the secret Ministry of Shili (#7,#8)
 *  - Random fun-fact toasts every ~45s (#3)
 *  - Shake device → confetti (#10 micro)
 *  - Console greeting (#13 micro)
 */
export function GlobalEggs() {
  const router = useRouter();
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const findEgg = useGameStore((s) => s.findEgg);

  // Konami → Ministry
  useKonami(() => {
    unlockAchievement("konami");
    findEgg("konami");
    toast("קוד הקסם זוהה! פותח את משרד השילי...", "🎮");
    setTimeout(() => router.push("/ministry"), 900);
  });

  // Shake → confetti
  useShake(() => {
    if (findEgg("shake-confetti")) toast(MICRO_EGGS.shakeToConfetti);
    burstConfetti();
  });

  // Random fun-fact toasts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.5) {
        toast(sample(RANDOM_TOASTS), "💗");
        findEgg("random-toast");
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [findEgg]);

  // Console greeting
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `%c${MICRO_EGGS.consoleHello}`,
      "color:#FF5BA0;font-size:16px;font-weight:bold;",
    );
    // eslint-disable-next-line no-console
    console.log("%c💡 רמז: נסי את קוד קונאמי. ↑↑↓↓←→←→ב א", "color:#9B6BFF;");
  }, []);

  return null;
}
