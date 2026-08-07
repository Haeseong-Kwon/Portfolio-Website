import type { Transition, Variants } from "framer-motion";

/** Shared easing curves. Same family the reference uses, expressed once. */
export const EASE = {
    expo: [0.22, 1, 0.36, 1],
    quart: [0.25, 1, 0.5, 1],
    back: [0.34, 1.56, 0.64, 1],
    inOut: [0.65, 0, 0.35, 1],
} as const;

export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const reveal = (delay = 0, duration = 0.9): Transition => ({
    duration,
    delay,
    ease: EASE.expo,
});

/** Mask-and-rise: parent clips, child slides up from below the mask. */
export const riseVariants: Variants = {
    hidden: { y: "110%" },
    show: (i: number = 0) => ({
        y: "0%",
        transition: { duration: 0.9, delay: i * 0.055, ease: EASE.expo },
    }),
};

export const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.06, ease: EASE.expo },
    }),
};

/** Splits a string into words, preserving spaces for the mask reveal. */
export const toWords = (text: string): string[] => text.split(/(\s+)/).filter(Boolean);
