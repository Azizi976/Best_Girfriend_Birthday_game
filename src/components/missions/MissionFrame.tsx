"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Mission, WorldTheme } from "@/lib/types";
import { WORLD_BY_ID } from "@/data/worlds";
import { cn } from "@/lib/utils";

const THEME_BG: Record<WorldTheme, string> = {
  verification: "bg-gradient-to-b from-cream to-blush-50 text-ink",
  timeline: "bg-gradient-to-b from-[#f7ecd9] to-[#efe0c8] text-[#5a4632]",
  court: "bg-gradient-to-b from-grape-50 to-grape-100 text-ink",
  retro: "bg-[#0a0f0a] text-emerald-300 font-mono",
  boss: "bg-gradient-to-b from-ink to-grape-700 text-white",
};

interface Props {
  mission: Mission;
  children: React.ReactNode;
}

/** Shared themed wrapper for a mission screen, with a back button + header. */
export function MissionFrame({ mission, children }: Props) {
  const router = useRouter();
  const world = WORLD_BY_ID[mission.worldId];

  return (
    <div className={cn("min-h-[100dvh] w-full", THEME_BG[world.theme])}>
      <div className="mx-auto flex max-w-md flex-col px-5 pb-12 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            aria-label="חזרה למפה"
            className="grid h-10 w-10 place-items-center rounded-full bg-black/5 transition active:scale-90"
          >
            <ChevronRight size={22} />
          </button>
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">
              {world.title} · משימה {mission.order}
            </p>
            <p className="text-xs opacity-50">{mission.codename}</p>
          </div>
          <div className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-500">
            +{mission.xp} XP
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-2xl font-extrabold"
        >
          {mission.title}
        </motion.h1>

        {children}
      </div>
    </div>
  );
}
