"use client";

import { useEffect, useRef } from "react";
import { HERO_NODES, RAY_COUNT, type HeroNode } from "@/lib/heroNodes";

const ENTRANCE_MS = 1300;
const STAGGER_MS = 420;
const INNER_GAP = 46; // clearance between the centre block and where a ray starts
const EDGE_PAD = 30;
const KEEPOUT_ATTR = "data-hero-keepout";

type Box = { left: number; top: number; right: number; bottom: number };
type Ray = {
    node: HeroNode | null;
    angle: number;
    radius: number;
    phase: number;
    order: number;
    /** Per-ray ink for unlabelled fillers; labelled spokes derive theirs from tier. */
    alpha: number;
};
type Placed = Ray & { drawRadius: number; clipRadius: number; shiftX: number; showLabel: boolean };

/** Below this width there is no room for the temperament tier's labels. */
const TIER2_LABEL_MIN_WIDTH = 560;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** 0→1 with eased shoulders, for fading things in and out of range. */
const smoothstep = (edge0: number, edge1: number, x: number) => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Deterministic PRNG — the filler field must be identical across resizes. */
const makeRandom = (seed: number) => () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
};

/**
 * Distance along a ray at which it first enters an axis-aligned box, or
 * Infinity if it never does. Standard slab test.
 */
const entryDistance = (
    ox: number,
    oy: number,
    ux: number,
    uy: number,
    box: Box
): number => {
    const inv = (d: number, lo: number, hi: number, o: number): [number, number] => {
        if (Math.abs(d) < 1e-6) return o >= lo && o <= hi ? [-Infinity, Infinity] : [Infinity, -Infinity];
        const a = (lo - o) / d;
        const b = (hi - o) / d;
        return a < b ? [a, b] : [b, a];
    };
    const [xMin, xMax] = inv(ux, box.left, box.right, ox);
    const [yMin, yMax] = inv(uy, box.top, box.bottom, oy);
    const enter = Math.max(xMin, yMin);
    const exit = Math.min(xMax, yMax);
    if (exit < Math.max(enter, 0)) return Infinity;
    return Math.max(enter, 0);
};

/**
 * The hero diagram, drawn on canvas rather than in the DOM.
 *
 * Forty-two spokes at 1px would be forty-two transformed elements fighting
 * subpixel anti-aliasing; on canvas they are exact, and animating all of them
 * every frame costs one draw call's worth of work.
 *
 * Anything marked `data-hero-keepout` punches a hole in the field: labels are
 * pulled inward until they clear it and spokes stop at its edge, so the
 * diagram can own the whole viewport without ever crossing the headline.
 *
 * Scroll progress is read from a ref inside the rAF loop, so scrolling never
 * re-renders React.
 */
