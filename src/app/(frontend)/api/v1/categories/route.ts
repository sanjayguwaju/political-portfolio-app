import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Get all categories
    const categories = await payload.find({
      collection: 'categories',
      limit: 100,
      overrideAccess: false,
      sort: 'title',
      select: {
        title: true,
        slug: true,
        description: true,
      },
    })

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.docs.map(async (category) => {
        const postCount = await payload.count({
          collection: 'posts',
          where: {
            and: [
              {
                _status: {
                  equals: 'published',
                },
              },
              {
                categories: {
                  in: [category.id],
                },
              },
            ],
          },
        })

        return {
          ...category,
          postCount: postCount.totalDocs,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      data: categoriesWithCounts,
      total: categories.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 },
    )
  }
}
