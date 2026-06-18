"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CourtroomMission, Choice } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { haptic } from "@/lib/effects";
import { useGameStore } from "@/store/useGameStore";

interface Props {
  mission: CourtroomMission;
  onComplete: (xp: number) => void;
}

/** Mission 7 — courtroom; both pleas continue, "אשמה מאוד" adds bonus XP. */
export function CourtroomRunner({ mission, onComplete }: Props) {
  const [verdict, setVerdict] = useState<{ text?: string; xp: number } | null>(null);
  const findEgg = useGameStore((s) => s.findEgg);

  const plead = (c: Choice) => {
    if (verdict) return;
    haptic([12, 30, 12]);
    if (c.bonusXp) findEgg("blanket-bonus");
    setVerdict({ text: c.feedback, xp: mission.xp + (c.bonusXp ?? 0) });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Bench */}
      <div className="rounded-3xl bg-grape-600 p-5 text-center text-white shadow-soft">
        <div className="text-4xl">⚖️</div>
        <p className="mt-1 text-sm font-bold uppercase tracking-widest text-grape-200">
          תיק 001 · בית משפט לזוגיות
        </p>
      </div>

      {/* Charge sheet */}
      <div className="rounded-3xl border-2 border-grape-200 bg-white p-5 shadow">
        <Row label="תובע" value={mission.prosecutor} emoji="🧑‍⚖️" />
        <Row label="נאשמת" value={mission.defendant} emoji="🙅‍♀️" />
        <Row label="אישום" value={mission.charge} emoji="🛏️" highlight />
        <p className="mt-3 rounded-2xl bg-grape-50 p-3 text-sm leading-relaxed text-ink-soft">
          “{mission.intro}”
        </p>
      </div>

      {!verdict ? (
        <div className="flex flex-col gap-3">
          <p className="text-center font-bold text-ink">כיצד את מודה?</p>
          {mission.choices.map((c) => (
            <Button
              key={c.id}
              variant={c.bonusXp ? "gold" : "secondary"}
              size="lg"
              onClick={() => plead(c)}
            >
              {c.emoji} {c.label}
              {c.bonusXp ? `  (+${c.bonusXp} בונוס)` : ""}
            </Button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4 rounded-3xl bg-gold-100 p-5 text-center"
        >
          <div className="text-5xl">🔨</div>
          {verdict.text && (
            <p className="font-bold text-gold-500">{verdict.text}</p>
          )}
          <p className="text-lg font-extrabold text-ink">{mission.verdictText}</p>
          <Button size="lg" className="w-full" onClick={() => onComplete(verdict.xp)}>
            קבלי את גזר הדין
          </Button>
        </motion.div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  emoji,
  highlight,
}: {
  label: string;
  value: string;
  emoji: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-grape-100 py-2 last:border-0">
      <span className="text-sm font-bold text-ink-soft">{label}</span>
      <span className={highlight ? "font-extrabold text-blush-600" : "font-bold text-ink"}>
        {emoji} {value}
      </span>
    </div>
  );
}
