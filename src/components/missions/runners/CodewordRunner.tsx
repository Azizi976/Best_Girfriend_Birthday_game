"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CodewordMission } from "@/lib/types";
import { matchesAnswer } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useSabotage } from "@/components/missions/useSabotage";
import { SabotageOverlay } from "@/components/missions/SabotageOverlay";

interface Props {
  mission: CodewordMission;
  onComplete: (xp: number) => void;
}

export function CodewordRunner({ mission, onComplete }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { sabotage, onWrong, dismiss } = useSabotage();

  const submit = () => {
    if (matchesAnswer(value, mission.answers)) {
      onComplete(mission.xp);
    } else {
      setError(true);
      onWrong();
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="whitespace-pre-line text-center text-lg leading-relaxed text-ink-soft">
        {mission.prompt}
      </p>

      <motion.div animate={error ? { x: [0, -10, 10, -6, 0] } : {}}>
        <input
          dir="rtl"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={mission.placeholder}
          className="w-full rounded-2xl border-2 border-grape-200 bg-white px-5 py-4 text-center text-xl font-bold text-ink shadow-inner outline-none transition focus:border-blush-400"
        />
      </motion.div>

      {error && (
        <p className="text-center text-sm font-semibold text-red-400">
          שם הקוד שגוי. נסי שוב, סוכנת.
        </p>
      )}

      <Button size="lg" onClick={submit} disabled={!value.trim()}>
        אימות זהות
      </Button>

      {mission.hint && (
        <button
          onClick={() => setShowHint((s) => !s)}
          className="text-center text-sm font-semibold text-grape-500 underline-offset-4 hover:underline"
        >
          {showHint ? `💡 ${mission.hint}` : "צריכה רמז?"}
        </button>
      )}

      <SabotageOverlay open={sabotage} onClose={dismiss} />
    </div>
  );
}
