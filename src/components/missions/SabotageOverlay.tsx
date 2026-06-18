"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SABOTAGE } from "@/data/easterEggs";

/** Easter egg #4 — shown after repeated wrong answers. */
export function SabotageOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} className="text-center">
      <div className="mb-3 text-5xl">🤖</div>
      <h3 className="mb-2 text-xl font-extrabold text-red-500">{SABOTAGE.title}</h3>
      <p className="mb-5 text-ink-soft">{SABOTAGE.message}</p>
      <Button variant="danger" className="w-full" onClick={onClose}>
        אני לא חבלנית! (כן)
      </Button>
    </Modal>
  );
}
