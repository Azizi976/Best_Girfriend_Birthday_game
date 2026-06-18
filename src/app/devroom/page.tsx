"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DEV_ROOM } from "@/data/easterEggs";
import { useGameStore } from "@/store/useGameStore";
import { Button } from "@/components/ui/Button";

/** Secret room reached from the Ministry footer (tap 5×). Fake debug console. */
export default function DevRoomPage() {
  const router = useRouter();
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const findEgg = useGameStore((s) => s.findEgg);

  // Reveal one log line at a time, terminal-style.
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    unlockAchievement("devroom");
    findEgg("dev-room");
  }, [unlockAchievement, findEgg]);

  useEffect(() => {
    if (visible >= DEV_ROOM.logs.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 320);
    return () => clearTimeout(t);
  }, [visible]);

  const done = visible >= DEV_ROOM.logs.length;

  return (
    <div className="min-h-[100dvh] bg-black px-5 pb-16 pt-[calc(env(safe-area-inset-top)+1.5rem)] text-green-400">
      <div className="mx-auto max-w-md">
        <div className="mb-5 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-6xl"
          >
            👩‍💻
          </motion.div>
          <h1 className="mt-2 text-3xl font-extrabold text-green-300">{DEV_ROOM.title}</h1>
          <p className="font-mono text-xs text-green-500/70">{DEV_ROOM.subtitle}</p>
        </div>

        <div
          dir="ltr"
          className="rounded-2xl border border-green-500/30 bg-green-950/20 p-4 font-mono text-[13px] leading-relaxed shadow-[0_0_30px_rgba(34,197,94,0.15)]"
        >
          {DEV_ROOM.logs.slice(0, visible).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="whitespace-pre-wrap break-words text-green-400"
            >
              <span className="text-green-600">$</span> {line}
            </motion.div>
          ))}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="inline-block"
            >
              <span className="text-green-600">$</span> █
            </motion.span>
          )}
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Button variant="gold" className="w-full" onClick={() => router.push("/")}>
              חזרה למסע
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
