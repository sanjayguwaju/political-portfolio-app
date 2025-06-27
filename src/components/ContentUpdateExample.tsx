'use client'
import React from 'react'
import { triggerContentUpdate } from '@/utilities/triggerContentUpdate'

export const ContentUpdateExample: React.FC = () => {
  const handleUpdateContent = () => {
    // Example: Update localStorage with new content
    const newContent = [
      {
        id: 1,
        title: 'Updated News Title',
        date: 'December 25, 2024',
        image:
          'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
        status: 'published',
        category: 'news',
      },
      // ... more content
    ]

    localStorage.setItem('websiteContent', JSON.stringify(newContent))

    // Trigger the query invalidation
    triggerContentUpdate()
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Content Update Example</h3>
      <p className="text-sm text-gray-600 mb-4">
        Click the button below to update the news content and see how TanStack Query automatically
        refetches the data.
      </p>
      <button
        onClick={handleUpdateContent}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Update News Content
      </button>
    </div>
  )
}
