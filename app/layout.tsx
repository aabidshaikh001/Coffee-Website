import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Umber Coffee - Coffee Culture Tribute",
  description: "A tribute to coffee culture with a unique atmosphere, specialty coffee, and fresh food options.",
  keywords: [
    "coffee", "coffee shop", "umber coffee", "coffee culture", "fresh food", "community", "specialty coffee", "artisan coffee", "cafe experience"
  ],
  authors: [{ name: "Umber Coffee" }],
  creator: "Umber Coffee",
   
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <Toaster richColors position="bottom-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'