import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className="flex items-center gap-x-4">
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="Chanda Chaudhary"
        width={60}
        height={50}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="rounded-full"
        src="https://nepalvani.com/wp-content/uploads/2025/06/logo-1.jpg"
      />
      <div className="flex items-center">
        <span data-no-translate="true"
          className="text-lg lg:text-4xl text-secondary font-bold lg:text-black text-white whitespace-nowrap italic"
          style={{ fontFamily: "'Arizonia', cursive" }}
        >
          Chanda Chaudhary
        </span>
      </div>
    </div>
  )
}
