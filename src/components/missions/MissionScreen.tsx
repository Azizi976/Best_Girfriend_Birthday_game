"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import type { Mission } from "@/lib/types";
import { useGameStore } from "@/store/useGameStore";
import { MissionFrame } from "./MissionFrame";
import { MissionComplete } from "./MissionComplete";
import { CodewordRunner } from "./runners/CodewordRunner";
import { ChoiceRunner } from "./runners/ChoiceRunner";
import { MapRunner } from "./runners/MapRunner";
import { CourtroomRunner } from "./runners/CourtroomRunner";
import { DinnerRunner } from "./runners/DinnerRunner";
import { DragDropRunner } from "./runners/DragDropRunner";
import { AiDuelRunner } from "./runners/AiDuelRunner";
import { FaceSelectRunner } from "./runners/FaceSelectRunner";
import { RestoreRunner } from "./runners/RestoreRunner";

interface Props {
  mission: Mission;
}

/** Renders the correct runner for a mission and handles completion flow. */
export function MissionScreen({ mission }: Props) {
  const router = useRouter();
  const completeMission = useGameStore((s) => s.completeMission);
  const alreadyDone = useGameStore((s) => s.completed.includes(mission.id));
  const [earned, setEarned] = useState<number | null>(null);

  const handleComplete = (xp: number) => {
    completeMission(mission.id, xp);
    setEarned(xp);
  };

  const handleContinue = () => {
    // The restore mission leads to the vault; everything else returns to map.
    if (mission.kind === "restore") router.push("/vault");
    else router.push("/");
  };

  return (
    <>
      <MissionFrame mission={mission}>
        <Runner mission={mission} onComplete={handleComplete} />
        {alreadyDone && earned === null && (
          <p className="mt-6 text-center text-sm font-semibold text-emerald-500">
            ✔️ כבר השלמת את המשימה הזו — אפשר לשחק שוב.
          </p>
        )}
      </MissionFrame>

      <AnimatePresence>
        {earned !== null && (
          <MissionComplete
            mission={mission}
            earnedXp={earned}
            successText={successTextOf(mission)}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/** Type-narrowing dispatcher. */
function Runner({ mission, onComplete }: { mission: Mission; onComplete: (xp: number) => void }) {
  switch (mission.kind) {
    case "codeword":
      return <CodewordRunner mission={mission} onComplete={onComplete} />;
    case "choice":
      return <ChoiceRunner mission={mission} onComplete={onComplete} />;
    case "map":
      return <MapRunner mission={mission} onComplete={onComplete} />;
    case "courtroom":
      return <CourtroomRunner mission={mission} onComplete={onComplete} />;
    case "dinner":
      return <DinnerRunner mission={mission} onComplete={onComplete} />;
    case "dragdrop":
      return <DragDropRunner mission={mission} onComplete={onComplete} />;
    case "aiduel":
      return <AiDuelRunner mission={mission} onComplete={onComplete} />;
    case "faceselect":
      return <FaceSelectRunner mission={mission} onComplete={onComplete} />;
    case "restore":
      return <RestoreRunner mission={mission} onComplete={onComplete} />;
  }
}

function successTextOf(mission: Mission): string {
  switch (mission.kind) {
    case "codeword":
      return mission.successText;
    case "choice":
      return mission.successText;
    case "map":
      return mission.successText;
    case "courtroom":
      return mission.verdictText;
    case "dinner":
      return mission.finalText;
    case "dragdrop":
      return mission.successText;
    case "aiduel":
      return mission.successText;
    case "faceselect":
      return mission.successText;
    case "restore":
      return mission.successText;
  }
}
