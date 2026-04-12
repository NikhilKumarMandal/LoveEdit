"use client";

import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NAV_LINKS } from "@/constants/links"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { MenuIcon, CreditCard, GalleryHorizontal, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

const MobileMenu = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                    <MenuIcon className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-4 bg-[#0e0e0e] border-white/10 text-white">
                <SheetHeader className="sr-only">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 mt-8">
                    {/* Nav Links */}
                    {NAV_LINKS.map((link, index) => (
                        <SheetClose asChild key={index}>
                            <Link href={link.link} className="text-lg font-medium w-full text-white/80 hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        </SheetClose>
                    ))}

                    <div className="h-px bg-white/10" />

                    {/* Auth Section */}
                    {isPending ? (
                        <div className="h-10 w-full rounded-lg bg-white/10 animate-pulse" />
                    ) : session?.user ? (
                        <div className="flex flex-col gap-1">
                            {/* User Info */}
                            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-white/5 mb-2">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={session.user.image ?? ""} alt={session.user.name} />
                                    <AvatarFallback className="bg-violet-600 text-white text-xs font-semibold">
                                        {getInitials(session.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-white truncate">{session.user.name}</span>
                                    <span className="text-xs text-white/50 truncate">{session.user.email}</span>
                                </div>
                            </div>

                            {/* Credits */}
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/80">
                                <CreditCard className="h-4 w-4 text-violet-400 shrink-0" />
                                <span className="font-semibold text-white">{session.user.credits} credits</span>
                            </div>

                            {/* Gallery */}
                            <SheetClose asChild>
                                <Link
                                    href="/gallery"
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <GalleryHorizontal className="h-4 w-4 text-white/50" />
                                    Gallery
                                </Link>
                            </SheetClose>

                            <div className="h-px bg-white/10 my-1" />

                            {/* Sign Out */}
                            <SheetClose asChild>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full text-left"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </SheetClose>
                        </div>
                    ) : (
                        <SheetClose asChild>
                            <Link href="/auth/sign-in" className="w-full">
                                <Button size="lg" variant="outline" className="w-full">
                                    Login
                                </Button>
                            </Link>
                        </SheetClose>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu