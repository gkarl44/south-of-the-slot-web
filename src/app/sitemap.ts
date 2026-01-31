import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/api'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts(['slug', 'date']);
    const baseUrl = 'https://southoftheslot.org';

    // Format dates safely
    const chapters: MetadataRoute.Sitemap = posts.map(post => {
        let date = new Date();
        if (post.date) {
            // post.date might be a string "2026-01-26" or a Date object from gray-matter
            date = new Date(post.date);
        }

        return {
            url: `${baseUrl}/biography/${post.slug}`,
            lastModified: date,
            changeFrequency: 'monthly',
            priority: 0.8,
        };
    });

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/timeline`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...chapters
    ]
}
