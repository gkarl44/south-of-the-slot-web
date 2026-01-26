'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ArchiveChat.module.css';

interface SearchResult {
    binder: string;
    source_path: string;
    source_type?: string;
    content: string;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
    results?: SearchResult[];
}

export default function ArchiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'The Archives are open. What are you looking for?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        const userQuery = query;
        setQuery(''); // Clear input immediately
        setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ask-archive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: userQuery }),
            });

            if (!response.ok) {
                throw new Error('Archive inaccessible');
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                setMessages(prev => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: `Found ${data.results.length} relevant records for "${userQuery}".`,
                        results: data.results
                    }
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    { role: 'assistant', content: `No records found in the archive matching "${userQuery}".` }
                ]);
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'The Archivist is currently unavailable. Please try again later.' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {!isOpen && (
                <button
                    className={styles.toggleButton}
                    onClick={() => setIsOpen(true)}
                >
                    Ask The Archivist
                </button>
            )}

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <h2 className={styles.headerTitle}>
                            Archive Search <span>v0.1</span>
                        </h2>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}
                            >
                                <div>{msg.content}</div>
                                {msg.results && (
                                    <div style={{ marginTop: '0.75rem' }}>
                                        {msg.results.map((result, rIdx) => (
                                            <div key={rIdx} className={styles.resultItem}>
                                                <span className={styles.resultMeta}>
                                                    {result.binder} — {result.source_path.split('/').pop()}
                                                </span>
                                                <div className={styles.resultText}>
                                                    "{result.content}"
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className={`${styles.message} ${styles.botMessage}`}>
                                <span className={styles.typingIndicator}>Searching records...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className={styles.inputArea} onSubmit={handleSearch}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Keywords (e.g., '1951', 'New Orleans')..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={isLoading}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className={styles.sendButton}
                            disabled={isLoading || !query.trim()}
                        >
                            ASK
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
