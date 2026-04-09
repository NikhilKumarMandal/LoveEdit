"use client";

import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


import {  GoogleIcon } from "../icons";



type SocialProvider = "google" | "github";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [pendingProvider, setPendingProvider] =
        useState<SocialProvider | null>(null);


    const handleSocialLogin = async (
        provider: SocialProvider,
    ) => {
        setPendingProvider(provider);

        try {
            await authClient.signIn.social({
                provider: provider,
            });
            router.push("/gallery");
        } catch (err) {
            setPendingProvider(null);
            console.error(err);
            toast.error("An unexpected error");
        }
    };

    return (
        <div className="flex items-center justify-center h-dvh">
            <Card className="w-full max-w-110 border-[#262626] bg-[#121212] text-white">
                <CardHeader className="space-y-4 pt-4 text-center">
                    <Image
                        src={"/logo.png"}
                        className="h-10 w-10 mx-auto"
                        height={40}
                        width={40}
                        alt="CodersGPT"
                    />
                    <CardTitle className="text-[32px] font-semibold tracking-tight text-[#ececec]">
                        Log in LoveEdit
                    </CardTitle>
                    <CardDescription className="mx-auto max-w-80 text-[15px] leading-relaxed text-[#b4b4b4]">
                        You&apos;ll get smarter responses and can upload
                        files, images, and more.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 px-10">
                    {/* Social Buttons */}
                    <div className="flex flex-col gap-3">
                        {/* Google Button */}
                        <Button
                            variant="outline"
                            disabled={false}
                            className="h-13 w-full rounded-xl border-[#424242] bg-transparent text-[15px] font-normal transition-colors hover:bg-[#2f2f2f] hover:text-white disabled:opacity-70"
                            onClick={() => {
                                handleSocialLogin("google");
                            }}>
                            {pendingProvider === "google" ? (
                                <Loader2 className="mr-2 size-5 animate-spin" />
                            ) : (
                                <GoogleIcon className="mr-2 size-5" />
                            )}
                            Continue with Google
                        </Button>
                    </div>

            
                </CardContent>

                <CardFooter className="flex flex-col items-center pb-4">
                    <div className="text-sm text-[#b4b4b4]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="text-white hover:underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}