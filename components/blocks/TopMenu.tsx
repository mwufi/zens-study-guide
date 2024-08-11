import { CodeIcon } from "lucide-react";
import Link from "next/link";

export default function TopMenu() {
    return (
        <nav className="hidden flex-row items-center gap-5 text-sm font-medium md:flex md:flex-nowrap">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base whitespace-nowrap" prefetch={false}>
                <CodeIcon className="h-6 w-6" />
                <span className="sr-only">LeetLocal</span>
            </Link>
            <Link href="/library" className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap" prefetch={false}>
                Library
            </Link>
            <Link href="/progress" className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap" prefetch={false}>
                My Progress
            </Link>
            <Link href="/topics" className="text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap" prefetch={false}>
                Topics
            </Link>
            <Link href="/study" className="text-foreground transition-colors hover:text-foreground whitespace-nowrap" prefetch={false}>
                Study
            </Link>
        </nav>
    )
}