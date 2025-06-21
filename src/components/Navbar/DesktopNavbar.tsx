'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import { navItems, NavItem } from './navData'

interface DesktopNavbarProps {
  className?: string
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ className = '' }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)
  const [activeSubSubDropdown, setActiveSubSubDropdown] = useState<string | null>(null)
  const navbarRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setActiveSubDropdown(null)
        setActiveSubSubDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDropdownToggle = (itemId: string) => {
    if (activeDropdown === itemId) {
      setActiveDropdown(null)
      setActiveSubDropdown(null)
      setActiveSubSubDropdown(null)
    } else {
      setActiveDropdown(itemId)
      setActiveSubDropdown(null)
      setActiveSubSubDropdown(null)
    }
  }

  const handleSubDropdownToggle = (itemId: string) => {
    if (activeSubDropdown === itemId) {
      setActiveSubDropdown(null)
      setActiveSubSubDropdown(null)
    } else {
      setActiveSubDropdown(itemId)
      setActiveSubSubDropdown(null)
    }
  }

  const handleSubSubDropdownToggle = (itemId: string) => {
    if (activeSubSubDropdown === itemId) {
      setActiveSubSubDropdown(null)
    } else {
      setActiveSubSubDropdown(itemId)
    }
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isActive = activeDropdown === item.id
    const isSubActive = activeSubDropdown === item.id
    const isSubSubActive = activeSubSubDropdown === item.id

    const baseClasses =
      'flex items-center justify-between px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    const activeClasses = level === 0 ? 'bg-gray-100 dark:bg-gray-800' : ''
    const levelClasses = level === 0 ? 'relative' : level === 1 ? 'relative' : 'relative'

    return (
      <div key={item.id} className={`${levelClasses} ${level === 0 ? 'inline-block' : 'w-full'}`}>
        <div className={`${baseClasses} ${activeClasses} ${level > 0 ? 'w-full' : ''}`}>
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="w-4 h-4" />}
            {item.href ? (
              <Link href={item.href} className="flex-1">
                {item.label}
              </Link>
            ) : (
              <span className="flex-1">{item.label}</span>
            )}
          </div>
          {hasChildren && (
            <button
              onClick={() => {
                if (level === 0) handleDropdownToggle(item.id)
                else if (level === 1) handleSubDropdownToggle(item.id)
                else if (level === 2) handleSubSubDropdownToggle(item.id)
              }}
              className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {level === 0 ? (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`}
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${isSubActive || isSubSubActive ? 'rotate-90' : ''}`}
                />
              )}
            </button>
          )}
        </div>

        {/* Level 1 Dropdown */}
        {hasChildren && level === 0 && isActive && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            {item.children!.map((child) => renderNavItem(child, 1))}
          </div>
        )}

        {/* Level 2 Dropdown */}
        {hasChildren && level === 1 && isSubActive && (
          <div className="absolute top-0 left-full ml-1 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            {item.children!.map((child) => renderNavItem(child, 2))}
          </div>
        )}

        {/* Level 3 Dropdown */}
        {hasChildren && level === 2 && isSubSubActive && (
          <div className="absolute top-0 left-full ml-1 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            {item.children!.map((child) => renderNavItem(child, 3))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={navbarRef} className={`relative ${className}`}>
      <nav className="flex items-center space-x-1">
        {navItems.map((item) => renderNavItem(item))}

        {/* Search button */}
        <Link
          href="/search"
          className="flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Search className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </Link>
      </nav>
    </div>
  )
}
