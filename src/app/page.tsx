import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <>
            <Hero />
            <Statement />
            <Experience />
            <TechStack />
            <Projects />
            <Awards />
            <Contact />
        </>
    );
}
