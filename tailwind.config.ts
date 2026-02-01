import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                bebas: ['var(--font-bebas)'],
                serif: ['var(--font-courier)'],
                mono: ['var(--font-courier)'], // Use Courier for mono too
            },
            colors: {
                amber: {
                    500: '#ffbf00', // Example override if needed, but default is fine
                    600: '#d97706',
                    900: '#78350f',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'zoom-in-95': 'zoomIn95 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                zoomIn95: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
