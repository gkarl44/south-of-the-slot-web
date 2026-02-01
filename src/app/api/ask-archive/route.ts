import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the type for our archive items
interface ArchiveItem {
    source_path: string;
    binder: string;
    filename: string;
    content: string;
    source_type?: string;
    extracted_metadata?: {
        dates: string[];
        people: string[];
        places: string[];
        topics: string[];
    };
}

import zlib from 'zlib';

// Load data once in memory (server-side only)
// Note: In Next.js App Router, this will likely be re-executed on cold starts,
// but that's acceptable for this scale (~1000 items).
// We lazy-load it to avoid build-time issues if the file is missing during build.
let archiveCache: ArchiveItem[] | null = null;

function getArchiveData(): ArchiveItem[] {
    if (archiveCache) return archiveCache;

    const gzPath = path.join(process.cwd(), 'data', 'archive.json.gz');
    const jsonPath = path.join(process.cwd(), 'data', 'archive.json');

    try {
        if (fs.existsSync(gzPath)) {
            const fileBuffer = fs.readFileSync(gzPath);
            const decompressed = zlib.gunzipSync(fileBuffer);
            const fileContents = decompressed.toString('utf8');
            archiveCache = JSON.parse(fileContents);
        } else if (fs.existsSync(jsonPath)) {
            const fileContents = fs.readFileSync(jsonPath, 'utf8');
            archiveCache = JSON.parse(fileContents);
        } else {
            return [];
        }

        return archiveCache || [];
    } catch (error) {
        console.error('Failed to load archive data:', error);
        return [];
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { query } = body;

        if (!query || typeof query !== 'string') {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            );
        }

        const archiveData = getArchiveData();
        const lowerQuery = query.toLowerCase();
        const searchTerms = lowerQuery.split(/\s+/).filter(term => term.length > 2); // basic tokenization

        // Simple scoring algorithm
        const results = archiveData
            .map(item => {
                const content = item.content || '';
                const lowerContent = content.toLowerCase();
                let score = 0;

                // Exact match
                if (lowerContent.includes(lowerQuery)) {
                    score += 10;
                }

                // Term match
                searchTerms.forEach(term => {
                    if (lowerContent.includes(term)) {
                        score += 1;
                    }
                });

                // Search metadata if available
                if (item.extracted_metadata) {
                    const metaString = JSON.stringify(item.extracted_metadata).toLowerCase();
                    if (metaString.includes(lowerQuery)) score += 5;
                }

                return { ...item, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5) // Return top 5
            .map(item => ({
                // Return only necessary fields
                binder: item.binder,
                source_path: item.source_path,
                source_type: item.source_type,
                content: truncateContent(item.content, query)
            }));

        return NextResponse.json({ results });

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Helper to provide a relevant snippet around the match
function truncateContent(content: string, query: string, maxLength: number = 200): string {
    if (!content) return '';
    if (content.length <= maxLength) return content;

    // Find the first occurrence of the query to center the snippet
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);

    if (index === -1) {
        // If exact query not found (e.g. multi-word search found parts), just return start
        return content.substring(0, maxLength) + '...';
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, start + maxLength);

    return (start > 0 ? '...' : '') +
        content.substring(start, end) +
        (end < content.length ? '...' : '');
}
