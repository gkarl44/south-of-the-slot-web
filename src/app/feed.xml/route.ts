import { Feed } from "feed";

export const dynamic = 'force-static';

export async function GET() {
    const feed = new Feed({
        title: "South of the Slot | The Record",
        description: "The Prager/Arnett Archive of San Francisco's Leather Era (1964).",
        id: "https://southoftheslot.org/",
        link: "https://southoftheslot.org/",
        language: "en",
        image: "https://southoftheslot.org/mural.png",
        favicon: "https://southoftheslot.org/favicon.ico",
        copyright: "All rights reserved 2026, Robert Prager",
        author: {
            name: "Robert Prager",
            email: "archivist@southoftheslot.org",
            link: "https://substack.com/@robertprager",
        },
    });

    // Manual entry for Chapter 1 (Automation would fetch from MD files later)
    feed.addItem({
        title: "Chapter 1: The Nativity Thing",
        id: "https://southoftheslot.org/chapter-1",
        link: "https://southoftheslot.org/chapter-1",
        description: "Part I of The Life and Times of Chuck Arnett. A reconstruction of Arnett's early life in the Deep South (1928–1950).",
        author: [
            {
                name: "Robert Prager",
                email: "archivist@southoftheslot.org",
                link: "https://substack.com/@robertprager",
            },
        ],
        date: new Date("2026-01-25"),
    });

    return new Response(feed.rss2(), {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
        },
    });
}
