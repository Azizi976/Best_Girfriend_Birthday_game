"use client";

import confetti from "canvas-confetti";

const PALETTE = ["#FF7EB6", "#9B6BFF", "#FFC857", "#FF5BA0", "#FFF6EC"];

/** Celebratory burst from the bottom center. */
export function burstConfetti(): void {
  confetti({
    particleCount: 120,
    spread: 80,
    startVelocity: 45,
    origin: { y: 0.7 },
    colors: PALETTE,
    scalar: 1.1,
  });
}

/** Two-sided cannon (used for big wins / vault). */
export function cannonConfetti(): void {
  const end = Date.now() + 900;
  const frame = () => {
    confetti({ particleCount: 6, angle: 60, spread: 65, origin: { x: 0 }, colors: PALETTE });
    confetti({ particleCount: 6, angle: 120, spread: 65, origin: { x: 1 }, colors: PALETTE });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

/** Heart-shaped emoji confetti. */
export function heartConfetti(): void {
  const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });
  confetti({
    particleCount: 30,
    spread: 100,
    origin: { y: 0.6 },
    shapes: [heart],
    scalar: 2,
  });
}

/** Short haptic pulse on supported devices. */
export function haptic(pattern: number | number[] = 12): void {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}
