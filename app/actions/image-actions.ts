"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { images } from "@/db/schema/image-schema";
import { eq } from "drizzle-orm";
import { imagekit } from "@/lib/config";

// Fetch images for logged-in user
export async function getImage(limit?: number) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
    };

    try {
        const userImages = await db
            .select()
            .from(images)
            .where(eq(images.userId, session.user.id))
            .limit(limit || 20)
            .orderBy(images.createdAt, )
            .execute(); // returns array

        return {
            success: true,
            error: null,
            data: userImages,
        };
    } catch (err) {
        console.error("Error fetching images:", err);
        return {
            success: false,
            error: "Failed to fetch images",
            data: null,
        };
    }
}

// Delete an image by ID for logged-in user
export async function deleteImage(imageId: string, fileId?: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const imageList = await db
            .select()
            .from(images)
            .where(eq(images.id, imageId))
            .limit(1)
            .execute();

        const image = imageList[0];

        if (!image || image.userId !== session.user.id) {
            return { success: false, error: "Image not found or unauthorized" };
        }

        // Delete from DB
        await db.delete(images).where(eq(images.id, imageId)).execute();

        // Optional: Delete from ImageKit
        if (fileId) {
            await imagekit.deleteFile(fileId);
        }

        return { success: true, error: null };
    } catch (err) {
        console.error("Error deleting image:", err);
        return { success: false, error: "Failed to delete image" };
    }
}