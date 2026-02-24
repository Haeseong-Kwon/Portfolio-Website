"use client";

import { motion } from "framer-motion";

const allSkills = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "TailwindCSS", category: "Frontend" },
    { name: "Flutter", category: "Frontend" },
    { name: "Dart", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Svelte", category: "Frontend" },
    { name: "React Native", category: "Frontend" },
    { name: "Redux", category: "Frontend" },
    { name: "Zustand", category: "Frontend" },
    { name: "React Query", category: "Frontend" },
    { name: "Shadcn UI", category: "Frontend" },
    { name: "MUI", category: "Frontend" },
    { name: "Storybook", category: "Frontend" },
    { name: "Framer Motion", category: "Frontend" },

    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "NestJS", category: "Backend" },
    { name: "FastAPI", category: "Backend" },
    { name: "Django", category: "Backend" },
    { name: "Spring Boot", category: "Backend" },
    { name: "Go", category: "Backend" },
    { name: "Supabase", category: "Backend" },
    { name: "Firebase", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "MySQL", category: "Backend" },
    { name: "PlanetScale", category: "Backend" },
    { name: "Prisma", category: "Backend" },
    { name: "Redis", category: "Backend" },
    { name: "REST API", category: "Backend" },
    { name: "GraphQL", category: "Backend" },
    { name: "tRPC", category: "Backend" },
    { name: "gRPC", category: "Backend" },
    { name: "OpenAPI", category: "Backend" },
    { name: "Swagger", category: "Backend" },

    { name: "Vercel", category: "DevOps" },
    { name: "Render", category: "DevOps" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "Nginx", category: "DevOps" },
    { name: "GitHub Actions", category: "DevOps" },
    { name: "GitLab CI", category: "DevOps" },
    { name: "Terraform", category: "DevOps" },
    { name: "Cloudflare", category: "DevOps" },
    { name: "AWS", category: "DevOps" },
    { name: "GCP", category: "DevOps" },
    { name: "Azure", category: "DevOps" },
    { name: "Sentry", category: "DevOps" },
    { name: "Prometheus", category: "DevOps" },
    { name: "Grafana", category: "DevOps" },

    { name: "Make", category: "Tools" },
    { name: "n8n", category: "Tools" },
    { name: "Zapier", category: "Tools" },
    { name: "Airflow", category: "Tools" },
    { name: "Prefect", category: "Tools" },
    { name: "ChatGPT", category: "Tools" },
    { name: "OpenAI API", category: "Tools" },
    { name: "LangChain", category: "Tools" },
    { name: "LangGraph", category: "Tools" },
    { name: "Postman", category: "Tools" },

    { name: "Git", category: "Collab" },
    { name: "GitHub", category: "Collab" },
    { name: "Notion", category: "Collab" },
    { name: "Figma", category: "Collab" },
    { name: "Slack", category: "Collab" },
    { name: "Linear", category: "Collab" },
    { name: "Jira", category: "Collab" },
    { name: "Confluence", category: "Collab" },

    { name: "Python", category: "AI" },
    { name: "NumPy", category: "AI" },
    { name: "Pandas", category: "AI" },
    { name: "scikit-learn", category: "AI" },
    { name: "PyTorch", category: "AI" },
    { name: "TensorFlow", category: "AI" },
    { name: "Keras", category: "AI" },
    { name: "PyTorch Lightning", category: "AI" },
    { name: "OpenCV", category: "AI" },
    { name: "HuggingFace", category: "AI" },
    { name: "ONNX", category: "AI" },
    { name: "CUDA", category: "AI" },
    { name: "MLflow", category: "AI" },
    { name: "Weights & Biases", category: "AI" },
];

export default function TechStack() {
    return (
        <section id="tech" className="py-20 md:py-24 px-6 md:px-12 lg:px-24 w-full bg-foreground relative overflow-hidden">
            <div className="max-w-[120rem] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-background leading-[0.9]"
                        >
                            TECH STACK
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-background/50 font-medium tracking-widest uppercase text-xs md:text-sm max-w-sm text-right"
                        >
                            The Complete Arsenal
                        </motion.div>
                    </div>
                </div>

                {/* Grouped Cloud Label High-Density Grid (Dark Mode) */}
                <div className="flex flex-col gap-10 md:gap-14 max-w-[100rem] mx-auto pt-10 border-t border-background/20">
                    {["Frontend", "Backend", "AI", "DevOps", "Tools", "Collab"].map((category, catIdx) => {
                        const categorySkills = allSkills.filter(skill => skill.category === category);
                        if (categorySkills.length === 0) return null;

                        return (
                            <div key={category} className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12">
                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                                    className="text-2xl md:text-3xl font-bold tracking-tighter text-background shrink-0 w-32 md:w-40 pt-1"
                                >
                                    {category}
                                </motion.h3>

                                <div className="flex flex-wrap gap-2 md:gap-3 w-full">
                                    {categorySkills.map((skill, idx) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{
                                                duration: 0.4,
                                                delay: Math.random() * 0.3, // Random stagger for cloud effect
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            className="group relative overflow-hidden px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-background/30 hover:bg-background transition-colors duration-500 cursor-default"
                                        >
                                            <span className="relative z-10 text-xs md:text-sm font-bold tracking-tight text-background/80 group-hover:text-foreground transition-colors duration-500">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
