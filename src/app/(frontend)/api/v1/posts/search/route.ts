import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit,
      page,
      overrideAccess: false,
      sort: '-publishedAt',
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            or: [
              {
                title: {
                  contains: query,
                },
              },
              {
                'meta.description': {
                  contains: query,
                },
              },
            ],
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
      data: posts.docs,
      pagination: {
        page: posts.page,
        totalPages: posts.totalPages,
        totalDocs: posts.totalDocs,
        hasNextPage: posts.hasNextPage,
        hasPrevPage: posts.hasPrevPage,
      },
      query,
    })
  } catch (error) {
    console.error('Error searching posts:', error)
    return NextResponse.json({ success: false, error: 'Failed to search posts' }, { status: 500 })
  }
}
