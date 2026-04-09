import ImageKit from "imagekit";

if (
    !process.env.IMAGEKIT_PUBLIC_KEY ||
    !process.env.IMAGEKIT_PRIVATE_KEY ||
    !process.env.IMAGEKIT_URL_ENDPOINT
) {
    throw new Error("ImageKit env variables are missing");
}

export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function callWaveSpeed(endpoint: string, body: any) {
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

    return res.json();
}


export async function processImageTool(
    type: "bg-remove" | "upscale",
    image: string,
    extra?: any
) {
    const res = await fetch("/api/image-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            type,
            imageUrl: image,
            ...extra,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        console.error("API Error:", data);
        throw new Error(data?.error || "Processing failed");
    }

    return data;
}