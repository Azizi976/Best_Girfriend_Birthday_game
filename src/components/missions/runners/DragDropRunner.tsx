"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { DragDropMission } from "@/lib/types";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/effects";
import { toast } from "@/components/ui/Toaster";

interface Props {
  mission: DragDropMission;
  onComplete: (xp: number) => void;
}

/**
 * Mission 11 — drag & drop classification.
 * Items are draggable (works with touch via Framer Motion). On release we
 * hit-test against bucket rects. Any placement is accepted (it's a joke),
 * but mis-sorting the chips earns a cheeky toast.
 */
export function DragDropRunner({ mission, onComplete }: Props) {
  const bucketRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [placed, setPlaced] = useState<Record<string, string>>({}); // itemId -> bucketId

  const remaining = mission.items.filter((it) => !placed[it.id]);

  const handleDrop = (itemId: string, point: { x: number; y: number }) => {
    for (const b of mission.buckets) {
      const el = bucketRefs.current[b.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (point.x >= r.left && point.x <= r.right && point.y >= r.top && point.y <= r.bottom) {
        haptic([8, 20, 8]);
        const item = mission.items.find((i) => i.id === itemId)!;
        if (item.correctBucket !== b.id && b.id === "normal") {
          toast("בטוח? זה ממש נראה כמו 'באמת רוצה'...", "🤔");
        }
        const next = { ...placed, [itemId]: b.id };
        setPlaced(next);
        if (Object.keys(next).length === mission.items.length) {
          setTimeout(() => onComplete(mission.xp), 700);
        }
        return;
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="rounded-2xl bg-black/5 px-4 py-2 text-center text-sm font-semibold text-ink-soft">
        {mission.intro}
      </p>

      {/* Tray of draggable items */}
      <div className="flex min-h-24 flex-wrap items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-grape-200 bg-white/60 p-4">
        {remaining.length === 0 ? (
          <p className="text-sm font-bold text-emerald-600">הכל מוין! 🎉</p>
        ) : (
          remaining.map((it) => (
            <motion.button
              key={it.id}
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2, zIndex: 50 }}
              onDragEnd={(_, info) => handleDrop(it.id, info.point)}
              className="flex cursor-grab touch-none flex-col items-center gap-1 rounded-2xl bg-blush-100 px-4 py-2 shadow active:cursor-grabbing"
            >
              <span className="pointer-events-none text-3xl">{it.emoji}</span>
              <span className="pointer-events-none text-xs font-bold text-ink">{it.label}</span>
            </motion.button>
          ))
        )}
      </div>

      <p className="text-center text-xs text-ink-soft">גררי כל פריט אל הסל הנכון 👇</p>

      {/* Buckets */}
      <div className="grid grid-cols-2 gap-3">
        {mission.buckets.map((b) => {
          const items = mission.items.filter((it) => placed[it.id] === b.id);
          return (
            <div
              key={b.id}
              ref={(el) => {
                bucketRefs.current[b.id] = el;
              }}
              className={cn(
                "flex min-h-36 flex-col items-center gap-2 rounded-3xl border-2 p-3 transition",
                b.id === "want"
                  ? "border-blush-300 bg-blush-50"
                  : "border-grape-200 bg-grape-50",
              )}
            >
              <div className="text-center">
                <div className="text-2xl">{b.emoji}</div>
                <p className="text-xs font-extrabold text-ink">{b.label}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {items.map((it) => (
                  <motion.span
                    key={it.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                  >
                    {it.emoji}
                  </motion.span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
