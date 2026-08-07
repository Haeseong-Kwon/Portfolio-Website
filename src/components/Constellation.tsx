"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

const DENSITY = 13000; // one node per N css pixels
const MAX_NODES = 130;
const LINK_DIST = 150;
const POINTER_RADIUS = 190;

/**
 * Drifting node field with proximity links. Runs only while on screen and
 * draws a single static frame for reduced-motion users.
 */
export default function Constellation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let nodes: Node[] = [];
        let width = 0;
        let height = 0;
        let frame = 0;
        let running = false;
        const pointer = { x: -9999, y: -9999 };

        const seed = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(MAX_NODES, Math.round((width * height) / DENSITY));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22,
                r: Math.random() * 1.3 + 0.5,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (const node of nodes) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(233,233,231,0.55)";
                ctx.fill();
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist > LINK_DIST) continue;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(233,233,231,${(1 - dist / LINK_DIST) * 0.16})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        };

        const step = () => {
            for (const node of nodes) {
                node.x += node.vx;
                node.y += node.vy;

                // wrap rather than bounce — no visible walls
                if (node.x < -10) node.x = width + 10;
                if (node.x > width + 10) node.x = -10;
                if (node.y < -10) node.y = height + 10;
                if (node.y > height + 10) node.y = -10;

                const dx = node.x - pointer.x;
                const dy = node.y - pointer.y;
                const dist = Math.hypot(dx, dy);
                if (dist < POINTER_RADIUS && dist > 0.01) {
                    const push = (1 - dist / POINTER_RADIUS) * 0.6;
                    node.x += (dx / dist) * push;
                    node.y += (dy / dist) * push;
                }
            }
            draw();
            frame = requestAnimationFrame(step);
        };

        const start = () => {
            if (running || reduced) return;
            running = true;
            frame = requestAnimationFrame(step);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(frame);
        };

        const onPointer = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer.x = e.clientX - rect.left;
            pointer.y = e.clientY - rect.top;
        };
        const onResize = () => {
            seed();
            draw();
        };

        seed();
        draw();

        const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
            threshold: 0,
        });
        observer.observe(canvas);

        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            stop();
            observer.disconnect();
            window.removeEventListener("pointermove", onPointer);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
