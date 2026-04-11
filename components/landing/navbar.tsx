"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAV_LINKS } from "@/constants/links";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client"; // your better-auth client
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "../global/container";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import MobileMenu from "./mobile-menu";
import { CreditCard, GalleryHorizontal, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 w-full h-16 transition-all duration-300",
                isScrolled ? "bg-[#050505]/50 backdrop-blur-md" : "bg-transparent",
            )}
        >
            <Wrapper className="flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="/" className="flex items-center gap-2">
                        <Icons.logo className="w-max h-6" />
                    </Link>
                </motion.div>

                {/* Center Nav Links */}
                <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto gap-x-3 text-sm text-muted-foreground font-medium">
                    <AnimatePresence>
                        {NAV_LINKS.map((link, index) => (
                            <Container key={index} animation="fadeDown" delay={0.1 * index}>
                                <div className="relative">
                                    <Link
                                        href={link.link}
                                        className="hover:text-foreground transition-all duration-500 px-1.5"
                                    >
                                        {link.name}
                                    </Link>
                                </div>
                            </Container>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Right Side */}
                <Container animation="fadeLeft" delay={0.1}>
                    <div className="flex items-center gap-x-4">
                        {isPending ? (
                            // Loading skeleton
                            <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
                        ) : session?.user ? (
                            // Logged-in: User dropdown
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="hidden lg:flex items-center gap-2 rounded-full pl-3 pr-2 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 focus:outline-none">
                                        <span className="text-sm font-medium text-white/90 max-w-[120px] truncate">
                                            {session.user.name}
                                        </span>
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage src={session.user.image ?? ""} alt={session.user.name} />
                                            <AvatarFallback className="bg-violet-600 text-white text-xs font-semibold">
                                                {getInitials(session.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-56 bg-[#0e0e0e] border border-white/10 text-white rounded-xl shadow-xl p-1"
                                >
                                    {/* Email + Credits header */}
                                    <DropdownMenuLabel className="px-3 py-2">
                                        <p className="text-xs text-white/50 truncate">{session?.user?.email}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <CreditCard className="h-3.5 w-3.5 text-violet-400" />
                                            <span className="text-xs font-semibold text-white">
                                                {session?.user?.credits} credits
                                            </span>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator className="bg-white/10 my-1" />

                                  
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/gallery"
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                                        >
                                            <GalleryHorizontal className="h-4 w-4 text-white/50" />
                                            Gallery
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="bg-white/10 my-1" />

                                    <DropdownMenuItem
                                        onClick={handleSignOut}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            // Logged-out: Login button
                            <Link href="/auth/sign-in" className="hidden lg:block">
                                <Button size="sm" variant="outline">
                                    Login
                                </Button>
                            </Link>
                        )}

                        {/* Mobile menu always visible */}
                        <div className="lg:hidden">
                            <MobileMenu />
                        </div>
                    </div>
                </Container>
            </Wrapper>
        </header>
    );
};

export default Navbar;