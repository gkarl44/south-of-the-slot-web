import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import styles from './timeline.module.css';

interface TimelineEvent {
    date: string;
    source?: string;
    quote?: string;
    mentions?: string;
}

interface YearGroup {
    year: string;
    events: TimelineEvent[];
}

function parseTimelineMarkdown(content: string): YearGroup[] {
    const lines = content.split('\n');
    const groups: YearGroup[] = [];
    let currentGroup: YearGroup | null = null;
    let currentEvent: TimelineEvent | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check for Year Header (e.g. "## 1906")
        if (line.startsWith('## ')) {
            // Push previous event if exists
            if (currentEvent && currentGroup) {
                currentGroup.events.push(currentEvent);
                currentEvent = null;
            }

            const year = line.replace('## ', '').trim();
            currentGroup = { year, events: [] };
            groups.push(currentGroup);
            continue;
        }

        // Check for Event Date (e.g. "- **April 1906**")
        if (line.startsWith('- **')) {
            // Push previous event if exists
            if (currentEvent && currentGroup) {
                currentGroup.events.push(currentEvent);
            }

            const dateMatch = line.match(/\- \*\*(.*?)\*\*/);
            const date = dateMatch ? dateMatch[1] : 'Unknown Date';
            currentEvent = { date };
            continue;
        }

        // Check for attributes inside an event
        if (currentEvent) {
            if (line.startsWith('- *Source:*')) {
                currentEvent.source = line.replace('- *Source:*', '').trim().replace(/`/g, '');
            } else if (line.startsWith('- >')) {
                const quote = line.replace('- >', '').trim().replace(/^"/, '').replace(/"$/, '');
                currentEvent.quote = quote;
            } else if (line.startsWith('- *Mentions:*')) {
                currentEvent.mentions = line.replace('- *Mentions:*', '').trim();
            }
        }
    }

    // Push the final event
    if (currentEvent && currentGroup) {
        currentGroup.events.push(currentEvent);
    }

    return groups;
}

export default function TimelinePage() {
    const filePath = path.join(process.cwd(), 'content', 'timeline.md');
    let timelineGroups: YearGroup[] = [];
    let title = 'Project Arnett: Master Linked Timeline';

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Extract title if present (first line #)
        const titleMatch = content.match(/^# (.*)$/m);
        if (titleMatch) title = titleMatch[1];

        timelineGroups = parseTimelineMarkdown(content);
    } catch (error) {
        console.error('Error reading timeline:', error);
        return <div>Error loading timeline.</div>;
    }

    return (
        <main className={styles.main}>
            <nav>
                <Link href="/" className={styles.backLink}>← Back to Archive</Link>
            </nav>

            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>
                    Linking historical dates directly to source documents.
                </p>
            </header>

            <div className={styles.toc}>
                <span style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem', fontWeight: 'bold' }}>JUMP TO:</span>
                {timelineGroups.map(group => (
                    <a key={group.year} href={`#year-${group.year}`} className={styles.tocLink}>
                        {group.year}
                    </a>
                ))}
            </div>

            <div className={styles.timeline}>
                {timelineGroups.map((group) => (
                    <section key={group.year} id={`year-${group.year}`} className={styles.yearSection}>
                        <h2 className={styles.yearHeader}>{group.year}</h2>
                        {group.events.map((event, idx) => (
                            <article key={idx} className={styles.timelineEntry}>
                                <span className={styles.date}>{event.date}</span>

                                {event.quote && (
                                    <blockquote className={styles.quote}>
                                        <span className={styles.quoteText}>{event.quote}</span>
                                    </blockquote>
                                )}

                                {event.source && (
                                    <div className={styles.source}>
                                        Source: {event.source}
                                    </div>
                                )}

                                {event.mentions && (
                                    <div className={styles.mentions}>
                                        <span className={styles.mentionsLabel}>Mentions:</span>
                                        {event.mentions}
                                    </div>
                                )}
                            </article>
                        ))}
                    </section>
                ))}
            </div>
        </main>
    );
}
