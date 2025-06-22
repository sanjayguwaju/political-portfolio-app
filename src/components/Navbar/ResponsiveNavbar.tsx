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
    <div className={`flex items-center ${className}`}>
      {/* Desktop Navbar - Hidden on mobile, centered */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-center">
        <DesktopNavbar navData={navData} />
      </div>

      {/* Mobile Navbar - Hidden on desktop, positioned on the right */}
      <div className="lg:hidden ml-auto">
        <MobileNavbar navData={navData} />
      </div>
    </div>
  )
}
