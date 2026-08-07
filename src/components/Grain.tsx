const NOISE_SVG =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * Full-viewport film grain. Fixed so it never scrolls with content —
 * the texture belongs to the screen, not the page.
 */
export default function Grain() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[70] opacity-[0.085] mix-blend-multiply"
            style={{
                backgroundImage: `url("${NOISE_SVG}")`,
                backgroundSize: "220px 220px",
                width: "140%",
                height: "140%",
                left: "-20%",
                top: "-20%",
                animation: "grain-shift 6s steps(10) infinite",
            }}
        />
    );
}
