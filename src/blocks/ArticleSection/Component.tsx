'use client'
import React from 'react'
import type { ArticleSectionBlock as ArticleSectionBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { motion } from 'framer-motion'
import { ArrowRight, Newspaper, FileText, Users, TrendingUp, Award } from 'lucide-react'
import Image from 'next/image'

export const ArticleSectionBlock: React.FC<ArticleSectionBlockProps> = ({
  links: _links,
  richText: _richText,
}) => {
  const articles = [
    {
      title: "Women's Rights Advocacy",
      excerpt:
        "Leading the charge for gender equality and women's empowerment in Nepal through legislative reforms and community initiatives.",
      icon: Users,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=400&fit=crop',
      featured: true,
    },
    {
      title: 'Community Development',
      excerpt:
        'Building stronger communities through grassroots initiatives and sustainable development programs.',
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop',
    },
    {
      title: 'Parliamentary Reforms',
      excerpt:
        'Advocating for transparent governance and democratic reforms in the legislative process.',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  // Ensure we have articles to display
  if (!articles || articles.length === 0) {
    return null
  }

  const featuredArticle = articles[0]
  const topArticle = articles[1]
  const bottomArticle = articles[2]

  return (
    <section id="latest-articles" className="py-2 lg:py-4">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
          <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {/* Article Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-h-[550px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Featured Article - Left Card with row span 2 */}
          <motion.div
            className="col-span-1 md:col-span-1 md:row-span-2 bg-gray-50 overflow-hidden flex justify-between flex-col h-full py-6 lg:py-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
          >
            <div className="px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-blue-600 text-2xl" />
                <h4 className="text-2xl font-semibold text-gray-900">{featuredArticle?.title}</h4>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{featuredArticle?.excerpt}</p>
              <CMSLink
                url="/articles/womens-rights"
                className="flex w-max items-center hover:text-blue-600 hover:border-blue-600 transition-all duration-300 gap-2 border-gray-900 text-sm font-medium group border-b"
              >
                Read More
                <ArrowRight className="group-hover:ml-1 transition-all duration-200 w-4 h-4" />
              </CMSLink>
            </div>

            <div className="flex justify-center items-end">
              <img
                alt="Women's Rights Advocacy"
                src={featuredArticle?.image}
                className="w-full max-w-[400px] h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Right Top Card */}
          <motion.div
            className="bg-gray-50 col-span-1 flex justify-between items-center px-6 py-6 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="text-blue-600 text-xl" />
                <h4 className="text-xl font-semibold text-gray-900">{topArticle?.title}</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{topArticle?.excerpt}</p>
              <CMSLink
                url="/articles/community-development"
                className="flex w-max items-center hover:text-blue-600 hover:border-blue-600 transition-all duration-300 gap-2 border-gray-900 text-sm font-medium group border-b"
              >
                Read More
                <ArrowRight className="group-hover:ml-1 transition-all duration-200 w-4 h-4" />
              </CMSLink>
            </div>

            <img
              alt="Community Development"
              src={topArticle?.image || ''}
              width={100}
              height={100}
              className="w-24 h-24 object-cover ml-4"
            />
          </motion.div>

          {/* Right Bottom Card */}
          <motion.div
            className="bg-gray-50 col-span-1 flex justify-between items-center px-6 py-6 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Award className="text-blue-600 text-xl" />
                <h4 className="text-xl font-semibold text-gray-900">{bottomArticle?.title}</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{bottomArticle?.excerpt}</p>
              <CMSLink
                url="/articles/parliamentary-reforms"
                className="flex w-max items-center hover:text-blue-600 hover:border-blue-600 transition-all duration-300 gap-2 border-gray-900 text-sm font-medium group border-b"
              >
                Read More
                <ArrowRight className="group-hover:ml-1 transition-all duration-200 w-4 h-4" />
              </CMSLink>
            </div>

            <Image
              alt="Parliamentary Reforms"
              src={bottomArticle?.image || ''}
              width={100}
              height={100}
              className="w-24 h-24 object-cover ml-4"
            />
          </motion.div>
        </motion.div>

        {/* View More Articles Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <CMSLink
            url="/posts"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Newspaper className="mr-2 w-5 h-5" />
            View More Articles
          </CMSLink>
        </motion.div>
      </div>
    </section>
  )
}
