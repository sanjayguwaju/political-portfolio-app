import type { EntityToGroup } from '@payloadcms/ui/shared'
import type { ServerProps } from 'payload'

import { Logout } from '@payloadcms/ui'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { EntityType, groupNavItems } from '@payloadcms/ui/shared'

import './AdminNav.scss'
import { AdminNavWrapper } from './AdminNavWrapper'
import { AdminNavClient } from './AdminNav.client'

const baseClass = 'nav'

const Nav = (props: ServerProps) => {
  const {
    documentSubViewType,
    i18n,
    locale,
    params,
    payload,
    permissions,
    searchParams,
    user,
    viewType,
    visibleEntities,
  } = props
  const {
    admin: {
      components: { afterNavLinks, beforeNavLinks, logout },
    },
    collections,
    globals,
  } = payload.config
  const LogoutComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: logout?.Button,
    Fallback: Logout,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const groups = groupNavItems(
    [
      ...collections
        .filter(({ slug }) => visibleEntities?.collections.includes(slug))
        .map(
          (collection) =>
            ({
              type: EntityType.collection,
              entity: collection,
            }) satisfies EntityToGroup,
        ),
      ...globals
        .filter(({ slug }) => visibleEntities?.globals.includes(slug))
        .map(
          (global) =>
            ({
              type: EntityType.global,
              entity: global,
            }) satisfies EntityToGroup,
        ),
    ],
    permissions as any,
    i18n,
  )

  return (
    <AdminNavWrapper baseClass={baseClass}>
      {RenderServerComponent({
        clientProps: {
          documentSubViewType,
          viewType,
        },
        Component: beforeNavLinks,
        importMap: payload.importMap,
        serverProps: {
          i18n,
          locale,
          params,
          payload,
          permissions,
          searchParams,
          user,
        },
      })}
      <AdminNavClient groups={groups} />
      {RenderServerComponent({
        clientProps: {
          documentSubViewType,
          viewType,
        },
        Component: afterNavLinks,
        importMap: payload.importMap,
        serverProps: {
          i18n,
          locale,
          params,
          payload,
          permissions,
          searchParams,
          user,
        },
      })}
      <div className={`${baseClass}__controls`}>{LogoutComponent}</div>
    </AdminNavWrapper>
  )
}

export default Nav
