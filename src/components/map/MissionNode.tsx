"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Lock, Star } from "lucide-react";
import type { Mission } from "@/lib/types";
import type { NodeStatus } from "@/store/useGameStore";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/effects";

interface Props {
  mission: Mission;
  status: NodeStatus;
  /** Horizontal offset (-1..1) to create the winding path. */
  offset: number;
}

const STATUS_STYLES: Record<NodeStatus, string> = {
  completed: "bg-gradient-to-br from-emerald-400 to-emerald-500 border-emerald-600 text-white",
  current: "bg-gradient-to-br from-blush-400 to-grape-400 border-blush-600 text-white",
  locked: "bg-gray-200 border-gray-300 text-gray-400",
};

/** A single circular node on the Duolingo-style path. */
export function MissionNode({ mission, status, offset }: Props) {
  const router = useRouter();
  const locked = status === "locked";

  const handleClick = () => {
    if (locked) {
      haptic([6, 30, 6]);
      return;
    }
    haptic();
    router.push(`/mission/${mission.id}`);
  };

  return (
    <div
      className="relative flex w-full justify-center"
      style={{ transform: `translateX(${offset * 33}%)` }}
    >
      {/* Pulsing ring for the active node */}
      {status === "current" && (
        <span className="absolute top-1/2 left-1/2 -z-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-blush-400" />
      )}

      <motion.button
        onClick={handleClick}
        whileTap={locked ? { x: [0, -4, 4, -2, 0] } : { y: 5 }}
        animate={status === "current" ? { y: [0, -6, 0] } : {}}
        transition={
          status === "current"
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { type: "spring", stiffness: 500, damping: 20 }
        }
        aria-label={mission.title}
        className={cn(
          "relative z-10 grid h-20 w-20 place-items-center rounded-full border-b-[6px]",
          "text-3xl font-extrabold shadow-node transition-colors",
          STATUS_STYLES[status],
        )}
      >
        {status === "completed" ? (
          <Check size={34} strokeWidth={4} />
        ) : status === "locked" ? (
          <Lock size={26} />
        ) : (
          <span className="drop-shadow-sm">{mission.order}</span>
        )}

        {/* Order ribbon */}
        <span
          className={cn(
            "absolute -bottom-2 rounded-full px-2 py-0.5 text-[10px] font-bold",
            locked ? "bg-gray-300 text-gray-500" : "bg-white text-ink shadow",
          )}
        >
          {locked ? "נעול" : mission.title}
        </span>

        {status === "current" && (
          <motion.span
            className="absolute -top-3 -right-2 text-gold-400"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Star size={20} fill="currentColor" />
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
