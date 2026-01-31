import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'content/biography');

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        type Items = {
            [key: string]: string;
        }

        const items: Items = {};

        // Ensure only the minimal needed data is exposed
        fields.forEach((field) => {
            if (field === 'slug') {
                items[field] = realSlug;
            }
            if (field === 'content') {
                items[field] = content;
            }

            if (typeof data[field] !== 'undefined') {
                items[field] = data[field];
            }
        });

        return items;
    } catch (e) {
        console.error(`Error reading file ${fullPath}:`, e);
        return null;
    }
}

export function getAllPosts(fields: string[] = []) {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        .filter((post): post is Record<string, string> => post !== null)
        // Sort posts by Chapter Number
        .sort((post1, post2) => {
            // Handle Introduction/Note files
            if (post1.slug.startsWith('00-')) return -1;
            if (post2.slug.startsWith('00-')) return 1;

            // Extract number from slug (chapter-N-...)
            const num1 = parseInt(post1.slug.match(/chapter-(\d+)/)?.[1] || '999');
            const num2 = parseInt(post2.slug.match(/chapter-(\d+)/)?.[1] || '999');
            return num1 - num2;
        });
    return posts;
}
