import { auth } from "@/lib/auth";
import { db } from "@/db";
import { images } from "@/db/schema/image-schema";
import ImageKit from "imagekit";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert File to Buffer for ImageKit
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileName = `${session.user.id}-${Date.now()}-${file.name}`;

        // Upload to ImageKit
        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName,
            folder: "/loveedit/uploads",
            useUniqueFileName: false,
        });

        // Store image record in DB
        const [record] = await db
            .insert(images)
            .values({
                userId: session.user.id,
                url: uploadResponse.url,
                fileId: uploadResponse.fileId,
                fileName: uploadResponse.name,
                width: uploadResponse.width,
                height: uploadResponse.height,
            })
            .returning();

        return NextResponse.json({
            id: record.id,
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            width: uploadResponse.width,
            height: uploadResponse.height,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}