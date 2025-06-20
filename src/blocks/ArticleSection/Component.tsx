import React from 'react'
import type { ArticleSectionBlock as ArticleSectionBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const ArticleSectionBlock: React.FC<ArticleSectionBlockProps> = ({ links, richText }) => {
  const articles = [
    {
      title: "Demo Article 1",
      excerpt: "Demo text content for this article section",
      icon: "fas fa-newspaper"
    },
    {
      title: "Demo Article 2", 
      excerpt: "Demo text content for this article section",
      icon: "fas fa-file-alt"
    },
    {
      title: "Demo Article 3",
      excerpt: "Demo text content for this article section", 
      icon: "fas fa-edit"
    }
  ]

  return (
    <section id="latest-articles" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <div className="section-header text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="mb-4">
              <div className="article-card h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="article-image-placeholder bg-gray-100 p-8 text-center">
                  <i className={`${article.icon} text-4xl text-blue-600 mb-2`}></i>
                  <p className="text-gray-600 text-sm">Demo Article Image</p>
                </div>
                <div className="article-content p-6 flex flex-col">
                  <h5 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h5>
                  <p className="article-excerpt text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
                  <button className="mt-auto inline-block px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded hover:bg-blue-600 hover:text-white transition-colors duration-200">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
