'use client'
import React from 'react'
import type { AboutBlock as AboutBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const AboutBlock: React.FC<AboutBlockProps> = ({ richText, image, section, links }) => {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <section id="about" className="py-2 md:py-6 lg:py-10">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 mt-4 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{section}</h2>
          <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Image Column - Full Height */}
          <motion.div className="lg:col-span-1 h-64 md:h-80 lg:h-full" variants={imageVariants}>
            {image ? (
              <motion.div
                className="relative w-full h-full"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src={typeof image === 'string' ? image : image.url || ''}
                  alt={typeof image === 'string' ? 'About Image' : image.alt || 'About Image'}
                  fill
                  className="object-cover shadow-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                  quality={60}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-gray-200 shadow-lg flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">No image uploaded</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Content Column - Full Height */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="about-content h-full flex flex-col">
              {richText && (
                <RichText
                  className="text-lg text-gray-700 mb-8 font-medium leading-relaxed space-y-6 prose prose-lg max-w-none
                  [&_.prose-p]:mb-6 [&_.prose-p]:text-justify [&_.prose-p]:leading-7 [&_.prose-p]:tracking-wide [&_.prose-p]:py-2
                  [&_.prose-strong]:font-semibold [&_.prose-em]:italic [&_.prose-u]:underline [&_.prose-u]:decoration-2 [&_.prose-u]:decoration-current
                  [&_.prose-h1]:text-4xl [&_.prose-h1]:font-bold [&_.prose-h1]:text-gray-900 [&_.prose-h1]:mb-6 [&_.prose-h1]:mt-8 [&_.prose-h1]:leading-tight [&_.prose-h1]:tracking-tight
                  [&_.prose-h2]:text-3xl [&_.prose-h2]:font-bold [&_.prose-h2]:text-gray-800 [&_.prose-h2]:mb-5 [&_.prose-h2]:mt-7 [&_.prose-h2]:leading-tight [&_.prose-h2]:tracking-tight
                  [&_.prose-h3]:text-2xl [&_.prose-h3]:font-semibold [&_.prose-h3]:text-gray-800 [&_.prose-h3]:mb-4 [&_.prose-h3]:mt-6 [&_.prose-h3]:leading-snug [&_.prose-h3]:tracking-tight
                  [&_.prose-h4]:text-xl [&_.prose-h4]:font-semibold [&_.prose-h4]:text-gray-700 [&_.prose-h4]:mb-3 [&_.prose-h4]:mt-5 [&_.prose-h4]:leading-snug [&_.prose-h4]:tracking-tight
                  [&_.prose-ul]:list-disc [&_.prose-ul]:pl-6 [&_.prose-ul]:space-y-2 [&_.prose-ul]:mb-6
                  [&_.prose-ol]:list-decimal [&_.prose-ol]:pl-6 [&_.prose-ol]:space-y-2 [&_.prose-ol]:mb-6
                  [&_.prose-li]:text-gray-700 [&_.prose-li]:leading-relaxed [&_.prose-li]:mb-1
                  [&_.prose-blockquote]:border-l-4 [&_.prose-blockquote]:border-blue-500 [&_.prose-blockquote]:pl-4 [&_.prose-blockquote]:italic [&_.prose-blockquote]:text-gray-600 [&_.prose-blockquote]:mb-6
                  [&_.prose-code]:bg-gray-100 [&_.prose-code]:px-2 [&_.prose-code]:py-1 [&_.prose-code]:rounded [&_.prose-code]:text-sm [&_.prose-code]:font-mono
                  [&_.prose-pre]:bg-gray-900 [&_.prose-pre]:text-white [&_.prose-pre]:p-4 [&_.prose-pre]:rounded-lg [&_.prose-pre]:overflow-x-auto [&_.prose-pre]:mb-6
                  [&_.prose-a]:text-blue-600 [&_.prose-a]:underline [&_.prose-a]:hover:text-blue-800 [&_.prose-a]:transition-colors
                  [&_.prose-hr]:border-gray-300 [&_.prose-hr]:my-8 [&_.prose-hr]:border-t-2"
                  data={richText}
                  enableGutter={false}
                  enableProse={true}
                />
              )}
              <motion.div className="flex flex-wrap gap-4 mt-auto" variants={itemVariants}>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  {(links || []).map(({ link }, i) => {
                    return (
                      <CMSLink
                        className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 rounded-none text-white font-semibold text-base tracking-wide hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 border-0 shadow-md"
                        key={i}
                        size="lg"
                        {...link}
                      />
                    )
                  })}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
