import Link from 'next/link';
import styles from './page.module.css';
import { getSubstackPosts } from '@/lib/rss';

export default async function Home() {
  const posts = await getSubstackPosts();
  const recentEssays = posts.slice(0, 5); // Show top 5 recent

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
              <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem', listStyle: 'none' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/chapter-1" className={styles.folderLink}>
                    Chapter 1: The Nativity Thing
                  </a>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#666' }}>
                    Part I: The Deepest Part of the Deep South (1928–1950)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Folder 02: The Essays (Substack Content) */}
          <div className={styles.folder} id="folder-essays">
            <span className={styles.folderTab}>Folder 02</span>
            <h3 className={styles.folderTitle}>The Essays</h3>
            <p className={styles.folderMeta}>Theoretical works & Updates.</p>

            <p className="font-body" style={{ marginTop: '1rem', color: '#666', fontStyle: 'italic' }}>
              Coming soon.
            </p>
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
