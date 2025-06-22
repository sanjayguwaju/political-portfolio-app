'use client'

import React from 'react'
import { DesktopNavbar } from './DesktopNavbar'
import { MobileNavbar } from './MobileNavbar'

interface ResponsiveNavbarProps {
  className?: string
  navData: any
}

export const ResponsiveNavbar: React.FC<ResponsiveNavbarProps> = ({ className = '', navData }) => {
  console.log(navData)
  return (
    <div className={className}>
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopNavbar navData={navData} />
      </div>

      {/* Mobile Navbar - Hidden on desktop */}
      <MobileNavbar />
    </div>
  )
}
