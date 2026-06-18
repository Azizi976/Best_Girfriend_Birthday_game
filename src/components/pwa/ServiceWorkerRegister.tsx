"use client";

import { useEffect } from "react";

/**
 * Registers the service worker (/sw.js) so the game works offline and is
 * installable as a PWA. Only runs in production to avoid caching headaches
 * during development.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("SW registration failed:", err));
    };

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
