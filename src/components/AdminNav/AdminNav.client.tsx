'use client'

import type { NavGroupType } from '@payloadcms/ui/shared'

import { getTranslation } from '@payloadcms/translations'
import { Link, useConfig, useTranslation } from '@payloadcms/ui'
import { EntityType, formatAdminURL } from '@payloadcms/ui/shared'
import { ChevronDown, ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState, useRef } from 'react'

import { getAdminNavIcon } from './get-admin-nav-icon'
import { getActiveGroup, getFilteredEntities, getSortedGroups } from './admin-nav-utils'

type AdminNavProps = {
  groups: NavGroupType[]
}

const baseClass = 'nav'

export const AdminNavClient = ({ groups }: AdminNavProps) => {
  const pathname = usePathname()
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()
  const { i18n } = useTranslation()

  // State to track which groups are expanded (for hover)
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const activeGroup = getActiveGroup(pathname, adminRoute)
  const sortedGroups = getSortedGroups(groups)

  const handleGroupMouseEnter = (groupSlug: string) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setHoveredGroup(groupSlug)
  }

  const handleGroupMouseLeave = () => {
    // Add a small delay before closing to allow moving to submenu
    timeoutRef.current = setTimeout(() => {
      setHoveredGroup(null)
    }, 150) // 150ms delay
  }

  const handleSubmenuMouseEnter = (groupSlug: string) => {
    // Clear timeout when entering submenu
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setHoveredGroup(groupSlug)
  }

  const handleSubmenuMouseLeave = () => {
    // Add delay when leaving submenu
    timeoutRef.current = setTimeout(() => {
      setHoveredGroup(null)
    }, 150)
  }

  return (
    <div className="menu">
      <li className="group">
        <Link className={`${baseClass}__link group-toggle`} href={adminRoute}>
          <Home size={16} />
          {'Home'}
        </Link>
      </li>
      {sortedGroups.map(({ entities, label: groupLabel }, key) => {
        const groupSlug = groupLabel.toLowerCase()
        const Icon = getAdminNavIcon(groupSlug as any)
        const selectedGroup =
          entities.find(
            (el) => el.slug === groupSlug || (el.label as string)?.toLowerCase?.() === groupSlug,
          ) || entities[0]
        const isActiveGroup = entities.find((el) => el.slug === activeGroup)
        const filteredEntities = getFilteredEntities(entities, selectedGroup?.slug || '')
        const isExpanded = hoveredGroup === groupSlug || isActiveGroup
        const hasSubItems = filteredEntities.length > 0

        return (
          <li
            className={`group ${isExpanded ? 'expanded' : ''}`}
            key={key}
            onMouseEnter={() => handleGroupMouseEnter(groupSlug)}
            onMouseLeave={handleGroupMouseLeave}
          >
            <div className={`${baseClass}__group-header`}>
              <Link
                className={`${baseClass}__link group-toggle`}
                href={formatAdminURL({
                  adminRoute,
                  path: `/${selectedGroup?.type === EntityType.collection ? 'collections' : 'globals'}/${selectedGroup?.slug || ''}`,
                })}
              >
                {Icon && <Icon size={16} />}
                {getTranslation(groupLabel, i18n)}
              </Link>
              {hasSubItems && (
                <div className={`${baseClass}__dropdown-icon`}>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
              )}
            </div>
            {hasSubItems && (
              <div
                className={`${baseClass}__submenu ${isExpanded ? 'expanded' : ''}`}
                onMouseEnter={() => handleSubmenuMouseEnter(groupSlug)}
                onMouseLeave={handleSubmenuMouseLeave}
              >
                {filteredEntities.map(({ slug, type, label }) => {
                  let href: null | string = null
                  if (type === EntityType.collection) {
                    href = formatAdminURL({
                      adminRoute,
                      path: `/collections/${slug}`,
                    })
                  } else if (type === EntityType.global) {
                    href = formatAdminURL({
                      adminRoute,
                      path: `/globals/${slug}`,
                    })
                  }
                  return (
                    <Link
                      className={`${baseClass}__link sub-group-list`}
                      href={href || ''}
                      key={slug}
                    >
                      {getTranslation(label, i18n)}
                    </Link>
                  )
                })}
              </div>
            )}
          </li>
        )
      })}
    </div>
  )
}
