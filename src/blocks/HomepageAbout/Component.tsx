import React from 'react'
import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HomepageAboutBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Section Header */}
          <div className="lg:col-span-12 text-center mb-12">
            <div className="section-header">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
              <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-4 md:col-span-12 text-center mb-8 lg:mb-0">
            <img
              src="/assets/images/chanda chaudhary (5).jpg"
              alt="Chanda Chaudhary"
              className="w-full h-72 object-cover rounded-2xl max-w-xs mx-auto block"
            />
          </div>

          {/* Content Column */}
          <div className="lg:col-span-8 md:col-span-12">
            <div className="about-content">
              <p className="text-lg text-gray-700 mb-4 font-medium">
                Welcome to my political portfolio. I am dedicated to serving our community with
                integrity, transparency, and a commitment to positive change.
              </p>
              <p className="text-gray-600 mb-4">
                With years of experience in public service and community leadership, I understand
                the challenges our constituents face and work tirelessly to address their needs
                through effective policy-making and community engagement.
              </p>
              <p className="text-gray-600 mb-6">
                My approach focuses on building bridges between different communities, fostering
                economic development, and ensuring that every voice is heard in the democratic
                process.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CMSLink
                  url="/introduction"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Full Introduction
                </CMSLink>
                <CMSLink
                  url="/media-interaction"
                  className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  Contact
                </CMSLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
