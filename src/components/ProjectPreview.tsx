"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import type { Project } from "@/lib/projects";
import { EASE } from "@/lib/motion";

/**
 * One video element for the whole index, parked under the cursor. Swapping the
 * src on hover keeps a single decoder alive instead of eleven — the reason the
 * list can hold this many clips without stalling scroll.
 */
export default function ProjectPreview({ project }: { project: Project | null }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, { stiffness: 190, damping: 26, mass: 0.7 });
    const smoothY = useSpring(y, { stiffness: 190, damping: 26, mass: 0.7 });

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [x, y]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !project) return;
        video.src = project.mediaUrl;
        video.play().catch(() => {
            /* autoplay blocked — the still frame is enough */
        });
    }, [project]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
            <motion.div
                className="absolute top-0 left-0"
                style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
            >
                <AnimatePresence>
                    {project && (
                        <motion.div
                            key="preview"
                            className="w-[26rem] overflow-hidden bg-ink lg:w-[32rem]"
                            initial={{ opacity: 0, scale: 0.92, clipPath: "inset(50% 0% 50% 0%)" }}
                            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                            exit={{ opacity: 0, scale: 0.96, clipPath: "inset(50% 0% 50% 0%)" }}
                            transition={{ duration: 0.55, ease: EASE.expo }}
                        >
                            <video
                                ref={videoRef}
                                className="aspect-video w-full object-cover"
                                muted
                                loop
                                playsInline
                                preload="none"
                            />
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="label text-paper/70">{project.tags[0]}</span>
                                <span className="label text-paper/70">GITHUB ↗</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
