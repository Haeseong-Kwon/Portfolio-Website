"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectPreview from "./ProjectPreview";
import { PROJECTS, type Project } from "@/lib/projects";
import { EASE, VIEWPORT } from "@/lib/motion";

/** Mobile card — no cursor to follow, so the clip plays in place when visible. */
function MobileCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!video.src) video.src = project.mediaUrl;
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.35 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [project.mediaUrl]);

    return (
        <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-ink/20 py-8 last:border-b"
        >
            <div className="mb-5 flex items-baseline justify-between">
                <span className="label tabular-nums opacity-40">{String(index + 1).padStart(2, "0")}</span>
                <span className="label opacity-40">{project.tags.join(" / ")}</span>
            </div>
            <div className="overflow-hidden bg-ink">
                <video ref={ref} className="aspect-video w-full object-cover" muted loop playsInline preload="none" />
            </div>
            <h3 className="font-display mt-5 text-2xl uppercase leading-[0.95]">{project.title}</h3>
            <p className="selectable mt-3 text-sm leading-relaxed opacity-55">{project.description}</p>
        </a>
    );
}

export default function Projects() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section id="work" className="w-full bg-paper px-6 py-28 md:px-12 md:py-40">
            <SectionHeader
                index="03 — WORK"
                title="Selected builds"
                caption="AI, computer vision and physical simulation, shipped as tools"
            />

            {/* ---------- desktop index ---------- */}
            <div className="mt-20 hidden md:block md:mt-28" onPointerLeave={() => setHovered(null)}>
                {PROJECTS.map((project, i) => (
                    <motion.a
                        key={project.title}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="view"
                        onPointerEnter={() => setHovered(i)}
                        className="group relative block border-t border-ink/20 last:border-b"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.7, delay: (i % 6) * 0.04, ease: EASE.expo }}
                    >
                        <motion.div
                            className="flex items-center gap-10 py-7"
                            animate={{
                                opacity: hovered === null || hovered === i ? 1 : 0.28,
                                x: hovered === i ? 18 : 0,
                            }}
                            transition={{ duration: 0.5, ease: EASE.expo }}
                        >
                            <span className="label w-12 shrink-0 tabular-nums opacity-40">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3
                                className="font-display flex-1 uppercase leading-[0.95]"
                                style={{ fontSize: "clamp(1.5rem, 3.6vw, 3.25rem)" }}
                            >
                                {project.title}
                            </h3>
                            <span className="label w-72 shrink-0 text-right opacity-45">
                                {project.tags.join(" / ")}
                            </span>
                        </motion.div>
                    </motion.a>
                ))}
            </div>

            {/* ---------- mobile cards ---------- */}
            <div className="mt-16 md:hidden">
                {PROJECTS.map((project, i) => (
                    <MobileCard key={project.title} project={project} index={i} />
                ))}
            </div>

            <ProjectPreview project={hovered === null ? null : PROJECTS[hovered]} />
        </section>
    );
}
