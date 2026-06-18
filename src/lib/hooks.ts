"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True only after client-side mount — guards against SSR hydration mismatch
 *  for anything that reads persisted Zustand state. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/** Long-press detector. Returns handlers to spread onto an element. */
export function useLongPress(callback: () => void, ms = 600) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    timer.current = setTimeout(callback, ms);
  }, [callback, ms]);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return {
    onPointerDown: start,
    onPointerUp: clear,
    onPointerLeave: clear,
    onPointerCancel: clear,
  };
}

/** Count taps within a window; fire when `target` reached. */
export function useTapCounter(target: number, onReached: () => void, windowMs = 1500) {
  const count = useRef(0);
  const last = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    if (now - last.current > windowMs) count.current = 0;
    last.current = now;
    count.current += 1;
    if (count.current >= target) {
      count.current = 0;
      onReached();
    }
  }, [target, onReached, windowMs]);
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Konami code listener (keyboard). */
export function useKonami(onUnlock: () => void) {
  const buffer = useRef<string[]>([]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      buffer.current = [...buffer.current, e.key].slice(-KONAMI.length);
      if (KONAMI.every((k, i) => buffer.current[i]?.toLowerCase() === k.toLowerCase())) {
        buffer.current = [];
        onUnlock();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onUnlock]);
}

/** Device-shake detector (mobile). Falls back gracefully when unsupported. */
export function useShake(onShake: () => void, threshold = 18) {
  const last = useRef({ x: 0, y: 0, z: 0, t: 0 });
  useEffect(() => {
    const handler = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x == null) return;
      const now = Date.now();
      if (now - last.current.t < 200) return;
      const dx = Math.abs((acc.x ?? 0) - last.current.x);
      const dy = Math.abs((acc.y ?? 0) - last.current.y);
      const dz = Math.abs((acc.z ?? 0) - last.current.z);
      if (dx + dy + dz > threshold) onShake();
      last.current = { x: acc.x ?? 0, y: acc.y ?? 0, z: acc.z ?? 0, t: now };
    };
    window.addEventListener("devicemotion", handler);
    return () => window.removeEventListener("devicemotion", handler);
  }, [onShake, threshold]);
}
