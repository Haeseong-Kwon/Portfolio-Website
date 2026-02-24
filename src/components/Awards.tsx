"use client";

import { motion } from "framer-motion";

const groups = [
    {
        year: "2026",
        items: [
            "한양대학교 SW/AI 융합 창업연구개발과제 선정",
            "인하대학교 예비창업패키지 선정 (Item: INSPEC)"
        ]
    },
    {
        year: "2025",
        items: [
            "한양대학교 SW종합학술대회 대상 (총장상)",
            "한양대학교 AI-커리어 톤 최우수상 (총장상)",
            "한양대학교 SW창업우수상 (우수사례 선정)",
            "한양대학교 SID Audition 최우수상 (드론 배터리 관리 시스템)",
            "한양대학교 SW융합대학 포트폴리오 경진대회 최우수상",
            "한양대학교 SW창업 IR 경진대회 장려상",
            "한양대학교 해동창업경진대회 장려상"
        ]
    },
    {
        year: "2024",
        items: [
            "한양대학교 SID Audition 본선 진출 (AI 추천 알고리즘)"
        ]
    }
];

export default function Awards() {
    return (
        <section id="awards" className="py-32 px-6 md:px-12 lg:px-24 w-full bg-background border-t border-foreground overflow-hidden">
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
                            AWARDS
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
                            Recognized for excellence in technical innovation and entrepreneurship
                        </motion.p>
                    </div>
                </div>

                <div className="flex flex-col">
                    {groups.map((group, groupIdx) => (
                        <div key={group.year} className="flex flex-col md:flex-row border-t border-foreground py-16 gap-8 md:gap-24">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
                                className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground shrink-0 w-40"
                            >
                                {group.year}
                            </motion.h3>
                            <div className="flex flex-col w-full border-t border-foreground/20 md:border-none md:pt-0 pt-8">
                                {group.items.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: (groupIdx * 0.1) + (idx * 0.05), ease: [0.16, 1, 0.3, 1] }}
                                        className="group flex items-center justify-between py-8 md:py-10 border-b border-foreground/20 hover:bg-foreground hover:text-background transition-colors duration-500 px-6 -mx-6 md:px-12 md:-mx-12 cursor-default"
                                    >
                                        <h4 className="text-2xl md:text-4xl font-bold tracking-tight group-hover:text-background transition-colors duration-500 break-keep">
                                            {item}
                                        </h4>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Intellectual Property & Certs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-32 bg-foreground border border-foreground">
                    <div className="bg-background p-12 md:p-20 flex flex-col gap-6 group hover:bg-foreground transition-colors duration-500 cursor-default">
                        <h3 className="text-3xl font-black uppercase tracking-tight group-hover:text-background transition-colors">Intellectual Property</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50 group-hover:text-background/50 transition-colors">Patent Pending</span>
                                <span className="text-xl font-bold group-hover:text-background transition-colors">사용자 피드백 기반 추천 시스템</span>
                            </div>
                            <div className="flex flex-col gap-1 mt-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50 group-hover:text-background/50 transition-colors">Patent Pending</span>
                                <span className="text-xl font-bold group-hover:text-background transition-colors">공정 검증 시스템</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-background p-12 md:p-20 flex flex-col gap-6 group hover:bg-foreground transition-colors duration-500 cursor-default">
                        <h3 className="text-3xl font-black uppercase tracking-tight group-hover:text-background transition-colors">Certifications</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between border-b border-foreground/20 pb-4">
                                <span className="text-xl font-bold group-hover:text-background transition-colors">SQLD</span>
                                <span className="text-sm font-bold uppercase tracking-widest text-foreground/50 group-hover:text-background/50 transition-colors">SQL Developer</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-foreground/20 pb-4 mt-4">
                                <span className="text-xl font-bold group-hover:text-background transition-colors">ADsP</span>
                                <span className="text-sm font-bold uppercase tracking-widest text-foreground/50 group-hover:text-background/50 transition-colors">Data Analysis</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
