import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

function getMimeType(dataUrl: string): string {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,/);
  return match ? match[1] : "image/png";
}

function cleanBase64Image(dataUrl: string): string {
  return dataUrl.replace(/^data:(.*);base64,/, "");
}

// Fetch an ImageKit (or any public) URL and return base64 + mimeType
async function urlToInlineData(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image from URL: ${url}`);

  const mimeType = (res.headers.get("content-type") || "image/jpeg").split(";")[0].trim();
  const buffer = await res.arrayBuffer();
  const data = Buffer.from(buffer).toString("base64");

  return { mimeType, data };
}

export async function POST(request: Request) {
  const {
    imageBase64,  // data URL  — from AI-edited frames (chained edits)
    imageUrl,     // ImageKit URL — from fresh uploads
    prompt,
    userFiles,
    aspectRatio,
    maskBase64,
  } = await request.json();

  if (!imageBase64 && !imageUrl) {
    return NextResponse.json(
      { message: "Either imageBase64 or imageUrl is required" },
      { status: 400 },
    );
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Resolve the primary image into inlineData
  let primaryInlineData: { mimeType: string; data: string };

  if (imageUrl) {
    // Fresh upload — fetch from ImageKit server-side (no base64 over the wire)
    primaryInlineData = await urlToInlineData(imageUrl);
  } else {
    // Chained AI edit — already a data URL in memory
    primaryInlineData = {
      mimeType: getMimeType(imageBase64),
      data: cleanBase64Image(imageBase64),
    };
  }

  const parts: object[] = [
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

  if (userFiles && Array.isArray(userFiles) && userFiles.length > 0) {
    const processedFiles = userFiles.map((file) => ({
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
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        return NextResponse.json({
          result: `data:image/png;base64,${part.inlineData.data}`,
        });
      }
    }
  }

  return NextResponse.json({ message: "Failed to generate the image" });
}