"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "react-redux"
import { Toaster } from "sonner"
import { useState } from "react"
import { store } from "@/react-redux/store"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
          <Toaster position="top-center" />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        {/* </ThemeProvider> */}
      </Provider>
    </QueryClientProvider>
  )
}
