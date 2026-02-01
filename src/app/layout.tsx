import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Bebas_Neue, Courier_Prime } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-courier',
})

export const metadata: Metadata = {
  title: 'The Writings of Robert Prager',
  description: 'The Digital Home of the Prager/Arnett Archive. The Record of San Francisco\'s Leather Era (1964).',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchiveComponent',
  'name': 'South of the Slot',
  'url': 'https://southoftheslot.org',
  'description': 'The Record of San Francisco\'s SOMA Leather Era circa 1964.',
  'mainEntity': {
    '@type': 'Collection',
    'name': 'The Prager/Arnett Archive',
    'description': 'A collection of writings, sketches, and historical records detailing the "refugee camp" social structure of 1960s SOMA.',
    'creator': [
      {
        '@type': 'Person',
        'name': 'Robert Prager',
        'jobTitle': ['Writer', 'Researcher']
      },
      {
        '@type': 'Person',
        'name': 'Chuck Arnett',
        'jobTitle': 'Artist'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${courierPrime.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
