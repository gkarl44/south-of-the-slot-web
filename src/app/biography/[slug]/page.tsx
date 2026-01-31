import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../../lib/api';
import { remark } from 'remark';
import html from 'remark-html';
import styles from '../biography.module.css';

// Keyword extraction helper (simple version)
function extractKeywords(title: string): string {
    const common = ['the', 'and', 'or', 'of', 'in', 'part', 'chapter', 'a'];
    return title.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(' ')
        .filter(w => !common.includes(w) && w.length > 3)
        .join(' ');
}

export default async function Post(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'part',
        'series'
    ]);

    if (!post) {
        return notFound();
    }

    const processedContent = await remark()
        .use(html)
        .process(post.content || '');
    const contentHtml = processedContent.toString();

    // Prepare "View Source" search query
    const keywords = extractKeywords(post.title);

    // JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "datePublished": post.date,
        "author": {
            "@type": "Person",
            "name": post.author || "Robert Prager"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Prager Papers",
            "logo": {
                "@type": "ImageObject",
                "url": "https://southoftheslot.org/logo.png"
            }
        },
        "description": `Chapter from ${post.series || 'The Life and Times of Chuck Arnett'}`
    };

    return (
        <main className={styles.main}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav className={styles.nav}>
                <Link href="/" className={styles.backLink}>← Back to Archive</Link>
            </nav>
            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{post.series || "The Life and Times of Chuck Arnett"}</h1>
                    {post.part && (
                        <div style={{ textAlign: 'center' }}>
                            <h2 className={styles.subtitle}>{post.part}</h2>
                        </div>
                    )}
                    <h3 className={styles.chapterNum}>{post.title}</h3>
                </header>
                {/* Render Markdown Content */}
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: contentHtml }} />

                {/* FEATURE #3: Raw vs Cooked Link */}
                <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid #333', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem' }}>
                        Establish verifiability by searching the original binders.
                    </p>
                    {/* Note: This is a placeholder link. Eventually this could go to a Search Page. 
                        For now, we can link to the Timeline or Homepage, 
                        BUT the request was to link to "Raw Archive Search".
                        Since we don't have a frontend search page yet, 
                        I will create a button that opens a "Search Modal" or links to a /search page.
                        For this MVP, I'll link to a new /search page passing the keywords.
                    */}
                    <Link href={`/search?q=${encodeURIComponent(keywords)}`} className={styles.backLink} style={{ fontSize: '0.8rem' }}>
                        View Source Documents
                    </Link>
                </div>

            </article>
            <footer className={styles.footer}>
                <p>The Prager/Arnett Archive</p>
                <p>South of the Slot © 2026</p>
            </footer>
        </main>
    );
}

export async function generateStaticParams() {
    const posts = getAllPosts(['slug']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}
