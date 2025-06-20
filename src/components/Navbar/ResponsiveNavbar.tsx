'use client'

import React from 'react'
import { DesktopNavbar } from './DesktopNavbar'
import { MobileNavbar } from './MobileNavbar'

interface ResponsiveNavbarProps {
  className?: string
}

export const ResponsiveNavbar: React.FC<ResponsiveNavbarProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopNavbar />
      </div>

      {/* Mobile Navbar - Hidden on desktop */}
      <MobileNavbar />
    </div>
  )
}
