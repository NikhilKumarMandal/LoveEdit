import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const sitemapUrl = 'https://loveedit.art/sitemap.xml'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: sitemapUrl,
    }
}