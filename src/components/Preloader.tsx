"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const KEY = "hk.intro.seen";
const DURATION_MS = 1900;

type Phase = "curtain" | "wiping" | "gone";

/**
 * Ink curtain with a counting index, then a four-panel wipe to paper.
 *
 * The curtain is present in the very first paint (no flash of unstyled page),
 * and returning visitors / reduced-motion users drop it on the first frame —
 * unmounting before AnimatePresence can play an exit, so they never sit
 * through a wipe they did not ask for.
 */
export default function Preloader() {
    const [phase, setPhase] = useState<Phase>("curtain");
    const [count, setCount] = useState(0);

    useEffect(() => {
        const skip =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            sessionStorage.getItem(KEY) !== null;

        let frame = 0;

        if (skip) {
            frame = requestAnimationFrame(() => setPhase("gone"));
            return () => cancelAnimationFrame(frame);
        }

        document.body.style.overflow = "hidden";
        const start = performance.now();

        const tick = (now: number) => {
            // cubic ease-out so the counter decelerates into 100 instead of snapping
            const linear = Math.min(1, (now - start) / DURATION_MS);
            setCount(Math.round((1 - Math.pow(1 - linear, 3)) * 100));

            if (linear < 1) {
                frame = requestAnimationFrame(tick);
                return;
            }
            sessionStorage.setItem(KEY, "1");
            document.body.style.overflow = "";
            setPhase("wiping");
        };
        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            document.body.style.overflow = "";
        };
    }, []);

    if (phase === "gone") return null;

    return (
        <AnimatePresence onExitComplete={() => setPhase("gone")}>
            {phase === "curtain" && (
                <motion.div key="preloader" className="fixed inset-0 z-[95] flex" aria-hidden>
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="h-full flex-1 bg-ink"
                            exit={{ y: "-100%", transition: { duration: 0.85, delay: i * 0.06, ease: EASE.expo } }}
                        />
                    ))}

                    <motion.div
                        className="pointer-events-none absolute inset-0 flex items-end justify-between px-6 pb-8 md:px-12 md:pb-12"
                        exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE.expo } }}
                    >
                        <span className="label text-paper/50">HAESEONG KWON — PORTFOLIO</span>
                        <span
                            className="font-display tabular-nums leading-[0.8] text-paper"
                            style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
                        >
                            {String(count).padStart(3, "0")}
                        </span>
                    </motion.div>

                    <motion.div
                        className="pointer-events-none absolute bottom-0 left-0 h-px bg-paper"
                        style={{ width: `${count}%` }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
