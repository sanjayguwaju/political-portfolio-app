import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '6')

    const payload = await getPayload({ config: configPromise })

    // Get featured posts - you can customize this logic
    // For now, getting the most recent posts with hero images
    const featuredPosts = await payload.find({
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
            heroImage: {
              exists: true,
            },
          },
          {
            publishedAt: {
              exists: true,
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
      data: featuredPosts.docs,
      total: featuredPosts.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured posts' },
      { status: 500 },
    )
  }
}
