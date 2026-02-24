"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Service Launch & Platform Strategy",
        krRole: "통합 개발 플랫폼 'AOP' 기획 및 외주 서비스 런칭 주도",
        company: "AOP",
        date: "2023 - Present",
    },
    {
        role: "Marketing Agency Infrastructure",
        krRole: "마케팅 에이전시 및 산업 플랫폼 웹 인프라 전면 현대화",
        company: "GrowingUp",
        date: "2023",
    },
    {
        role: "Data-Driven E-commerce Operation",
        krRole: "'오스타몰k' 운영 3개월 내 파워 등급 달성 및 데이터 기반 시장 대응",
        company: "오스타몰k",
        date: "2023",
    },
    {
        role: "Crowdfunding Success Record",
        krRole: "와디즈 MVP 기획 및 프로젝트 연속 성공 (달성률 3000%)",
        company: "Wadiz",
        date: "2024",
    },
    {
        role: "Deoklim Basic Development",
        krRole: "B2B 산업군에 맞춘 견고한 인프라 및 UI/UX 설계",
        company: "Shotcrete117",
        date: "2023",
    },
    {
        role: "Full-Cycle Freelance Management",
        krRole: "기획부터 세무 행정까지 전 과정을 독립적으로 수행하는 1인 운용",
        company: "Independent",
        date: "2022 - Present",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-32 px-6 md:px-12 lg:px-24 w-full bg-background border-t border-foreground">
            <div className="max-w-[120rem] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-foreground leading-[0.9]"
                        >
                            EXPERIENCE
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-foreground/50 font-medium tracking-widest uppercase text-sm md:text-base max-w-sm text-right"
                        >
                            A track record of absolute excellence in business and development
                        </motion.p>
                    </div>
                </div>

                <div className="flex flex-col border-t border-foreground">
                    {experiences.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-foreground hover:bg-foreground hover:text-background transition-colors duration-500 px-6 -mx-6 md:px-12 md:-mx-12 cursor-pointer"
                        >
                            <div className="flex flex-col gap-2 md:w-1/2">
                                <h3 className="text-3xl md:text-5xl font-bold tracking-tight group-hover:text-background transition-colors duration-500 break-words pr-8">
                                    {item.role}
                                </h3>
                                <p className="text-foreground/60 group-hover:text-background/70 font-medium text-sm md:text-base mt-2 transition-colors duration-500 break-keep">
                                    {item.krRole}
                                </p>
                            </div>

                            <div className="flex flex-col md:items-end gap-1 mt-6 md:mt-0 font-medium">
                                <span className="text-xl md:text-2xl font-bold tracking-tight uppercase">
                                    {item.company}
                                </span>
                                <span className="text-sm md:text-base text-foreground/50 group-hover:text-background/50 transition-colors duration-500 font-mono">
                                    {item.date}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