export default function HeroDiagram({ progressRef }: { progressRef: React.RefObject<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // next/font generates the family name, so read it off the element
        const fontFamily = getComputedStyle(canvas).fontFamily;

        let width = 0;
        let height = 0;
        let cx = 0;
        let cy = 0;
        let scale = 1;
        let fontScale = 1;
        let placed: Placed[] = [];
        let frame = 0;
        let fontsReady = false;
        const started = performance.now();
        const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

        // ---- the ray field is built once; only its projection depends on size ----
        const random = makeRandom(20260807);
        const fillerCount = RAY_COUNT - HERO_NODES.length;
        const rays: Ray[] = [
            ...HERO_NODES.map((node) => ({
                node,
                angle: node.angle,
                radius: node.radius,
                phase: random() * Math.PI * 2,
                order: 0,
                alpha: node.tier === 1 ? 0.4 : 0.2,
            })),
            // Lengths spread wide and ink varies per ray. Clustered lengths would
            // ring the centre with a broom of equal spokes; this reads as a field.
            ...Array.from({ length: fillerCount }, (_, i) => ({
                node: null,
                angle: ((i + 0.5) * 360) / fillerCount + (random() - 0.5) * 13,
                radius: 120 + random() * 415,
                phase: random() * Math.PI * 2,
                order: 0,
                alpha: 0.04 + random() * 0.062,
            })),
        ];
        // draw order follows angle so the entrance sweeps around the dial
        rays.sort((a, b) => a.angle - b.angle);
        rays.forEach((ray, i) => (ray.order = i / rays.length));

        const labelFont = (tier: number) =>
            `600 ${(tier === 1 ? 18 : 13) * fontScale}px ${fontFamily}`;
        const subFont = (tier: number) =>
            `${(tier === 1 ? 11.5 : 9.5) * fontScale}px ${fontFamily}`;

        const layout = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            cx = width / 2;
            cy = height * 0.47;
            scale = clamp(Math.min(width / 1440, height / 900), 0.3, 1.7);
            fontScale = clamp(scale, 0.66, 1.2);

            const boxes: Box[] = Array.from(
                document.querySelectorAll<HTMLElement>(`[${KEEPOUT_ATTR}]`)
            ).map((el) => {
                const r = el.getBoundingClientRect();
                return { left: r.left - 20, top: r.top - 16, right: r.right + 20, bottom: r.bottom + 16 };
            });

            // Labels are placed in priority order — discipline tier first, longest
            // spoke first — and each one committed becomes an obstacle for the
            // next. Without this, crowded viewports stack labels on top of
            // each other; the box list is what keeps them legible.
            const committed: Box[] = [];
            const results = new Map<Ray, Placed>();
            const order = [...rays].sort((a, b) => {
                const ta = a.node?.tier ?? 3;
                const tb = b.node?.tier ?? 3;
                if (ta !== tb) return ta - tb;
                return (b.node?.radius ?? 0) - (a.node?.radius ?? 0);
            });

            for (const ray of order) {
                const rad = (ray.angle * Math.PI) / 180;
                const ux = Math.cos(rad);
                const uy = Math.sin(rad);

                // spokes stop where they would enter a keep-out region
                let clipRadius = Infinity;
                for (const box of boxes) {
                    clipRadius = Math.min(clipRadius, entryDistance(cx, cy, ux, uy, box) - 8);
                }

                let r = Math.min(ray.radius * scale, clipRadius);
                let shiftX = 0;
                const showLabel =
                    !!ray.node && (ray.node.tier === 1 || width >= TIER2_LABEL_MIN_WIDTH);

                if (ray.node && showLabel) {
                    const tier = ray.node.tier;
                    ctx.font = labelFont(tier);
                    const textWidth = ctx.measureText(ray.node.en).width;
                    const line = (tier === 1 ? 18 : 13) * fontScale;
                    const near = Math.abs(ux) <= 0.25;
                    const ox = near ? 0 : ux > 0 ? 12 : -12;
                    const oy = near ? (uy > 0 ? 20 * fontScale : -18 * fontScale) : 0;

                    const boxAt = (candidate: number, shift: number): Box => {
                        const x = cx + ux * candidate + shift;
                        const y = cy + uy * candidate;
                        const left = near ? x - textWidth / 2 : ux > 0 ? x + ox : x + ox - textWidth;
                        return {
                            left,
                            right: left + textWidth,
                            top: y + oy - line,
                            bottom: y + oy + line * 1.9,
                        };
                    };

                    // one predicate for every constraint: the viewport, the
                    // keep-out regions, and every label already placed
                    const fits = (candidate: number) => {
                        const b = boxAt(candidate, 0);
                        if (b.top < EDGE_PAD || b.bottom > height - EDGE_PAD) return false;
                        const hits = (o: Box) =>
                            b.left < o.right && b.right > o.left && b.top < o.bottom && b.bottom > o.top;
                        return !boxes.some(hits) && !committed.some(hits);
                    };

                    const floor = 130 * scale;
                    for (let guard = 0; guard < 70 && r > floor && !fits(r); guard++) r -= 7;

                    const b = boxAt(r, 0);
                    if (b.left < EDGE_PAD) shiftX = EDGE_PAD - b.left;
                    else if (b.right > width - EDGE_PAD) shiftX = width - EDGE_PAD - b.right;

                    committed.push(boxAt(r, shiftX));
                }

                results.set(ray, { ...ray, drawRadius: r, clipRadius, shiftX, showLabel });
            }

            placed = rays.map((ray) => results.get(ray)!);
        };

        // ---- draw ----
        const draw = (now: number) => {
            const elapsed = now - started;
            const t = now / 1000;
            const progress = clamp(progressRef.current ?? 0, 0, 1);

            // scroll pushes the field outward and dissolves it — held late enough
            // that the growing block is seen eating the spokes, not replacing them
            const fieldAlpha = 1 - smoothstep(0.05, 0.44, progress);
            const spread = 1 + progress * 0.85;

            pointer.x += (pointer.tx - pointer.x) * 0.06;
            pointer.y += (pointer.ty - pointer.y) * 0.06;

            ctx.clearRect(0, 0, width, height);
            if (fieldAlpha <= 0.001) {
                frame = requestAnimationFrame(draw);
                return;
            }

            ctx.save();
            ctx.translate(pointer.x, pointer.y);

            // a full turn takes about eleven minutes — felt, not seen
            const drift = reduced ? 0 : t * 0.0095;
            const gap = INNER_GAP * scale;

            for (const ray of placed) {
                const enter = easeOutExpo(
                    clamp((elapsed - ray.order * STAGGER_MS) / ENTRANCE_MS, 0, 1)
                );
                if (enter <= 0) continue;

                const breathe = reduced ? 1 : 1 + Math.sin(t * 0.35 + ray.phase) * 0.014;
                const rad = (ray.angle * Math.PI) / 180 + drift;
                const ux = Math.cos(rad);
                const uy = Math.sin(rad);
                const r = Math.min(ray.drawRadius * breathe * spread * enter, ray.clipRadius);
                if (r <= gap) continue;

                ctx.beginPath();
                ctx.moveTo(cx + ux * gap, cy + uy * gap);
                ctx.lineTo(cx + ux * r, cy + uy * r);
                ctx.strokeStyle = `rgba(10,10,10,${ray.alpha * fieldAlpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                if (!ray.node || !ray.showLabel || !fontsReady) continue;

                // the label lands only once its spoke has finished extending
                const labelIn = smoothstep(0.72, 1, enter) * fieldAlpha;
                if (labelIn <= 0.01) continue;

                const near = Math.abs(ux) <= 0.25;
                const x = cx + ux * r + ray.shiftX;
                const y = cy + uy * r;
                const ox = near ? 0 : ux > 0 ? 12 : -12;
                const oy = near ? (uy > 0 ? 20 * fontScale : -18 * fontScale) : 0;

                ctx.textAlign = near ? "center" : ux > 0 ? "left" : "right";
                ctx.textBaseline = "middle";

                ctx.font = labelFont(ray.node.tier);
                ctx.fillStyle = `rgba(10,10,10,${(ray.node.tier === 1 ? 0.92 : 0.4) * labelIn})`;
                ctx.fillText(ray.node.en, x + ox, y + oy);

                ctx.font = subFont(ray.node.tier);
                ctx.fillStyle = `rgba(10,10,10,${(ray.node.tier === 1 ? 0.36 : 0.22) * labelIn})`;
                ctx.fillText(ray.node.ko, x + ox, y + oy + 16 * fontScale);
            }

            ctx.restore();
            frame = requestAnimationFrame(draw);
        };

        const onPointerMove = (e: PointerEvent) => {
            pointer.tx = (e.clientX / window.innerWidth - 0.5) * 34;
            pointer.ty = (e.clientY / window.innerHeight - 0.5) * 34;
        };

        layout();
        frame = requestAnimationFrame(draw);

        // labels need real metrics, so hold them until the webfont lands
        document.fonts.ready.then(() => {
            fontsReady = true;
            layout();
        });

        const onResize = () => layout();
        window.addEventListener("resize", onResize);
        if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onPointerMove);
        };
    }, [progressRef]);

    return (
        <>
            <canvas ref={canvasRef} aria-hidden className="font-sans absolute inset-0 h-full w-full" />
            {/* the labels are painted pixels, so restate them for assistive tech */}
            <ul className="sr-only">
                {HERO_NODES.map((node) => (
                    <li key={node.en}>{node.en}</li>
                ))}
            </ul>
        </>
    );
}
