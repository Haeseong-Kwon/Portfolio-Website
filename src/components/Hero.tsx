"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import HeroDiagram from "./HeroDiagram";
import RevealText from "./RevealText";

const CENTRE_Y = 0.47; // must match HeroDiagram's centre

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const reduced = useReducedMotion();
    const [{ blockPx, coverScale }, setBlock] = useState({ blockPx: 22, coverScale: 80 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // The canvas reads progress inside its own rAF loop — passing it through
    // React state would re-render the whole hero on every scroll frame.
    const progressRef = useRef(0);
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        progressRef.current = v;
    });

    // The block spins as it grows, so size it by its inscribed circle:
    // half a side must reach the furthest corner at any rotation.
    useEffect(() => {
        const measure = () => {
            const size = window.innerWidth < 768 ? 16 : 22;
            const reach = Math.hypot(
                window.innerWidth / 2,
                window.innerHeight * Math.max(CENTRE_Y, 1 - CENTRE_Y)
            );
            setBlock({ blockPx: size, coverScale: Math.ceil((2 * reach) / size) + 1 });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const blockScale = useTransform(scrollYProgress, [0.06, 0.7], [1, coverScale]);
    const chromeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const inverseOpacity = useTransform(scrollYProgress, [0.52, 0.74], [0, 1]);
    const inverseY = useTransform(scrollYProgress, [0.52, 0.8], [40, 0]);

    return (
        <section
            id="index"
            ref={sectionRef}
            className="relative w-full"
            style={{ height: reduced ? "100vh" : "340vh" }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-paper">
                <HeroDiagram progressRef={progressRef} />

                {/* the nav bar floats over the hero, so reserve its band */}
                <div
                    aria-hidden
                    data-hero-keepout
                    className="pointer-events-none absolute inset-x-0 top-0 h-[72px]"
                />

                {/* the centre block: a full stop at rest, the next section once it grows */}
                <motion.div
                    aria-hidden
                    className="absolute left-1/2 bg-ink"
                    style={{
                        top: `${CENTRE_Y * 100}%`,
                        width: blockPx,
                        height: blockPx,
                        marginLeft: -blockPx / 2,
                        marginTop: -blockPx / 2,
                        scale: blockScale,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EASE.back }}
                />

                {/* ---------- paper chrome ---------- */}
                <motion.div
                    className="pointer-events-none absolute inset-0"
                    style={{ opacity: chromeOpacity }}
                >
                    <div
                        data-hero-keepout
                        className="absolute bottom-20 left-6 flex flex-col gap-3 md:bottom-24 md:left-12"
                    >
                        <RevealText
                            immediate
                            as="h1"
                            delay={0.55}
                            text="HAESEONG KWON"
                            className="font-display uppercase leading-[0.85] text-ink"
                            style={{ fontSize: "clamp(1.75rem, 3.6vw, 3.25rem)" }}
                        />
                        <motion.p
                            className="label max-w-[26rem] leading-[1.9] text-ink/45"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1, ease: EASE.expo }}
                        >
                            Full-Cycle Architect &amp; AI Research Engineer — Seoul
                        </motion.p>
                    </div>

                    <motion.div
                        data-hero-keepout
                        className="absolute right-6 bottom-20 hidden items-center gap-3 md:right-12 md:bottom-24 md:flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2, ease: EASE.expo }}
                    >
                        <span className="label text-ink/35">EST. 2022</span>
                        <span className="h-px w-10 bg-ink/20" />
                        <span className="label text-ink/35">PORTFOLIO 2026</span>
                    </motion.div>
                </motion.div>

                {/* ---------- scroll hint ---------- */}
                <motion.div
                    data-hero-keepout
                    className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3"
                    style={{ opacity: chromeOpacity }}
                >
                    <span className="label text-ink/35">SCROLL</span>
                    <div className="relative h-px w-16 overflow-hidden bg-ink/15">
                        <motion.div
                            className="absolute inset-y-0 w-1/3 bg-ink"
                            animate={{ x: ["-100%", "300%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: EASE.inOut }}
                        />
                    </div>
                </motion.div>

                {/* ---------- ink chrome, once the block has taken the screen ---------- */}
                <motion.div
                    className="on-ink pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
                    style={{ opacity: inverseOpacity, y: inverseY }}
                >
                    <span className="label text-paper/40">FROM ZERO</span>
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
