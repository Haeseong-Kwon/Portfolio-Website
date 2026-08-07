"use client";

import { motion } from "framer-motion";
import RevealText from "./RevealText";
import { EASE, VIEWPORT } from "@/lib/motion";

type Props = {
    index: string;
    title: string;
    caption: string;
    /** Rendered on an ink background — flip the ink/paper roles. */
    onInk?: boolean;
};

/**
 * Every section opens the same way: an index number, a hairline that draws
 * itself across the full width, the display title, and a right-aligned caption.
 */
export default function SectionHeader({ index, title, caption, onInk = false }: Props) {
    const dim = onInk ? "text-paper/45" : "text-ink/45";
    const solid = onInk ? "text-paper" : "text-ink";
    const rule = onInk ? "bg-paper/25" : "bg-ink/20";

    return (
        <header className="w-full">
            <div className="flex items-start justify-between gap-8">
                <motion.span
                    className={`label ${dim}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, ease: EASE.expo }}
                >
                    {index}
                </motion.span>
                <motion.span
                    className={`label ${dim} max-w-[22rem] text-right leading-[1.7] tracking-[0.14em]`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE.expo }}
                >
                    {caption}
                </motion.span>
            </div>

            <motion.div
                className={`mt-4 h-px w-full origin-left ${rule}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, ease: EASE.expo }}
            />

            <RevealText
                as="h2"
                text={title}
                className={`font-display mt-8 uppercase leading-[0.82] ${solid}`}
                style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
            />
        </header>
    );
}
