import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Robotics Club',
  description: 'Official Robotics Club website',
  icons: {
    icon: "/favicon-64x64.png",
    shortcut: "/logo.png",
  }
}

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  )
}

