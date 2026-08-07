"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { EASE, VIEWPORT } from "@/lib/motion";

const EXPERIENCES = [
    {
        role: "Service Launch & Platform Strategy",
        kr: "통합 개발 플랫폼 'AOP' 기획 및 외주 서비스 런칭 주도",
        company: "AOP",
        date: "2023 — NOW",
    },
    {
        role: "Marketing Agency Infrastructure",
        kr: "마케팅 에이전시 및 산업 플랫폼 웹 인프라 전면 현대화",
        company: "GrowingUp",
        date: "2023",
    },
    {
        role: "Data-Driven E-commerce Operation",
        kr: "'오스타몰k' 운영 3개월 내 파워 등급 달성 및 데이터 기반 시장 대응",
        company: "오스타몰k",
        date: "2023",
    },
    {
        role: "Crowdfunding Success Record",
        kr: "와디즈 MVP 기획 및 프로젝트 연속 성공 (달성률 3000%)",
        company: "Wadiz",
        date: "2024",
    },
    {
        role: "Deoklim Basic Development",
        kr: "B2B 산업군에 맞춘 견고한 인프라 및 UI/UX 설계",
        company: "Shotcrete117",
        date: "2023",
    },
    {
        role: "Full-Cycle Freelance Management",
        kr: "기획부터 세무 행정까지 전 과정을 독립적으로 수행하는 1인 운용",
        company: "Independent",
        date: "2022 — NOW",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="w-full bg-paper px-6 py-28 md:px-12 md:py-40">
            <SectionHeader
                index="01 — EXPERIENCE"
                title="Track record"
                caption="Shipped, operated and owned end to end"
            />

            <div className="mt-20 md:mt-28">
                {EXPERIENCES.map((item, i) => (
                    <motion.div
                        key={item.role}
                        className="group relative overflow-hidden border-t border-ink/20 last:border-b"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.8, delay: i * 0.05, ease: EASE.expo }}
                    >
                        {/* fill sweeps in from the left rather than snapping */}
                        <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                        <div className="relative flex flex-col gap-6 py-8 transition-colors duration-500 group-hover:text-paper md:flex-row md:items-center md:gap-10 md:py-12">
                            <span className="label w-12 shrink-0 tabular-nums opacity-40">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="flex-1">
                                <h3
                                    className="font-display uppercase leading-[0.95]"
                                    style={{ fontSize: "clamp(1.35rem, 3.2vw, 2.75rem)" }}
                                >
                                    {item.role}
                                </h3>
                                <p className="selectable break-keep mt-3 max-w-xl text-sm leading-relaxed opacity-55">
                                    {item.kr}
                                </p>
                            </div>

                            <div className="flex items-baseline gap-6 md:w-64 md:shrink-0 md:flex-col md:items-end md:gap-2">
                                <span className="label tracking-[0.14em]">{item.company}</span>
                                <span className="label tabular-nums opacity-45">{item.date}</span>
                            </div>

                            <span
                                aria-hidden
                                className="hidden -translate-x-4 text-2xl opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 md:block"
                            >
                                ↗
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
