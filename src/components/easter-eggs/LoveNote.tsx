"use client";

import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { LOVE_NOTE } from "@/data/easterEggs";

/** Easter egg #5 — hidden love note (long-press the profile image). */
export function LoveNote({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} className="bg-gradient-to-b from-blush-50 to-cream text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-3 text-6xl"
      >
        💌
      </motion.div>
      <h3 className="mb-4 text-xl font-extrabold text-blush-600">{LOVE_NOTE.title}</h3>
      <div className="space-y-2">
        {LOVE_NOTE.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.25 }}
            className="text-lg font-semibold leading-relaxed text-ink"
          >
            {line}
          </motion.p>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-5 text-3xl"
      >
        ❤️
      </motion.div>
    </Modal>
  );
}
