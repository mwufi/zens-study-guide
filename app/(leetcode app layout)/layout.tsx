/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PJkaKaECmOQ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import TopMenu from "@/components/blocks/TopMenu"
import MobileTopMenu from "@/components/blocks/MobileTopMenu"
import UserAvatar from "@/components/blocks/UserAvatar"
import SearchBar from "@/components/blocks/SearchBar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
                <TopMenu />
                <MobileTopMenu />

                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <SearchBar />
                    <UserAvatar />
                </div>
            </header>

            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                {children}
            </main>
        </div>
    )
}