import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";
import Preloader from "@/components/Preloader";

const archivo = Archivo_Black({
    variable: "--font-archivo",
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const grotesk = Space_Grotesk({
    variable: "--font-grotesk",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "HaeSeong Kwon — Full-Cycle Architect & AI Research Engineer",
    description:
        "Portfolio of HaeSeong Kwon. Full-cycle product architect and AI research engineer in Seoul — physics-informed networks, computer vision, LLM agents and the infrastructure around them.",
    openGraph: {
        title: "HaeSeong Kwon — Full-Cycle Architect & AI Research Engineer",
        description:
            "Full-cycle product architect and AI research engineer in Seoul. Idea to infrastructure.",
        type: "website",
        locale: "en_US",
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = {
    themeColor: "#e9e9e7",
    viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${archivo.variable} ${grotesk.variable}`}>
            <body className="antialiased">
                <a href="#main" className="skip-link">
                    Skip to content
                </a>
                <Preloader />
                <Grain />
                <Cursor />
                <SmoothScroll>
                    <Header />
                    <main id="main">{children}</main>
                </SmoothScroll>
            </body>
        </html>
    );
}
