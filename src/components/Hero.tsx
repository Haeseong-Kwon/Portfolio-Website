"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github } from "lucide-react";
import React, { useRef } from "react";

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.3);
        y.set(middleY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}

export default function Hero() {
    const title = "HAESEONG KWON";
    const subTextEn = "0 to 1: Full-Cycle Architect & AI Research Engineer";
    const subTextKr = "기획부터 인프라까지, 무에서 유를 창조하는 풀사이클 아키텍트이자 AI 연구엔지니어";

    return (
        <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6">
            {/* Subtle Grain Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-difference" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

            <div className="flex flex-col items-center text-center gap-6 relative z-10 w-full max-w-[120rem]">

                {/* Massive Headline */}
                <div className="overflow-hidden w-full flex justify-center">
                    <motion.h1
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-black text-foreground leading-[0.85] tracking-tighter uppercase w-full break-words md:break-keep px-4"
                        style={{ fontSize: "clamp(4rem, 16vw, 15rem)" }}
                    >
                        {title}
                    </motion.h1>
                </div>

                {/* Bilingual Sub-text */}
                <div className="flex flex-col items-center gap-3 mt-4 md:mt-8 overflow-hidden">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-2"
                    >
                        <p className="text-foreground/80 font-semibold text-sm md:text-lg tracking-[0.2em] uppercase">
                            {subTextEn}
                        </p>
                        <p className="text-foreground/50 font-medium text-xs md:text-sm tracking-widest break-keep max-w-lg">
                            {subTextKr}
                        </p>
                    </motion.div>
                </div>

                <div className="mt-8 overflow-hidden">
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <MagneticButton>
                            <a href="https://github.com/Haeseong-Kwon" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-16 h-16 rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300 text-foreground group">
                                <Github size={24} className="group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40"
            >
                <span className="text-xs uppercase tracking-[0.3em] font-medium">Scroll</span>
                <div className="w-[1px] h-12 bg-foreground/20 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-full bg-foreground"
                    />
                </div>
            </motion.div>
        </section>
    );
}
