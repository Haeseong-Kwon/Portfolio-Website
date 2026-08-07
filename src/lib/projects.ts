export type Project = {
    title: string;
    description: string;
    tags: string[];
    github: string;
    mediaUrl: string;
};

export const PROJECTS: Project[] = [
    {
        title: "MetaSurface Designer",
        description:
            "AI-driven inverse design tool for nanophotonic structures, optimizing complex physical parameters in seconds.",
        tags: ["Inverse Design", "Photonics"],
        github: "https://github.com/Haeseong-Kwon/Metasurface-Designer",
        mediaUrl: "/projects/metasurface_designer.mp4",
    },
    {
        title: "Process Yield Predictor",
        description:
            "ML pipeline predicting fabrication reliability to minimize material waste in semiconductor processes.",
        tags: ["ML Pipeline", "Semiconductor"],
        github: "https://github.com/Haeseong-Kwon/Metasurface-Process-Yield-Predictor",
        mediaUrl: "/projects/yield_predictor.mp4",
    },
    {
        title: "Meta-Atom Dataset Factory",
        description:
            "High-throughput simulation engine for generating large-scale meta-atom datasets for deep learning training.",
        tags: ["Simulation", "Data Engineering"],
        github: "https://github.com/Haeseong-Kwon/Meta-Atom-Dataset-Factory",
        mediaUrl: "/projects/dataset_factory.mp4",
    },
    {
        title: "Brain MRI Assist",
        description:
            "PINN-based medical imaging enhancement tool, improving MRI resolution via physics-informed neural networks.",
        tags: ["PINN", "Medical Imaging"],
        github: "https://github.com/Haeseong-Kwon/Brain-MRI-Assist",
        mediaUrl: "/projects/brain_mri_assist.mp4",
    },
    {
        title: "PINN WaveLab",
        description:
            "Framework for simulating wave physics through neural networks, bypassing traditional heavy solvers.",
        tags: ["PINN", "Wave Physics"],
        github: "https://github.com/Haeseong-Kwon/PINN-WaveLab",
        mediaUrl: "/projects/pinn_wavelab.mp4",
    },
    {
        title: "Optics Restoration Studio",
        description:
            "AI studio for lens aberration correction and image deblurring in high-precision optics.",
        tags: ["Computer Vision", "Optics"],
        github: "https://github.com/Haeseong-Kwon/Optics-Restoration-Studio",
        mediaUrl: "/projects/optics_restoration.mp4",
    },
    {
        title: "CMOS Sensor Health Dashboard",
        description:
            "Real-time industrial monitoring dashboard using anomaly detection to ensure sensor manufacturing quality.",
        tags: ["Anomaly Detection", "Realtime"],
        github: "https://github.com/Haeseong-Kwon/CMOS-Sensor-Health-Dashboard",
        mediaUrl: "/projects/cmos_dashboard.mp4",
    },
    {
        title: "AR/VR Display Calibrator",
        description:
            "Computer vision solution for correcting color and distortion in next-gen AR/VR display units.",
        tags: ["Computer Vision", "Calibration"],
        github: "https://github.com/Haeseong-Kwon/AR-VR-Display-Calibrator",
        mediaUrl: "/projects/ar_vr_calibrator.mp4",
    },
    {
        title: "Photonics Log Analyzer",
        description:
            "LLM agent that parses unstructured experimental logs into structured data assets for research teams.",
        tags: ["LLM Agent", "Data Extraction"],
        github: "https://github.com/Haeseong-Kwon/Photonics-Experiment-Log-Analyzer",
        mediaUrl: "/projects/photonics_log_analyzer.mp4",
    },
    {
        title: "Solar Cell Curve Intelligence",
        description:
            "Intelligence system characterizing photovoltaic efficiency curves to optimize solar cell performance.",
        tags: ["Analytics", "Photovoltaics"],
        github: "https://github.com/Haeseong-Kwon/Solar-Cell-Curve-Intelligence",
        mediaUrl: "/projects/solar_cell_curve.mp4",
    },
    {
        title: "Medical GenAI Augmentor",
        description:
            "Generative AI pipeline for augmenting rare medical datasets to improve diagnostic model accuracy.",
        tags: ["Generative AI", "Healthcare"],
        github: "https://github.com/Haeseong-Kwon/Medical-GenAI-Augmentor",
        mediaUrl: "/projects/medical_augmentor.mp4",
    },
];
