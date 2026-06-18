"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MINISTRY } from "@/data/easterEggs";
import { useGameStore } from "@/store/useGameStore";
import { useTapCounter } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toaster";

/** Secret level (#8) — The Ministry Of Shili. Reached via the Konami code. */
export default function MinistryPage() {
  const router = useRouter();
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const findEgg = useGameStore((s) => s.findEgg);

  useEffect(() => {
    unlockAchievement("ministry");
    findEgg("ministry");
  }, [unlockAchievement, findEgg]);

  // Hidden: tap the footer 5× → developer room.
  const secretToDev = useTapCounter(5, () => {
    toast("גישה לחדר המפתחים אושרה...", "👩‍💻");
    setTimeout(() => router.push("/devroom"), 700);
  });

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-grape-700 to-ink px-5 pb-16 pt-[calc(env(safe-area-inset-top)+1.5rem)] text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-6xl"
          >
            🏛️
          </motion.div>
          <h1 className="mt-2 text-3xl font-extrabold text-gold-300">{MINISTRY.title}</h1>
          <p className="text-sm text-grape-200">{MINISTRY.subtitle}</p>
          <p className="mt-2 text-xs text-white/60">{MINISTRY.intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {MINISTRY.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <span className="text-xl">{s.emoji}</span>
                {s.label}
              </span>
              <span className="text-end text-sm font-extrabold text-gold-300">{s.value}</span>
            </motion.div>
          ))}
        </div>

        <button
          onClick={secretToDev}
          className="mt-6 block w-full text-center text-xs text-white/50"
        >
          {MINISTRY.footer}
        </button>

        <div className="mt-6">
          <Button variant="gold" className="w-full" onClick={() => router.push("/")}>
            חזרה למסע
          </Button>
        </div>
      </div>
    </div>
  );
}
