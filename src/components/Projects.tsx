"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github } from "lucide-react";
import { useRef } from "react";

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
        mediaUrl: "https://github.com/Haeseong-Kwon/Metasurface-Designer/blob/main/demo_smooth.gif?raw=true",
    },
    {
        title: "Metasurface Process Yield Predictor",
        description: "ML pipeline predicting fabrication reliability to minimize material waste in semiconductor processes.",
        github: "https://github.com/Haeseong-Kwon/Metasurface-Process-Yield-Predictor",
        mediaUrl: "https://github.com/Haeseong-Kwon/Metasurface-Process-Yield-Predictor/blob/main/docs/yield_predictor_demo.gif?raw=true",
    },
    {
        title: "Meta-Atom Dataset Factory",
        description: "High-throughput simulation engine for generating large-scale meta-atom datasets for deep learning training.",
        github: "https://github.com/Haeseong-Kwon/Meta-Atom-Dataset-Factory",
        mediaUrl: "https://github.com/Haeseong-Kwon/Meta-Atom-Dataset-Factory/blob/main/dataset_factory_demo.webp?raw=true",
    },
    {
        title: "Brain MRI Assist",
        description: "PINN-based medical imaging enhancement tool, improving MRI resolution via physics-informed neural networks.",
        github: "https://github.com/Haeseong-Kwon/Brain-MRI-Assist",
        mediaUrl: "https://github.com/Haeseong-Kwon/Brain-MRI-Assist/blob/main/brain_mri_assist_demo.gif?raw=true",
    },
    {
        title: "PINN WaveLab",
        description: "Professional framework for simulating wave physics through neural networks, bypassing traditional heavy solvers.",
        github: "https://github.com/Haeseong-Kwon/PINN-WaveLab",
        mediaUrl: "https://github.com/Haeseong-Kwon/PINN-WaveLab/blob/main/pinn_wavelab_demo.gif?raw=true",
    },
    {
        title: "Optics Restoration Studio",
        description: "State-of-the-art AI studio for lens aberration correction and image deblurring in high-precision optics.",
        github: "https://github.com/Haeseong-Kwon/Optics-Restoration-Studio",
        mediaUrl: "https://github.com/Haeseong-Kwon/Optics-Restoration-Studio/blob/main/optics_restoration_demo_v6_final.webp?raw=true",
    },
    {
        title: "CMOS Sensor Health Dashboard",
        description: "Real-time industrial monitoring dashboard using anomaly detection to ensure sensor manufacturing quality.",
        github: "https://github.com/Haeseong-Kwon/CMOS-Sensor-Health-Dashboard",
        mediaUrl: "https://github.com/Haeseong-Kwon/CMOS-Sensor-Health-Dashboard/blob/main/assets/sensor_dashboard_full_workflow.gif?raw=true",
    },
    {
        title: "AR/VR Display Calibrator",
        description: "Computer vision solution for correcting color and distortion in next-gen AR/VR display units.",
        github: "https://github.com/Haeseong-Kwon/AR-VR-Display-Calibrator",
        mediaUrl: "https://github.com/Haeseong-Kwon/AR-VR-Display-Calibrator/blob/main/ar_vr_calibrator_demo.gif?raw=true",
    },
    {
        title: "Photonics Experiment Log Analyzer",
        description: "LLM-agent that parses unstructured experimental logs into structured data assets for research teams.",
        github: "https://github.com/Haeseong-Kwon/Photonics-Experiment-Log-Analyzer",
        mediaUrl: "https://github.com/Haeseong-Kwon/Photonics-Experiment-Log-Analyzer/blob/main/photonics_log_analyzer_demo.gif?raw=true",
    },
    {
        title: "Solar Cell Curve Intelligence",
        description: "Intelligence system characterizing photovoltaic efficiency curves to optimize solar cell performance.",
        github: "https://github.com/Haeseong-Kwon/Solar-Cell-Curve-Intelligence",
        mediaUrl: "https://github.com/Haeseong-Kwon/Solar-Cell-Curve-Intelligence/blob/main/solar_cell_intelligence_demo.gif?raw=true",
    },
    {
        title: "Medical GenAI Augmentor",
        description: "Generative AI pipeline for augmenting rare medical datasets to improve diagnostic model accuracy.",
        github: "https://github.com/Haeseong-Kwon/Medical-GenAI-Augmentor",
        mediaUrl: "https://github.com/Haeseong-Kwon/Medical-GenAI-Augmentor/blob/main/medical_augmentor_demo.gif?raw=true",
    },
];

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
                <motion.img
                    style={{ scale }}
                    src={project.mediaUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:!scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                />
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
