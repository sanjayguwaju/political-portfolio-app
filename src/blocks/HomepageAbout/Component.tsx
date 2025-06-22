'use client'
import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { motion } from 'framer-motion'

export const HomepageAboutBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
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
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Image Column - Full Height */}
          <motion.div className="lg:col-span-1" variants={imageVariants}>
            <motion.img
              src="https://res.cloudinary.com/dz3facqgc/image/upload/v1750566139/ts2racaqei0y4zhhxw6l.jpg"
              alt="Chanda Chaudhary"
              className="w-full h-96 lg:h-[500px] object-cover  shadow-lg"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            />
          </motion.div>

          {/* Content Column - Full Height */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div className="about-content h-full flex flex-col justify-center">
              <motion.p className="text-lg text-gray-700 mb-6 font-medium" variants={itemVariants}>
                Chanda Chaudhary stands as a beacon of hope and progress in Nepali politics,
                dedicating her life to advancing women's rights, social justice, and community
                development. With years of parliamentary experience and grassroots activism, she
                continues to champion the causes that matter most to the people of Nepal.
              </motion.p>
              <motion.p className="text-gray-600 mb-6" variants={itemVariants}>
                Her remarkable journey in politics has been marked by unwavering commitment to
                gender equality, social welfare programs, and parliamentary reforms. As a leading
                advocate for women's empowerment, she has consistently worked to create
                opportunities and platforms for marginalized communities.
              </motion.p>
              <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
                Through her dedicated service in parliament and active participation in community
                development initiatives, she has established herself as a trusted leader who bridges
                the gap between policy-making and grassroots implementation.
              </motion.p>
              <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <CMSLink
                    url="/introduction"
                    className="inline-block px-8 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Full Introduction
                  </CMSLink>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <CMSLink
                    url="/media-interaction"
                    className="inline-block px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </CMSLink>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
