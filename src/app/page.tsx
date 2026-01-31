import Link from 'next/link';
import styles from './page.module.css';
import { getSubstackPosts } from '@/lib/rss';
import { getAllPosts } from '@/lib/api';

export default async function Home() {
  const posts = await getSubstackPosts();
  const recentEssays = posts.slice(0, 5);

  // Fetch chapters
  const chapters = getAllPosts(['title', 'slug', 'part']);

  return (
    <main className={styles.main}>
      {/* 3.A The "Mural" Landing Page */}
      <section className={styles.hero}>
        <div className={styles.muralPlaceholder} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 className={styles.hook}>
            San Francisco was a Refugee Camp. <br />
            <span className="text-accent">This is the Record.</span>
          </h1>
          <div className={styles.ctaContainer}>
            <Link href="#folder-biography" className={styles.button}>
              Read The Biography
            </Link>
            <Link href="#folder-essays" className={styles.button}>
              Enter The Archive
            </Link>
            <Link href="/timeline" className={styles.button}>
              View Timeline
            </Link>
          </div>
        </div>
      </section>

      {/* 3.B The "Finding Aid" Navigation */}
      <section className={`${styles.section} container`} id="archive">
        <h2 className={styles.sectionHeader}>The Filing Cabinet</h2>

        <div className={styles.fileCabinet}>
          {/* Folder 01: The Biography */}
          <div className={styles.folder} id="folder-biography">
            <span className={styles.folderTab}>Folder 01</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 className={styles.folderTitle}>The Biography</h3>
              <a href="https://substack.com/@robertprager" target="_blank" className="text-accent text-xs hover:underline uppercase tracking-widest">
                On Substack ↗
              </a>
            </div>
            <p className={styles.folderMeta}>Chronological Chapters.</p>
            <div className="font-body" style={{ marginTop: '1rem', color: '#ccc' }}>
              Vol I: The Life and Times of Chuck Arnett
              <ul style={{ paddingLeft: '0', marginTop: '0.5rem', listStyle: 'none' }}>
                {chapters.map((chapter) => (
                  <li key={chapter.slug} style={{ marginBottom: '0.8rem' }}>
                    <Link href={`/biography/${chapter.slug}`} className={styles.folderLink}>
                      <span style={{ color: '#fff', borderBottom: '1px solid #444' }}>{chapter.title}</span>
                    </Link>
                    {/* Optional: Limit metadata to keep list clean, or show Part on hover? */}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Folder 02: The Essays (Substack Content) */}
          <div className={styles.folder} id="folder-essays">
            <span className={styles.folderTab}>Folder 02</span>
            <h3 className={styles.folderTitle}>The Essays</h3>
            <p className={styles.folderMeta}>Theoretical works & Updates.</p>

            {posts.length > 0 ? (
              <ul style={{ paddingLeft: '0', marginTop: '0.5rem', listStyle: 'none' }}>
                {recentEssays.map(post => (
                  <li key={post.id} style={{ marginBottom: '0.8rem' }}>
                    <a href={post.link} target="_blank" className={styles.folderLink}>
                      <span style={{ color: '#fff' }}>{post.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-body" style={{ marginTop: '1rem', color: '#666', fontStyle: 'italic' }}>
                Coming soon.
              </p>
            )}
          </div>

          {/* Folder 03: The Evidence */}
          <div className={styles.folder} id="folder-evidence">
            <span className={styles.folderTab}>Folder 03</span>
            <h3 className={styles.folderTitle}>The Evidence</h3>
            <p className={styles.folderMeta}>Scans, Letters, 1996 Disks.</p>
            <p className="font-body" style={{ marginTop: '1rem', color: '#ccc' }}>
              Access restricted. <br />
              Digitization in progress.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
