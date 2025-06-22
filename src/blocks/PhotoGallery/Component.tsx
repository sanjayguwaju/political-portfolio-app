'use client'
import React, { useState, useEffect } from 'react'
import type { PhotoGalleryBlock as PhotoGalleryBlockProps } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'

export const PhotoGalleryBlock: React.FC<PhotoGalleryBlockProps> = ({ links, richText }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop',
      alt: "Women's Rights Advocacy",
      description:
        "Leading the charge for gender equality and women's empowerment in Nepal through legislative reforms and community initiatives.",
    },
    {
      src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
      alt: 'Community Development',
      description:
        'Building stronger communities through grassroots initiatives and sustainable development programs.',
    },
    {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Parliamentary Reforms',
      description:
        'Advocating for transparent governance and democratic reforms in the legislative process.',
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      alt: 'Youth Empowerment',
      description:
        'Empowering the next generation through education, leadership training, and civic engagement programs.',
    },
    {
      src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
      alt: 'Healthcare Initiatives',
      description:
        'Improving healthcare access and quality through policy reforms and community health programs.',
    },
    {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Environmental Protection',
      description:
        'Promoting sustainable development and environmental conservation through legislative action.',
    },
  ]

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
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

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  const handleImageClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Image clicked! Index:', index)
    setSelectedImageIndex(index)
    setCurrentSlideIndex(index)
    setIsModalOpen(true)
  }

  const openGallery = (index: number) => {
    console.log('Opening gallery with index:', index)
    setSelectedImageIndex(index)
    setCurrentSlideIndex(index)
    setIsModalOpen(true)
  }

  const closeGallery = () => {
    console.log('Closing gallery')
    setSelectedImageIndex(null)
    setIsModalOpen(false)
  }

  const showAllImages = () => {
    console.log('Show all images clicked')
    setSelectedImageIndex(0)
    setCurrentSlideIndex(0)
    setIsModalOpen(true)
  }

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeGallery()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      prevSlide()
    }
  }

  // Ensure we have images to display
  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      <section id="photo-gallery" className="py-10">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
            <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                variants={cardVariants}
                onClick={(e) => handleImageClick(index, e)}
                style={{ cursor: 'pointer' }}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 pointer-events-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  draggable={false}
                />

                {/* Overlay with description */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">{image.alt}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>

                {/* Clickable overlay for better touch targets */}
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={(e) => handleImageClick(index, e)}
                  style={{ cursor: 'pointer' }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Show All Images Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.button
              onClick={showAllImages}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Images size={20} />
              Show All Images ({images.length})
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeGallery}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3"
              onClick={closeGallery}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3"
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3"
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Image Container */}
            <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img
                    src={images[currentSlideIndex]?.src}
                    alt={images[currentSlideIndex]?.alt}
                    className="max-w-full max-h-[80vh] object-contain"
                  />

                  {/* Image Info */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">{images[currentSlideIndex]?.alt}</h3>
                    <p className="text-gray-200">{images[currentSlideIndex]?.description}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 space-x-3">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentSlideIndex ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentSlideIndex(index)
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 text-white bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                {currentSlideIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
