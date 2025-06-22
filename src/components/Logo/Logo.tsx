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
        width={40}
        height={40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="rounded-full"
        src="/media/logo.png"
      />
      <div className="flex items-center">
        <span className="font-vibes text-lg lg:text-xl text-secondary font-bold lg:text-black text-white whitespace-nowrap">Chanda Chaudhary</span>
      </div>
    </div>
  )
}
