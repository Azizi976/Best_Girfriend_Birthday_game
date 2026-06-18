"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/effects";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-blush-500 text-white border-blush-700 shadow-[0_5px_0_0_theme(colors.blush.700)] hover:bg-blush-400",
  secondary:
    "bg-white text-ink border-grape-200 shadow-[0_5px_0_0_theme(colors.grape.200)] hover:bg-grape-50",
  gold: "bg-gold-400 text-ink border-gold-500 shadow-[0_5px_0_0_theme(colors.gold.500)] hover:bg-gold-300",
  ghost: "bg-transparent text-ink border-transparent shadow-none hover:bg-black/5",
  danger:
    "bg-red-500 text-white border-red-700 shadow-[0_5px_0_0_theme(colors.red.700)] hover:bg-red-400",
};

const SIZES: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-xl",
  md: "text-base px-6 py-3 rounded-2xl",
  lg: "text-lg px-8 py-4 rounded-2xl",
};

/** Tactile, game-like button with press depth + haptic feedback. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", onClick, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { y: 4, boxShadow: "0 1px 0 0 rgba(0,0,0,0.2)" }}
        transition={{ type: "spring", stiffness: 600, damping: 22 }}
        onClick={(e) => {
          if (!disabled) haptic();
          onClick?.(e);
        }}
        disabled={disabled}
        className={cn(
          "relative select-none border-b-4 font-bold tracking-tight",
          "transition-colors duration-150 active:translate-y-[2px]",
          "disabled:opacity-40 disabled:saturate-50 disabled:cursor-not-allowed",
          VARIANTS[variant],
          SIZES[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
