'use client';

import { useState } from 'react';
import Link from 'next/link';
import BiographyModal from '@/components/BiographyModal';
import AuthorBioPopup from '@/components/AuthorBioPopup';

// Types must be defined or imported since this is now a Client Component
interface Post {
    title: string;
    link: string;
    guid: string;
}

interface Chapter {
    title: string;
    slug: string;
    part?: string;
}

interface HomeProps {
    posts: Post[];
    chapters: Chapter[];
}

export default function HomeClient({ posts, chapters }: HomeProps) {
    const [isBioModalOpen, setBioModalOpen] = useState(false);
    const [isAuthorModalOpen, setAuthorModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-neutral-900 text-neutral-100 selection:bg-amber-900 selection:text-white">

            {/* 1. Hero / Identity Section */}
            <section className="relative h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden">
                {/* Background Texture/Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black opacity-80 z-0" />

                <div className="relative z-10 max-w-4xl w-full">
                    {/* Main Title Setup */}
                    <div className="mb-2">
                        <span className="font-mono text-amber-600 tracking-[0.2em] text-sm uppercase">The Writings of</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 mb-6 drop-shadow-lg cursor-pointer hover:scale-[1.01] transition-transform duration-500"
                        onClick={() => setAuthorModalOpen(true)}>
                        Robert Prager
                    </h1>

                    <p className="text-xl md:text-3xl font-serif text-neutral-400 italic max-w-2xl mx-auto leading-relaxed border-t border-neutral-800 pt-8 mt-4">
                        "San Francisco was a Refugee Camp."
                    </p>

                    {/* Quick Info / Hints */}
                    <div className="mt-12 flex justify-center space-x-8 text-xs font-mono text-neutral-600 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 blink-animation"></span>
                            Archive Online
                        </span>
                        <span>Est. 2026</span>
                        <button
                            onClick={() => setAuthorModalOpen(true)}
                            className="hover:text-amber-500 transition-colors border-b border-transparent hover:border-amber-500/50"
                        >
                            About the Historian
                        </button>
                    </div>
                </div>

                {/* Animated Scroll Hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-neutral-600 animate-bounce">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 13L12 18L17 13M7 6L12 11L17 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </section>

            {/* 2. The Dashboard / Navigation Deck */}
            <section className="relative z-20 bg-neutral-950 border-t border-neutral-800 py-24 min-h-[80vh] flex items-center">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] mb-12 text-center">
                        Select a Collection
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                        {/* Card 1: The Biography */}
                        <div
                            onClick={() => setBioModalOpen(true)}
                            className="group relative h-96 bg-neutral-900 border border-neutral-800 rounded-lg p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:border-amber-700/50 hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-6xl text-neutral-800 group-hover:text-amber-900/40 transition-colors">01</div>

                            <div className="h-full flex flex-col justify-end relative z-10">
                                <h3 className="text-3xl font-bebas text-white mb-2 group-hover:text-amber-500 transition-colors">The Biography</h3>
                                <p className="text-neutral-400 font-serif text-sm leading-relaxed mb-6">
                                    The definitive reconstruction of the life and times of Chuck Arnett and the SOMA leather scene.
                                </p>
                                <div className="flex items-center text-amber-600 text-xs font-mono uppercase tracking-widest">
                                    <span>20 Chapters Available</span>
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: The Essays */}
                        <div className="group relative h-96 bg-neutral-900 border border-neutral-800 rounded-lg p-8 overflow-hidden transition-all duration-300 hover:border-neutral-600">
                            <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-6xl text-neutral-800">02</div>

                            <div className="h-full flex flex-col justify-end relative z-10">
                                <h3 className="text-3xl font-bebas text-white mb-2">The Essays</h3>
                                <div className="space-y-4 mb-6">
                                    {posts.slice(0, 3).map(post => (
                                        <a href={post.link} key={post.guid} target="_blank" className="block text-sm text-neutral-400 hover:text-white truncate border-b border-neutral-800 pb-2 transition-colors">
                                            {post.title}
                                        </a>
                                    ))}
                                    {posts.length === 0 && <span className="text-neutral-600 text-sm italic">Coming soon...</span>}
                                </div>
                                <a href="https://substack.com/@robertprager" target="_blank" className="flex items-center text-neutral-500 text-xs font-mono uppercase tracking-widest hover:text-white transition-colors">
                                    <span>Read on Substack</span>
                                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                            </div>
                        </div>

                        {/* Card 3: The Evidence */}
                        <div className="group relative h-96 bg-neutral-900/50 border border-neutral-800 rounded-lg p-8 border-dashed">
                            <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-6xl text-neutral-800">03</div>

                            <div className="h-full flex flex-col justify-end relative z-10 opacity-60">
                                <h3 className="text-3xl font-bebas text-white mb-2">The Evidence</h3>
                                <p className="text-neutral-400 font-serif text-sm leading-relaxed mb-6">
                                    Scans, original letters, and the recovered 1996 floppy disks.
                                </p>
                                <div className="flex items-center text-neutral-600 text-xs font-mono uppercase tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-amber-900/50 mr-2"></span>
                                    <span>Digitization in Progress</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Modals */}
            <BiographyModal isOpen={isBioModalOpen} onClose={() => setBioModalOpen(false)} chapters={chapters} />
            {isAuthorModalOpen && <AuthorBioPopup onClose={() => setAuthorModalOpen(false)} />}
        </main>
    );
}
