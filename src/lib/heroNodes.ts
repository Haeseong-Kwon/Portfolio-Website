export type Tier = 1 | 2;

/** A labelled spoke of the hero diagram. `angle` is degrees clockwise from east. */
export type HeroNode = {
    en: string;
    ko: string;
    angle: number;
    /** Base radius in reference pixels, measured against a 1440×900 stage. */
    radius: number;
    tier: Tier;
};

/**
 * Twelve labels on irregular angles and wildly uneven radii — the asymmetry is
 * the point. Evenly spaced spokes at equal length read as a sunburst clip-art;
 * jittered spacing and a 300–540 radius spread read as a drawn diagram.
 *
 * Tier 1 = discipline, tier 2 = temperament.
 */
export const HERO_NODES: HeroNode[] = [
    { en: "ARCHITECTURE", ko: "아키텍처", angle: 10, radius: 540, tier: 1 },
    { en: "NIGHT OWL", ko: "야행성", angle: 41, radius: 330, tier: 2 },
    { en: "PRODUCT", ko: "프로덕트", angle: 79, radius: 415, tier: 1 },
    { en: "OBSESSIVE", ko: "집요함", angle: 113, radius: 300, tier: 2 },
    { en: "STRATEGY", ko: "전략", angle: 145, radius: 395, tier: 1 },
    { en: "INFRA", ko: "인프라", angle: 173, radius: 530, tier: 1 },
    { en: "RESEARCH", ko: "연구", angle: 206, radius: 470, tier: 1 },
    { en: "CTRL+Z", ko: "CTRL+Z", angle: 233, radius: 310, tier: 2 },
    { en: "FULL-STACK", ko: "풀스택", angle: 263, radius: 430, tier: 1 },
    { en: "RELENTLESS", ko: "끈질김", angle: 289, radius: 320, tier: 2 },
    { en: "AI RESEARCH", ko: "AI 연구", angle: 317, radius: 465, tier: 1 },
    { en: "PRECISION", ko: "정교함", angle: 345, radius: 350, tier: 2 },
];

/** Total spokes drawn. The unlabelled remainder is what gives the field density. */
export const RAY_COUNT = 42;
