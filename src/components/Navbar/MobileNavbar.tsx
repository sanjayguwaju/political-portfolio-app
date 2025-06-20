'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  FileText,
  Settings,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Info,
  Award,
  BookOpen,
  Globe,
  Building,
  Heart,
  Star,
  Target,
  TrendingUp,
  Shield,
  Search,
} from 'lucide-react'

// Types for the navbar structure
interface NavItem {
  id: string
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

// Dummy data for the navbar (same as main navbar)
const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    id: 'about',
    label: 'About',
    icon: Info,
    children: [
      {
        id: 'our-story',
        label: 'Our Story',
        href: '/about/story',
        icon: BookOpen,
      },
      {
        id: 'team',
        label: 'Our Team',
        icon: Users,
        children: [
          {
            id: 'leadership',
            label: 'Leadership',
            href: '/about/team/leadership',
            icon: Star,
          },
          {
            id: 'staff',
            label: 'Staff',
            href: '/about/team/staff',
            icon: Users,
          },
          {
            id: 'volunteers',
            label: 'Volunteers',
            href: '/about/team/volunteers',
            icon: Heart,
          },
        ],
      },
      {
        id: 'mission',
        label: 'Mission & Values',
        href: '/about/mission',
        icon: Target,
      },
      {
        id: 'awards',
        label: 'Awards & Recognition',
        href: '/about/awards',
        icon: Award,
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: Settings,
    children: [
      {
        id: 'consulting',
        label: 'Consulting',
        icon: Building,
        children: [
          {
            id: 'strategy',
            label: 'Strategic Planning',
            href: '/services/consulting/strategy',
            icon: TrendingUp,
          },
          {
            id: 'policy',
            label: 'Policy Development',
            href: '/services/consulting/policy',
            icon: FileText,
          },
          {
            id: 'compliance',
            label: 'Compliance',
            href: '/services/consulting/compliance',
            icon: Shield,
          },
        ],
      },
      {
        id: 'campaigns',
        label: 'Campaign Management',
        href: '/services/campaigns',
        icon: Target,
      },
      {
        id: 'research',
        label: 'Research & Analysis',
        href: '/services/research',
        icon: BookOpen,
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: FileText,
    children: [
      {
        id: 'publications',
        label: 'Publications',
        href: '/resources/publications',
        icon: FileText,
      },
      {
        id: 'events',
        label: 'Events',
        icon: Calendar,
        children: [
          {
            id: 'upcoming',
            label: 'Upcoming Events',
            href: '/resources/events/upcoming',
            icon: Calendar,
          },
          {
            id: 'past',
            label: 'Past Events',
            href: '/resources/events/past',
            icon: Calendar,
          },
          {
            id: 'webinars',
            label: 'Webinars',
            href: '/resources/events/webinars',
            icon: Globe,
          },
        ],
      },
      {
        id: 'news',
        label: 'News & Updates',
        href: '/resources/news',
        icon: FileText,
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Phone,
    children: [
      {
        id: 'locations',
        label: 'Our Locations',
        href: '/contact/locations',
        icon: MapPin,
      },
      {
        id: 'email',
        label: 'Email Us',
        href: '/contact/email',
        icon: Mail,
      },
      {
        id: 'phone',
        label: 'Call Us',
        href: '/contact/phone',
        icon: Phone,
      },
    ],
  },
]

interface MobileNavbarProps {
  className?: string
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [expandedSubItems, setExpandedSubItems] = useState<Set<string>>(new Set())
  const [expandedSubSubItems, setExpandedSubSubItems] = useState<Set<string>>(new Set())
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setExpandedItems(new Set())
      setExpandedSubItems(new Set())
      setExpandedSubSubItems(new Set())
    }
  }

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const toggleSubItem = (itemId: string) => {
    const newExpanded = new Set(expandedSubItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedSubItems(newExpanded)
  }

  const toggleSubSubItem = (itemId: string) => {
    const newExpanded = new Set(expandedSubSubItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedSubSubItems(newExpanded)
  }

  const renderMobileNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    const isSubExpanded = expandedSubItems.has(item.id)
    const isSubSubExpanded = expandedSubSubItems.has(item.id)

    const levelPadding = level * 16 // 16px per level

    return (
      <div key={item.id} className="w-full">
        <div
          className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            level > 0 ? 'border-l-2 border-gray-200 dark:border-gray-700' : ''
          }`}
          style={{ paddingLeft: `${16 + levelPadding}px` }}
        >
          <div className="flex items-center gap-3 flex-1">
            {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="flex-1" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <span className="flex-1">{item.label}</span>
            )}
          </div>
          {hasChildren && (
            <button
              onClick={() => {
                if (level === 0) toggleItem(item.id)
                else if (level === 1) toggleSubItem(item.id)
                else if (level === 2) toggleSubSubItem(item.id)
              }}
              className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {level === 0 ? (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${isSubExpanded || isSubSubExpanded ? 'rotate-90' : ''}`}
                />
              )}
            </button>
          )}
        </div>

        {/* Level 1 Children */}
        {hasChildren && level === 0 && isExpanded && (
          <div className="w-full">
            {item.children!.map((child) => renderMobileNavItem(child, 1))}
          </div>
        )}

        {/* Level 2 Children */}
        {hasChildren && level === 1 && isSubExpanded && (
          <div className="w-full">
            {item.children!.map((child) => renderMobileNavItem(child, 2))}
          </div>
        )}

        {/* Level 3 Children */}
        {hasChildren && level === 2 && isSubSubExpanded && (
          <div className="w-full">
            {item.children!.map((child) => renderMobileNavItem(child, 3))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={menuRef} className={`lg:hidden ${className}`}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <nav className="py-2">{navItems.map((item) => renderMobileNavItem(item))}</nav>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/search"
                  className="flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
