"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore, allComplete } from "@/store/useGameStore";
import { useHydrated } from "@/lib/hooks";
import { StatsBar } from "@/components/hud/StatsBar";
import { Hero } from "./Hero";
import { PathMap } from "@/components/map/PathMap";
import { IntroCutscene } from "./IntroCutscene";
import { AchievementsDialog } from "@/components/achievements/AchievementsDialog";
import { EmergencyButton } from "@/components/easter-eggs/EmergencyButton";
import { Button } from "@/components/ui/Button";
import { MICRO_EGGS } from "@/data/easterEggs";

/** Top-level home experience: intro → map → (vault unlock). */
export function HomeClient() {
  const hydrated = useHydrated();
  const router = useRouter();
  const introSeen = useGameStore((s) => s.introSeen);
  const setIntroSeen = useGameStore((s) => s.setIntroSeen);
  const completed = useGameStore((s) => s.completed);
  const [achOpen, setAchOpen] = useState(false);

  // Avoid hydration flash before persisted state is read.
  if (!hydrated) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-cream">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-5xl"
        >
          🎂
        </motion.div>
      </div>
    );
  }

  const finished = allComplete(completed);

  return (
    <div className="min-h-[100dvh] bg-cream">
      <AnimatePresence>
        {!introSeen && <IntroCutscene onAccept={setIntroSeen} />}
      </AnimatePresence>

      <StatsBar onOpenAchievements={() => setAchOpen(true)} />
      <Hero />

      {finished && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 w-full max-w-md px-4"
        >
          <Button
            size="lg"
            variant="gold"
            className="w-full animate-pulse"
            onClick={() => router.push("/vault")}
          >
            💎 כל הקריסטלים נאספו — פתחי את הכספת!
          </Button>
        </motion.div>
      )}

      <PathMap />

      <footer className="pb-28 text-center text-xs text-ink-soft">
        {MICRO_EGGS.footerHeart}
      </footer>

      <EmergencyButton />
      <AchievementsDialog open={achOpen} onClose={() => setAchOpen(false)} />
    </div>
  );
}
