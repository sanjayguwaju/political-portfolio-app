'use client'
import React, { useState } from 'react'
import type { VideoGalleryBlock as VideoGalleryBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'
import { X, Video } from 'lucide-react'
import { CMSLink } from '@/components/Link'

const extractYouTubeVideoId = (url: string | undefined): string | null => {
  if (!url) return null
  const patterns = [/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

const VideoGallery: React.FC<VideoGalleryBlockProps> = ({
  title,
  description,
  videos,
  links,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const openVideo = (embedUrl: string) => {
    const videoId = extractYouTubeVideoId(embedUrl)
    if (videoId) {
      setSelectedVideo(videoId)
    } else {
      alert('Invalid YouTube URL provided.')
    }
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  const button = links?.[0]?.link

  return (
    <section
      id="video-gallery"
      className="py-4 lg:py-5"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}
    >
      <div className="container">
        <div className="text-center mb-4 lg:mb-5">
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--primary-color)',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-light)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            {description}
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {videos &&
            videos.slice(0, 3).map((video, index) => {
              const videoId = extractYouTubeVideoId(video.embedUrl)
              const thumbnailUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : ''

              return (
                <div
                  key={index}
                  className="video-card h-full cursor-pointer group"
                  style={{
                    border: 'none',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                  }}
                  onClick={() => openVideo(video.embedUrl)}
                >
                  <div
                    className="video-thumbnail"
                    style={{
                      height: '220px',
                      backgroundImage: thumbnailUrl
                        ? `url(${thumbnailUrl})`
                        : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div
                        className="transform group-hover:scale-110 transition-transform duration-300"
                        style={{
                          width: '80px',
                          height: '80px',
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginLeft: '4px' }}
                        >
                          <polygon points="5,3 19,12 5,21"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: 'var(--primary-color)',
                        marginBottom: '0.8rem',
                        lineHeight: '1.3',
                      }}
                    >
                      {video.title}
                    </h3>
                  </div>
                </div>
              )
            })}
        </div>
        {button && (
          <div className="text-center mt-8">
            <CMSLink
              {...button}
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-lg"
            >
              <Video className="mr-2 w-5 h-5" />
              {button.label}
            </CMSLink>
          </div>
        )}
      </div>

      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeVideo}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Player"
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}

export const VideoGalleryBlock: React.FC<VideoGalleryBlockProps> = (props) => {
  return <VideoGallery {...props} />
}
