import Parser from 'rss-parser';

// Placeholder - User needs to confirm the actual Substack URL
const SUBSTACK_RSS_URL = 'https://southoftheslot.substack.com/feed';

export interface Post {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    contentSnippet: string;
    guid: string;
}

export async function getSubstackPosts(): Promise<Post[]> {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL(SUBSTACK_RSS_URL);
        return feed.items.map((item) => ({
            title: item.title || 'Untitled',
            link: item.link || '#',
            pubDate: item.pubDate || '',
            content: item.content || '',
            contentSnippet: item.contentSnippet || '',
            guid: item.guid || item.link || Math.random().toString(),
        }));
    } catch (error) {
        console.error('Error fetching Substack feed:', error);
        // Return empty array or mock data if feed fails (for development)
        return [];
    }
}
