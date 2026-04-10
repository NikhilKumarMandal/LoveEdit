import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/landing/navbar";

export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const zalandoSans = localFont({
  src: [
    {
      path: "../fonts/ZalandoSansSemiExpanded-Regular.woff2",
      style: "normal",
    },
    {
      path: "../fonts/ZalandoSansSemiExpanded-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-zalando",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://loveedit.art"
      : "http://localhost:3000"
  ),
  title: {
    default: "LoveEdit — AI Image Editor for Stunning Visuals",
    template: "%s | LoveEdit",
  },
  description:
    "Create, edit, and transform images instantly with AI. Remove backgrounds, upscale images, apply filters, and generate visuals in seconds with LoveEdit.",
  keywords: [
    "AI image editor",
    "background remover",
    "image upscaler",
    "AI image generator",
    "generative fill",
    "AI photo editor",
    "online image editor",
  ],
  authors: [{ name: "LoveEdit" }],
  alternates: {
    canonical: "https://loveedit.art",
  },
  openGraph: {
    title: "LoveEdit — AI Image Editor",
    description:
      "Create stunning visuals with AI. Remove backgrounds, enhance quality, and generate images in seconds.",
    url: "https://loveedit.art",
    siteName: "LoveEdit",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "LoveEdit AI Image Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoveEdit — AI Image Editor",
    description:
      "Edit, enhance, and generate images with powerful AI tools.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${zalandoSans.variable}`}
    >
      <body className="antialiased font-sans text-balance tracking-tight">
       
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Navbar/>
          {children}
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}