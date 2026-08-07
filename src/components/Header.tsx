"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { EASE } from "@/lib/motion";
import { smoothScrollTo } from "./SmoothScroll";

export const NAV = [
    { id: "index", label: "INDEX" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "stack", label: "STACK" },
    { id: "work", label: "WORK" },
    { id: "awards", label: "AWARDS" },
    { id: "contact", label: "CONTACT" },
] as const;

/**
 * The bar never picks a colour — `mix-blend-difference` on white makes it
 * read as ink over paper sections and as paper over ink ones, automatically.
 */
export default function Header() {
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>("index");
    const { scrollY, scrollYProgress } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(y > prev && y > 220 && !open);
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        NAV.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const go = (id: string) => {
        setOpen(false);
        smoothScrollTo(id);
    };

    const activeIndex = Math.max(0, NAV.findIndex((n) => n.id === active));

    return (
        <>
            <motion.div
                aria-hidden
                className="fixed top-0 right-0 left-0 z-[85] h-px origin-left bg-white mix-blend-difference"
                style={{ scaleX: scrollYProgress }}
            />

            <motion.header
                className="fixed top-0 z-[80] w-full mix-blend-difference"
                animate={{ y: hidden ? "-110%" : "0%" }}
                transition={{ duration: 0.5, ease: EASE.expo }}
            >
                <div className="flex items-center justify-between px-6 py-6 text-white md:px-12">
                    <button onClick={() => go("index")} className="label tracking-[0.16em]">
                        HAESEONG KWON
                    </button>

                    <nav className="hidden items-center gap-8 md:flex">
                        {NAV.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => go(id)}
                                aria-current={active === id ? "true" : undefined}
                                className="label relative py-1"
                            >
                                <span className={active === id ? "opacity-100" : "opacity-45"}>{label}</span>
                                {active === id && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute -bottom-0.5 left-0 h-px w-full bg-white"
                                        transition={{ duration: 0.5, ease: EASE.expo }}
                                    />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <span className="label hidden tabular-nums opacity-45 md:inline">
                            {String(activeIndex + 1).padStart(2, "0")} / {String(NAV.length).padStart(2, "0")}
                        </span>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-label={open ? "Close menu" : "Open menu"}
                            className="label md:hidden"
                        >
                            {open ? "CLOSE" : "MENU"}
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="on-ink fixed inset-0 z-[75] flex flex-col justify-center bg-ink px-6 md:hidden"
                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.7, ease: EASE.expo }}
                    >
                        {NAV.map(({ id, label }, i) => (
                            <div key={id} className="overflow-hidden border-b border-paper/15">
                                <motion.button
                                    onClick={() => go(id)}
                                    className="font-display block w-full py-5 text-left text-4xl uppercase text-paper"
                                    initial={{ y: "110%" }}
                                    animate={{ y: "0%" }}
                                    exit={{ y: "110%" }}
                                    transition={{ duration: 0.7, delay: 0.12 + i * 0.05, ease: EASE.expo }}
                                >
                                    {label}
                                </motion.button>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
