"use client";

import { Fragment } from "react";
import { WORLDS } from "@/data/worlds";
import { MISSION_BY_ID } from "@/data/missions";
import { useGameStore, missionStatus } from "@/store/useGameStore";
import { WorldBanner } from "./WorldBanner";
import { MissionNode } from "./MissionNode";

/** Horizontal center of a node as a 0..100 viewBox coordinate. */
const cx = (offset: number) => 50 + offset * 33;

/**
 * The vertical Duolingo-style progression map: worlds separated by banners,
 * winding path of mission nodes joined by an animated SVG trail.
 */
export function PathMap() {
  const completed = useGameStore((s) => s.completed);

  // Global running index drives the sine-wave offset across all worlds.
  let globalIndex = -1;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 px-4 pb-40 pt-[calc(1rem+env(safe-area-inset-top))]">
      {WORLDS.map((world) => (
        <Fragment key={world.id}>
          <WorldBanner world={world} />
          <div className="flex w-full flex-col items-center">
            {world.missionIds.map((mid, i) => {
              globalIndex += 1;
              const mission = MISSION_BY_ID[mid];
              const status = missionStatus(mid, completed);
              const offset = Math.sin(globalIndex * 1.15) * 0.9;
              const isLastInWorld = i === world.missionIds.length - 1;
              const nextOffset = Math.sin((globalIndex + 1) * 1.15) * 0.9;
              const done = status === "completed";

              return (
                <div key={mid} className="flex w-full flex-col items-center">
                  <MissionNode mission={mission} status={status} offset={offset} />
                  {!isLastInWorld && (
                    <PathConnector from={offset} to={nextOffset} done={done} />
                  )}
                </div>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/** Curved SVG trail between two nodes; glows when the source is completed. */
function PathConnector({ from, to, done }: { from: number; to: number; done: boolean }) {
  const x1 = cx(from);
  const x2 = cx(to);
  // Smooth S-curve via vertical control points.
  const d = `M ${x1} 4 C ${x1} 28, ${x2} 28, ${x2} 52`;
  return (
    <svg
      viewBox="0 0 100 56"
      preserveAspectRatio="none"
      className="my-1 h-14 w-full"
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        strokeLinecap="round"
        strokeWidth={done ? 5 : 4}
        className={
          done
            ? "stroke-emerald-400 [filter:drop-shadow(0_0_5px_rgba(52,211,153,0.7))]"
            : "animate-dash-flow stroke-grape-200 [stroke-dasharray:2_10]"
        }
      />
    </svg>
  );
}
