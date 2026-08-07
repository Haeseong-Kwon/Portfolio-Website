"use client";

import { motion } from "framer-motion";
import Marquee from "./Marquee";
import SectionHeader from "./SectionHeader";
import { EASE, VIEWPORT } from "@/lib/motion";

const STACK: { category: string; skills: string[] }[] = [
    {
        category: "Frontend",
        skills: [
            "React", "Next.js", "TypeScript", "TailwindCSS", "Flutter", "Dart", "Vue.js", "Svelte",
            "React Native", "Redux", "Zustand", "React Query", "Shadcn UI", "MUI", "Storybook",
            "Framer Motion",
        ],
    },
    {
        category: "Backend",
        skills: [
            "Node.js", "Express", "NestJS", "FastAPI", "Django", "Spring Boot", "Go", "Supabase",
            "Firebase", "PostgreSQL", "MongoDB", "MySQL", "PlanetScale", "Prisma", "Redis",
            "REST API", "GraphQL", "tRPC", "gRPC", "OpenAPI", "Swagger",
        ],
    },
    {
        category: "AI",
        skills: [
            "Python", "NumPy", "Pandas", "scikit-learn", "PyTorch", "TensorFlow", "Keras",
            "PyTorch Lightning", "OpenCV", "HuggingFace", "ONNX", "CUDA", "MLflow",
            "Weights & Biases",
        ],
    },
    {
        category: "DevOps",
        skills: [
            "Vercel", "Render", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "GitLab CI",
            "Terraform", "Cloudflare", "AWS", "GCP", "Azure", "Sentry", "Prometheus", "Grafana",
        ],
    },
    {
        category: "Tools",
        skills: [
            "Make", "n8n", "Zapier", "Airflow", "Prefect", "ChatGPT", "OpenAI API", "LangChain",
            "LangGraph", "Postman",
        ],
    },
    {
        category: "Collab",
        skills: ["Git", "GitHub", "Notion", "Figma", "Slack", "Linear", "Jira", "Confluence"],
    },
];

const TOTAL = STACK.reduce((n, group) => n + group.skills.length, 0);

/**
 * Ninety-odd tools would drown a grid, so each category becomes its own
 * ticker: alternating direction, speed scaled to the row's length, paused on
 * hover so anything can actually be read.
 */
export default function TechStack() {
    return (
        <section id="stack" className="on-ink w-full overflow-hidden bg-ink py-28 md:py-40">
            <div className="px-6 md:px-12">
                <SectionHeader
                    onInk
                    index="02 — STACK"
                    title={`${TOTAL} tools`}
                    caption="Chosen per problem, not per résumé"
                />
            </div>

            <div className="mt-20 md:mt-28">
                {STACK.map((group, i) => (
                    <motion.div
                        key={group.category}
                        className="border-t border-paper/15 py-7 last:border-b md:py-9"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.8, delay: i * 0.06, ease: EASE.expo }}
                    >
                        <div className="mb-3 px-6 md:px-12">
                            <span className="label text-paper/40">
                                {group.category} · {group.skills.length}
                            </span>
                        </div>
                        <Marquee
                            items={group.skills}
                            reverse={i % 2 === 1}
                            duration={group.skills.length * 2.6}
                            separator="·"
                            className="font-display text-[clamp(1.15rem,2.6vw,2.1rem)] uppercase"
                            itemClassName="text-paper/50 transition-colors duration-300 hover:text-paper"
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
