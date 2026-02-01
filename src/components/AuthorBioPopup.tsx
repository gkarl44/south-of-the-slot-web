'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

interface BioPopupProps {
    onClose: () => void;
}

export default function AuthorBioPopup({ onClose }: BioPopupProps) {
    return createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Bio Card */}
            <div className="relative max-w-lg w-full bg-[#1a1a1a] border border-[#333] shadow-2xl rounded-sm p-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 opacity-80" />

                <h2 className="text-3xl font-bebas text-gray-100 mb-1">Robert Prager</h2>
                <p className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-6">1951 — 2014</p>

                <div className="space-y-4 text-gray-300 font-serif leading-relaxed text-lg">
                    <p>
                        Robert Prager was a San Francisco historian who spent two decades consistently documenting the <span className="text-white italic">"Golden Age"</span> of the South of Market leather scene.
                    </p>
                    <p>
                        His massive archive—now housed at the <strong>ONE National Gay & Lesbian Archives</strong> and the <strong>GLBT Historical Society</strong>—contains the DNA of this digital reconstruction.
                    </p>
                    <p className="text-sm text-gray-500 mt-4 border-t border-gray-800 pt-4 font-sans">
                        <em>"He gathered the wood; we built the house."</em>
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>,
        document.body
    );
}
