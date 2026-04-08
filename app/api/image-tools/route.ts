import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { images } from "@/db/schema/image-schema";
import ImageKit from "imagekit";

// ✅ ImageKit init
if (
    !process.env.IMAGEKIT_PUBLIC_KEY ||
    !process.env.IMAGEKIT_PRIVATE_KEY ||
    !process.env.IMAGEKIT_URL_ENDPOINT
) {
    throw new Error("ImageKit env variables are missing");
}

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ✅ WaveSpeed helper
async function callWaveSpeed(endpoint: string, body: any) {
    const res = await fetch(
        `https://api.wavespeed.ai/api/v3/wavespeed-ai/${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.WAVESPEED_API_KEY}`,
            },
            body: JSON.stringify(body),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        console.error("WaveSpeed error:", data);
        throw new Error("WaveSpeed API failed");
    }

    return data;
}

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { type, imageUrl, targetResolution } = await req.json();

        if (!type || !imageUrl) {
            return NextResponse.json(
                { error: "type and imageUrl required" },
                { status: 400 }
            );
        }

        let data;

        // ✅ Feature switch
        if (type === "bg-remove") {
            data = await callWaveSpeed("image-background-remover", {
                enable_base64_output: false,
                enable_sync_mode: true,
                image: imageUrl,
            });
        } else if (type === "upscale") {
            data = await callWaveSpeed("image-upscaler", {
                enable_base64_output: false,
                enable_sync_mode: true,
                image: imageUrl,
                output_format: "jpeg",
                target_resolution: targetResolution || "4k",
            });
        } else {
            return NextResponse.json(
                { error: "Invalid type" },
                { status: 400 }
            );
        }

        // ✅ FIX: correct response parsing
        const imageUrlFromAPI = data?.data?.outputs?.[0];

        if (!imageUrlFromAPI) {
            console.error("Invalid WaveSpeed response:", data);
            return NextResponse.json(
                { error: "Processing failed" },
                { status: 500 }
            );
        }

        // ✅ Download processed image
        const imgRes = await fetch(imageUrlFromAPI);

        if (!imgRes.ok) {
            throw new Error("Failed to download processed image");
        }

        const buffer = Buffer.from(await imgRes.arrayBuffer());

        const fileName = `${session.user.id}-${Date.now()}.jpg`;

        // ✅ Upload to ImageKit
        const upload = await imagekit.upload({
            file: buffer,
            fileName,
            folder: "/loveedit/processed",
            useUniqueFileName: false,
        });

        // ✅ Save in DB
        const [record] = await db
            .insert(images)
            .values({
                userId: session.user.id,
                url: upload.url,
                fileId: upload.fileId,
                fileName: upload.name,
                width: upload.width,
                height: upload.height,
            })
            .returning();

        return NextResponse.json({
            success: true,
            image: record,
        });
    } catch (err) {
        console.error("Image tools error:", err);

        return NextResponse.json(
            { error: "Image processing failed" },
            { status: 500 }
        );
    }
}