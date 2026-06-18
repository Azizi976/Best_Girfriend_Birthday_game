"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { MapMission } from "@/lib/types";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/effects";
import { useGameStore } from "@/store/useGameStore";

interface Props {
  mission: MapMission;
  onComplete: (xp: number) => void;
}

/** Mission 4 — stylized map; tap the correct pin. */
export function MapRunner({ mission, onComplete }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const findEgg = useGameStore((s) => s.findEgg);

  const tap = (id: string, correct?: boolean) => {
    if (picked) return;
    if (correct) {
      haptic([10, 20, 10]);
      setPicked(id);
      setTimeout(() => onComplete(mission.xp), 700);
    } else {
      haptic([8, 30, 8]);
      setWrong(id);
      if (id === "p4") findEgg("thailand-pin"); // egg: tapping תאילנד
      setTimeout(() => setWrong(null), 700);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-lg font-bold">{mission.question}</p>

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border-4 border-grape-200 bg-gradient-to-br from-blush-50 via-cream to-grape-50 shadow-soft">
        {/* decorative grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#9B6BFF22 1px,transparent 1px),linear-gradient(90deg,#9B6BFF22 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* squiggly "roads" */}
        <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 125">
          <path
            d="M10,20 Q40,40 30,70 T55,110"
            fill="none"
            stroke="#FF9DC2"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        </svg>

        {mission.pins.map((p) => (
          <button
            key={p.id}
            onClick={() => tap(p.id, p.correct)}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <motion.div
              animate={
                picked === p.id
                  ? { scale: [1, 1.6, 1.2], y: [0, -6, 0] }
                  : wrong === p.id
                    ? { rotate: [0, -15, 15, 0] }
                    : {}
              }
              className={cn(
                "flex flex-col items-center",
                picked === p.id ? "text-emerald-500" : "text-blush-500",
              )}
            >
              <MapPin
                size={34}
                fill={picked === p.id ? "#34d399" : "#FF7EB6"}
                className="drop-shadow"
              />
              <span className="mt-0.5 whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-ink shadow">
                {p.label}
              </span>
            </motion.div>
          </button>
        ))}

        {picked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-bold text-white shadow"
          >
            📍 {mission.place} · {mission.city}
          </motion.div>
        )}
      </div>

      <p className="text-center text-sm text-ink-soft">
        רמז: עיר בדרום, מסעדה עם שם צרפתי. 🥖
      </p>
    </div>
  );
}
