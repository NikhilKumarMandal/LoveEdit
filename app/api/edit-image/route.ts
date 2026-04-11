import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { images } from "@/db/schema/image-schema";
import { imagekit } from "@/lib/config";
import { user as userTable } from "@/db/schema/auth-schema"; 
import { and, eq, gte, sql } from "drizzle-orm";

const CREDITS_PER_GENERATION = 1;

function getMimeType(dataUrl: string): string {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,/);
  return match ? match[1] : "image/png";
}

function cleanBase64Image(dataUrl: string): string {
  return dataUrl.replace(/^data:(.*);base64,/, "");
}

async function urlToInlineData(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image from URL: ${url}`);

  const mimeType = (res.headers.get("content-type") || "image/jpeg")
    .split(";")[0]
    .trim();

  const buffer = await res.arrayBuffer();
  const data = Buffer.from(buffer).toString("base64");

  return { mimeType, data };
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fetch user and check credits
    const [currentUser] = await db
      .select({ credits: userTable.credits })
      .from(userTable)
      .where(eq(userTable.id, session.user.id));

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (
      currentUser.credits === null ||
      currentUser.credits < CREDITS_PER_GENERATION
    ) {
      return NextResponse.json(
        {
          error: "Insufficient credits",
          credits: currentUser.credits ?? 0,
        },
        { status: 402 }
      );
    }

    const {
      imageBase64,
      imageUrl,
      prompt,
      userFiles,
      aspectRatio,
      maskBase64,
    } = await request.json();

    if (!imageBase64 && !imageUrl) {
      return NextResponse.json(
        { message: "Either imageBase64 or imageUrl is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    let primaryInlineData: { mimeType: string; data: string };

    if (imageUrl) {
      primaryInlineData = await urlToInlineData(imageUrl);
    } else {
      primaryInlineData = {
        mimeType: getMimeType(imageBase64),
        data: cleanBase64Image(imageBase64),
      };
    }

    const parts: any[] = [
      { text: prompt },
      { inlineData: primaryInlineData },
    ];

    if (maskBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/png",
          data: cleanBase64Image(maskBase64),
        },
      });
    }

    if (userFiles?.length) {
      const processedFiles = userFiles.map((file: any) => ({
        inlineData: {
          mimeType: getMimeType(file.url),
          data: cleanBase64Image(file.url),
        },
      }));
      parts.push(...processedFiles);
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: parts,
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || undefined,
        },
      },
    });

    const content = response.candidates?.[0]?.content;

    if (content?.parts) {
      for (const part of content.parts) {
        if (part.inlineData) {
          if (!part.inlineData?.data) {
            return NextResponse.json(
              { error: "Invalid image data from AI" },
              { status: 500 }
            );
          }

          // ✅ Convert base64 → buffer
          const buffer = Buffer.from(part.inlineData.data, "base64");

          const fileName = `${session.user.id}-${Date.now()}.png`;

          // ✅ Upload to ImageKit
          const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName,
            folder: "/loveedit/generated",
            useUniqueFileName: false,
          });

          // ✅ Save in DB
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

          // ✅ Deduct credits only after successful generation + upload
          const result = await db
            .update(userTable)
            .set({
              credits: sql`${userTable.credits} - ${CREDITS_PER_GENERATION}`,
            })
            .where(
              and(
                eq(userTable.id, session.user.id),
                gte(userTable.credits, CREDITS_PER_GENERATION) // ✅ only deducts if enough credits
              )
            )
            .returning({ credits: userTable.credits });

          if (result.length === 0) {
            return new Response("Insufficient credits", { status: 402 });
          }

          return NextResponse.json({
            success: true,
            image: {
              id: record.id,
              url: uploadResponse.url,
              fileId: uploadResponse.fileId,
              width: uploadResponse.width,
              height: uploadResponse.height,
            },
            credits: currentUser.credits - CREDITS_PER_GENERATION, // remaining credits
          });
        }
      }
    }

    return NextResponse.json(
      { message: "Failed to generate image" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}