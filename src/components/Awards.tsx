"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { EASE, VIEWPORT } from "@/lib/motion";

const GROUPS = [
    {
        year: "2026",
        items: [
            "한양대학교 SW/AI 융합 창업연구개발과제 선정",
            "인하대학교 예비창업패키지 선정 (Item: INSPEC)",
        ],
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
            "한양대학교 해동창업경진대회 장려상",
        ],
    },
    {
        year: "2024",
        items: ["한양대학교 SID Audition 본선 진출 (AI 추천 알고리즘)"],
    },
];

const PATENTS = ["사용자 피드백 기반 추천 시스템", "공정 검증 시스템"];
const CERTS = [
    { name: "SQLD", detail: "SQL Developer" },
    { name: "ADsP", detail: "Data Analysis Semi-Professional" },
];

export default function Awards() {
    return (
        <section id="awards" className="on-ink w-full bg-ink px-6 py-28 md:px-12 md:py-40">
            <SectionHeader
                onInk
                index="04 — AWARDS"
                title="Recognition"
                caption="Technical innovation and entrepreneurship"
            />

            <div className="mt-20 md:mt-28">
                {GROUPS.map((group) => (
                    <div key={group.year} className="border-t border-paper/15 py-10 md:flex md:gap-16 md:py-14">
                        <motion.h3
                            className="font-display mb-6 shrink-0 text-paper/35 md:sticky md:top-28 md:mb-0 md:h-fit md:w-48"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={VIEWPORT}
                            transition={{ duration: 0.8, ease: EASE.expo }}
                        >
                            {group.year}
                        </motion.h3>

                        <ul className="flex-1">
                            {group.items.map((item, i) => (
                                <motion.li
                                    key={item}
                                    className="selectable break-keep flex items-start gap-5 border-b border-paper/10 py-5 text-paper last:border-b-0"
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={VIEWPORT}
                                    transition={{ duration: 0.7, delay: i * 0.05, ease: EASE.expo }}
                                >
                                    <span className="label mt-1.5 shrink-0 tabular-nums text-paper/30">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-lg leading-snug md:text-2xl">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* hairline-gap pair: the 1px background shows through as the divider */}
            <div className="mt-24 grid gap-px bg-paper/15 md:grid-cols-2">
                <div className="bg-ink p-8 md:p-14">
                    <span className="label text-paper/40">Intellectual Property</span>
                    <ul className="mt-8 flex flex-col gap-6">
                        {PATENTS.map((patent) => (
                            <li key={patent} className="selectable break-keep">
                                <span className="label text-paper/30">Patent Pending</span>
                                <p className="mt-2 text-lg text-paper md:text-xl">{patent}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-ink p-8 md:p-14">
                    <span className="label text-paper/40">Certifications</span>
                    <ul className="mt-8 flex flex-col gap-6">
                        {CERTS.map((cert) => (
                            <li
                                key={cert.name}
                                className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-4"
                            >
                                <span className="font-display text-xl uppercase text-paper">{cert.name}</span>
                                <span className="label text-right text-paper/40">{cert.detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
