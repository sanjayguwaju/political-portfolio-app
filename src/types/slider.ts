export interface Slide {
  backgroundImage: string
  alt: string
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
}

export interface HeroSliderProps {
  slides: Slide[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}
