'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

  // Framer Motion scroll hook
  const { scrollY } = useScroll()

  // Transform scroll values to animation values
  const topHeaderOpacity = useTransform(scrollY, [0, 50], [1, 0])
  const topHeaderY = useTransform(scrollY, [0, 50], [0, -100])
  const navbarBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)'],
  )
  const navbarShadow = useTransform(
    scrollY,
    [0, 50],
    ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 1px 3px rgba(0, 0, 0, 0.1)'],
  )

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <>
      {/* Top Header Bar with Logo - Hidden on mobile, shows on desktop and hides on scroll */}
      <motion.div
        className="container relative z-30 hidden lg:block"
        style={{
          opacity: topHeaderOpacity,
          y: topHeaderY,
          pointerEvents: useTransform(scrollY, [0, 50], ['auto', 'none']),
        }}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="py-6 flex justify-center items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
        </div>
      </motion.div>

      {/* Navigation Bar - Sticky with smooth background transition */}
      <motion.div className="w-full sticky top-0 z-40 bg-blue-800">
        <div className="container">
          <div className="py-4 flex justify-between items-center">
            {/* Logo - Visible on mobile, hidden on desktop */}
            <div className="lg:hidden">
              <Link href="/">
                <Logo loading="eager" priority="high" className="invert dark:invert-0" />
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:block w-full">
              <ResponsiveNavbar navData={_data.navItems} />
            </div>

            {/* Mobile Navigation - Visible on mobile, hidden on desktop */}
            <div className="lg:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
