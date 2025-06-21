'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { ResponsiveNavbar } from '@/components/Navbar'
import { MobileNavbar } from '@/components/Navbar/MobileNavbar'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data: _data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Use refs for smooth scroll detection
  const isScrolledRef = useRef(false)
  const topHeaderRef = useRef<HTMLDivElement>(null)
  const stickyNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Handle scroll detection with useRef and requestAnimationFrame
  useEffect(() => {
    let ticking = false

    const updateScrollState = () => {
      const scrollTop = window.scrollY
      const wasScrolled = isScrolledRef.current
      const isScrolled = scrollTop > 50

      if (wasScrolled !== isScrolled) {
        isScrolledRef.current = isScrolled

        // Update top header visibility
        if (topHeaderRef.current) {
          if (isScrolled) {
            topHeaderRef.current.style.opacity = '0'
            topHeaderRef.current.style.pointerEvents = 'none'
            topHeaderRef.current.style.transform = 'translateY(-100%)'
          } else {
            topHeaderRef.current.style.opacity = '1'
            topHeaderRef.current.style.pointerEvents = 'auto'
            topHeaderRef.current.style.transform = 'translateY(0)'
          }
        }

        // Update sticky nav styling
        if (stickyNavRef.current) {
          if (isScrolled) {
            stickyNavRef.current.style.position = 'fixed'
            stickyNavRef.current.style.top = '0'
            stickyNavRef.current.style.left = '0'
            stickyNavRef.current.style.right = '0'
            stickyNavRef.current.style.zIndex = '40'
            stickyNavRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
            stickyNavRef.current.style.backdropFilter = 'blur(8px)'
            stickyNavRef.current.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          } else {
            stickyNavRef.current.style.position = 'relative'
            stickyNavRef.current.style.backgroundColor = ''
            stickyNavRef.current.style.backdropFilter = ''
            stickyNavRef.current.style.boxShadow = ''
          }
        }
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Header Bar with Logo - Hidden on mobile, shows on desktop and hides on scroll */}
      <div
        ref={topHeaderRef}
        className="container relative z-20 transition-all duration-300 hidden lg:block"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="py-6 flex justify-center items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div
        ref={stickyNavRef}
        className="w-full transition-all duration-300"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container">
          <div className="py-4 flex justify-between items-center lg:justify-center">
            {/* Logo - Visible on mobile, hidden on desktop */}
            <div className="lg:hidden">
              <Link href="/">
                <Logo loading="eager" priority="high" className="invert dark:invert-0" />
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:block">
              <ResponsiveNavbar />
            </div>

            {/* Mobile Navigation - Visible on mobile, hidden on desktop */}
            <div className="lg:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
