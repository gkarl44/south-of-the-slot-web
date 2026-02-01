import { getSubstackPosts } from '@/lib/rss';
import { getAllPosts } from '@/lib/api';
import HomeClient from './page.client';

export default async function Home() {
  const posts = await getSubstackPosts();

  // Fetch chapters
  const chapters = getAllPosts(['title', 'slug', 'part']);

  return <HomeClient posts={posts} chapters={chapters} />;
}
