'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
})

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
