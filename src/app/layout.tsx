import type { Metadata } from 'next'
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
  title: 'SOUTHOFTHESLOT.ORG | The Prager/Arnett Archive',
  description: 'The Digital Home of the Prager/Arnett Archive. "Industrial Noir meets Archival chic."',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${courierPrime.variable}`}>
        {children}
      </body>
    </html>
  )
}
