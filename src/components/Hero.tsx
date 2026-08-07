"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import RevealText from "./RevealText";

/** angle in degrees (0 = east, clockwise), dist as a fraction of the ray unit. */
type Ray = { label: string; angle: number; dist: number; weak?: boolean };

/**
 * The 55°–125° cone points straight at the headline, so nothing is placed
 * there — that gap is what keeps the diagram off the name.
 */
const RAYS: Ray[] = [
    // the top rays stay short so their labels clear the fixed header bar
    { label: "FULL-STACK", angle: -90, dist: 0.56 },
    { label: "AI RESEARCH", angle: -46, dist: 0.82 },
    { label: "SYSTEMS", angle: -8, dist: 1.0 },
    { label: "PRODUCT", angle: 30, dist: 0.85 },
    { label: "0 → 1", angle: 52, dist: 0.58 },
    { label: "STRATEGY", angle: 128, dist: 0.58 },
    { label: "INFRA", angle: 172, dist: 1.0 },
    { label: "RESEARCH", angle: -134, dist: 0.78 },

    { label: "PYTORCH", angle: -120, dist: 0.62, weak: true },
    { label: "RELENTLESS", angle: -68, dist: 0.68, weak: true },
    { label: "PRECISION", angle: -26, dist: 0.72, weak: true },
    { label: "TYPESCRIPT", angle: 10, dist: 0.68, weak: true },
    { label: "NIGHT OWL", angle: 46, dist: 0.44, weak: true },
    { label: "SHIP IT", angle: 134, dist: 0.44, weak: true },
    { label: "KUBERNETES", angle: 156, dist: 0.7, weak: true },
    { label: "CTRL+Z", angle: -158, dist: 0.66, weak: true },
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();
    const [{ blockPx, coverScale }, setBlock] = useState({ blockPx: 88, coverScale: 30 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // The block sits at 44% height and spins while it grows, so size it by its
    // inscribed circle: side/2 must reach the furthest corner at any rotation.
    useEffect(() => {
        const measure = () => {
            const size = window.innerWidth < 768 ? 64 : 88;
            const reach = Math.hypot(window.innerWidth / 2, window.innerHeight * 0.56);
            setBlock({ blockPx: size, coverScale: Math.ceil((2 * reach) / size) + 1 });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // Pointer parallax — the diagram drifts against the cursor, the block barely moves.
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const driftX = useSpring(px, { stiffness: 60, damping: 20, mass: 0.8 });
    const driftY = useSpring(py, { stiffness: 60, damping: 20, mass: 0.8 });

    useEffect(() => {
        if (reduced) return;
        const onMove = (e: PointerEvent) => {
            px.set((e.clientX / window.innerWidth - 0.5) * 44);
            py.set((e.clientY / window.innerHeight - 0.5) * 44);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [px, py, reduced]);

    const blockScale = useTransform(scrollYProgress, [0, 0.68], [1, coverScale]);
    const blockRotate = useTransform(scrollYProgress, [0, 0.68], [0, 45]);
    const raysScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
    const raysOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
    const chromeOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
    const inverseOpacity = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);
    const inverseY = useTransform(scrollYProgress, [0.5, 0.78], [40, 0]);

    return (
        <section
            id="index"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: reduced ? "100vh" : "340vh" }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper">
                {/* ---------- radial diagram ---------- */}
                {/* --ray is the diagram's radius unit; phones get a tighter one so
                    edge labels stay inside the viewport */}
                <motion.div
                    className="absolute inset-0 [--ray:min(30vw,40vh)] md:[--ray:min(42vw,52vh)]"
                    style={{ x: driftX, y: driftY, scale: raysScale, opacity: raysOpacity }}
                    aria-hidden
                >
                    {RAYS.map((ray, i) => {
                        const rad = (ray.angle * Math.PI) / 180;
                        const length = `calc(${ray.dist} * var(--ray))`;
                        // Labels are placed, not rotated — anchored on the side the
                        // ray points at, so near-vertical rays sit above/below their
                        // endpoint instead of colliding with their neighbours.
                        const anchor =
                            ray.angle < -65 && ray.angle > -115
                                ? "translate(-50%, calc(-100% - 10px))"
                                : ray.angle > 65 && ray.angle < 115
                                    ? "translate(-50%, 10px)"
                                    : Math.abs(ray.angle) > 90
                                        ? "translate(calc(-100% - 10px), -50%)"
                                        : "translate(10px, -50%)";

                        return (
                            <motion.div
                                key={ray.label}
                                className={ray.weak ? "hidden md:block" : ""}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.4, delay: 0.5 + (i % 6) * 0.09, ease: EASE.expo }}
                            >
                                <motion.div
                                    className={`absolute top-[44%] left-1/2 h-px origin-left ${ray.weak ? "bg-ink/12" : "bg-ink/40"
                                        }`}
                                    style={{ width: length, rotate: ray.angle }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1.6, delay: 0.5, ease: EASE.expo }}
                                />
                                <span
                                    className={
                                        ray.weak
                                            ? "label absolute whitespace-nowrap text-ink/30"
                                            : "font-display absolute whitespace-nowrap text-[clamp(0.7rem,1.5vw,1.35rem)] uppercase text-ink"
                                    }
                                    style={{
                                        left: `calc(50% + ${(Math.cos(rad) * ray.dist).toFixed(4)} * var(--ray))`,
                                        top: `calc(44% + ${(Math.sin(rad) * ray.dist).toFixed(4)} * var(--ray))`,
                                        transform: anchor,
                                    }}
                                >
                                    {ray.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ---------- the block ---------- */}
                <motion.div
                    aria-hidden
                    className="absolute top-[44%] left-1/2 bg-ink"
                    style={{
                        width: blockPx,
                        height: blockPx,
                        marginLeft: -blockPx / 2,
                        marginTop: -blockPx / 2,
                        scale: blockScale,
                        rotate: blockRotate,
                    }}
                />

                {/* ---------- paper chrome ---------- */}
                <motion.div
                    className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 py-24 md:px-12 md:py-28"
                    style={{ opacity: chromeOpacity }}
                >
                    <div />
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <RevealText
                            immediate
                            as="h1"
                            delay={0.7}
                            text="HAESEONG KWON"
                            className="font-display uppercase leading-[0.82] text-ink"
                            style={{ fontSize: "clamp(2.25rem, 6.5vw, 6rem)" }}
                        />
                        <motion.p
                            className="label max-w-[22rem] leading-[1.8] text-ink/50 md:text-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.1, ease: EASE.expo }}
                        >
                            Full-Cycle Architect &amp; AI Research Engineer — Seoul
                        </motion.p>
                    </div>
                </motion.div>

                {/* ---------- scroll hint ---------- */}
                <motion.div
                    className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3"
                    style={{ opacity: chromeOpacity }}
                >
                    <span className="label text-ink/40">SCROLL</span>
                    <div className="relative h-px w-16 overflow-hidden bg-ink/20">
                        <motion.div
                            className="absolute inset-y-0 w-1/3 bg-ink"
                            animate={{ x: ["-100%", "300%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: EASE.inOut }}
                        />
                    </div>
                </motion.div>

                {/* ---------- ink chrome, revealed once the block has taken over ---------- */}
                <motion.div
                    className="on-ink pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
                    style={{ opacity: inverseOpacity, y: inverseY }}
                >
                    <span className="label text-paper/40">EST. 2022 — PORTFOLIO 2026</span>
                    <p
                        className="font-display max-w-[22ch] uppercase leading-[0.92] text-paper"
                        style={{ fontSize: "clamp(1.75rem, 5vw, 4.5rem)" }}
                    >
                        Nothing to something.
                    </p>
                    <p className="selectable break-keep max-w-md text-sm leading-[1.9] text-paper/50">
                        기획부터 인프라까지, 무에서 유를 창조하는 풀사이클 아키텍트이자 AI 연구엔지니어.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
