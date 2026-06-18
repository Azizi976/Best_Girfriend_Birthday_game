<div align="center">

# 🎂 Birthday Quest: Operation Haim Shili

### _A highly scalable, mobile-first gamification engine for relationship memory recovery._

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![ESLint](https://img.shields.io/badge/ESLint-Configured-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

<br />

[![Status](https://img.shields.io/badge/status-operational-success?style=flat-square)](#)
[![Classification](https://img.shields.io/badge/clearance-TOP_SECRET-red?style=flat-square)](#)
[![Authorized Users](https://img.shields.io/badge/authorized_users-1_(Agent_Adi)-ff69b4?style=flat-square)](#)
[![Uptime](https://img.shields.io/badge/uptime-since_first_date-blueviolet?style=flat-square)](#)

<br />

<img src="https://placehold.co/900x420/FFFDF9/FF7EB6?text=Operation+Shili+%E2%80%94+Memory+Recovery+Console" alt="Operation Haim Shili dashboard preview" width="90%" />

</div>

---

## 📡 Project Overview

> **Classification:** `MASOOG ACHUSHER***` · **Operation Codename:** `OPERATION SHILI`

**Birthday Quest: Operation Shili** is a state-of-the-art, client-side **Relationship Memory Recovery System (RMRS)** engineered to remediate a critical breach in a dual-tenant affection datastore. Following an unauthorized intrusion, the couple's shared memory index suffered severe **memory fragmentation** — historically significant records were scattered across an unindexed timeline and rendered non-addressable.

The platform mobilizes a single field operative, **Agent Adi**, through a **Duolingo-style progression pipeline** to sequentially re-ingest, validate, and re-commit each fragmented memory back into the primary relationship ledger. In parallel, the system maintains an active investigation into a series of **first-degree blanket-theft anomalies** (the recurring, unauthorized exfiltration of shared bedding) attributed to a persistent threat actor under surveillance.

Each completed mission restores a memory shard, awards experience points (XP), and contributes toward the recovery of five cryptographic **crystals** required to unlock the final, write-protected payload: the **Easter Egg Vault**.

---

## 🏛️ Key Architectural Features

- **🛰️ Progressive Web App (PWA):** Fully installable on iOS & Android with a native-like shell, offline-first service-worker caching, splash screens, and full Web App Manifest integration — no app store, no friction.
- **🎞️ Fluid UI/UX:** Spring-physics-driven transitions and tactile micro-interactions (press depth, swipe-to-dismiss sheets, haptics) powered by **Framer Motion** — every interaction is interruptible and reduced-motion aware.
- **🧠 Deterministic State Management:** A single source of truth via **Zustand**, with `localStorage` persistence for mission tracking, XP, inventory (crystals & achievements), and discovered easter eggs — progress survives reloads and offline sessions.
- **🌍 RTL Localization:** First-class Right-To-Left layout engineered end-to-end for the **Hebrew language**, using logical CSS properties so animations never break horizontal overflow.
- **🗺️ Responsive Gamification Engine:** A dynamic **SVG-pathed progression map** with sine-wave node distribution, animated marching-dash connectors, and responsive `viewBox` scaling that adapts cleanly from small phones to tablets.

---

## 🧰 Tech Stack

| Layer                  | Technology                                              |
| :--------------------- | :------------------------------------------------------ |
| **Frontend Framework** | Next.js 15 (App Router)                                 |
| **Language**           | TypeScript (`strict` mode)                              |
| **Styling**            | Tailwind CSS 3                                          |
| **Animation**          | Framer Motion 11                                        |
| **State Management**   | Zustand 5 (with `persist` middleware)                   |
| **Effects**            | canvas-confetti · Web Vibration API                     |
| **Icons**              | lucide-react                                            |
| **Tooling**            | ESLint · PostCSS · Autoprefixer · Sharp (icon pipeline) |
| **Deployment**         | Static Export → GitHub Pages / any static host          |

---

## 🗂️ System Design & Architecture

The codebase enforces strict separation of concerns: **data** (narrative content) is fully decoupled from **components** (presentation) and **store** (state), so the entire story can be re-skinned without touching a single component.

```text
Chapu_Birthday_game/
├── public/                     # Static assets, PWA shell
│   ├── icons/                  # App icons, splash screens
│   ├── manifest.json           # Web App Manifest
│   └── sw.js                   # Offline-first service worker
├── scripts/
│   └── generate-icons.mjs      # Sharp-based icon generation pipeline
├── src/
│   ├── app/                    # Next.js App Router (routes + transitions)
│   │   ├── mission/[id]/       # Dynamic mission routes
│   │   ├── vault/              # The Easter Egg Vault (end-game payload)
│   │   ├── ministry/           # Ministry HQ
│   │   ├── devroom/            # Secret developer console
│   │   ├── layout.tsx          # Root layout, fonts, PWA meta
│   │   ├── template.tsx        # Per-navigation route transitions
│   │   └── globals.css         # Design tokens, safe-area, RTL
│   ├── components/
│   │   ├── ui/                 # Primitives (Button, Modal sheet, Progress)
│   │   ├── map/                # Duolingo-style progression map + SVG path
│   │   ├── missions/           # Mission frame, completion, runners/
│   │   ├── home/               # Hero & intro cutscene
│   │   ├── hud/                # Stats / XP bar
│   │   ├── achievements/       # Achievement dialogs & watcher
│   │   ├── easter-eggs/        # Hidden interactions
│   │   └── pwa/                # Service-worker registration
│   ├── data/                   # Narrative content (story, missions, worlds…)
│   ├── store/                  # Zustand global game store
│   └── lib/                    # Types, hooks, effects, utilities
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started (Local Development)

> **Prerequisites:** Node.js 18.18+ and npm.

```bash
# 1. Clone the classified repository
git clone https://github.com/your-username/operation-shili.git
cd operation-shili

# 2. Install dependencies
npm install

# 3. Launch the development console
npm run dev
```

The development server boots at **`http://localhost:3000`**. For the authentic field experience, open Chrome DevTools, toggle device emulation to an iPhone, and "Add to Home Screen."

### 📦 Available Scripts

| Command         | Description                                 |
| :-------------- | :------------------------------------------ |
| `npm run dev`   | Start the local development server          |
| `npm run build` | Produce a production build                  |
| `npm run start` | Serve the production build                  |
| `npm run lint`  | Run ESLint static analysis                  |
| `npm run icons` | Regenerate PWA icons via the Sharp pipeline |

> **Static PWA generation:** The production target is a fully static, CDN-cacheable bundle generated with Next.js `output: 'export'`, suitable for zero-cost hosting on GitHub Pages. _(See the deployment note in the repo before enabling — the current config ships custom headers that must be reconciled with export mode.)_

---

## 🛡️ Security & Threat Model

> **Classification:** `EYES ONLY` · Distribution restricted.

This system operates under a strict **single-tenant authorization model**.

- **👤 Authorized Operative:** **Agent Adi** is the sole principal cleared for full system access. All mission, XP, and inventory state is bound to her local device.
- **🔒 Vault Protection:** The **Easter Egg Vault** is the system's crown-jewel asset. Access is gated behind a **five-crystal multi-factor proof-of-completion** — the Vault remains cryptographically sealed until all five world crystals have been recovered. Premature access attempts are gracefully redirected to the mission map.
- **🕵️ Active Threat Surveillance:** The platform maintains continuous monitoring for **blanket-theft anomalies**. The primary person of interest remains under investigation; no charges have been filed (yet).
- **🤫 Privileged Backchannels:** Certain diagnostic interfaces (e.g., the developer console) are obfuscated behind undocumented gesture sequences and are not intended for general operatives.

**Data residency:** All operative data is stored exclusively in browser `localStorage`. No telemetry, no analytics, no third-party data processors. What happens in the field, stays in the field. 💖

---

## 📜 License

**PROPRIETARY · ALL RIGHTS RESERVED.**

This software is exclusively and irrevocably licensed to **Adi** for the sole purpose of celebrating her birthday. 🎉

Unauthorized replication, redistribution, reverse-engineering, or any form of **"blanket theft"** — whether of source code, memories, or actual blankets — is **strictly prohibited** and will be prosecuted to the fullest extent of relationship law.

> _Built with 💗 (and a suspicious amount of TypeScript) for Adi._
