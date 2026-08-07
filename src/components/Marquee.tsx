type Props = {
    items: string[];
    /** Seconds for one full loop. Lower = faster. */
    duration?: number;
    reverse?: boolean;
    separator?: string;
    className?: string;
    itemClassName?: string;
};

/**
 * Infinite ticker. The item list is rendered twice and the track translates
 * -50%, so the seam is always off-screen. Pure CSS — no rAF, no jank.
 */
export default function Marquee({
    items,
    duration = 40,
    reverse = false,
    separator = "—",
    className = "",
    itemClassName = "",
}: Props) {
    const run = [...items, ...items];

    return (
        <div className={`marquee-host w-full overflow-hidden ${className}`}>
            <div
                className="marquee-track"
                style={
                    {
                        "--marquee-duration": `${duration}s`,
                        "--marquee-direction": reverse ? "reverse" : "normal",
                    } as React.CSSProperties
                }
            >
                {run.map((item, i) => (
                    <span key={i} className="flex shrink-0 items-center gap-[1.5em] pr-[1.5em] whitespace-nowrap">
                        <span className={itemClassName}>{item}</span>
                        <span aria-hidden className="opacity-30">
                            {separator}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}
