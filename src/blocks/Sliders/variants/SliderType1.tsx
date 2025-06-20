'use client'

import React, { useState, useEffect } from 'react'
import type { Media } from '@/payload-types'

type Slide = {
  image: string | Media
  alt: string
  title: string
  description?: string | null
}

type SliderProps = {
  richText?: any
  slides?: Slide[] | null
  autoplaySpeed?: number | null
}

export const SliderType1 = ({ richText, slides, autoplaySpeed = 3000 }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides && slides.length > 1 && autoplaySpeed) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, autoplaySpeed)

      return () => clearInterval(interval)
    }
  }, [slides, autoplaySpeed])

  if (!slides || slides.length === 0) {
    return null
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const getImageUrl = (slide: Slide): string => {
    if (typeof slide.image === 'string') {
      // If image is just a string ID, we can't render it
      return ''
    }
    return slide.image.url || ''
  }

  const getImageAlt = (slide: Slide): string => {
    if (typeof slide.image === 'string') {
      return slide.alt || ''
    }
    return slide.alt || slide.image.alt || ''
  }

  return (
    <section className="relative w-full">
      <div className="relative w-full h-96 overflow-hidden rounded-lg">
        {slides.map((slide, index) => {
          const imageUrl = getImageUrl(slide)
          const imageAlt = getImageAlt(slide)

          if (!imageUrl) {
            return null // Skip slides without valid image URLs
          }

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                  {slide.description && <p className="text-lg max-w-2xl">{slide.description}</p>}
                </div>
              </div>
            </div>
          )
        })}

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
