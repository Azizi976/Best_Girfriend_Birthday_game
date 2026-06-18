"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore, allComplete } from "@/store/useGameStore";
import { useHydrated } from "@/lib/hooks";
import { VAULT } from "@/data/story";
import { Button } from "@/components/ui/Button";
import { cannonConfetti, heartConfetti, haptic } from "@/lib/effects";

/** Stand-in memory cards. Replace emoji/captions with real <img> when ready. */
const GALLERY = [
  { emoji: "🥖", caption: "שאטו ד'אור · הדייט הראשון" },
  { emoji: "🛻", caption: "תקרית המשאית המפורסמת" },
  { emoji: "🍝", caption: "ארוחת הערב עם השותפים" },
  { emoji: "🏜️", caption: "גיזה" },
  { emoji: "🏝️", caption: "תאילנד" },
  { emoji: "☕", caption: "מרתון 'חברים'" },
];

type Phase = "locked" | "opening" | "open";

export function VaultClient() {
  const hydrated = useHydrated();
  const router = useRouter();
  const completed = useGameStore((s) => s.completed);
  const openVault = useGameStore((s) => s.openVault);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const findEgg = useGameStore((s) => s.findEgg);
  const resetAll = useGameStore((s) => s.resetAll);
  const [phase, setPhase] = useState<Phase>("locked");
  const [confirmReset, setConfirmReset] = useState(false);

  const finished = hydrated && allComplete(completed);

  useEffect(() => {
    if (phase === "open") {
      openVault();
      unlockAchievement("legendary-shili");
      findEgg("vault-jewel");
      cannonConfetti();
      haptic([20, 40, 20, 40, 60]);
    }
  }, [phase, openVault, unlockAchievement, findEgg]);

  if (!hydrated) {
    return <div className="grid min-h-[100dvh] place-items-center bg-ink text-4xl">💎</div>;
  }

  // Guard: if the player hasn't finished, gently send them back.
  if (!finished) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-5 bg-gradient-to-b from-ink to-grape-700 px-8 text-center text-white">
        <div className="text-6xl">🔒</div>
        <p className="text-lg font-bold">הכספת עדיין נעולה.</p>
        <p className="text-sm text-white/70">צריך לאסוף את כל חמשת הקריסטלים קודם.</p>
        <Button variant="gold" onClick={() => router.push("/")}>
          חזרה למסע
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-ink via-grape-700 to-grape-600 px-5 pb-16 pt-[calc(env(safe-area-inset-top)+1.5rem)] text-white">
      <AnimatePresence mode="wait">
        {phase !== "open" ? (
          <motion.div
            key="vault-door"
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex min-h-[80vh] flex-col items-center justify-center gap-8 text-center"
          >
            <motion.div
              animate={
                phase === "opening"
                  ? { rotate: [0, -8, 8, -12, 12, 0], scale: [1, 1.05, 1] }
                  : { scale: [1, 1.04, 1] }
              }
              transition={{ duration: phase === "opening" ? 1.2 : 2.5, repeat: phase === "opening" ? 0 : Infinity }}
              className="relative grid h-56 w-56 place-items-center rounded-full border-8 border-gold-400 bg-gradient-to-br from-grape-600 to-ink shadow-glow"
            >
              <div className="absolute inset-4 rounded-full border-4 border-dashed border-gold-300/50" />
              <span className="text-7xl">{phase === "opening" ? "🔓" : "🔐"}</span>
            </motion.div>

            {phase === "locked" ? (
              <>
                <h1 className="text-2xl font-extrabold">הכספת הסודית</h1>
                <p className="max-w-xs text-white/80">
                  כל הזיכרונות שוחזרו. הגיע הרגע לפתוח את האוצר.
                </p>
                <Button
                  size="lg"
                  variant="gold"
                  onClick={() => {
                    haptic(30);
                    setPhase("opening");
                    setTimeout(() => setPhase("open"), 1500);
                  }}
                >
                  🔓 פתחי את הכספת
                </Button>
              </>
            ) : (
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-mono text-lg text-gold-300"
              >
                {VAULT.unlockingTitle}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="vault-open"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex max-w-md flex-col gap-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl"
              >
                ✨💝✨
              </motion.div>
              <h1 className="mt-2 text-3xl font-extrabold text-gold-300">
                {VAULT.openedTitle}
              </h1>
            </div>

            {/* Birthday message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl bg-white/95 p-6 text-center text-ink shadow-soft"
            >
              {VAULT.message.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.25 }}
                  className="text-lg font-bold leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Gallery */}
            <section>
              <h2 className="mb-3 text-center text-lg font-extrabold text-gold-200">
                📸 {VAULT.galleryTitle}
              </h2>
              <div className="grid grid-cols-3 gap-2.5">
                {GALLERY.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-blush-300 to-grape-400 p-2 text-center shadow"
                  >
                    <span className="text-3xl">{g.emoji}</span>
                    <span className="text-[9px] font-bold leading-tight text-white">
                      {g.caption}
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-2 text-center text-[10px] text-white/50">
                (החליפי את הקלפים בתמונות אמיתיות בקובץ VaultClient.tsx)
              </p>
            </section>

            {/* Song section */}
            <section>
              <h2 className="mb-3 text-center text-lg font-extrabold text-gold-200">
                🎵 {VAULT.videoTitle}
              </h2>
              <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-gold-300/40 bg-black/30 p-5 text-center">
                <div className="text-4xl">🎶</div>
                <p className="text-sm font-bold text-white/90">בצקון שלי</p>
                <audio
                  controls
                  preload="metadata"
                  className="w-full max-w-xs"
                  src="/betzakon-sheli.mp3"
                >
                  הדפדפן שלך לא תומך בנגן השמע.
                </audio>
              </div>
            </section>

            {/* Gift hint */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-gradient-to-br from-gold-300 to-gold-400 p-5 text-center text-ink shadow-soft"
            >
              <p className="text-sm font-bold uppercase tracking-widest">
                {VAULT.treasureDetected}
              </p>
              <p className="my-1 text-2xl font-extrabold">{VAULT.treasureHint}</p>
              <p className="text-sm">{VAULT.giftHint}</p>
              <Button
                size="md"
                variant="primary"
                className="mt-3"
                onClick={() => {
                  heartConfetti();
                  haptic([10, 30, 10, 30, 40]);
                }}
              >
                💖 עוד ❤️
              </Button>
            </motion.div>

            <Button variant="secondary" onClick={() => router.push("/")}>
              חזרה למפה
            </Button>

            {/* Restart: wipes all progress and replays from the intro. */}
            <Button
              variant={confirmReset ? "danger" : "ghost"}
              size="sm"
              className="mx-auto"
              onClick={() => {
                if (!confirmReset) {
                  setConfirmReset(true);
                  haptic(20);
                  return;
                }
                haptic([10, 30, 10]);
                resetAll();
                router.push("/");
              }}
            >
              {confirmReset ? "בטוח/ה? לוחצים שוב כדי לאפס 🔁" : "🔄 התחילי את המסע מחדש"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
