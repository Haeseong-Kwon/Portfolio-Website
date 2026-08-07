"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Mode = "default" | "link" | "view";

/**
 * Two-body cursor: a hard square that tracks 1:1 (the pointer you aim with)
 * and a soft ring that lags behind on a spring (the one you feel).
 * mix-blend-difference keeps both legible on paper and on ink.
 *
 * The native cursor is only hidden once this mounts (`.cursor-ready` on <html>),
 * so a JS failure can never leave the page cursorless.
 */
export default function Cursor() {
    const [mode, setMode] = useState<Mode>("default");
    const [visible, setVisible] = useState(false);
    const reduced = useReducedMotion();

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
    const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const root = document.documentElement;
        root.classList.add("cursor-ready");

        const resolveMode = (target: EventTarget | null): Mode => {
            if (!(target instanceof Element)) return "default";
            if (target.closest("[data-cursor='view']")) return "view";
            if (target.closest("a[href], button, [role='button'], input, label")) return "link";
            return "default";
        };

        const onMove = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setVisible(true);
            setMode(resolveMode(e.target));
        };
        const onLeave = () => setVisible(false);

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);

        return () => {
            root.classList.remove("cursor-ready");
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
        };
    }, [x, y]);

    if (reduced) return null;

    const ringSize = mode === "view" ? 84 : mode === "link" ? 46 : 26;

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block mix-blend-difference">
            <motion.div
                className="absolute top-0 left-0 bg-paper"
                style={{ x, y, width: 5, height: 5, translateX: "-50%", translateY: "-50%" }}
                animate={{ opacity: visible && mode === "default" ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-paper"
                style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
                animate={{
                    width: ringSize,
                    height: ringSize,
                    opacity: visible ? 1 : 0,
                    backgroundColor: mode === "view" ? "rgba(233,233,231,1)" : "rgba(233,233,231,0)",
                }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.span
                    className="label text-ink"
                    animate={{ opacity: mode === "view" ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    VIEW
                </motion.span>
            </motion.div>
        </div>
    );
}
