import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '3')

    const payload = await getPayload({ config: configPromise })

    // First get the current post to find its categories
    const currentPost = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1,
      overrideAccess: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      select: {
        id: true,
        categories: true,
      },
    })

    if (!currentPost.docs.length || !currentPost.docs[0]) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }

    const post = currentPost.docs[0]
    const categoryIds =
      post.categories
        ?.filter((cat) => typeof cat === 'object' && cat !== null)
        .map((cat) => (cat as any).id)
        .filter(Boolean) || []

    if (categoryIds.length === 0) {
      // If no categories, return latest posts excluding current post
      const relatedPosts = await payload.find({
        collection: 'posts',
        draft: false,
        limit,
        overrideAccess: false,
        pagination: false,
        sort: '-publishedAt',
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            {
              id: {
                not_equals: post.id,
              },
            },
          ],
        },
        select: {
          title: true,
          slug: true,
          publishedAt: true,
          categories: true,
          heroImage: true,
          meta: {
            title: true,
            description: true,
            image: true,
          },
          populatedAuthors: {
            id: true,
            name: true,
          },
        },
      })

      return NextResponse.json({
        success: true,
        data: relatedPosts.docs,
        total: relatedPosts.totalDocs,
      })
    }

    // Get related posts based on categories
    const relatedPosts = await payload.find({
      collection: 'posts',
      draft: false,
      limit,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            id: {
              not_equals: post.id,
            },
          },
          {
            categories: {
              in: categoryIds,
            },
          },
        ],
      },
      select: {
        title: true,
        slug: true,
        publishedAt: true,
        categories: true,
        heroImage: true,
        meta: {
          title: true,
          description: true,
          image: true,
        },
        populatedAuthors: {
          id: true,
          name: true,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: relatedPosts.docs,
      total: relatedPosts.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch related posts' },
      { status: 500 },
    )
  }
}
