import type React from "react"
import { QueryProvider } from "@/providers/query-provider"
import { ReduxProvider } from "@/react-redux/redux-provider"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"


const inter = Inter({ subsets: ["latin"], display : "swap" })

export const metadata: Metadata = {
  title: "Amishrit",
  description: "Generated by create next app",
  icons: {
    icon: "/Amishrit.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <ReduxProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </ReduxProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
