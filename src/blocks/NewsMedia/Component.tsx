'use client'
import React, { useState, useEffect } from 'react'
import type { NewsMediaBlock as NewsMediaBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CalendarIcon } from 'lucide-react'

export const NewsMediaBlock: React.FC<NewsMediaBlockProps> = ({
  links: _links,
  richText: _richText,
}) => {
  const [mediaContent, setMediaContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const defaultContent = [
      {
        id: 1,
        title: 'demo-pdsfsdf',
        date: 'असाेज ३, २०८१ बिहीबार २०:३५:५८',
        image:
          'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
        featured: true,
      },
      {
        id: 2,
        title: 'demo-pdsfsdf',
        date: 'असाेज १, २०८१ मंगलबार १३:२४:४८',
        image:
          'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606823/b5cnge3uepaoeoic1dnf.jpg',
      },
      {
        id: 3,
        title: 'demo-pdsfsdf',
        date: 'भदौ १६, २०८१ आइतबार १३:३:०',
        image:
          'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606842/tueh2vcgbdsvnd0tzm98.jpg',
      },
    ]

    const loadContent = () => {
      if (typeof window !== 'undefined') {
        const savedContent = localStorage.getItem('websiteContent')
        if (savedContent) {
          try {
            const allContent = JSON.parse(savedContent)
            const newsContent = allContent.filter(
              (item: any) => item.status === 'published' && item.category === 'news',
            )

            if (newsContent.length > 0) {
              const convertedContent = newsContent.slice(0, 3).map((item: any, index: number) => ({
                id: item.id || index + 1,
                title: item.title,
                date: item.date || defaultContent[index]?.date,
                image: item.image || defaultContent[index]?.image,
                featured: index === 0,
              }))
              setMediaContent(convertedContent)
            } else {
              setMediaContent(defaultContent)
            }
          } catch (error) {
            console.error('Error loading news content:', error)
            setMediaContent(defaultContent)
          }
        } else {
          setMediaContent(defaultContent)
        }
      } else {
        setMediaContent(defaultContent)
      }
      setLoading(false)
    }

    loadContent()

    const handleStorageChange = () => loadContent()
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('contentUpdated', handleStorageChange)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('contentUpdated', handleStorageChange)
      }
    }
  }, [])

  if (loading) {
    return (
      <section id="news-media" className="py-12 lg:py-20">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!mediaContent || mediaContent.length === 0) {
    return null
  }

  const featuredArticle = mediaContent[0]
  const otherArticles = mediaContent.slice(1)

  return (
    <section id="news-media" className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News & Media</h2>
          <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article (Left) */}
          {featuredArticle && (
            <motion.div
              className="lg:col-span-2 bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-96 mb-4">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>{featuredArticle.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">{featuredArticle.title}</h3>
            </motion.div>
          )}

          {/* Other Articles (Right) */}
          <div className="flex flex-col gap-8">
            {otherArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{article.date}</span>
                </div>
                <h4 className="text-lg font-semibold text-card-foreground">{article.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
