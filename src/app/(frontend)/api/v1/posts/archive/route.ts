import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Get all published posts with publishedAt dates
    const posts = await payload.find({
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
              exists: true,
            },
          },
        ],
      },
      select: {
        title: true,
        slug: true,
        publishedAt: true,
      },
    })

    // Group posts by year and month
    const archive = posts.docs.reduce(
      (acc, post) => {
        if (!post.publishedAt) return acc

        const date = new Date(post.publishedAt)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 // getMonth() returns 0-11
        const monthName = date.toLocaleString('default', { month: 'long' })

        if (!acc[year]) {
          acc[year] = {}
        }

        if (!acc[year][month]) {
          acc[year][month] = {
            monthName,
            posts: [],
          }
        }

        acc[year][month].posts.push({
          title: post.title,
          slug: post.slug,
          publishedAt: post.publishedAt,
        })

        return acc
      },
      {} as Record<number, Record<number, { monthName: string; posts: any[] }>>,
    )

    // Convert to array format for easier consumption
    const archiveArray = Object.entries(archive)
      .map(([year, months]) => ({
        year: parseInt(year),
        months: Object.entries(months).map(([month, data]) => ({
          month: parseInt(month),
          monthName: data.monthName,
          posts: data.posts,
          postCount: data.posts.length,
        })),
        totalPosts: Object.values(months).reduce((sum, data) => sum + data.posts.length, 0),
      }))
      .sort((a, b) => b.year - a.year) // Sort years descending

    return NextResponse.json({
      success: true,
      data: archiveArray,
      total: posts.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching post archive:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post archive' },
      { status: 500 },
    )
  }
}
