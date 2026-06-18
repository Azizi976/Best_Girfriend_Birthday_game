"use client";

import { create } from "zustand";
import { AnimatePresence, motion } from "framer-motion";

interface Toast {
  id: number;
  message: string;
  emoji?: string;
}

interface ToastStore {
  toasts: Toast[];
  push: (message: string, emoji?: string) => void;
  remove: (id: number) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (message, emoji) => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts, { id, message, emoji }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3200);
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Imperative toast trigger usable anywhere (no provider needed). */
export function toast(message: string, emoji?: string): void {
  useToastStore.getState().push(message, emoji);
}

/** Renders the stacked toasts. Mount once near the root. */
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const remove = useToastStore((s) => s.remove);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            onClick={() => remove(t.id)}
            className="pointer-events-auto flex max-w-sm items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-ink shadow-soft ring-1 ring-grape-100 backdrop-blur"
          >
            {t.emoji && <span className="text-lg">{t.emoji}</span>}
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
