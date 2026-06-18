"use client";

import { motion } from "framer-motion";
import type { World } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/useGameStore";

interface Props {
  world: World;
}

/** Banner that visually separates worlds on the map. */
export function WorldBanner({ world }: Props) {
  const crystals = useGameStore((s) => s.crystals);
  const got = crystals.includes(world.crystal.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "relative mx-auto my-2 w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-l p-4 text-white shadow-soft",
        world.gradient,
      )}
    >
      {/* shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="relative flex items-center gap-3">
        <span className="text-4xl drop-shadow">{world.emoji}</span>
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/80">
            עולם {world.order}
          </p>
          <h2 className="text-xl font-extrabold leading-tight">{world.title}</h2>
          <p className="text-sm text-white/90">{world.subtitle}</p>
        </div>
        <motion.span
          animate={got ? { scale: [1, 1.25, 1], rotate: [0, 10, 0] } : {}}
          transition={{ duration: 0.6 }}
          className={cn("text-3xl", !got && "opacity-40 grayscale")}
          title={world.crystal.name}
        >
          {world.crystal.emoji}
        </motion.span>
      </div>
    </motion.div>
  );
}
