'use client'

import React, { useState } from 'react'
import {
  Bell,
  Settings,
  User,
  LogOut,
  Search,
  Menu,
  X,
  Home,
  FileText,
  Image,
  MessageSquare,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import './AdminHeader.scss'

interface AdminHeaderProps {
  user?: {
    name?: string
    email?: string
  }
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const adminNavItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: Home,
      current: true,
    },
    {
      name: 'Pages',
      href: '/admin/collections/pages',
      icon: FileText,
      current: false,
    },
    {
      name: 'Posts',
      href: '/admin/collections/posts',
      icon: FileText,
      current: false,
    },
    {
      name: 'Media',
      href: '/admin/collections/media',
      icon: Image,
      current: false,
    },
    {
      name: 'Contact Forms',
      href: '/admin/collections/contact-forms',
      icon: MessageSquare,
      current: false,
    },
    {
      name: 'Users',
      href: '/admin/collections/users',
      icon: Users,
      current: false,
    },
  ]

  return (
    <header className="admin-header">
      <div className="admin-header__container">
        <div className="admin-header__content">
          {/* Left side - Logo and Navigation */}
          <div className="admin-header__left">
            {/* Mobile menu button */}
            <button
              type="button"
              className="admin-header__mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <div className="admin-header__logo">
              <Link href="/admin">
                <div className="admin-header__logo-icon">
                  <span>CC</span>
                </div>
                <span className="admin-header__logo-text">Chanda Chaudhary</span>
                <span className="admin-header__logo-subtitle">Admin</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="admin-header__nav">
              {adminNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`admin-header__nav-item ${
                    item.current ? 'admin-header__nav-item--current' : ''
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - Search, Notifications, User menu */}
          <div className="admin-header__right">
            {/* Search */}
            <div className="admin-header__search">
              <div className="admin-header__search-container">
                <div className="admin-header__search-icon">
                  <Search className="h-5 w-5" />
                </div>
                <input type="text" placeholder="Search..." className="admin-header__search-input" />
              </div>
            </div>

            {/* Notifications */}
            <button type="button" className="admin-header__action-btn">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            {/* Settings */}
            <button type="button" className="admin-header__action-btn">
              <span className="sr-only">Open settings</span>
              <Settings className="h-6 w-6" />
            </button>

            {/* User menu */}
            <div className="admin-header__user-menu">
              <button
                type="button"
                className="admin-header__user-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="admin-header__user-avatar">
                  <User className="h-5 w-5" />
                </div>
                <div className="admin-header__user-info">
                  <div className="admin-header__user-name">{user?.name || 'Admin User'}</div>
                  <div className="admin-header__user-email">
                    {user?.email || 'admin@example.com'}
                  </div>
                </div>
              </button>

              {/* User dropdown menu */}
              {isUserMenuOpen && (
                <div className="admin-header__user-dropdown">
                  <div className="admin-header__dropdown-menu">
                    <Link href="/admin/collections/users" className="admin-header__dropdown-item">
                      <User />
                      Profile
                    </Link>
                    <Link href="/admin/globals/header" className="admin-header__dropdown-item">
                      <Settings />
                      Settings
                    </Link>
                    <div className="admin-header__dropdown-divider" />
                    <button type="button" className="admin-header__dropdown-item">
                      <LogOut />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="admin-header__mobile-menu">
          <div className="admin-header__mobile-menu-content">
            {adminNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`admin-header__mobile-nav-item ${
                  item.current ? 'admin-header__mobile-nav-item--current' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default AdminHeader
