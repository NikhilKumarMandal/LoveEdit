"use client"
import Wrapper from "@/components/global/wrapper";
import Icons from "@/components/global/icons";
import Container from "@/components/global/container";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter();
    return (
        <div className="relative z-0 w-full h-full">

            <div className="absolute -top-16 inset-x-0 -z-10 mx-auto w-3/4 h-32 lg:h-40 rounded-full blur-[5rem] bg-[radial-gradient(86.02%_172.05%_at_50%_-40%,rgba(18,139,135,1)_0%,rgba(5,5,5,0)_80%)]"></div>

            {/* Subtle glow behind the video */}
            <div className="absolute top-1/2 inset-x-0 -z-10 mx-auto w-2/3 h-40 rounded-full blur-[6rem] bg-[radial-gradient(ellipse_at_center,rgba(18,139,135,0.35)_0%,rgba(5,5,5,0)_70%)]"></div>

            <Wrapper className="py-20">
                <div className="flex flex-col items-center justify-center w-full z-10">
                    <Container>
                        <div className="flex items-center justify-center gap-x-1 px-2 py-1.5 relative w-max mx-auto rounded-full before:absolute before:inset-0 before:-z-10 before:p-[1px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-700 before:to-neutral-900 before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-[#181818]/60">
                            <Icons.stars className="size-5" />
                            <span className="text-sm text-white">
                                LoveEdit Product Overview
                            </span>
                        </div>
                    </Container>

                    <Container delay={0.1}>
                        <h2 className="text-balance !leading-[1.25] text-center text-5xl md:text-6xl font-semibold tracking-tight mt-6 w-full">
                            Build Studio-Quality <br className="hidden lg:inline-block" />Images in Minutes
                        </h2>
                    </Container>

                    <Container delay={0.2}>
                        <p className="text-base md:text-lg font-normal text-center text-balance text-muted-foreground max-w-3xl mx-auto mt-4">
                            Effortlessly create stunning, production-ready images with powerful AI tools and seamless workflows-no complex editing skills required
                        </p>
                    </Container>

                    <Container delay={0.3}>
                        <div className="mt-6">
                            <Button size="default"
                                onClick={() => {
                                    router.push("/gallery");
                                }}
                            >
                                Get started for free
                            </Button>
                        </div>
                    </Container>

                    {/* YouTube Video Embed */}
                    <Container className="w-full z-30">
                        <div className="relative mx-auto max-w-5xl mt-10 md:mt-14">
                            {/* Outer glow ring */}
                            <div className="absolute -inset-[1px] rounded-2xl md:rounded-[32px] bg-gradient-to-b from-[rgba(18,139,135,0.6)] to-neutral-800/40 blur-[2px] -z-10" />

                            {/* Video container */}
                            <div className="relative rounded-2xl md:rounded-[28px] border border-neutral-700/80 bg-neutral-900/80 p-2 backdrop-blur-xl shadow-2xl shadow-black/60">
                                <div className="relative w-full rounded-xl md:rounded-[20px] overflow-hidden border border-neutral-800"
                                    style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
                                >
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src="https://www.youtube.com/embed/yyyso5bGZqE?si=F-U2HcEldeexJdBA"
                                        title="LoveEdit Product Demo"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            </div>

                            {/* Bottom reflection / gradient fade */}
                            <div className="absolute -bottom-8 inset-x-0 h-16 bg-gradient-to-b from-transparent to-background blur-sm pointer-events-none" />
                        </div>
                    </Container>

                </div>
            </Wrapper>
        </div>
    )
};

export default Hero;