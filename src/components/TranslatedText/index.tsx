'use client'

import React from 'react'

interface TranslatedTextProps {
  text: string
  className?: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  text, 
  className = '', 
  as: Component = 'span' 
}) => {
  // With Google Translate, we just render the original text
  // Google Translate will automatically translate the entire page
  return (
    <Component className={className}>
      {text}
    </Component>
  )
} 