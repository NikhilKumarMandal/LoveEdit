import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://loveedit.art"; 

    const formatDate = (date: Date | string) => {
        return new Date(date).toISOString();
    };

    return [
        // 🌐 Core Pages
        {
            url: baseUrl,
            lastModified: formatDate(new Date()),
            priority: 1,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: formatDate(new Date()),
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: formatDate(new Date()),
            priority: 0.8,
        },

        // 🤖 AI Features Pages (if you create separate pages)
        {
            url: `${baseUrl}/tools/background-removal`,
            lastModified: formatDate(new Date()),
        },
        {
            url: `${baseUrl}/tools/upscale-image`,
            lastModified: formatDate(new Date()),
        },
        {
            url: `${baseUrl}/tools/ai-image-generator`,
            lastModified: formatDate(new Date()),
        },
        {
            url: `${baseUrl}/tools/ai-filters`,
            lastModified: formatDate(new Date()),
        },
        {
            url: `${baseUrl}/tools/generative-fill`,
            lastModified: formatDate(new Date()),
        },

        // 🔐 Auth Pages
        {
            url: `${baseUrl}/auth/sign-in`,
            lastModified: formatDate(new Date()),
        },
        {
            url: `${baseUrl}/auth/sign-up`,
            lastModified: formatDate(new Date()),
        },

        // 📄 Legal
        {
            url: `${baseUrl}/privacy`,
            lastModified: formatDate("2025-01-01"),
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: formatDate("2025-01-01"),
        },
    ];
}