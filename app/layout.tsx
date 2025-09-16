import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "800 SEWAS City - THE JAINISM OF UNIVERSE",
  description:
    "800 Cities • 29 States • 7 Union Territories. THE JAINISM OF UNIVERSE - Complete housing solutions for Jain communities with 0% down payment and 100% bank loan.",
  generator: "v0.app",
  keywords: [
    "800 SEWAS City",
    "Jain Community Housing",
    "800 Cities India",
    "0% Down Payment",
    "THE JAINISM OF UNIVERSE",
    "180 International University Tie-ups",
    "Swadeshi Products 50% Discount",
  ],
  authors: [{ name: "800 SEWAS Infrastructure Limited" }],
  openGraph: {
    title: "800 SEWAS City - THE JAINISM OF UNIVERSE",
    description: "800 Cities • 29 States • 7 Union Territories serving Jain communities with complete life facilities",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hi" className={`${playfairDisplay.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
