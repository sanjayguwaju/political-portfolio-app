import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'

import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { cn } from '@/utilities/ui'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  SliderBlock as SliderBlockProps,
  AboutBlock as AboutBlockProps,
  ArticleSectionBlock as ArticleSectionBlockProps,
  ContentSectionBlock as ContentSectionBlockProps,
  PhotoGalleryBlock as PhotoGalleryBlockProps,
  VideoGalleryBlock as VideoGalleryBlockProps,
  NewsMediaBlock as NewsMediaBlockProps,
  SimpleSliderBlock as SimpleSliderBlockProps,
} from '@/payload-types'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { SliderBlock } from '@/blocks/Sliders/Component'
import { AboutBlock } from '@/blocks/About/Component'
import { ArticleSectionBlock } from '@/blocks/ArticleSection/Component'
import { ContentSectionBlock } from '@/blocks/ContentSection/Component'
import { PhotoGalleryBlock } from '@/blocks/PhotoGallery/Component'
import { VideoGalleryBlock } from '@/blocks/VideoGallery/Component'
import { NewsMediaBlock } from '@/blocks/NewsMedia/Component'
import { SimpleSliderBlock } from '@/blocks/SimpleSlider/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | SliderBlockProps
      | AboutBlockProps
      | ArticleSectionBlockProps
      | ContentSectionBlockProps
      | PhotoGalleryBlockProps
      | VideoGalleryBlockProps
      | NewsMediaBlockProps
      | SimpleSliderBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    sliderblock: ({ node }: { node: any }) => <SliderBlock {...node.fields} />,
    about: ({ node }: { node: any }) => <AboutBlock {...node.fields} />,
    articleSection: ({ node }: { node: any }) => <ArticleSectionBlock {...node.fields} />,
    contentSection: ({ node }: { node: any }) => <ContentSectionBlock {...node.fields} />,
    photoGallery: ({ node }: { node: any }) => <PhotoGalleryBlock {...node.fields} />,
    videoGallery: ({ node }: { node: any }) => <VideoGalleryBlock {...node.fields} />,
    newsMedia: ({ node }: { node: any }) => <NewsMediaBlock {...node.fields} />,
    simpleSlider: ({ node }: { node: any }) => <SimpleSliderBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
