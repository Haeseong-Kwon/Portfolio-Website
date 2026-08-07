"use client";

import { motion } from "framer-motion";
import { riseVariants, toWords, VIEWPORT } from "@/lib/motion";

type Props = {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    /** Seconds of delay before the first word starts. */
    delay?: number;
    as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
    /** Play immediately instead of waiting for the viewport. */
    immediate?: boolean;
};

/**
 * Word-by-word mask reveal. Each word sits in its own overflow-hidden box and
 * rises from beneath it, so the text is never seen mid-flight outside its line.
 */
export default function RevealText({
    text,
    className = "",
    style,
    delay = 0,
    as = "span",
    immediate = false,
}: Props) {
    const Tag = motion[as];
    const words = toWords(text);
    const animateProps = immediate
        ? { animate: "show" as const }
        : { whileInView: "show" as const, viewport: VIEWPORT };

    return (
        <Tag className={className} style={style} initial="hidden" {...animateProps}>
            {words.map((word, i) =>
                /\s/.test(word) ? (
                    <span key={i}> </span>
                ) : (
                    <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                        <motion.span
                            className="inline-block"
                            variants={riseVariants}
                            custom={i + delay / 0.055}
                        >
                            {word}
                        </motion.span>
                    </span>
                )
            )}
        </Tag>
    );
}
