import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Normalize Hebrew/Latin text for forgiving answer comparison. */
export function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/["'׳״’`]/g, "") // strip quotes/geresh/gershayim
    .replace(/\s+/g, " ");
}

/** Compare a free-text answer against a list of accepted answers. */
export function matchesAnswer(input: string, answers: string[]): boolean {
  const n = normalize(input);
  return answers.some((a) => normalize(a) === n);
}

/** Clamp a number to a range. */
export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** Pick a random element. */
export function sample<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Promise-based delay. */
export function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
