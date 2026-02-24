"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github } from "lucide-react";
import { useRef, useEffect } from "react";

interface Project {
    title: string;
    description: string;
    github: string;
    mediaUrl: string;
}

const projects: Project[] = [
    {
        title: "MetaSurface Designer",
        description: "AI-driven inverse design tool for nanophotonic structures, optimizing complex physical parameters in seconds.",
        github: "https://github.com/Haeseong-Kwon/Metasurface-Designer",
        mediaUrl: "/projects/metasurface_designer.mp4",
    },
    {
        title: "Metasurface Process Yield Predictor",
        description: "ML pipeline predicting fabrication reliability to minimize material waste in semiconductor processes.",
        github: "https://github.com/Haeseong-Kwon/Metasurface-Process-Yield-Predictor",
        mediaUrl: "/projects/yield_predictor.mp4",
    },
    {
        title: "Meta-Atom Dataset Factory",
        description: "High-throughput simulation engine for generating large-scale meta-atom datasets for deep learning training.",
        github: "https://github.com/Haeseong-Kwon/Meta-Atom-Dataset-Factory",
        mediaUrl: "/projects/dataset_factory.mp4",
    },
    {
        title: "Brain MRI Assist",
        description: "PINN-based medical imaging enhancement tool, improving MRI resolution via physics-informed neural networks.",
        github: "https://github.com/Haeseong-Kwon/Brain-MRI-Assist",
        mediaUrl: "/projects/brain_mri_assist.mp4",
    },
    {
        title: "PINN WaveLab",
        description: "Professional framework for simulating wave physics through neural networks, bypassing traditional heavy solvers.",
        github: "https://github.com/Haeseong-Kwon/PINN-WaveLab",
        mediaUrl: "/projects/pinn_wavelab.mp4",
    },
    {
        title: "Optics Restoration Studio",
        description: "State-of-the-art AI studio for lens aberration correction and image deblurring in high-precision optics.",
        github: "https://github.com/Haeseong-Kwon/Optics-Restoration-Studio",
        mediaUrl: "/projects/optics_restoration.mp4",
    },
    {
        title: "CMOS Sensor Health Dashboard",
        description: "Real-time industrial monitoring dashboard using anomaly detection to ensure sensor manufacturing quality.",
        github: "https://github.com/Haeseong-Kwon/CMOS-Sensor-Health-Dashboard",
        mediaUrl: "/projects/cmos_dashboard.mp4",
    },
    {
        title: "AR/VR Display Calibrator",
        description: "Computer vision solution for correcting color and distortion in next-gen AR/VR display units.",
        github: "https://github.com/Haeseong-Kwon/AR-VR-Display-Calibrator",
        mediaUrl: "/projects/ar_vr_calibrator.mp4",
    },
    {
        title: "Photonics Experiment Log Analyzer",
        description: "LLM-agent that parses unstructured experimental logs into structured data assets for research teams.",
        github: "https://github.com/Haeseong-Kwon/Photonics-Experiment-Log-Analyzer",
        mediaUrl: "/projects/photonics_log_analyzer.mp4",
    },
    {
        title: "Solar Cell Curve Intelligence",
        description: "Intelligence system characterizing photovoltaic efficiency curves to optimize solar cell performance.",
        github: "https://github.com/Haeseong-Kwon/Solar-Cell-Curve-Intelligence",
        mediaUrl: "/projects/solar_cell_curve.mp4",
    },
    {
        title: "Medical GenAI Augmentor",
        description: "Generative AI pipeline for augmenting rare medical datasets to improve diagnostic model accuracy.",
        github: "https://github.com/Haeseong-Kwon/Medical-GenAI-Augmentor",
        mediaUrl: "/projects/medical_augmentor.mp4",
    },
];



function VideoPlayer({ project }: { project: Project }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoElement.play().catch(e => console.log("Autoplay failed:", e));
                    } else {
                        videoElement.pause();
                    }
                });
            },
            {
                threshold: 0.1, // Play when 10% visible
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out overflow-hidden">
            <video
                ref={videoRef}
                src={project.mediaUrl}
                className="w-full h-full object-cover object-center"
                loop
                muted
                playsInline
                preload="none"
                poster=""
            />
        </div>
    );
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Smooth, gentle scale from 1.05 down to 1 as it scrolls up
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    return (
        <motion.a
            ref={cardRef}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col h-[28rem] cursor-pointer"
        >
            <div className="relative w-full aspect-video overflow-hidden bg-zinc-900 mb-6 rounded-sm">
                <motion.div style={{ scale }} className="w-full h-full">
                    <VideoPlayer project={project} />
                </motion.div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white text-black rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <Github size={24} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-zinc-300 transition-colors">
                    {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                    {project.description}
                </p>
            </div>
        </motion.a>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 w-full bg-foreground text-background">
            <div className="mb-20 max-w-[90rem] mx-auto">
                <div className="overflow-hidden">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-background"
                    >
                        Deep Insights.
                    </motion.h2>
                </div>
                <div className="w-24 h-1.5 bg-background"></div>
                <div className="overflow-hidden">
                    <motion.p
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 text-xl text-background/70 max-w-2xl"
                    >
                        High-quality implementation details on AI, computer vision, and physical simulations.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {projects.map((project, idx) => (
                    <ProjectCard key={project.title} project={project} idx={idx} />
                ))}
            </div>
        </section>
    );
}
