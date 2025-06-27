import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Get total published posts count
    const totalPosts = await payload.count({
      collection: 'posts',
      where: {
        _status: {
          equals: 'published',
        },
      },
    })

    // Get posts from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentPosts = await payload.count({
      collection: 'posts',
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            publishedAt: {
              greater_than: thirtyDaysAgo.toISOString(),
            },
          },
        ],
      },
    })

    // Get posts by category
    const categories = await payload.find({
      collection: 'categories',
      limit: 100,
      overrideAccess: false,
    })

    const categoryStats = await Promise.all(
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
          id: category.id,
          title: category.title,
          slug: category.slug,
          postCount: postCount.totalDocs,
        }
      }),
    )

    // Get latest post
    const latestPost = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1,
      overrideAccess: false,
      sort: '-publishedAt',
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        title: true,
        slug: true,
        publishedAt: true,
      },
    })

    // Get posts by month for the last 12 months
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const monthlyPosts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
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
            publishedAt: {
              greater_than: twelveMonthsAgo.toISOString(),
            },
          },
        ],
      },
      select: {
        publishedAt: true,
      },
    })

    // Group by month
    const monthlyStats = monthlyPosts.docs.reduce(
      (acc, post) => {
        if (!post.publishedAt) return acc

        const date = new Date(post.publishedAt)
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

        if (!acc[yearMonth]) {
          acc[yearMonth] = 0
        }

        acc[yearMonth]++
        return acc
      },
      {} as Record<string, number>,
    )

    const stats = {
      totalPosts: totalPosts.totalDocs,
      recentPosts: recentPosts.totalDocs,
      latestPost: latestPost.docs[0] || null,
      categoryStats: categoryStats.sort((a, b) => b.postCount - a.postCount),
      monthlyStats: Object.entries(monthlyStats)
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => b.month.localeCompare(a.month)),
      topCategories: categoryStats.sort((a, b) => b.postCount - a.postCount).slice(0, 5),
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Error fetching post stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post stats' },
      { status: 500 },
    )
  }
}
