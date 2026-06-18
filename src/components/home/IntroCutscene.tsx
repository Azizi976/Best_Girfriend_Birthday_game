"use client";

import { motion } from "framer-motion";
import { INTRO } from "@/data/story";
import { Button } from "@/components/ui/Button";

/** Opening story cutscene shown before the first play. */
export function IntroCutscene({ onAccept }: { onAccept: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-ink to-grape-700 px-6 py-10 text-center text-white"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="mb-4 text-7xl"
      >
        🎂
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4 rounded-full border border-blush-300/50 bg-blush-500/20 px-4 py-1 text-xs font-bold tracking-widest text-blush-200"
      >
        {INTRO.badge}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mb-5 text-4xl font-extrabold"
      >
        {INTRO.title}
      </motion.h1>

      <div className="mb-4 space-y-1">
        {INTRO.lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.2 }}
            className="text-xl font-bold text-blush-200"
          >
            {l}
          </motion.p>
        ))}
      </div>

      <div className="mb-8 max-w-sm space-y-1.5">
        {INTRO.body.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 + i * 0.12 }}
            className="text-sm leading-relaxed text-white/80"
          >
            {l || " "}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        className="flex w-full max-w-xs flex-col gap-2"
      >
        <Button size="lg" variant="gold" className="w-full" onClick={onAccept}>
          {INTRO.cta}
        </Button>
        <button
          onClick={onAccept}
          className="text-sm font-semibold text-white/60 underline-offset-4 hover:underline"
        >
          {INTRO.skip}
        </button>
      </motion.div>
    </motion.div>
  );
}
