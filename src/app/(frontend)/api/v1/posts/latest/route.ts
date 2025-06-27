import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Get the 5 latest posts, sorted by publishedAt in descending order
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 5,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt', // Sort by publishedAt in descending order (latest first)
      where: {
        _status: {
          equals: 'published',
        },
        publishedAt: {
          exists: true,
        },
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
      total: posts.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch latest posts',
      },
      { status: 500 },
    )
  }
}
