"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "./Marquee";
import { EASE, VIEWPORT } from "@/lib/motion";

const TICKER = [
    "FULL-CYCLE ARCHITECT",
    "AI RESEARCH ENGINEER",
    "PRODUCT STRATEGY",
    "0 → 1",
    "SEOUL, KR",
];

const LINES = ["I build the", "whole thing.", "Idea to infra."];

/**
 * The payoff after the hero block swallows the screen: a ticker seam, then a
 * three-line statement whose lines are pulled apart by scroll before settling.
 */
export default function Statement() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const skew = useTransform(scrollYProgress, [0, 0.5, 1], [2.5, 0, -2.5]);

    return (
        <section ref={ref} className="on-ink relative w-full overflow-hidden bg-ink py-28 md:py-40">
            <div className="border-y border-paper/15 py-5">
                <Marquee
                    items={TICKER}
                    duration={38}
                    className="font-display text-[clamp(1.5rem,4vw,3.25rem)] uppercase text-paper/85"
                />
            </div>

            <div className="px-6 pt-24 md:px-12 md:pt-36">
                <motion.div style={{ skewY: skew }} className="origin-left">
                    {LINES.map((line, i) => (
                        <div key={line} className="overflow-hidden">
                            <motion.p
                                className="font-display uppercase leading-[0.88] text-paper"
                                style={{ fontSize: "clamp(2.5rem, 9vw, 8.5rem)" }}
                                initial={{ y: "110%" }}
                                whileInView={{ y: "0%" }}
                                viewport={VIEWPORT}
                                transition={{ duration: 1, delay: i * 0.08, ease: EASE.expo }}
                            >
                                {line}
                            </motion.p>
                        </div>
                    ))}
                </motion.div>

                <div className="mt-20 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-20">
                    <motion.p
                        className="selectable break-keep text-sm leading-[2] text-paper/55 md:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.9, ease: EASE.expo }}
                    >
                        기획서 한 장에서 배포된 서비스까지, 중간에 남에게 넘기지 않습니다. 시장 검증과 제품
                        기획, 프론트엔드와 백엔드, 인프라와 세무 행정까지 한 사람이 끝냅니다.
                    </motion.p>
                    <motion.p
                        className="selectable text-sm leading-[2] text-paper/55 md:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.9, delay: 0.1, ease: EASE.expo }}
                    >
                        Research-grade AI on one side, shipped product on the other. Physics-informed networks,
                        computer vision and LLM agents — wired into systems that survive real traffic, real
                        deadlines and real customers.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
