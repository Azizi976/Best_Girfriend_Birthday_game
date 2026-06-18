"use client";

import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { FBI_REPORT } from "@/data/easterEggs";

/** Easter egg #1 — secret FBI report (opened by tapping the logo 10×). */
export function FbiReport({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} className="bg-[#101418] text-emerald-300">
      <div className="font-mono">
        <div className="mb-3 flex items-center justify-between border-b border-emerald-500/30 pb-2">
          <span className="text-2xl">🕵️</span>
          <span className="text-xs text-emerald-500/70">CLASSIFIED · TOP SECRET</span>
        </div>
        <h3 className="text-lg font-bold text-emerald-200">{FBI_REPORT.title}</h3>
        <p className="mb-4 text-sm text-emerald-400">{FBI_REPORT.subject}</p>

        <p className="mb-1 font-bold text-emerald-200">{FBI_REPORT.crimesTitle}</p>
        <ul className="mb-4 space-y-1 text-sm">
          {FBI_REPORT.crimes.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-2"
            >
              <span className="text-red-400">▸</span>
              {c}
            </motion.li>
          ))}
        </ul>

        <div className="mb-3">
          <span className="font-bold text-emerald-200">{FBI_REPORT.threatTitle} </span>
          <span className="text-gold-400">{"★".repeat(FBI_REPORT.threatStars)}</span>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
          <span className="font-bold text-emerald-200">{FBI_REPORT.recommendationTitle} </span>
          <span className="text-lg text-blush-300">{FBI_REPORT.recommendation}</span>
        </div>
      </div>
    </Modal>
  );
}
