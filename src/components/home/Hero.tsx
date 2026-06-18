"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { APP, CHARACTERS } from "@/data/story";
import { useTapCounter, useLongPress } from "@/lib/hooks";
import { useGameStore } from "@/store/useGameStore";
import { FbiReport } from "@/components/easter-eggs/FbiReport";
import { LoveNote } from "@/components/easter-eggs/LoveNote";
import { toast } from "@/components/ui/Toaster";
import { haptic } from "@/lib/effects";

/**
 * Home header. Hides two easter eggs:
 *  - Tap the 🎂 logo 10× → secret FBI report (#1)
 *  - Long-press the profile avatar → hidden love note (#5)
 */
export function Hero() {
  const [fbi, setFbi] = useState(false);
  const [note, setNote] = useState(false);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const findEgg = useGameStore((s) => s.findEgg);

  const onLogoTap = useTapCounter(10, () => {
    haptic([10, 30, 10]);
    setFbi(true);
    unlockAchievement("fbi-snoop");
    findEgg("logo-fbi");
  });

  const longPress = useLongPress(() => {
    haptic([10, 40, 10]);
    setNote(true);
    unlockAchievement("lovenote");
    findEgg("love-note");
  }, 650);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 pt-3 text-center">
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => {
            haptic(6);
            onLogoTap();
          }}
          whileTap={{ scale: 0.85, rotate: -10 }}
          className="text-4xl"
          aria-label="לוגו"
        >
          {APP.heroEmoji}
        </motion.button>
        <div className="text-start">
          <h1 className="text-xl font-extrabold leading-none text-ink">{APP.shortTitle}</h1>
          <p className="text-[11px] font-semibold tracking-wide text-ink-soft">
            {APP.subtitle}
          </p>
        </div>
        <motion.button
          {...longPress}
          onClick={() => toast("לחיצה ארוכה מגלה סוד... 🤫", "💡")}
          whileTap={{ scale: 0.9 }}
          aria-label="פרופיל"
          className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blush-300 to-grape-300 text-2xl shadow-soft ring-2 ring-white"
        >
          🦊
        </motion.button>
      </div>

      <FbiReport open={fbi} onClose={() => setFbi(false)} />
      <LoveNote open={note} onClose={() => setNote(false)} />

      <p className="text-xs text-ink-soft">
        סוכנת: <span className="font-bold text-blush-600">{CHARACTERS.agent}</span> · יעד:{" "}
        <span className="font-bold text-grape-600">שחזור הזיכרונות 💾</span>
      </p>
    </div>
  );
}
