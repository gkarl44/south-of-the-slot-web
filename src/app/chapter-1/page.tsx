import Link from 'next/link';

export default function Chapter1() {
    return (
        <main className="min-h-screen bg-background text-foreground pb-20">
            {/* Navigation */}
            <nav className="p-6 border-b border-[#333]">
                <Link href="/" className="text-accent hover:text-white uppercase font-heading tracking-widest no-underline transition-colors">
                    ← Back to Archive
                </Link>
            </nav>

            {/* Article Content */}
            <article className="max-w-[65ch] mx-auto px-6 pt-16 font-body text-lg leading-relaxed">
                {/* Header */}
                <header className="mb-12 text-center">
                    <h1 className="font-heading text-5xl md:text-6xl mb-4 text-accent">
                        The Life and Times of Chuck Arnett
                    </h1>
                    <h2 className="text-sm md:text-base tracking-widest uppercase text-gray-500 mb-6 border-b border-gray-800 pb-6">
                        Part I: The Deepest Part of the Deep South (1928–1950)
                    </h2>
                    <h3 className="font-heading text-3xl">1. The Nativity Thing</h3>
                </header>

                {/* Text Body */}
                <div className="space-y-6 text-[#dadada]">
                    <p>
                        "I can be a real bastard sometimes," Chuck Arnett used to boast to his friends in San Francisco, usually after a third hit of crystal, a mischievous, almost demonic glint in his eye. "But then, who has a better right to be one than me?"
                    </p>

                    <p>
                        To hear Chuck tell it over a late-night drink at The Stud, he was a love child, a product of pure lust and passion rather than convenience or church-approved respectability. Throughout his sixty years, he was always fiercely proud to call New Orleans his hometown. It was the place he came from before he came from anywhere else; an oasis of relative tolerance, jazz, and sin surrounded by the harsh, inhospitable deserts of the Southern Bible Belt. But even a quick glance at his birth certificate tells a slightly different, more complicated story.
                    </p>

                    <p>
                        Chuck Arnett was born on Wednesday, February 15, 1928—the day after Valentine's Day. But he was not born in the city of New Orleans. He was born in the Elizabeth Sullivan Memorial Hospital in Bogalusa, Louisiana, a "no place" lumber town located seventy miles away on the far side of Lake Pontchartrain.
                    </p>

                    <p>
                        His mother was Hazel Hillary Beard, an 18-year-old lifelong New Orleans native. The story passed down through Hazel’s family—and later repeated by Chuck to his closest friend Bill Tellman—was a masterpiece of Southern obfuscation. As the story went, Hazel had an older, married sister living in Bogalusa. While Hazel was heavily pregnant, this sister decided to throw a party that the young mother-to-be simply had to attend. It was purportedly during this brief visit that Chuck upset everyone’s calculations by arriving unexpectedly early.
                    </p>

                    <p>
                        "What kind of party was it?" Prager once asked Bill Tellman, seeking to flesh out the details of this family lore decades later.
                    </p>

                    <p>
                        "It was a baby shower," Tellman replied without hesitation. "For Hazel and her baby."
                    </p>

                    <p>
                        For decades, this was the accepted gospel. Chuck was a bastard, born of sin in a hiding place. It fit his outlaw persona perfectly.
                    </p>

                    <p>
                        But Prager, ever the skeptic, dug deeper. In the age of digital archives, the "Bastard of Bogalusa" myth unraveled. A June 3, 1927 notice in the Washington Parish Era-Leader reported simply: "C.W. Arnett has applied for a license to marry Hazel H. Beard."
                    </p>

                    <p>
                        Furthermore, the 1930 U.S. Census places the family not in New Orleans, but in Indianapolis, Indiana—800 miles north. The "railroad brakeman" father hadn't abandoned them; he had been transferred. The little family of three—C.W., Hazel, and two-year-old "Charles Jr."—were living together in the Midwest.
                    </p>

                    <p>
                        The "Bastard" story wasn't a lie Chuck told to deceive others; it was likely a lie his mother told him after the marriage collapsed. By 1940, Hazel was back in New Orleans, listed as "divorced" (and magically two years younger). The father had moved to Dallas and started a new family.
                    </p>

                    <p>
                        So Chuck became a self-made bastard. He took the broken pieces of his family history and glued them into a story that made him sound dangerous, rather than just abandoned.
                    </p>

                    <p>
                        When the time came to sign the birth records, Hazel did something significant: she named names. She identified the father as Charles William Arnett. Perhaps hoping to bind the father to the child, or simply following the oldest tradition in the book, she named her son after him.
                    </p>

                    <p>
                        But then, catching a mistake she had almost made, she used a caret symbol to insert a crucial distinction into the record. She added the word "Senior" after the father's name. And for her son, she wrote in plain, legible script: Charles William Arnett Junior.
                    </p>

                    <p>
                        It was a suffix he would never use. To the world, and to history, he would simply be Chuck.
                    </p>
                </div>
            </article>

            {/* Decorative Footer */}
            <footer className="mt-20 pt-10 border-t border-[#333] text-center text-sm text-gray-600 font-body uppercase tracking-wider">
                <p>The Prager/Arnett Archive</p>
                <p>South of the Slot © 2026</p>
            </footer>
        </main>
    );
}
