'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30',
        'border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
        'transform hover:-translate-y-1',
        'h-full flex flex-col',
        className,
      )}
      ref={card.ref}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden flex-shrink-0">
        {!metaImage ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
            <svg
              className="h-12 w-12 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        ) : (
          metaImage &&
          typeof metaImage !== 'string' && (
            <div className="h-full w-full">
              <Media resource={metaImage} size="33vw" />
            </div>
          )
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Container */}
      <div className="p-4 lg:p-6 flex-1 flex flex-col">
        {/* Categories */}
        {showCategories && hasCategories && (
          <div className="mb-3 flex flex-wrap gap-1">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'

                return (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 transition-colors duration-200 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Title */}
        {titleToUse && (
          <div className="mb-3 flex-1">
            <h3 className="line-clamp-2 text-base lg:text-lg font-semibold leading-tight text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              <Link className="block" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="mb-4 flex-1">
            <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {sanitizedDescription}
            </p>
          </div>
        )}

        {/* Read More Link */}
        <div className="mt-auto">
          <Link
            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors duration-200 hover:text-blue-800 dark:hover:text-blue-300"
            href={href}
            ref={link.ref}
          >
            Read more
            <svg
              className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
