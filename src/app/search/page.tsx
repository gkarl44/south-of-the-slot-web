"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './search.module.css';

// Type definitions
interface SearchResult {
    binder: string;
    source_path: string;
    source_type?: string;
    content: string;
    score?: number;
}

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery);
        }
    }, [initialQuery]);

    async function handleSearch(term: string) {
        if (!term.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('/api/ask-archive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: term })
            });
            const data = await res.json();
            setResults(data.results || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className={styles.main}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.backLink}>← Back to Archive</Link>
            </nav>

            <header className={styles.header}>
                <h1 className={styles.title}>The Evidence Room</h1>
                <p className={styles.subtitle}>Raw Search of the Prager Papers</p>
            </header>

            <div className={styles.searchBox}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                    placeholder="Search the binders..."
                    className={styles.input}
                />
                <button onClick={() => handleSearch(query)} className={styles.button}>
                    {loading ? 'Scanning...' : 'Search'}
                </button>
            </div>

            <div className={styles.results}>
                {results.length > 0 ? (
                    results.map((r, i) => (
                        <div key={i} className={styles.resultCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.sourceType}>{r.source_type || 'Binder'}</span>
                                <span className={styles.filename}>{r.binder || r.source_path}</span>
                            </div>
                            <div className={styles.snippet}>
                                "...{r.content}..."
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className={styles.emptyState}>No records found matching "{query}".</p>
                )}
            </div>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div style={{ padding: '2rem', color: '#fff' }}>Loading Search...</div>}>
            <SearchContent />
        </Suspense>
    );
}
