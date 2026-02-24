"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Tech", href: "#tech" },
    { name: "Projects", href: "#projects" },
    { name: "Awards", href: "#awards" },
];

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    const { scrollY, scrollYProgress } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "") || "about";
            setActiveSection(hash);
        };
        window.addEventListener("hashchange", handleHashChange);

        // Scroll Spy Logic
        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observerOptions = {
            rootMargin: "-20% 0px -70% 0px", // Triggers when section is near top
            threshold: 0
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const element = document.querySelector(item.href);
            if (element) observer.observe(element);
        });

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
            observer.disconnect();
        };
    }, []);

    // Staggered variants for mobile menu items
    const menuContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const menuItemVariants = {
        hidden: { y: 50, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 12 } },
    };

    return (
        <>
            {/* Scroll Progress Indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-foreground z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Sticky Glassmorphism Nav */}
            <motion.header
                variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 z-50 w-full border-b border-border/20 bg-background/70 backdrop-blur-xl mt-[3px]"
            >
                <div className="w-full flex h-20 items-center justify-between px-6 md:px-12 lg:px-24">
                    <Link href="/" className="font-bold tracking-tight text-xl z-50 relative">
                        HaeSeong Kwon
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden sm:flex items-center gap-8">
                        <ul className="flex items-center gap-8 text-sm font-semibold tracking-wide text-foreground/80">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.replace("#", "");
                                return (
                                    <li key={item.name} className="relative group/navitem">
                                        <Link
                                            href={item.href}
                                            onClick={() => setActiveSection(item.href.replace("#", ""))}
                                            className={`transition-colors py-1 ${isActive ? "text-foreground" : "hover:text-foreground"}`}
                                        >
                                            {item.name}
                                        </Link>

                                        {/* Center-out underline hover effect */}
                                        <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-foreground/30 transition-all duration-300 ease-out group-hover/navitem:w-full group-hover/navitem:left-0" />

                                        {/* Active Section highlight */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-nav"
                                                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-foreground z-10"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="sm:hidden z-50 relative p-2 -mr-2 text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.header>

            {/* Full-Screen Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center sm:hidden"
                    >
                        <motion.ul
                            variants={menuContainerVariants}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col items-center gap-10"
                        >
                            {navItems.map((item) => (
                                <motion.li key={item.name} variants={menuItemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => {
                                            setActiveSection(item.href.replace("#", ""));
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-5xl font-bold tracking-tighter text-foreground hover:text-foreground/70 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
