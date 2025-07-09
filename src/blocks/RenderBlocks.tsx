import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SliderBlock } from '@/blocks/Sliders/Component'
import { ArticleSectionBlock } from '@/blocks/ArticleSection/Component'
import { ContentSectionBlock } from '@/blocks/ContentSection/Component'
import { PhotoGalleryBlock } from './PhotoGallery/Component'
import { VideoGalleryBlock } from './VideoGallery/Component'
import { NewsMediaBlock } from './NewsMedia/Component'
import { AboutBlock } from './About/Component'
import { SimpleSliderBlock } from './SimpleSlider/Component'
import { SocialBlock } from './Socials/Component'
import { BannerBlock } from './Banner/Component'
import { PrivacyPolicyBlock } from './PrivacyPolicy/Component'
import { TermsOfServiceBlock } from './TermsOfService/Component'
import { QuoteCarouselBlock } from './QuoteCarousel/Component'
import { FAQBlock } from './FAQ/Component'

const blockComponents = {
  banner: BannerBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  sliderblock: SliderBlock,
  about: AboutBlock,
  articleSection: ArticleSectionBlock,
  contentSection: ContentSectionBlock,
  photoGallery: PhotoGalleryBlock,
  videoGallery: VideoGalleryBlock,
  newsMedia: NewsMediaBlock,
  social: SocialBlock,
  simpleSlider: SimpleSliderBlock,
  privacyPolicy: PrivacyPolicyBlock,
  termsOfService: TermsOfServiceBlock,
  quoteCarousel: QuoteCarouselBlock,
  faq: FAQBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
