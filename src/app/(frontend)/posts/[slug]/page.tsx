import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { formatDateTime } from '@/utilities/formatDateTime'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Media } from '@/components/Media'
import { Card } from '@/components/Card'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const { categories, heroImage, populatedAuthors, publishedAt, title, content } = post
  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  const authorName = hasAuthors ? formatAuthors(populatedAuthors) : 'Anonymous'
  const authorInitial =
    authorName && authorName.length > 0 ? authorName.charAt(0).toUpperCase() : 'A'

  return (
    <>
      <PageClient />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: '0%' }}
          id="reading-progress"
        />
      </div>

      {/* Main Article Container */}
      <article className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          {heroImage && typeof heroImage !== 'string' && (
            <div className="absolute inset-0">
              <Media fill priority imgClassName="object-cover" resource={heroImage} />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          )}

          {/* Hero Content */}
          <div
            className={`relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-20 text-center ${heroImage && typeof heroImage !== 'string' ? 'text-white' : 'text-gray-900 dark:text-white'}`}
          >
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6 px-2">
                {categories.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    return (
                      <span
                        key={index}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium border border-white/30"
                      >
                        {category.title || 'Uncategorized'}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight max-w-4xl mx-auto drop-shadow-lg px-4">
              {title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-12 text-base md:text-lg px-4">
              {hasAuthors && (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base">{formatAuthors(populatedAuthors)}</span>
                </div>
              )}

              {publishedAt && (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <time dateTime={publishedAt} className="text-sm md:text-base">
                    {formatDateTime(publishedAt)}
                  </time>
                </div>
              )}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg
                className={`w-6 h-6 ${heroImage && typeof heroImage !== 'string' ? 'text-white/70' : 'text-gray-600 dark:text-white/70'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              {/* Article Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <RichText data={content} enableGutter={false} className="post__content" />
              </div>

              {/* Article Footer */}
              <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                      {authorInitial}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                        {authorName}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Author</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <button className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm md:text-base">
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      Share
                    </button>

                    <button className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts Section */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="py-8 md:py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900 dark:text-white px-4">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
                  {post.relatedPosts
                    .filter((post) => typeof post === 'object')
                    .map((relatedPost, index) => {
                      if (typeof relatedPost === 'object' && relatedPost !== null) {
                        return (
                          <div key={index} className="group">
                            <Card
                              doc={relatedPost}
                              relationTo="posts"
                              showCategories
                              className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
                            />
                          </div>
                        )
                      }
                      return null
                    })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="py-8 md:py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 px-4">Stay Updated</h2>
              <p className="text-blue-100 mb-6 md:mb-8 text-base md:text-lg px-4">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto px-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
