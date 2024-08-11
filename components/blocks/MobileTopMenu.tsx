import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, Link, Package2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileTopMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <MenuIcon className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                        <Package2Icon className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Library
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        My Progress
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                        Topics
                    </Link>
                    <Link href="#" className="hover:text-foreground" prefetch={false}>
                        Study
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}