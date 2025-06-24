'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

export default function PageClient() {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  useEffect(() => {
    // Reading progress bar functionality
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      const progressBar = document.getElementById('reading-progress')
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateReadingProgress)

    // Initial call
    updateReadingProgress()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateReadingProgress)
    }
  }, [])

  return null
}
