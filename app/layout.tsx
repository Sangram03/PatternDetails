// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PixelDetails - AI-Powered Pattern Studio",
  description:
    "Create, customize, and export stunning visual patterns with our advanced AI-powered pattern studio. Professional-grade backgrounds for modern web design.",
  keywords: ["pattern", "details", "nextjs", "meta tags"],
  generator: "v0.dev",
  icons: {
    icon: "/favicon/favicon.ico", // Must be in public/favicon/
  },
  openGraph: {
    title: "PixelDetails - AI-Powered Pattern Studio",
    description:
      "Create, customize, and export stunning visual patterns with our advanced AI-powered pattern studio. Professional-grade backgrounds for modern web design.",
    url: "https://pattern-in-details.vercel.app/",
    siteName: "Pattern In Details",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
