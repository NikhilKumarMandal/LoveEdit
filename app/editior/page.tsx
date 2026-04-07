"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { LeftSidebar } from "@/components/left-sidebar";
import ImageGenerationLoading from "@/components/image-generation";
import { AIPromptInput } from "@/components/prompt-input";
import { RightSidebar } from "@/components/right-sidebar";
import { useRef, useState } from "react";
import { useEditorStore } from "@/store/useEditorState";
import ImageEditor from "@/components/image-editor";
import { Loader2 } from "lucide-react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { image, setImage, showHistory, isLoading } = useEditorStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset so the same file can be re-selected if needed
    e.target.value = "";

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      // data = { id, url, fileId, width, height }
      // setImage now accepts (url, id) — no more base64 in store
      setImage(data.url, data.id);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="w-full h-dvh flex flex-col overflow-hidden">
        <input
          ref={fileInputRef}
          onChange={handleImageUpload}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isUploading}
        />

        <Navbar />
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* LEFT COLUMN */}
          <LeftSidebar />

          {/* MIDDLE COLUMN */}
          <main className="flex-1 flex flex-col min-w-0 bg-zinc-900/50 relative">
            {/* CANVAS AREA */}
            <div className="flex-1 relative overflow-hidden w-full h-full">
              {/* BACKGROUND PATTERN */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* MAIN EDITOR SCREEN */}
              <div className="w-full h-full flex items-center justify-center p-6 md:p-10">
                {!image ? (
                  <div className="text-center space-y-6 max-w-sm z-10">
                    <div className="w-24 h-24 bg-zinc-900/50 rounded-3xl border border-zinc-800 flex items-center justify-center mx-auto shadow-2xl shadow-yellow-900/10">
                      <Image
                        src="/logo.png"
                        width={500}
                        height={500}
                        alt="logo"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-zinc-100">
                        Start Creating
                      </h3>
                      <p className="text-zinc-500 text-sm mt-3 leading-relaxed">
                        Upload an image to unlock the full potential of{" "}
                        <span className="text-yellow-500 font-medium">
                          Coder&apos;s Banana
                        </span>{" "}
                        AI tools.
                      </p>
                    </div>

                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full h-11 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isUploading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </span>
                      ) : (
                        "Select Image"
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <ImageEditor />
                  </div>
                )}
              </div>

              {/* Render when image is generating */}
              {isLoading && <ImageGenerationLoading />}
            </div>

            {/* PROMPT INPUT AREA */}
            <div className="shrink-0 bg-zinc-950 border-t border-zinc-800 p-4 lg:p-6 z-40">
              <AIPromptInput />
            </div>
          </main>

          {/* RIGHT COLUMN — EDIT HISTORY */}
          {showHistory && <RightSidebar />}
        </div>
      </div>
    </>
  );
}