"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  /** 0..1 */
  value: number;
  className?: string;
  barClassName?: string;
}

/** Rounded, animated progress bar. */
export function Progress({ value, className, barClassName }: ProgressProps) {
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-black/10", className)}>
      <motion.div
        className={cn("h-full rounded-full bg-gradient-to-l from-blush-400 to-grape-400", barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
