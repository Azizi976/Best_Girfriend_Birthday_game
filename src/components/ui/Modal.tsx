"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Hide the close (X) button — used for forced cutscenes. */
  hideClose?: boolean;
  /** Disable closing on backdrop click / swipe-down. */
  lockBackdrop?: boolean;
  /** Render centered (spring-pop) instead of the default iOS bottom-sheet. */
  centered?: boolean;
}

const SPRING = { type: "spring", stiffness: 320, damping: 30 } as const;

/**
 * Default: an iOS-style bottom-sheet that slides up, has a grab handle and
 * swipe-down-to-dismiss, over a blurred scrim. Pass `centered` for a
 * spring-pop dialog (forced cutscenes). RTL-aware.
 */
export function Modal({
  open,
  onClose,
  children,
  className,
  hideClose,
  lockBackdrop,
  centered,
}: ModalProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (lockBackdrop) return;
    // Dismiss on a confident downward flick or drag.
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex",
            centered ? "items-center justify-center p-4" : "items-end justify-center",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-md"
            onClick={lockBackdrop ? undefined : onClose}
          />

          {centered ? (
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={SPRING}
              className={cn(
                "relative z-10 w-full max-w-md rounded-3xl bg-cream p-6 shadow-soft",
                "max-h-[88vh] overflow-y-auto",
                className,
              )}
            >
              {!hideClose && <CloseButton onClose={onClose} />}
              {children}
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={SPRING}
              drag={lockBackdrop ? false : "y"}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={handleDragEnd}
              className={cn(
                "relative z-10 w-full max-w-md rounded-t-3xl bg-cream px-6 pt-3 shadow-sheet",
                "max-h-[90vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom))]",
                className,
              )}
            >
              {/* Grab handle */}
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15" />
              {!hideClose && <CloseButton onClose={onClose} />}
              {children}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="סגירה"
      className="absolute end-4 top-4 z-20 rounded-full p-1.5 text-ink-soft transition hover:bg-black/5"
    >
      <X size={20} />
    </button>
  );
}
