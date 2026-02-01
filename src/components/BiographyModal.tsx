'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

interface Chapter {
    title: string;
    slug: string;
    part?: string;
    [key: string]: string | undefined;
}

interface BiographyModalProps {
    isOpen: boolean;
    onClose: () => void;
    chapters: Chapter[];
}

export default function BiographyModal({ isOpen, onClose, chapters }: BiographyModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with Glassmorphism */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl max-h-[85vh] bg-neutral-900 border border-neutral-700 shadow-2xl rounded-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-neutral-700 bg-neutral-800/50 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-2xl font-bebas tracking-wide text-white">The Biography</h2>
                        <p className="text-sm text-neutral-400 font-serif italic">Vol I: The Life and Times of Chuck Arnett</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-neutral-700/50"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable List */}
                <div className="overflow-y-auto p-6 space-y-2 custom-scrollbar">
                    {chapters.map((chapter, index) => {
                        // Basic logic to detect "Parts" if naming convention allows, otherwise just list
                        const isPartHeader = chapter.title.startsWith("Part");

                        return (
                            <Link
                                key={chapter.slug}
                                href={`/biography/${chapter.slug}`}
                                onClick={onClose}
                                className="group block p-4 rounded-md hover:bg-neutral-800 transition-all duration-200 border border-transparent hover:border-neutral-700"
                            >
                                <div className="flex items-baseline justify-between">
                                    <span className="text-lg font-bold text-neutral-300 group-hover:text-amber-500 transition-colors font-courier">
                                        {chapter.title}
                                    </span>
                                    <span className="text-xs text-neutral-600 font-mono group-hover:text-amber-500/50 uppercase tracking-widest">
                                        Chapter {index}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-neutral-700 bg-neutral-800/30 text-center shrink-0">
                    <p className="text-xs text-neutral-500 font-mono">
                        {chapters.length} Documents Available • Access Granted
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}
