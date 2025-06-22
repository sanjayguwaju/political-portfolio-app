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
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Chanda Chaudhary"
      width={40}
      height={40}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      
      src="https://res.cloudinary.com/dz3facqgc/image/upload/v1750584011/onhead4hxtcxoig3atrr.jpg"
    />
  )
}
