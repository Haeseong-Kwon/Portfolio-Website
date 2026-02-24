import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border mt-20 py-10 bg-muted/30">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} HaeSeong Kwon. All rights reserved.
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a
                        href="https://github.com/Haeseong-Kwon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:contact@example.com"
                        className="hover:text-foreground transition-colors"
                    >
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}
