import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    if (!categorySlug) {
      return NextResponse.json(
        { success: false, error: 'Category slug is required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    // First get the category by slug
    const category = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: categorySlug,
        },
      },
      limit: 1,
    })

    if (!category.docs.length || !category.docs[0]) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
    }

    const categoryDoc = category.docs[0]

    // Then get posts in that category
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit,
      page,
      overrideAccess: false,
      sort: '-publishedAt',
      where: {
        _status: {
          equals: 'published',
        },
        categories: {
          in: [categoryDoc.id],
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
      pagination: {
        page: posts.page,
        totalPages: posts.totalPages,
        totalDocs: posts.totalDocs,
        hasNextPage: posts.hasNextPage,
        hasPrevPage: posts.hasPrevPage,
      },
      category: categoryDoc,
    })
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts by category' },
      { status: 500 },
    )
  }
}
