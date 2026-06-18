import { notFound } from "next/navigation";
import { MISSIONS, MISSION_BY_ID } from "@/data/missions";
import { MissionScreen } from "@/components/missions/MissionScreen";

/** Pre-render all mission routes at build time. */
export function generateStaticParams() {
  return MISSIONS.map((m) => ({ id: m.id }));
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mission = MISSION_BY_ID[id];
  if (!mission) notFound();
  return <MissionScreen mission={mission} />;
}
