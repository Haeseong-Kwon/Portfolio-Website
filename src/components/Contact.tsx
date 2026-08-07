"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Constellation from "./Constellation";
import RevealText from "./RevealText";
import { EASE, VIEWPORT } from "@/lib/motion";

// TODO: swap for the real address before publishing.
const EMAIL = "contact@example.com";

const LINKS = [
    { label: "GITHUB", href: "https://github.com/Haeseong-Kwon" },
    { label: "EMAIL", href: `mailto:${EMAIL}` },
];

/** Seoul wall clock. Rendered only after mount so SSR and client agree. */
function SeoulClock() {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const tick = () =>
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    timeZone: "Asia/Seoul",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }).format(new Date())
            );
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <span className="label tabular-nums text-paper/40">
            SEOUL {time ?? "--:--:--"}
        </span>
    );
}

export default function Contact() {
    return (
        <section id="contact" className="on-ink relative w-full overflow-hidden bg-ink">
            <Constellation />

            <div className="relative flex min-h-screen flex-col justify-between px-6 py-28 md:px-12 md:py-32">
                <div className="flex items-baseline justify-between">
                    <span className="label text-paper/40">05 — CONTACT</span>
                    <SeoulClock />
                </div>

                <div className="py-20">
                    <motion.span
                        className="label block text-paper/40"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.8, ease: EASE.expo }}
                    >
                        Open to work, collaboration and hard problems
                    </motion.span>

                    <RevealText
                        as="h2"
                        text="Let's build it."
                        className="font-display mt-6 uppercase leading-[0.85] text-paper"
                        style={{ fontSize: "clamp(3rem, 12vw, 12rem)" }}
                    />

                    <div className="mt-14 flex flex-col gap-6 md:flex-row md:gap-12">
                        {LINKS.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="group relative w-fit overflow-hidden"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: EASE.expo }}
                            >
                                <span className="font-display flex items-center gap-3 text-2xl uppercase text-paper md:text-4xl">
                                    {link.label}
                                    <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:-translate-y-2">
                                        ↗
                                    </span>
                                </span>
                                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
                    <span className="label text-paper/40">
                        © {new Date().getFullYear()} HAESEONG KWON
                    </span>
                    <span className="label text-paper/40">
                        BUILT WITH NEXT.JS — TYPESET IN ARCHIVO BLACK &amp; SPACE GROTESK
                    </span>
                </div>
            </div>
        </section>
    );
}
