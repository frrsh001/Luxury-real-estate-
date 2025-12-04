import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { AIChatbot } from "@/components/ai-chatbot"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luxury Estates Nigeria | Premium Real Estate Agent",
  description:
    "Discover luxury properties in Nigeria's most prestigious neighborhoods. Expert real estate agent specializing in high-end homes in Lagos.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <FloatingWhatsApp />
        <AIChatbot />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
