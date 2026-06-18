"use client";

import { motion } from "framer-motion";

/**
 * App-router template: re-mounts on every navigation, so each world/mission
 * screen fades + slides in. RTL-safe (vertical motion only — no horizontal
 * overflow). Respects reduced-motion via globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.6 }}
      className="min-h-screen-d"
    >
      {children}
    </motion.div>
  );
}
